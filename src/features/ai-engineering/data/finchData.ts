export interface FinchMetric {
  value: string;
  label: string;
  detail: string;
}

export interface FinchPillar {
  id: string;
  tag: string;
  title: string;
  description: string;
  metrics: string;
}

export interface FinchRelease {
  version: string;
  date: string;
  codename: string;
  status: string;
  summary: string;
  highlights: {
    title: string;
    detail: string;
  }[];
  techStack: string[];
}

export interface FinchRoadmapItem {
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
}

export const finchShowcaseData = {
  badge: "Caso de Estudio & Changelog de Ingeniería",
  title: "Ingeniería de IA & Sistemas Cognitivos",
  projectTitle: "FINCH | Personal Cognitive & Neural Brain Engine",
  lead: "Cómo diseñé mi propio motor de memoria neuro-simbólica, grafo asociativo y razonamiento ReAct para eliminar la amnesia arquitectónica de los agentes de IA.",
  description:
    "Los LLMs convencionales olvidan decisiones de arquitectura al cerrar la sesión. Finch actúa como un hipocampo artificial conectado vía protocolo MCP a mi entorno de desarrollo: indexa mis 23+ repositorios locales, ingiere libros técnicos en PDF/Word/Markdown con citación de fuente, modela el olvido biológico (Ebbinghaus) y refuerza sinapsis por uso (LTP Hebbiano).",
  cta: {
    href: "/finch",
    label: "Explorar Caso de Estudio & Changelog",
    ariaLabel: "Abrir el caso de estudio completo y changelog de ingeniería de Finch",
  },
  metrics: [
    {
      value: "< 1 ms",
      label: "Latencia Sináptica",
      detail: "Búsqueda en Hiperesfera L2 de 64-D + Spreading Activation",
    },
    {
      value: "626+",
      label: "Sinapsis Activas",
      detail: "Aristas ponderadas con propagación de 2 saltos (α = 0.65)",
    },
    {
      value: "243+",
      label: "Nodos Cognitivos",
      detail: "Reglas de arquitectura, 23 repositorios y literatura técnica",
    },
    {
      value: "100%",
      label: "Fidelidad Verificada",
      detail: "Juez Interno Anti-Alucinación + 14 suites de test deterministas",
    },
  ] satisfies FinchMetric[],
  quickTimeline: [
    {
      version: "v1.0",
      name: "Hipocampo Dual",
      desc: "Memoria Semántica (v1 ➔ v2) + Episódica inmutable en SQLite ACID.",
    },
    {
      version: "v2.0",
      name: "Sinapsis 64-D & ReAct",
      desc: "Hiperesfera L2, Córtex ReAct autónomo, Sueño REM y Juez Interno.",
    },
    {
      version: "v2.2",
      name: "Grafo, LTP & Ingestor",
      desc: "Spreading Activation, Curva de Ebbinghaus, PDF/DOCX/Repos y CLI nativa.",
    },
  ],
};

