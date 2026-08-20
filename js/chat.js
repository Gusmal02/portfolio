/* Chat widget — asistente del portafolio (Workers AI vía Cloudflare Worker). */
(function () {
  "use strict";

  var WORKER_URL = "https://portfolio-bot.gustavo-a-maldonado-v.workers.dev";
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
      label: "¡Pregúntame!",
      bubbleTitle: "¡Hola! Soy el asistente de Gustavo. ¿Qué quieres saber?",
      q1: "¿Qué es Sofos?",
      q1v: "Cuéntame qué es Sofos y qué hace",
      q2: "Contacto",
      q2v: "¿Cómo puedo contactar a Gustavo?",
      q3: "Stack técnico",
      q3v: "¿Cuál es tu stack técnico?",
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
      label: "Ask me!",
      bubbleTitle: "Hi! I'm Gustavo's assistant. What do you want to know?",
      q1: "What is Sofos?",
      q1v: "Tell me what Sofos is and what it does",
      q2: "Contact",
      q2v: "How can I contact Gustavo?",
      q3: "Tech stack",
      q3v: "What is your tech stack?",
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
    '<span class="c-flame"></span>' +
    '<span class="c-label" id="chatLabel"></span>' +
    '<div class="c-bubble" id="chatBubble">' +
      '<button class="c-x" id="chatBubbleClose" type="button" aria-label="close">&times;</button>' +
      '<p id="chatBubbleText"></p>' +
      '<div class="c-chips">' +
        '<button class="chip" type="button" data-q=""></button>' +
        '<button class="chip" type="button" data-q=""></button>' +
        '<button class="chip" type="button" data-q=""></button>' +
      '</div>' +
    '</div>' +
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
  var labelEl = document.getElementById("chatLabel");
  var bubble = document.getElementById("chatBubble");
  var bubbleText = document.getElementById("chatBubbleText");
  var bubbleClose = document.getElementById("chatBubbleClose");
  var chips = bubble.querySelectorAll(".chip");
  var history = [];
  var busy = false;
  var interacted = false;
  var bubbleTimer = null;

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
    labelEl.textContent = t("label");
    bubbleText.textContent = t("bubbleTitle");
    chips[0].textContent = t("q1"); chips[0].setAttribute("data-q", t("q1v"));
    chips[1].textContent = t("q2"); chips[1].setAttribute("data-q", t("q2v"));
    chips[2].textContent = t("q3"); chips[2].setAttribute("data-q", t("q3v"));
  }

  function hideBubble() {
    bubble.classList.remove("show");
    if (bubbleTimer) { clearTimeout(bubbleTimer); bubbleTimer = null; }
  }

  function stopAttention() {
    if (interacted) return;
    interacted = true;
    wrap.classList.add("stopped");
    hideBubble();
  }

  function showBubbleOnce() {
    if (interacted) return;
    bubble.classList.add("show");
    bubbleTimer = setTimeout(hideBubble, 12000);
  }

  function welcome() {
    if (history.length || body.children.length) return;
    addMsg("bot", t("welcome"));
  }

  function openPanel() {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    stopAttention();
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
    var bubbleEl = addMsg("bot", t("thinking"));
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
        bubbleEl.innerHTML = render(raw);
        body.scrollTop = body.scrollHeight;
      }
      if (!raw.trim()) throw new Error("empty");
      history.push({ role: "assistant", content: raw });
    } catch (e) {
      bubbleEl.innerHTML = "<i>" + esc(t("err")) + "</i>";
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
  bubbleClose.addEventListener("click", stopAttention);
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      openPanel();
      input.value = chip.getAttribute("data-q");
      ask();
    });
  });

  var langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.addEventListener("click", updateLabels);

  updateLabels();
  setTimeout(showBubbleOnce, 1200);
})();