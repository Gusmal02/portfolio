import { PROFILE } from "./context.js";

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function allowedOrigin(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (!origin) return null;
  const list = (env.ALLOWED_ORIGINS || "")
    .split(",").map(function (s) { return s.trim(); }).filter(Boolean);
  if (list.length === 0 || list.includes(origin)) return origin;
  return null;
}

function buildSystem(lang) {
  return [
    "Eres el asistente del portafolio de Gustavo Maldonado, Security AI/ML Engineer.",
    "Responde preguntas sobre su perfil, proyectos, stack, logros y contacto usando SOLO el contexto proporcionado.",
    "Reglas:",
    "- Responde siempre en el idioma en que te escriban.",
    "- Sé conciso (máximo 150 palabras por respuesta).",
    "- No inventes datos que no estén en el contexto; si no lo sabes, dilo y sugiere escribir a gustavo.a.maldonado.v@gmail.com.",
    "- Si preguntan cómo contactarlo, da el email y el LinkedIn.",
    "- Usa **negritas** y listas con '-' para mayor claridad.",
    "- Si te desvían del tema del portafolio, vuelve amablemente a él.",
    "",
    "CONTEXTO DEL PORTAFOLIO:",
    PROFILE[lang] || PROFILE.es
  ].join("\n\n");
}

function toMessages(messages) {
  const out = [];
  (messages || []).forEach(function (m) {
    if (!m || !m.content) return;
    out.push({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content) });
  });
  if (!out.length) out.push({ role: "user", content: "Hola" });
  return out;
}

async function rateLimit(request, env) {
  if (!env.RATE) return { ok: true };
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const minute = Math.floor(Date.now() / 60000);
  const day = Math.floor(Date.now() / 86400000);
  const mKey = "rl:" + ip + ":" + minute;
  const dKey = "rld:" + ip + ":" + day;
  const m = Number((await env.RATE.get(mKey)) || 0);
  const d = Number((await env.RATE.get(dKey)) || 0);
  if (m >= 20 || d >= 300) return { ok: false };
  await env.RATE.put(mKey, String(m + 1), { expirationTtl: 120 });
  await env.RATE.put(dKey, String(d + 1), { expirationTtl: 90000 });
  return { ok: true };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      const origin = allowedOrigin(request, env);
      if (origin === null && request.headers.get("Origin")) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, { status: 204, headers: cors(origin) });
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const origin = allowedOrigin(request, env);
    if (origin === null && request.headers.get("Origin")) {
      return new Response("Forbidden", { status: 403 });
    }
    const h = cors(origin);

    const rl = await rateLimit(request, env);
    if (!rl.ok) {
      return new Response(JSON.stringify({ error: "rate_limit" }), { status: 429, headers: h });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response("Bad request", { status: 400, headers: h });
    }

    const lang = body.lang === "en" ? "en" : "es";
    const messages = [{ role: "system", content: buildSystem(lang) }].concat(toMessages(body.messages));
    const model = env.AI_MODEL || "@cf/meta/llama-4-scout-17b-16e-instruct";

    const streamHeaders = Object.assign({}, h, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });

    let upstream;
    try {
      upstream = await env.AI.run(model, {
        messages: messages,
        stream: true,
        max_tokens: 1024,
        temperature: 0.4
      });
    } catch (e) {
      const detail = String((e && e.message) || e).slice(0, 500);
      return new Response(JSON.stringify({ error: "upstream", detail: detail }), {
        status: 502, headers: streamHeaders
      });
    }

    const reader = upstream.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let buf = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += decoder.decode(value, { stream: true });
            let nl;
            while ((nl = buf.indexOf("\n")) !== -1) {
              const line = buf.slice(0, nl).trim();
              buf = buf.slice(nl + 1);
              if (!line.startsWith("data:")) continue;
              const payload = line.slice(5).trim();
              if (!payload || payload === "[DONE]") continue;
              try {
                const json = JSON.parse(payload);
                const text = json.response || "";
                if (text) controller.enqueue(encoder.encode(text));
              } catch (e) { /* chunk parcial */ }
            }
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      }
    });
    return new Response(stream, { headers: streamHeaders });
  }
};