export const finchPageData = {
  hero: {
    title: "FINCH",
    badge: "INGENIERÍA DE IA · CHANGELOG v2.2",
    subtitle:
      "Motor Cognitivo Personal, Grafo Sináptico Asociativo & Segundo Cerebro Neuro-Simbólico conectado vía Model Context Protocol (MCP).",
  },
  origin: {
    sectionTag: "01 · EL ORIGEN & PROBLEMA CIENTÍFICO",
    title: "Por qué los LLMs sufren de Amnesia Arquitectónica",
    lead: "Cuando escalás un ecosistema de más de 20 proyectos de software, los asistentes de IA tradicionales fallan en tres frentes críticos: olvidan el contexto entre sesiones, contradicen decisiones pasadas y alucinan dependencias.",
    comparison: [
      {
        type: "LLM Convencional / RAG Básico",
        flaws: [
          "Ventana de contexto efímera: al cerrar el chat, tu arquitectura desaparece.",
          "Chunking ciego: mezcla reglas obsoletas (v1) con decisiones vigentes (v2).",
          "Aislamiento entre proyectos: no sabe qué patrones aplicaste en tus otros 22 repositorios.",
          "Sin validación epistémica: responde con alta confianza incluso cuando inventa datos.",
        ],
      },
      {
        type: "Arquitectura Cognitiva FINCH v2.2",
        strengths: [
          "Hipocampo Dual Persistente: separa Hechos Semánticos mutables (v1 ➔ v2) de Eventos Episódicos.",
          "Grafo Sináptico con Spreading Activation: conecta 243+ conceptos y 626+ aristas en < 1 ms.",
          "Plasticidad Biológica: Curva de Olvido de Ebbinghaus + Potenciación a Largo Plazo (LTP Hebbiano).",
          "Juez Interno Anti-Alucinación: audita la fidelidad de cada respuesta antes de emitirla.",
        ],
      },
    ],
  },
  pillars: {
    sectionTag: "02 · EL CORAZÓN TÉCNICO",
    title: "Arquitectura Hexagonal & Neuro-Simbólica",
    subtitle:
      "Construido con Arquitectura Hexagonal y principios de Clean Architecture (Puertos y Adaptadores en Python 3.12+), desacoplando el dominio neuro-cognitivo de la infraestructura de persistencia e inferencia.",
    items: [
      {
        id: "hippocampus",
        tag: "MEMORIA DUAL & ACID",
        title: "Hipocampo Semántico / Episódico con Resolución v1 ➔ v2",
        description:
          "Cuando una preferencia técnica evoluciona (ej. migrar de REST a FastAPI Async o de CSS plano a Sass modular), Finch detecta la colisión semántica, depreca el nodo v1 preservando su trazabilidad histórica y promueve la versión v2 como única fuente de verdad.",
        metrics: "0 contradicciones · Trazabilidad completa en Audit Log",
      },
      {
        id: "hypersphere",
        tag: "ÁLGEBRA VECTORIAL 64-D",
        title: "Sinapsis Neuronal en Hiperesfera L2-Normalizada",
        description:
          "Proyección de recuerdos sobre una hiperesfera continua de 64 dimensiones combinando activación de 16 clústeres de ingeniería de software y 48 canales de hashing neuronal firmado con n-gramas de caracteres, logrando similitud coseno en microsegundos.",
        metrics: "64 Dimensiones L2 · < 0.8 ms por consulta",
      },
      {
        id: "spreading-activation",
        tag: "TEORÍA DE GRAFOS COGNITIVOS",
        title: "Grafo Sináptico & Spreading Activation (2-Hops)",
        description:
          "Inspirado en el modelo de Collins & Loftus: al consultar sobre un proyecto, la energía neuronal se propaga hasta 2 saltos a través de aristas tipadas (USES_TECH, FOLLOWS_PATTERN, EVOLVED_FROM) con factor de decaimiento α = 0.65.",
        metrics: "626+ Sinapsis · 23 Repositorios Mapeados",
      },
      {
        id: "ebbinghaus-ltp",
        tag: "NEUROCIENCIA COMPUTACIONAL",
        title: "Curva de Ebbinghaus & Potenciación Hebbiana (LTP)",
        description:
          "Modelado matemático de retención biológica R = exp(-λ · Δt / S). Cada vez que un recuerdo es evocado en el IDE, se dispara Potenciación a Largo Plazo (LTP): incrementa su fuerza sináptica (+0.15) y reduce su tasa de olvido en un 15%.",
        metrics: "Fórmula R = e^(-λΔt) · Refuerzo Hebbiano automático",
      },
      {
        id: "ingestor",
        tag: "INGESTIÓN MULTIFORMATO",
        title: "Ingestor de Libros PDF, Word (.docx), Markdown & GitHub",
        description:
          "Pipeline de extracción que transforma apuntes de ingeniería en PDF (con número de página), documentos Word (.docx vía parseo XML/ZIP), guías Markdown y repositorios de GitHub en nodos semánticos con atribución exacta de fuente.",
        metrics: "Soporte PDF / DOCX / MD / Web · Citación de fuente",
      },
      {
        id: "react-judge",
        tag: " SEGURIDAD & PROTOCOLO MCP",
        title: "Córtex ReAct, Sueño REM & Juez Anti-Alucinación",
        description:
          "Expuesto como servidor MCP nativo (9 herramientas cognitivas). Incluye consolidación nocturna (Sueño REM que sintetiza episodios en reglas) y un Juez Interno determinista que bloquea cualquier inferencia con Groundedness menor al umbral.",
        metrics: "9 Tools MCP · 100% Faithfulness Score",
      },
    ] satisfies FinchPillar[],
  },
  changelog: {
    sectionTag: "03 · LÍNEA DE TIEMPO EVOLUTIVA",
    title: "Changelog de Ingeniería (v1.0 ➔ v2.2)",
    subtitle:
      "Registro cronológico de cómo evolucionó Finch desde un almacén determinista hasta un motor cognitivo con plasticidad sináptica.",
    releases: [
      {
        version: "v2.2.0",
        date: "Fase Actual · Producción Local",
        codename: "Synaptic Graph, Ebbinghaus LTP & Multi-Format Ingestor",
        status: "LATEST RELEASE",
        summary:
          "Salto hacia la neurociencia computacional aplicada: implementación del Grafo Sináptico con Spreading Activation, plasticidad de Ebbinghaus + LTP Hebbiano, ingestión de documentos PDF/DOCX/Repos y Memoria de Trabajo con CLI nativa.",
        highlights: [
          {
            title: "Grafo Sináptico & Escáner Automático de Repositorios",
            detail:
              "Escaneo autónomo de 23 repositorios locales en software-projects, generando 243 nodos y 626 aristas sinápticas con propagación de activación en 2 saltos (α = 0.65).",
          },
          {
            title: "Curva de Olvido de Ebbinghaus & LTP Hebbiano",
            detail:
              "Cálculo dinámico de retención R = e^(-λΔt) y refuerzo sináptico automático cada vez que un nodo es consultado o actualizado, auditado durante el ciclo de Sueño REM.",
          },
          {
            title: "Ingestor Multiformato con Atribución de Fuente",
            detail:
              "Soporte nativo para libros y apuntes en PDF (.pdf con citación de páginas), Microsoft Word (.docx), Markdown (.md) y repositorios de GitHub (Bulletproof React, entrevistas técnicas).",
          },
          {
            title: "Working Memory (Modo Sprint) & CLI Local `finch`",
            detail:
              "Memoria de corto plazo para sprints activos y CLI rápida en terminal (`finch status`, `finch ask`, `finch learn-file`, `finch sprint`) con respuesta en milisegundos.",
          },
        ],
        techStack: [
          "Python 3.12",
          "Spreading Activation Graph",
          "Ebbinghaus & LTP Math",
          "pypdf & DOCX XML Parser",
          "Native CLI",
        ],
      },
      {
        version: "v2.0.0",
        date: "Fase 2 · Expansión Neuronal",
        codename: "64-D Neural Synapse, ReAct Cortex & REM Consolidation",
        status: "CORE ENGINE",
        summary:
          "Transición del motor léxico hacia un espacio vectorial continuo de 64 dimensiones sobre hiperesfera unitaria L2, incorporando razonamiento autónomo ReAct y consolidación nocturna.",
        highlights: [
          {
            title: "Motor Sináptico de 64 Dimensiones (NeuralVectorSynapseEngine)",
            detail:
              "Combinación de 16 clústeres de arquitectura de software con 48 dimensiones de hashing neuronal firmado para recuperar recuerdos aún sin coincidencia exacta de palabras.",
          },
          {
            title: "Córtex de Razonamiento ReAct (Thought ➔ Action ➔ Observation)",
            detail:
              "Agente que descompone consultas complejas de ingeniería, inspecciona múltiples capas de memoria y traza cada paso lógico.",
          },
          {
            title: "Consolidación Nocturna (Sueño REM) & Juez Anti-Alucinación",
            detail:
              "Algoritmo que agrupa memorias episódicas por afinidad temática para sintetizar nuevas reglas semánticas, validado al 100% por el Juez Interno.",
          },
        ],
        techStack: [
          "64-D L2 Hypersphere",
          "ReAct Loop",
          "REM Sleep Worker",
          "Anti-Hallucination Judge",
          "Streamlit Lab UI",
        ],
      },
      {
        version: "v1.0.0",
        date: "Fase 1 · Fundación Cognitiva",
        codename: "Dual Hippocampus, Conflict Resolution & MCP Server",
        status: "FOUNDATION",
        summary:
          "Creación del núcleo de Arquitectura Hexagonal con separación estricta entre Memoria Semántica y Episódica, resolución de conflictos (v1 ➔ v2) y exposición vía Model Context Protocol.",
        highlights: [
          {
            title: "Separación Biológica Semántica vs. Episódica",
            detail:
              "Modelado de hechos arquitectónicos vivos frente a eventos históricos inmutables sobre SQLite transaccional.",
          },
          {
            title: "Motor de Resolución de Conflictos (v1 ➔ v2)",
            detail:
              "Reemplazo automático de reglas obsoletas manteniendo el linaje completo (`superseded_by`) en el registro de auditoría.",
          },
          {
            title: "Servidor Model Context Protocol (`finch-brain`)",
            detail:
              "Integración directa con Antigravity IDE para dotar al asistente de programación de memoria persistente a largo plazo.",
          },
        ],
        techStack: [
          "Hexagonal Architecture",
          "SQLite ACID",
          "MCP JSON-RPC 2.0",
          "Python Type Hints",
          "Unit Test Suite",
        ],
      },
    ] satisfies FinchRelease[],
  },
  roadmap: {
    sectionTag: "04 · PRÓXIMA FRONTERA",
    title: "Roadmap: Tauri 2.0 Desktop, Polars & Nube Híbrida AWS",
    subtitle:
      "La siguiente evolución lleva a Finch desde el entorno local hacia una aplicación nativa ultrarrápida en Rust y un cerebro neuronal híbrido Local + Cloud.",
    items: [
      {
        phase: "FASE 2.5 · DESKTOP NATIVO",
        title: "Finch Desktop en Tauri 2.0 (Rust + React 19 + WebGL)",
        subtitle: "Inspiración visual: Esfera Sináptica 3D Interactiva",
        description:
          "Migración de la interfaz de laboratorio hacia un ejecutable nativo compilado en Rust con Tauri 2.0 (< 25 MB de RAM, arranque en < 50 ms). Incorpora exactamente esta Esfera Sináptica 3D en WebGL (Three.js + GSAP) como núcleo visual interactivo que se ilumina en tiempo real durante cada Spreading Activation, invocable globalmente con Alt + F (estilo Raycast).",
        specs: [
          "Tauri 2.0 + Rust Core (< 25 MB RAM)",
          "Esfera Sináptica 3D WebGL (Nodos Cian + Líneas Hueso)",
          "HotKey Global Alt + F & Split-Panes técnicos",
        ],
      },
      {
        phase: "FASE 3.0 · DATA & TELEMETRÍA EN RUST",
        title: "Motor de Analítica de Código con Polars",
        subtitle: "PolarsCodebaseAnalyticsEngine",
        description:
          "Integración de Polars (motor DataFrame en Rust multihilo con SIMD) para auditar el historial de más de 20.000 commits en mis repositorios, detectar hotspots de deuda técnica (Git Churn) y procesar millones de trazas durante el Sueño REM en milisegundos.",
        specs: [
          "Polars Rust DataFrames (Apache Arrow)",
          "Detección de Git Churn & Hotspots de Arquitectura",
          "Batching ultrarrápido en Sueño REM",
        ],
      },
      {
        phase: "FASE 3.5 · RED NEURONAL HÍBRIDA",
        title: "Inferencia Transformer Local (AVX2 / CUDA) + AWS pgvector",
        subtitle: "LocalTransformerSynapseEngine & Cloud Sync",
        description:
          "Ejecución híbrida optimizada para estación de trabajo local (AMD Ryzen 5 5600 + 24 GB RAM + RTX 3060) mediante ONNX Runtime / FastEmbed en 8-12 ms offline, sincronizada con PostgreSQL + pgvector (índice HNSW) en AWS para acceso 24/7.",
        specs: [
          "Inferencia ONNX en 8-12 ms (Ryzen 5 5600 / RTX 3060)",
          "Amazon RDS / Supabase PostgreSQL + pgvector HNSW",
          "Consolidación nocturna vía AWS EventBridge",
        ],
      },
    ] satisfies FinchRoadmapItem[],
  },
};
