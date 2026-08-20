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
  const base = PROFILE[lang] || PROFILE.es;
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
    base
  ].join("\n\n");
}

function toContents(messages) {
  const out = [];
  (messages || []).forEach(function (m) {
    if (!m || !m.content) return;
    const role = m.role === "assistant" ? "model" : "user";
    out.push({ role: role, parts: [{ text: String(m.content) }] });
  });
  if (!out.length) out.push({ role: "user", parts: [{ text: "Hola" }] });
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
    const system = buildSystem(lang);
    const contents = toContents(body.messages);
    const model = env.GEMINI_MODEL || "gemini-2.5-flash-lite";
    const url = "https://generativelanguage.googleapis.com/v1beta/models/" +
      model + ":streamGenerateContent?alt=sse";

    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": env.GEMINI_API_KEY || ""
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 1024 }
      })
    });

    const streamHeaders = Object.assign({}, h, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      return new Response(JSON.stringify({ error: "upstream", detail: detail.slice(0, 500) }), {
        status: 502, headers: streamHeaders
      });
    }

    const reader = upstream.body.getReader();
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
                const text = (json.candidates?.[0]?.content?.parts || [])
                  .map(function (p) { return p.text || ""; }).join("");
                if (text) controller.enqueue(encoder.encode(text));
              } catch (e) { /* chunk parcial, se ignora */ }
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