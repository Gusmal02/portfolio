/* Gustavo Maldonado — portfolio. Original code. */
(function () {
  "use strict";

  /* ---------------- i18n ---------------- */
  var I18N = {
    es: {
      nav_about: "Perfil",
      nav_stack: "Stack",
      nav_projects: "Proyectos",
      nav_research: "Investigación",
      nav_logros: "Logros",
      nav_cta: "Hablemos →",
      hero_eyebrow: "AI Engineer & Data Scientist · Ciudad de México",
      hero_h1: "Construyo <span class=\"g\">agentes LLM, pipelines RAG y modelos de ML</span> que resuelven problemas reales de negocio.",
      hero_lede: "Agentes conversacionales con memoria persistente, RAG correctivo, scoring crediticio y detección de anomalías. Portafolio con repositorios públicos, métricas reales y más de <b>1,200 tests automatizados</b>.",
      hero_cta1: "Ver lo que construyo →",
      hero_cta2: "Hablemos",
      hero_m1: "tests automatizados",
      hero_m2: "detección en benchmark (Momus)",
      hero_m3: "AUROC scoring crediticio",
      hero_m4: "alerta temprana (NEURAL-RMF)",
      chip1a: "Plataformas",
      chip2a: "Investigación",
      chip3a: "Portafolio",
      about_kick: "Quién soy",
      about_h2: "AI Engineer & Data Scientist construyendo <span class=\"g\">agentes, RAG y ML</span> con métricas reales.",
      about_p1: "Soy <b>Gustavo Maldonado</b>, AI Engineer & Data Scientist en la Ciudad de México. Construyo agentes LLM con memoria persistente, pipelines RAG correctivos y modelos de ML aplicados a casos reales: scoring crediticio, detección de fraude y anomalías en grafos financieros.",
      about_p2: "Integro seguridad desde el origen en cada proyecto —Bandit SAST, Docker no-root, CI/CD, NIST AC-6— y tengo investigación propia en curso: alerta temprana de crisis epilépticas (NEURAL-RMF) y detección sísmica (EQ-RMF).",
      about_c1t: "Agentes LLM",
      about_c1s: "LangGraph, memoria episódica, Tool Calling, MCP, ReAct",
      about_c2t: "RAG & Datos",
      about_c2s: "CRAG, Qdrant, embeddings, Graph RAG, MLflow",
      about_c3t: "Machine Learning",
      about_c3s: "PyTorch, LightGBM, scikit-learn, scoring, anomalías",
      about_c4t: "Investigación",
      about_c4s: "NEURAL-RMF · EQ-RMF · RMF cuaterniónico",
      stack_kick: "Stack técnico",
      stack_h2: "Tecnologías con las que <span class=\"g\">construyo y despliego</span>.",
      proj_kick: "Proyectos",
      proj_h2: "Agentes, RAG y ML <span class=\"g\">con métricas reales</span> en mi portafolio.",
      proj_lede: "Sistemas de IA con ownership completo, métricas publicadas y suites de pruebas. Cada acción con trazabilidad.",
      proj_more_kick: "Más soluciones",
      res_kick: "Investigación",
      res_h2: "Arquitecturas matemáticas originales <span class=\"g\">en campos de memoria resonante.</span>",
      res_lede: "Sistemas de monitoreo sin entrenamiento supervisado basados en el framework RMF — osciladores cuaterniónicos en S³. Preprint publicado y código distribuido.",
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
      nav_research: "Research",
      nav_logros: "Milestones",
      nav_cta: "Let's talk →",
      hero_eyebrow: "AI Engineer & Data Scientist · Mexico City",
      hero_h1: "I build <span class=\"g\">LLM agents, RAG pipelines and ML models</span> that solve real business problems.",
      hero_lede: "Conversational agents with persistent memory, corrective RAG, credit scoring, and anomaly detection. Portfolio with public repos, real metrics, and <b>1,200+ automated tests</b>.",
      hero_cta1: "View what I build →",
      hero_cta2: "Let's talk",
      hero_m1: "automated tests",
      hero_m2: "detection in benchmark (Momus)",
      hero_m3: "AUROC credit scoring",
      hero_m4: "early warning (NEURAL-RMF)",
      chip1a: "Platforms",
      chip2a: "Research",
      chip3a: "Portfolio",
      about_kick: "Who I am",
      about_h2: "AI Engineer & Data Scientist building <span class=\"g\">agents, RAG and ML</span> with real metrics.",
      about_p1: "I'm <b>Gustavo Maldonado</b>, AI Engineer & Data Scientist in Mexico City. I build LLM agents with persistent memory, corrective RAG pipelines, and ML models applied to real cases: credit scoring, fraud detection, and graph anomaly detection.",
      about_p2: "I integrate security-by-design in every project —Bandit SAST, non-root Docker, CI/CD, NIST AC-6— and I run my own research: early warning for epileptic crises (NEURAL-RMF) and seismic detection (EQ-RMF).",
      about_c1t: "LLM Agents",
      about_c1s: "LangGraph, episodic memory, Tool Calling, MCP, ReAct",
      about_c2t: "RAG & Data",
      about_c2s: "CRAG, Qdrant, embeddings, Graph RAG, MLflow",
      about_c3t: "Machine Learning",
      about_c3s: "PyTorch, LightGBM, scikit-learn, scoring, anomalies",
      about_c4t: "Research",
      about_c4s: "NEURAL-RMF · EQ-RMF · quaternionic RMF",
      stack_kick: "Technical stack",
      stack_h2: "Technologies I <span class=\"g\">build and deploy with</span>.",
      proj_kick: "Projects",
      proj_h2: "Agents, RAG and ML <span class=\"g\">with real metrics</span> in my portfolio.",
      proj_lede: "AI systems with full ownership, published metrics, and test suites. Every action with traceability.",
      proj_more_kick: "More solutions",
      res_kick: "Research",
      res_h2: "Original mathematical architectures <span class=\"g\">in resonant memory fields.</span>",
      res_lede: "Unsupervised monitoring systems built on the RMF framework — quaternionic oscillators on S³. Published preprint and distributed code.",
      logr_kick: "Milestones & certifications",
      logr_h2: "Milestones that <span class=\"g\">back the work</span>.",
      cta_kick: "Contact",
      cta_h2: "Shall we build <span class=\"g\">the next system</span>?",
      cta_lede: "If you need AI security, data analytics, or production LLM agents, let's talk.",
      cta_btn: "Write to me →"
    }
  };

  /* ---------------- data ---------------- */
  var MARQUEE = ["Agentes LLM", "RAG Correctivo", "LangGraph", "Machine Learning", "Detección de anomalías en grafos", "MLflow", "MCP", "Tool Calling", "Scoring crediticio", "Automatización", "PyTorch", "NLP", "Embeddings"];

  var STACK = [
    { es: { t: "IA Generativa y LLMs", tags: ["LLM", "RAG", "CRAG", "LangGraph", "LangChain", "OpenAI", "Claude", "Gemini", "Ollama", "Qdrant", "ChromaDB", "Tool Calling", "Prompt Engineering", "MCP Server"] },
      en: { t: "Generative AI & LLMs", tags: ["LLM", "RAG", "CRAG", "LangGraph", "LangChain", "OpenAI", "Claude", "Gemini", "Ollama", "Qdrant", "ChromaDB", "Tool Calling", "Prompt Engineering", "MCP Server"] } },
    { es: { t: "ML, NLP y Grafos", tags: ["Python 3.12", "PyTorch", "scikit-learn", "LightGBM", "K-Means", "Isolation Forest", "GNN (S³)", "Anomaly Detection", "NLP", "MLflow"] },
      en: { t: "ML, NLP & Graphs", tags: ["Python 3.12", "PyTorch", "scikit-learn", "LightGBM", "K-Means", "Isolation Forest", "GNN (S³)", "Anomaly Detection", "NLP", "MLflow"] } },
    { es: { t: "Datos e Infraestructura", tags: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "FastAPI", "N8N", "Pydantic", "Power BI", "Prometheus", "Grafana", "Bandit SAST"] },
      en: { t: "Data & Infrastructure", tags: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "FastAPI", "N8N", "Pydantic", "Power BI", "Prometheus", "Grafana", "Bandit SAST"] } },
    { es: { t: "Cloud y DevOps", tags: ["GCP Vertex AI", "AWS S3", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "FastAPI", "PostgreSQL", "Redis"] },
      en: { t: "Cloud & DevOps", tags: ["GCP Vertex AI", "AWS S3", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "FastAPI", "PostgreSQL", "Redis"] } }
  ];

  var FLAGSHIP = [
    {
      n: "01", badge: "Autonomous Dev", cat: "Agentes · IA",
      es: { t: "Sofos", tagline: "Co-desarrollador autónomo: describes tu idea y Sofos genera la aplicación completa.",
        m: "19 agentes · 17 nodos · 126 tests", b1: "Sistema multi-agente orquestado en LangGraph que convierte una descripción en lenguaje natural (o un spec JSON) en un proyecto fullstack listo para ejecutar: PostgreSQL con migraciones, API REST en FastAPI, frontend React, Docker Compose y tests.",
        b2: "War Room con memoria semántica y episódica, router de modelos LLM, edición incremental de proyectos vía architecture.json e integración con Momus QA que bloquea entregas con hallazgos BLOCKER. CI y export de datasets QLoRA." },
      en: { t: "Sofos", tagline: "Autonomous co-developer: describe your idea and Sofos builds the whole app.",
        m: "19 agents · 17 nodes · 126 tests", b1: "Multi-agent system orchestrated with LangGraph that turns a natural-language description (or a JSON spec) into a runnable fullstack project: PostgreSQL with migrations, FastAPI REST API, React frontend, Docker Compose, and tests.",
        b2: "War Room with semantic and episodic memory, an LLM model router, incremental project editing via architecture.json, and Momus QA integration that blocks deliveries on BLOCKER findings. CI and QLoRA dataset export." },
      tech: ["Python 3.12", "LangGraph", "Ollama", "FastAPI", "React", "Docker", "Qdrant"]
    },
    {
      n: "02", badge: "QA Autónomo", cat: "Agentes · Seguridad",
      es: { t: "Momus", tagline: "Agente de QA autónomo: detecta vulnerabilidades en APIs con 6/6 en benchmark.",
        m: "6/6 bugs · 163 tests", b1: "Script/agente Python que consume la spec OpenAPI de una API y ejecuta pruebas conversacionales autónomas detectando auth bypass, IDOR, race conditions y SQLi. PoC de validación automática de APIs REST.",
        b2: "6/6 bugs detectados autónomamente vs 0/6 en revisión manual. Multi-proveedor LLM con fallback. Integrado como gate de calidad en Sofos." },
      en: { t: "Momus", tagline: "Autonomous QA agent: detects API vulnerabilities with 6/6 in benchmark.",
        m: "6/6 bugs · 163 tests", b1: "Python script/agent that consumes an API's OpenAPI spec and runs autonomous conversational tests detecting auth bypass, IDOR, race conditions, and SQLi. PoC for automatic REST API validation.",
        b2: "6/6 bugs detected autonomously vs 0/6 in manual review. Multi-provider LLM with fallback. Integrated as a quality gate inside Sofos." },
      tech: ["Python", "LangGraph", "Claude API", "Ollama", "FastAPI", "pytest", "REST APIs"]
    },
    {
      n: "03", badge: "RAG Empresarial", cat: "RAG · ML",
      es: { t: "Resonance Engine", tagline: "RAG correctivo con reentrenamiento automático y ciclo cerrado de ML en producción.",
        m: "What-If <2s · cobertura >80%", b1: "Plataforma RAG empresarial con CRAG correctivo sobre Qdrant — respuestas siempre citadas, nunca alucinadas. Ciclo cerrado de ML: modelo LightGBM se retrain automáticamente cuando mejora su AUC en producción.",
        b2: "What-If Simulator con latencia <2s. Cobertura >80% en módulos core. Prometheus + Grafana integrados para observabilidad continua." },
      en: { t: "Resonance Engine", tagline: "Corrective RAG with automatic retraining and closed-loop ML in production.",
        m: "What-If <2s · coverage >80%", b1: "Enterprise RAG platform with CRAG over Qdrant — answers always cited, never hallucinated. Closed-loop ML: LightGBM model retrains automatically when its AUC improves in production.",
        b2: "What-If Simulator with <2s latency. >80% coverage on core modules. Prometheus + Grafana integrated for continuous observability." },
      tech: ["Python", "LangGraph", "Qdrant", "LightGBM", "FastAPI", "PostgreSQL", "Redis", "MLflow"]
    },
    {
      n: "04", badge: "Graph ML", cat: "Fraude · Grafos",
      es: { t: "Helix (GFCN)", tagline: "Detección de anomalías en grafos sobre la esfera cuaterniónica S³ para fraude financiero.",
        m: "AUC 0.9647 · AMLSim", b1: "Cada nodo recibe una rotación en S³: los nodos ilícitos generan patrones geométricos distinguibles (torque, inestabilidad, desviación). Selección automática de modelo (Helix/SAGE/GCN/MLP) por densidad del grafo.",
        b2: "NEXUS y SONAR: scoring semi-supervisado que propaga riesgo desde semillas confirmadas sin reentrenamiento. AUC 0.9624 (Elliptic), 0.9565 (PaySim), 0.8899 (NF-UQ-NIDS)." },
      en: { t: "Helix (GFCN)", tagline: "Graph anomaly detection over the unit quaternion sphere S³ for financial fraud.",
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
    { es: { t: "Pharma-Agent-Stack", d: "Automatización de pedidos farmacéuticos con RAG empresarial (LangGraph, Gemini, Vertex AI Vector Search). Doble modo: nube o on-premise para datos sensibles." },
      en: { t: "Pharma-Agent-Stack", d: "Pharmaceutical order automation with enterprise RAG (LangGraph, Gemini, Vertex AI Vector Search). Dual mode: cloud or on-premise for sensitive data." }, tag: "RAG · Agentes", link: "https://github.com/Gusmal02/pharma-agent-stack" },
    { es: { t: "Fraude IEEE-CIS", d: "Fraude en e-commerce (IEEE-CIS): arquitectura neuro-simbólica en 3 capas (Isolation Forest + LightGBM) para minimizar falsos positivos." },
      en: { t: "IEEE-CIS Fraud", d: "E-commerce fraud (IEEE-CIS): 3-layer neuro-symbolic architecture (Isolation Forest + LightGBM) to minimize false positives." }, tag: "Fraude · ML", link: "https://github.com/Gusmal02/prevencion-fraude-neurosimbolico" },
    { es: { t: "AML Monitor", d: "Pipeline AML/CFT de monitoreo transaccional: capas basadas en reglas + K-Means no supervisado + DevSecOps con tests y CI." },
      en: { t: "AML Monitor", d: "AML/CFT transaction monitoring pipeline: rule-based layers + unsupervised K-Means + DevSecOps with tests and CI." }, tag: "AML · Fintech", link: "https://github.com/Gusmal02/prevencion_lavado_dinero" }
  ];

  var RESEARCH = [
    {
      key: "neural",
      es: {
        t: "NEURAL-RMF",
        sub: "Alerta temprana de crisis epilépticas · Preprint publicado",
        desc: "Sistema de monitoreo EEG sin entrenamiento supervisado basado en el framework de Campo de Memoria Resonante. Construye una referencia de estado basal y observa cómo la actividad posterior se desvía de ella. Salida comunicada como semáforo de riesgo: verde · amarillo · naranja · rojo.",
        metrics: ["66/66 crisis detectadas", "4 electrodos bilaterales temporales", "67–88 min de anticipación", "CHB-MIT + Siena Scalp EEG"],
        status: "Preprint publicado · Librería Python"
      },
      en: {
        t: "NEURAL-RMF",
        sub: "Epileptic seizure early warning · Published preprint",
        desc: "Unsupervised EEG monitoring system based on the Resonant Memory Field framework. Builds an eight-minute basal reference and observes how subsequent activity departs from it. Output communicated as a risk traffic-light: green · yellow · orange · red.",
        metrics: ["66/66 seizures detected", "4 bilateral temporal electrodes", "67–88 min advance warning", "CHB-MIT + Siena Scalp EEG"],
        status: "Published preprint · Python library"
      },
      doi: "https://doi.org/10.5281/zenodo.22950874",
      pdf: "papers/NEURAL_RMF_preprint_EN.pdf",
      repo: "https://github.com/Gusmal02/NEURAL-RMF"
    },
    {
      key: "eq",
      es: {
        t: "EQ-RMF",
        sub: "Monitoreo sísmico de estado · Software de investigación",
        desc: "Software de monitoreo sísmico por estación basado en RMF. Convierte ventanas continuas de forma de onda en una trayectoria de estado interpretable: cambio relativo al basal, persistencia, acuerdo entre estaciones y familia de trayectoria candidata. Orientado a revisión científica retrospectiva.",
        metrics: ["Ratios pre-6h hasta 222×", "10 eventos M6.8–M8.3", "SSE/ETS en Guerrero, Nankai, Cascadia", "Binario compilado · API pública Python"],
        status: "Software de investigación · Engine cerrado"
      },
      en: {
        t: "EQ-RMF",
        sub: "Seismic state monitoring · Research software",
        desc: "Station-calibrated seismic monitoring software based on RMF. Turns continuous waveform windows into an interpretable state trajectory: baseline-relative change, persistence, station agreement, and candidate trajectory family. Intended for retrospective scientific review.",
        metrics: ["Pre-6h ratios up to 222×", "10 events M6.8–M8.3", "SSE/ETS in Guerrero, Nankai, Cascadia", "Compiled binary · Public Python API"],
        status: "Research software · Closed engine"
      },
      repo: "https://github.com/Gusmal02/EQ-RMF"
    }
  ];

  var STATS = [
    { es: { v: "0.9958", l: "AUROC scoring crediticio" }, en: { v: "0.9958", l: "AUROC credit scoring" } },
    { es: { v: "1,200+", l: "tests automatizados" }, en: { v: "1,200+", l: "automated tests" } },
    { es: { v: "6/6", l: "detección en benchmark (Momus)" }, en: { v: "6/6", l: "detection in benchmark (Momus)" } },
    { es: { v: "66/66", l: "crisis detectadas · preprint NEURAL-RMF (Zenodo)" }, en: { v: "66/66", l: "seizures detected · NEURAL-RMF preprint (Zenodo)" } }
  ];

  var LOGROS = [
    { cat: "CARRERA", es: { t: "Técnico de Soporte TI y Servicios Informáticos", d: "Creative Service · Jun 2009 – Actualidad. Gestión de entornos Windows, Linux y macOS en 500+ equipos con integración de herramientas de IA generativa." },
      en: { t: "IT Support Technician & IT Services", d: "Creative Service · Jun 2009 – Present. Managing Windows, Linux, and macOS environments across 500+ endpoints with generative AI tooling integration." } },
    { cat: "INVESTIGACIÓN", es: { t: "NEURAL-RMF — Preprint publicado en Zenodo", d: "Sistema sin entrenamiento de alerta temprana de crisis epilépticas: 66/66 crisis detectadas, 4 electrodos, 67–88 min de anticipación (CHB-MIT + Siena). DOI: 10.5281/zenodo.22950874." },
      en: { t: "NEURAL-RMF — Preprint published on Zenodo", d: "Zero-training early-warning system for epileptic seizures: 66/66 detected, 4 electrodes, 67–88 min advance (CHB-MIT + Siena). DOI: 10.5281/zenodo.22950874." } },
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

  function renderResearch() {
    var wrap = document.getElementById("researchGrid");
    if (!wrap) return;
    var html = "";
    RESEARCH.forEach(function (r) {
      var d = r[lang];
      var metrics = d.metrics.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("");
      var links = "";
      if (r.pdf) links += "<a class=\"rbtn rbtn-primary\" href=\"" + r.pdf + "\" target=\"_blank\" rel=\"noopener\">" + (lang === "es" ? "Leer preprint ↗" : "Read preprint ↗") + "</a>";
      if (r.doi) links += "<a class=\"rbtn\" href=\"" + r.doi + "\" target=\"_blank\" rel=\"noopener\">DOI ↗</a>";
      if (r.repo) links += "<a class=\"rbtn\" href=\"" + r.repo + "\" target=\"_blank\" rel=\"noopener\">GitHub ↗</a>";
      html += "<div class=\"rcard reveal\">" +
        "<div class=\"rcard-head\"><h3>" + esc(d.t) + "</h3><span class=\"rstatus\">" + esc(d.status) + "</span></div>" +
        "<p class=\"rsub\">" + esc(d.sub) + "</p>" +
        "<p class=\"rdesc\">" + esc(d.desc) + "</p>" +
        "<ul class=\"rmetrics\">" + metrics + "</ul>" +
        "<div class=\"rlinks\">" + links + "</div>" +
        "</div>";
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
    renderResearch();
    renderStats();
    renderLogros();
    renderMarquee();
  }

  /* ---------------- terminal ---------------- */
  var TERM = [
    { cmd: "whoami", out: "ai-engineer-data-scientist" },
    { cmd: "cat stack.txt", out: "Python · LangGraph · PyTorch · Qdrant · MLflow · MCP" },
    { cmd: "ls projects/", out: "sofos  momus  resonance-engine  helix  credit-behavior-engine" },
    { cmd: "./run sofos --build-app", out: "[OK] 126 tests · fullstack generated · CI/CD ready", ok: true },
    { cmd: "./run credit-behavior-engine --score", out: "[OK] AUROC 0.9958 · Recall 100% · 96k clientes", ok: true }
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
  var mouse = { x: -1e4, y: -1e4, active: false };
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
      ctx.fillStyle = "rgba(167,11,40,.65)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      for (var j = i + 1; j < parts.length; j++) {
        var q = parts[j];
        var dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
        if (d2 < 12000) {
          var a = 1 - d2 / 12000;
          ctx.strokeStyle = "rgba(217,67,79," + (a * .28) + ")";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
      if (mouse.active) {
        var dmx = p.x - mouse.x, dmy = p.y - mouse.y, dm2 = dmx * dmx + dmy * dmy;
        if (dm2 < 18000) {
          var am = 1 - dm2 / 18000;
          ctx.strokeStyle = "rgba(217,67,79," + (am * .5) + ")";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
    if (mouse.active) {
      ctx.fillStyle = "rgba(217,67,79,.9)";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
      ctx.fill();
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
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      glow.style.opacity = "1";
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
    document.addEventListener("mouseleave", function () { mouse.active = false; });

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

  /* ---------------- mailto: copiar email + abrir cliente ---------------- */
  function wireMailto() {
    var email = "gustavo.a.maldonado.v@gmail.com";
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var open = function () { window.location.href = "mailto:" + email; };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(open, open);
        } else {
          open();
        }
      });
    });
  }

  /* ---------------- init ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    lang = localStorage.getItem("gm-lang") || "es";
    renderAll();
    initEffects();
    animateTerminal();
    wireMailto();
    document.getElementById("langToggle").addEventListener("click", function () {
      lang = lang === "es" ? "en" : "es";
      localStorage.setItem("gm-lang", lang);
      renderAll();
    });
  });
})();