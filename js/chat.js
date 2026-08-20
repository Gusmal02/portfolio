/* Chat widget — asistente del portafolio (Gemini vía Cloudflare Worker). */
(function () {
  "use strict";

  var WORKER_URL = "https://portfolio-bot.your-subdomain.workers.dev"; // TODO: reemplazar tras desplegar
  var MAX_HISTORY = 10;

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function currentLang() { return localStorage.getItem("gm-lang") || "es"; }

  var T = {
    es: {
      open: "Abrir chat",
      title: "Gustavo · Asistente",
      sub: "Guía del portafolio",
      ph: "Pregúntame sobre mis proyectos…",
      send: "Enviar",
      welcome: "¡Hola! Soy el asistente del portafolio de Gustavo. Pregúntame sobre sus proyectos, su stack técnico o cómo contactarlo.",
      thinking: "Gustavo está escribiendo…",
      err: "Ups, no pude responder. Inténtalo de nuevo o escribe a gustavo.a.maldonado.v@gmail.com."
    },
    en: {
      open: "Open chat",
      title: "Gustavo · Assistant",
      sub: "Portfolio guide",
      ph: "Ask me about my projects…",
      send: "Send",
      welcome: "Hi! I'm Gustavo's portfolio assistant. Ask me about his projects, tech stack, or how to reach him.",
      thinking: "Gustavo is typing…",
      err: "Oops, I couldn't respond. Try again or email gustavo.a.maldonado.v@gmail.com."
    }
  };
  function t(k) { return T[currentLang()][k]; }

  function render(text) {
    return esc(text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  }

  var root = document.getElementById("chatRoot") || document.body;
  var wrap = document.createElement("div");
  wrap.id = "chat";
  wrap.innerHTML =
    '<button id="chatOpen" type="button" aria-label="' + esc(t("open")) + '"><span class="c-mark"></span></button>' +
    '<div id="chatPanel" role="dialog" aria-hidden="true">' +
      '<div class="c-head"><div class="c-avatar"><span class="ping"></span></div>' +
      '<div><b>' + esc(t("title")) + '</b><small>' + esc(t("sub")) + '</small></div>' +
      '<button id="chatClose" type="button" aria-label="close">&times;</button></div>' +
      '<div class="c-body" id="chatBody"></div>' +
      '<div class="c-foot"><textarea id="chatInput" rows="1" placeholder="' + esc(t("ph")) + '"></textarea>' +
      '<button id="chatSend" type="button">' + esc(t("send")) + '</button></div>' +
    '</div>';
  root.appendChild(wrap);

  var openBtn = document.getElementById("chatOpen");
  var panel = document.getElementById("chatPanel");
  var body = document.getElementById("chatBody");
  var input = document.getElementById("chatInput");
  var sendBtn = document.getElementById("chatSend");
  var closeBtn = document.getElementById("chatClose");
  var history = [];
  var busy = false;

  function addMsg(role, text) {
    var div = document.createElement("div");
    div.className = "c-msg " + role;
    var b = document.createElement("div");
    b.className = "c-bubble";
    if (text) b.innerHTML = render(text);
    div.appendChild(b);
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return b;
  }

  function updateLabels() {
    openBtn.setAttribute("aria-label", t("open"));
    input.placeholder = t("ph");
    sendBtn.textContent = t("send");
  }

  function welcome() {
    if (history.length || body.children.length) return;
    addMsg("bot", t("welcome"));
  }

  function openPanel() {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    welcome();
    setTimeout(function () { input.focus(); }, 120);
  }
  function closePanel() {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  }

  async function ask() {
    var text = input.value.trim();
    if (!text || busy) return;
    input.value = "";
    history.push({ role: "user", content: text });
    addMsg("user", text);
    var bubble = addMsg("bot", t("thinking"));
    busy = true;
    sendBtn.disabled = true;
    var raw = "";
    try {
      var res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-MAX_HISTORY), lang: currentLang() })
      });
      if (!res.ok || !res.body) throw new Error("HTTP " + res.status);
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      for (;;) {
        var r = await reader.read();
        if (r.done) break;
        raw += decoder.decode(r.value, { stream: true });
        bubble.innerHTML = render(raw);
        body.scrollTop = body.scrollHeight;
      }
      if (!raw.trim()) throw new Error("empty");
      history.push({ role: "assistant", content: raw });
    } catch (e) {
      bubble.innerHTML = "<i>" + esc(t("err")) + "</i>";
    }
    busy = false;
    sendBtn.disabled = false;
    input.focus();
  }

  openBtn.addEventListener("click", function () {
    if (panel.classList.contains("open")) closePanel();
    else openPanel();
  });
  closeBtn.addEventListener("click", closePanel);
  sendBtn.addEventListener("click", ask);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(); }
  });

  var langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.addEventListener("click", updateLabels);
})();