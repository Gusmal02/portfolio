/* Gustavo Maldonado — portfolio. Original code. */
(function () {
  "use strict";

  /* ---------------- i18n ---------------- */
  var I18N = {
    es: {
      nav_about: "Perfil",
      nav_stack: "Stack",
      nav_projects: "Proyectos",
      nav_logros: "Logros",
      nav_cta: "Hablemos →",
      hero_eyebrow: "Security AI/ML Engineer · Ciudad de México",
      hero_h1: "Construyo <span class=\"g\">plataformas de seguridad con IA</span> que piensan, ejecutan y dejan registro de todo.",
      hero_lede: "Caza de amenazas con memoria episódica, pentesting autónomo con auditoría inmutable y detección de anomalías en grafos financieros. <b>17 años en infraestructura TI</b> y un portafolio respaldado por más de <b>1,200 tests automatizados</b>.",
      hero_cta1: "Ver lo que construyo →",
      hero_cta2: "Hablemos",
      hero_m1: "años en infraestructura TI",
      hero_m2: "tests automatizados",
      hero_m3: "detección en benchmark (Momus)",
      hero_m4: "alerta temprana (NEURAL-RMF)",
      chip1a: "Plataformas",
      chip2a: "Investigación",
      chip3a: "Portafolio",
      about_kick: "Quién soy",
      about_h2: "De <span class=\"g\">17 años en infraestructura</span> a plataformas de IA para ciberseguridad.",
      about_p1: "Soy <b>Gustavo Maldonado</b>, Security AI/ML Engineer en la Ciudad de México. Construyo sistemas de IA de grado producción: <b>caza de amenazas con memoria episódica</b>, <b>pentesting autónomo con auditoría inmutable</b> y <b>detección de anomalías en grafos financieros</b>.",
      about_p2: "Aplico criterio de seguridad desde el diseño —Bandit SAST, Docker no-root, CI/CD, NIST AC-6— y tengo investigación propia en curso: alerta temprana de crisis epilépticas y detección sísmica en colaboración con el <b>NIED de Japón</b>.",
      about_c1t: "Ciberseguridad",
      about_c1s: "Threat hunting, pentesting, SAST, NIST AC-6, SIEM",
      about_c2t: "IA Generativa",
      about_c2s: "RAG, agentes LangGraph, Tool Calling, MCP",
      about_c3t: "Investigación",
      about_c3s: "NEURAL-RMF · EQ-RMF (NIED, Japón)",
      about_c4t: "Grado producción",
      about_c4s: "Docker no-root, CI/CD, Prometheus, Grafana",
      stack_kick: "Stack técnico",
      stack_h2: "Tecnologías con las que <span class=\"g\">construyo y protejo</span>.",
      proj_kick: "Proyectos",
      proj_h2: "Plataformas de <span class=\"g\">seguridad y ML</span> en mi portafolio.",
      proj_lede: "Sistemas de IA con ownership completo, métricas publicadas y suites de pruebas. Cada acción con trazabilidad.",
      proj_more_kick: "Más soluciones",
      logr_kick: "Logros y certificaciones",
      logr_h2: "Hitos que <span class=\"g\">respaldan el trabajo</span>.",
      cta_kick: "Contacto",
      cta_h2: "¿Construimos <span class=\"g\">el siguiente sistema</span>?",
      cta_lede: "Si buscas seguridad con IA, analítica de datos o agentes LLM en producción, hablemos.",
      cta_btn: "Escríbeme →"
    },
    en: {
      nav_about: "About",
      nav_stack: "Stack",
      nav_projects: "Projects",
      nav_logros: "Milestones",
      nav_cta: "Let's talk →",
      hero_eyebrow: "Security AI/ML Engineer · Mexico City",
      hero_h1: "I build <span class=\"g\">AI-powered security platforms</span> that think, act, and log everything.",
      hero_lede: "Threat hunting with episodic memory, autonomous pentesting with immutable audit trails, and anomaly detection on financial graphs. <b>17 years in IT infrastructure</b> and a portfolio backed by <b>1,200+ automated tests</b>.",
      hero_cta1: "View what I build →",
      hero_cta2: "Let's talk",
      hero_m1: "years in IT infrastructure",
      hero_m2: "automated tests",
      hero_m3: "detection in benchmark (Momus)",
      hero_m4: "early warning (NEURAL-RMF)",
      chip1a: "Platforms",
      chip2a: "Research",
      chip3a: "Portfolio",
      about_kick: "Who I am",
      about_h2: "From <span class=\"g\">17 years in infrastructure</span> to AI platforms for cybersecurity.",
      about_p1: "I'm <b>Gustavo Maldonado</b>, a Security AI/ML Engineer in Mexico City. I build production-grade AI systems: <b>threat hunting with episodic memory</b>, <b>autonomous pentesting with immutable audit trails</b>, and <b>anomaly detection on financial graphs</b>.",
      about_p2: "I apply security-by-design —Bandit SAST, non-root Docker, CI/CD, NIST AC-6— and I'm running my own research: early warning for epileptic crises and seismic detection in collaboration with <b>NIED (Japan)</b>.",
      about_c1t: "Cybersecurity",
      about_c1s: "Threat hunting, pentesting, SAST, NIST AC-6, SIEM",
      about_c2t: "Generative AI",
      about_c2s: "RAG, LangGraph agents, Tool Calling, MCP",
      about_c3t: "Research",
      about_c3s: "NEURAL-RMF · EQ-RMF (NIED, Japan)",
      about_c4t: "Production-grade",
      about_c4s: "Non-root Docker, CI/CD, Prometheus, Grafana",
      stack_kick: "Technical stack",
      stack_h2: "Technologies I <span class=\"g\">build with and protect</span>.",
      proj_kick: "Projects",
      proj_h2: "Security and ML <span class=\"g\">platforms</span> in my portfolio.",
      proj_lede: "AI systems with full ownership, published metrics, and test suites. Every action with traceability.",
      proj_more_kick: "More solutions",
      logr_kick: "Milestones & certifications",
      logr_h2: "Milestones that <span class=\"g\">back the work</span>.",
      cta_kick: "Contact",
      cta_h2: "Shall we build <span class=\"g\">the next system</span>?",
      cta_lede: "If you need AI security, data analytics, or production LLM agents, let's talk.",
      cta_btn: "Write to me →"
    }
  };

  /* ---------------- data ---------------- */
  var MARQUEE = ["Threat Hunting", "Pentesting autónomo", "IA Generativa", "RAG", "Detección de anomalías en grafos", "MLOps", "AIOps", "Purple Team", "MCP", "LangGraph", "NLP"];

  var STACK = [
    { es: { t: "IA Generativa y LLMs", tags: ["LLM", "RAG", "CRAG", "LangGraph", "LangChain", "OpenAI", "Claude", "Gemini", "Ollama", "Qdrant", "ChromaDB", "Tool Calling", "Prompt Engineering", "MCP Server"] },
      en: { t: "Generative AI & LLMs", tags: ["LLM", "RAG", "CRAG", "LangGraph", "LangChain", "OpenAI", "Claude", "Gemini", "Ollama", "Qdrant", "ChromaDB", "Tool Calling", "Prompt Engineering", "MCP Server"] } },
    { es: { t: "ML, NLP y Grafos", tags: ["Python 3.12", "PyTorch", "scikit-learn", "LightGBM", "K-Means", "Isolation Forest", "GNN (S³)", "Anomaly Detection", "NLP", "MLflow"] },
      en: { t: "ML, NLP & Graphs", tags: ["Python 3.12", "PyTorch", "scikit-learn", "LightGBM", "K-Means", "Isolation Forest", "GNN (S³)", "Anomaly Detection", "NLP", "MLflow"] } },
    { es: { t: "Ciberseguridad", tags: ["Threat Hunting", "Pentesting", "Purple Team", "eJPTv2", "SIEM Splunk", "Bandit SAST", "NIST AC-6", "ATT&CK", "DevSecOps"] },
      en: { t: "Cybersecurity", tags: ["Threat Hunting", "Pentesting", "Purple Team", "eJPTv2", "SIEM Splunk", "Bandit SAST", "NIST AC-6", "ATT&CK", "DevSecOps"] } },
    { es: { t: "Cloud y DevOps", tags: ["GCP Vertex AI", "AWS S3", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "FastAPI", "PostgreSQL", "Redis"] },
      en: { t: "Cloud & DevOps", tags: ["GCP Vertex AI", "AWS S3", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "FastAPI", "PostgreSQL", "Redis"] } }
  ];

  var FLAGSHIP = [
    {
      n: "01", badge: "Threat Hunting", cat: "Defensa · IA",
      es: { t: "Pantheon v2.1", tagline: "Plataforma autónoma de caza de amenazas con memoria episódica y scoring online.",
        m: "397 tests · 0 fallos", b1: "Agente de investigación CRAG (Hermes) con LLM local, GFCN AttractorIndex en espacio 8D (Laser & Gravitational Score) sin reentrenamiento, y actualización automática desde Ares cerrando el loop purple team.",
        b2: "Fail-closed por diseño, human-in-the-loop, audit trail con cadena de hashes y playbooks de contención validados." },
      en: { t: "Pantheon v2.1", tagline: "Autonomous threat hunting platform with episodic memory and online scoring.",
        m: "397 tests · 0 failures", b1: "CRAG investigation agent (Hermes) with a local LLM, online GFCN AttractorIndex in 8D space (Laser & Gravitational Score) with no retraining, and automatic updates from Ares closing the purple-team loop.",
        b2: "Fail-closed by design, human-in-the-loop, hash-chained audit trail, and validated containment playbooks." },
      tech: ["Python", "FastAPI", "LangGraph", "Ollama", "PostgreSQL", "Prometheus", "ATT&CK", "Docker"]
    },
    {
      n: "02", badge: "Pentesting", cat: "Ofensivo · IA",
      es: { t: "Ares v3.2", tagline: "Asistente de hacker ético con memoria episódica, auditoría inmutable y blindaje estructural.",
        m: "555+ tests · Round 3", b1: "Reconocimiento autónomo con triaje ML, sandbox Docker aislado, gate de aprobación para acciones de alto riesgo y Vulcan IDA★ (Iterative Deepening A*) para la secuencia de explotación de mínimo CCI.",
        b2: "Auditoría inmutable con hash encadenado SHA-256 y réplica opcional en S3 WORM; MCP Server (7 herramientas) y Purple Bridge bidireccional con Pantheon." },
      en: { t: "Ares v3.2", tagline: "Ethical hacking assistant with episodic memory, immutable audit trail, and structural hardening.",
        m: "555+ tests · Round 3", b1: "Autonomous reconnaissance with ML triage, isolated Docker sandbox, approval gate for high-risk actions, and Vulcan IDA* (Iterative Deepening A*) for the minimum accumulated-CCI exploitation sequence.",
        b2: "Immutable audit trail with SHA-256 chained hashes and optional S3 WORM replication; MCP Server (7 tools) and a bidirectional Purple Bridge with Pantheon." },
      tech: ["Python 3.12", "LangGraph", "Ollama", "ML", "Docker", "MCP", "S3 WORM"]
    },
    {
      n: "03", badge: "Graph ML", cat: "Fraude · Grafos",
      es: { t: "Helix", tagline: "Detección de anomalías en grafos sobre la esfera cuaterniónica S³ para fraude financiero.",
        m: "AUC 0.9647 · AMLSim", b1: "Cada nodo recibe una rotación en S³: los nodos ilícitos generan patrones geométricos distinguibles (torque, inestabilidad, desviación). Selección automática de modelo (Helix/SAGE/GCN/MLP) por densidad del grafo.",
        b2: "NEXUS y SONAR: scoring semi-supervisado que propaga riesgo desde semillas confirmadas sin reentrenamiento. AUC 0.9624 (Elliptic), 0.9565 (PaySim), 0.8899 (NF-UQ-NIDS)." },
      en: { t: "Helix", tagline: "Graph anomaly detection over the unit quaternion sphere S³ for financial fraud.",
        m: "AUC 0.9647 · AMLSim", b1: "Each node receives a rotation in S³: illicit nodes generate distinguishable geometric patterns (torque, instability, identity deviation). Automatic model selection (Helix/SAGE/GCN/MLP) based on graph density.",
        b2: "NEXUS and SONAR: semi-supervised scorers that propagate risk from confirmed seeds without retraining. AUC 0.9624 (Elliptic), 0.9565 (PaySim), 0.8899 (NF-UQ-NIDS)." },
      tech: ["Python", "PyTorch", "scikit-learn", "S³", "ChebyshevFNO", "GraphSAGE/GCN"]
    }
  ];

  var MORE = [
    { es: { t: "Momus", d: "Agente de detección de vulnerabilidades en APIs. 6/6 en benchmark vs 0/6 manual." },
      en: { t: "Momus", d: "API vulnerability detection agent. 6/6 in benchmark vs 0/6 manual." }, tag: "Security", link: "https://github.com/Gusmal02/momus" },
    { es: { t: "Fraud Sentinel", d: "Detección de fraude en siniestros: agentes LangGraph + LightGBM, ROC-AUC 0.81." },
      en: { t: "Fraud Sentinel", d: "Insurance claim fraud detection: LangGraph agents + LightGBM, ROC-AUC 0.81." }, tag: "ML", link: "https://github.com/Gusmal02/fraud-sentinel" },
    { es: { t: "Credit Behavior Engine", d: "Scoring crediticio conductual neuro-simbólico. AUROC 0.9958." },
      en: { t: "Credit Behavior Engine", d: "Neuro-symbolic behavioral credit scoring. AUROC 0.9958." }, tag: "Fintech", link: "https://github.com/Gusmal02/credit-behavior-engine" },
    { es: { t: "Smart Onboarding CV", d: "Onboarding bancario: visión (MobileNetV2) + scoring + reglas. F1 0.93." },
      en: { t: "Smart Onboarding CV", d: "Banking onboarding: vision (MobileNetV2) + scoring + rules. F1 0.93." }, tag: "Vision+ML", link: "https://github.com/Gusmal02/smart-onboarding-cv" },
    { es: { t: "ACO Route Optimizer", d: "Optimización de rutas última milla con Ant Colony Optimization. +13.75%." },
      en: { t: "ACO Route Optimizer", d: "Last-mile route optimization with Ant Colony Optimization. +13.75%." }, tag: "Optimización", link: "https://github.com/Gusmal02/ACO-Route-Optimizer" },
    { es: { t: "NEURAL-RMF", d: "Alerta temprana de crisis epilépticas focales: ventana promedio de 47 min antes de la crisis." },
      en: { t: "NEURAL-RMF", d: "Early warning for focal epileptic crises: average window of 47 min before onset." }, tag: "Research" },
    { es: { t: "EQ-RMF", d: "Detección temprana de sismos en investigación colaborativa con el NIED de Japón." },
      en: { t: "EQ-RMF", d: "Early earthquake detection, collaborative research with NIED (Japan)." }, tag: "Research" }
  ];

  var STATS = [
    { es: { v: "17+", l: "años en infraestructura TI" }, en: { v: "17+", l: "years in IT infrastructure" } },
    { es: { v: "1,200+", l: "tests automatizados" }, en: { v: "1,200+", l: "automated tests" } },
    { es: { v: "6/6", l: "detección en benchmark (Momus)" }, en: { v: "6/6", l: "detection in benchmark (Momus)" } },
    { es: { v: "47 min", l: "alerta temprana (NEURAL-RMF)" }, en: { v: "47 min", l: "early warning (NEURAL-RMF)" } }
  ];

  var LOGROS = [
    { cat: "CARRERA", es: { t: "Especialista en Infraestructura TI", d: "Creative Service · Jun 2009 – Actualidad. 17 años gestionando entornos Windows, Linux y macOS en 500+ equipos." },
      en: { t: "IT Infrastructure Specialist", d: "Creative Service · Jun 2009 – Present. 17 years managing Windows, Linux, and macOS environments across 500+ endpoints." } },
    { cat: "INVESTIGACIÓN", es: { t: "Colaboración con el NIED de Japón", d: "Desarrollo de EQ-RMF, sistema de detección temprana de sismos con ventanas más amplias de monitoreo." },
      en: { t: "Collaboration with NIED (Japan)", d: "Building EQ-RMF, an early earthquake detection system with wider monitoring windows." } },
    { cat: "INVESTIGACIÓN", es: { t: "NEURAL-RMF", d: "Sistema de alerta temprana de crisis epilépticas focales: ventana promedio de 47 minutos antes de la crisis en datasets públicos." },
      en: { t: "NEURAL-RMF", d: "Early-warning system for focal epileptic crises: average 47-minute window before onset on public datasets." } },
    { cat: "PORTFOLIO", es: { t: "1,200+ tests automatizados", d: "Ares 555+, Pantheon 397, Helix 67, Momus 163 y más, con métricas publicadas." },
      en: { t: "1,200+ automated tests", d: "Ares 555+, Pantheon 397, Helix 67, Momus 163 and more, with published metrics." } },
    { cat: "CERT", es: { t: "eJPTv2 · Hacking Ético y Ciberseguridad", d: "Certificación en seguridad ofensiva y ciberseguridad." },
      en: { t: "eJPTv2 · Ethical Hacking & Cybersecurity", d: "Certification in offensive security and cybersecurity." } },
    { cat: "CERT", es: { t: "Data Science – TripleTen", d: "Formación en ciencia de datos: ML, estadística y modelado." },
      en: { t: "Data Science – TripleTen", d: "Data science training: ML, statistics, and modeling." } },
    { cat: "CERT", es: { t: "Google Cybersecurity Professional", d: "Certificado profesional de Google en ciberseguridad." },
      en: { t: "Google Cybersecurity Professional", d: "Google professional certificate in cybersecurity." } },
    { cat: "CERT", es: { t: "AWS Cloud Practitioner — 2026 (en curso)", d: "Fundamentos de AWS Cloud en preparación." },
      en: { t: "AWS Cloud Practitioner — 2026 (in progress)", d: "AWS Cloud fundamentals currently in preparation." } }
  ];

  /* ---------------- helpers ---------------- */
  var lang = "es";
  function t(key) { return (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function tagHtml(tag) { return "<span class=\"tag\">" + esc(tag) + "</span>"; }

  function applyI18n() {
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      els[i].innerHTML = t(els[i].getAttribute("data-i18n"));
    }
    document.documentElement.lang = lang;
    var btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang === "es" ? "EN" : "ES";
  }

  function renderStack() {
    var wrap = document.getElementById("stackGrid");
    var html = "";
    STACK.forEach(function (col, i) {
      html += "<div class=\"scol\"><div class=\"n\">0" + (i + 1) + "</div><h3>" + esc(col[lang].t) + "</h3><div class=\"tags\">" +
        col[lang].tags.map(tagHtml).join("") + "</div></div>";
    });
    wrap.innerHTML = html;
  }

  function renderFlagship() {
    var wrap = document.getElementById("projFlagship");
    var html = "";
    FLAGSHIP.forEach(function (p) {
      html += "<article class=\"pcard\"><div class=\"pcard-in\"><div class=\"pcard-body\">" +
        "<div class=\"pmeta\"><span class=\"pnum\">" + p.n + "</span><span class=\"pbadge\">" + esc(p.badge) + "</span><span class=\"pcat\">" + esc(p.cat) + "</span></div>" +
        "<h3>" + esc(p[lang].t) + "</h3><p class=\"ptag\"><b>" + esc(p[lang].m) + "</b> · " + esc(p[lang].tagline) + "</p>" +
        "<div class=\"pblocks\"><div class=\"pblock pb-imp\"><span class=\"lbl\">" + (lang === "es" ? "Por qué importa" : "Why it matters") + "</span><p>" + esc(p[lang].b1) + "</p></div>" +
        "<div class=\"pblock pb-prob\"><span class=\"lbl\">" + (lang === "es" ? "Detalle" : "Detail") + "</span><p>" + esc(p[lang].b2) + "</p></div></div>" +
        "<div class=\"ptech\">" + p.tech.map(tagHtml).join("") + "</div></div></div></article>";
    });
    wrap.innerHTML = html;
  }

  function renderMore() {
    var wrap = document.getElementById("projMore");
    var html = "";
    MORE.forEach(function (m, i) {
      var link = m.link ? "<a href=\"" + m.link + "\" target=\"_blank\" rel=\"noopener\">GitHub ↗</a>" : "";
      html += "<div class=\"mcard\"><div class=\"top\"><span class=\"mn\">0" + (i + 1) + "</span><span class=\"mtag\">" + esc(m.tag) + "</span></div>" +
        "<h4>" + esc(m[lang].t) + "</h4><p>" + esc(m[lang].d) + "</p>" + link + "</div>";
    });
    wrap.innerHTML = html;
  }

  function renderStats() {
    var wrap = document.getElementById("statsBand");
    var html = "";
    STATS.forEach(function (s) {
      html += "<div><b>" + esc(s[lang].v) + "</b><span>" + esc(s[lang].l) + "</span></div>";
    });
    wrap.innerHTML = html;
  }

  function renderLogros() {
    var wrap = document.getElementById("logrosList");
    var html = "";
    LOGROS.forEach(function (l) {
      html += "<div class=\"tl\"><div class=\"yr\">" + esc(l.cat) + "</div><h4>" + esc(l[lang].t) + "</h4><p>" + esc(l[lang].d) + "</p></div>";
    });
    wrap.innerHTML = html;
  }

  function renderMarquee() {
    var track = document.getElementById("marqueeTrack");
    var items = MARQUEE.map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("");
    track.innerHTML = items + items;
  }

  function renderAll() {
    applyI18n();
    renderStack();
    renderFlagship();
    renderMore();
    renderStats();
    renderLogros();
    renderMarquee();
  }

  /* ---------------- terminal ---------------- */
  var TERM = [
    { cmd: "whoami", out: "security-ai-ml-engineer" },
    { cmd: "cat stack.txt", out: "Python · LangGraph · PyTorch · GCP · AWS · MCP" },
    { cmd: "ls projects/", out: "pantheon  ares  helix  momus  fraud-sentinel" },
    { cmd: "./run pantheon --hunt", out: "[OK] 397 tests · fail-closed by design", ok: true },
    { cmd: "./run helix --graph-aml", out: "[OK] AUC 0.9647 · Elliptic 0.9624", ok: true }
  ];
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  async function animateTerminal() {
    var body = document.getElementById("termBody");
    if (!body || body.dataset.done === "1") return;
    body.dataset.done = "1";
    body.innerHTML = "";
    for (var i = 0; i < TERM.length; i++) {
      var line = document.createElement("div");
      line.className = "t-line";
      line.innerHTML = "<span class=\"t-prompt\">$</span> <span class=\"t-cmd\"></span><span class=\"t-cursor\">█</span>";
      body.appendChild(line);
      var cmdSpan = line.querySelector(".t-cmd");
      var cur = line.querySelector(".t-cursor");
      for (var c = 0; c < TERM[i].cmd.length; c++) {
        cmdSpan.textContent += TERM[i].cmd[c];
        await sleep(28);
      }
      cur.style.display = "none";
      var out = document.createElement("div");
      out.className = "t-out" + (TERM[i].ok ? " ok" : "");
      out.textContent = TERM[i].out;
      body.appendChild(out);
      await sleep(260);
    }
  }

  /* ---------------- effects ---------------- */
  var canvas = document.getElementById("net");
  var ctx = canvas.getContext("2d");
  var parts = [];
  function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function makeParts() {
    var n = Math.min(70, Math.floor(window.innerWidth / 22));
    parts = [];
    for (var i = 0; i < n; i++) {
      parts.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .6 });
    }
  }
  function drawNet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = .6;
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.fillStyle = "rgba(230,57,70,.65)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      for (var j = i + 1; j < parts.length; j++) {
        var q = parts[j];
        var dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
        if (d2 < 12000) {
          var a = 1 - d2 / 12000;
          ctx.strokeStyle = "rgba(255,71,87," + (a * .28) + ")";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawNet);
  }

  function initEffects() {
    sizeCanvas();
    makeParts();
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) drawNet();

    var glow = document.getElementById("glow");
    window.addEventListener("mousemove", function (e) {
      glow.style.opacity = "1";
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });

    var bar = document.getElementById("bar");
    var nav = document.getElementById("nav");
    window.addEventListener("scroll", function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
      nav.classList.toggle("scrolled", h.scrollTop > 24);
    }, { passive: true });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

    window.addEventListener("resize", function () { sizeCanvas(); makeParts(); });
  }

  /* ---------------- init ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    lang = localStorage.getItem("gm-lang") || "es";
    renderAll();
    initEffects();
    animateTerminal();
    document.getElementById("langToggle").addEventListener("click", function () {
      lang = lang === "es" ? "en" : "es";
      localStorage.setItem("gm-lang", lang);
      renderAll();
    });
  });
})();