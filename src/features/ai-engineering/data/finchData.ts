export interface FinchMetric {
  value: string;
  label: string;
  detail: string;
  methodology?: string;
}

export interface FinchPillar {
  id: string;
  tag: string;
  title: string;
  techSubtitle: string;
  description: string;
  metrics: string;
}

export interface FinchTradeoff {
  tag: string;
  title: string;
  decision: string;
  tradeoff: string;
  mitigation: string;
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
  badge: "Caso de Estudio & Arquitectura de IA",
  title: "Ingeniería de IA & Sistemas Cognitivos",
  projectTitle: "FINCH | Núcleo Cognitivo Personal",
  lead: "Un motor local y privado de memoria a largo plazo que asimila tanto conocimiento de ciencias exactas e ingenierías como reglas de arquitectura de software.",
  description:
    "Conectado mediante mi propio servidor MCP (compatible con Claude Desktop, Cursor, VS Code y Antigravity), Finch indexa bibliografía técnica (PDF, DOCX, Markdown) y 23+ repositorios locales, rastrea qué decisión reemplazó a cuál (v1 ➔ v2) y propaga contexto relevante.",
  cta: {
    href: "/finch",
    label: "Explorar Caso de Estudio & Arquitectura",
    ariaLabel: "Abrir el caso de estudio completo y arquitectura de ingeniería de Finch",
  },
  metrics: [
    {
      value: "< 1 ms",
      label: "Latencia en Grafo Local",
      detail: "Producto punto L2 en 64-D (243 nodos / 626 aristas) · Escala a HNSW",
    },
    {
      value: "626+",
      label: "Conexiones Asociativas",
      detail: "Aristas ponderadas con propagación BFS a 2 saltos (α = 0.65)",
    },
    {
      value: "243+",
      label: "Nodos de Conocimiento",
      detail: "Ciencias exactas, ingeniería y 23 repositorios con linaje v1 ➔ v2",
    },
    {
      value: "14 Suites",
      label: "Validación Determinista",
      detail: "Tests E2E sobre resolución de conflictos y bloqueo de alucinaciones",
    },
  ] satisfies FinchMetric[],
  quickTimeline: [
    {
      version: "v1.0",
      name: "Persistencia Dual & MCP",
      desc: "Separación SQLite ACID (Semántico vs. Episódico), linaje v1 ➔ v2 y servidor MCP.",
    },
    {
      version: "v2.0",
      name: "Espacio 64-D & Batch REM",
      desc: "Vectores L2 de 64 dimensiones, bucle ReAct, consolidación batch y validador.",
    },
    {
      version: "v2.2",
      name: "Grafo, Decaimiento & Libros",
      desc: "Spreading Activation, decaimiento exponencial, ingesta PDF/DOCX y CLI nativa.",
    },
  ],
};

export const finchPageData = {
  hero: {
    badge: "INGENIERÍA DE IA · MCP ENGINE v2.2",
    title: "FINCH",
    subtitle: "Núcleo Cognitivo Personal",
    leadBefore: "Creé a ",
    leadHighlight: "Finch",
    leadAfter:
      " como una herramienta real para mi día a día. Quería un motor local y privado que funcionara como memoria a largo plazo: capaz de asimilar tanto conocimiento puro de ciencias exactas e ingeniería (libros, papers y apuntes) como mis reglas de arquitectura de software, sabiendo qué decisión reemplazó a cuál (v1 → v2) y conectándose mediante mi propio servidor MCP a cualquier entorno que use hoy o mañana.",
  },
  telemetry: {
    sectionTag: "00 · TELEMETRÍA, METODOLOGÍA & INTEROPERABILIDAD",
    title: "Métricas Respaldadas por Pruebas y Escalabilidad",
    methodologyNote:
      "Metodología de medición: Latencias registradas en memoria sobre el grafo activo de producción personal (243 nodos y 626 aristas extraídos de 23 repositorios y bibliografía técnica). En búsqueda lineal O(N) con vectores normalizados L2 de 64-D, el tiempo de respuesta se mantiene < 0.8 ms (y < 5 ms hasta ~15.000 nodos en RAM). Para corpus de 100k+ fragmentos documentales, el puerto IVectorRepository conmuta al adaptador PostgreSQL 16 (pgvector con índice HNSW, m = 16, ef_construction = 64) manteniendo consultas logarítmicas en < 10 ms. Validado mediante 14 suites de pruebas deterministas.",
    mcpClientsLabel: "Estándar Abierto MCP (JSON-RPC 2.0 stdio) — Compatible con:",
    mcpClients: [
      "Claude Desktop",
      "Cursor IDE",
      "VS Code (Copilot / Cline)",
      "Antigravity IDE",
      "Windsurf",
      "Terminal CLI Nativa",
    ],
  },
  origin: {
    sectionTag: "01 · EL PROBLEMA & EJECUCIÓN EN VIVO",
    title: "Superando la Amnesia de Contexto en Ciencia e Ingeniería",
    lead: "Los modelos de lenguaje tradicionales operan con ventanas efímeras: al cerrar la sesión olvidan tus invariantes de diseño, mezclan apuntes o fórmulas con versiones obsoletas y carecen de trazabilidad sobre qué fuente respalda cada afirmación.",
    comparison: [
      {
        type: "LLM Convencional / RAG Estándar",
        flaws: [
          "Ventana efímera: cada sesión nueva desconoce la evolución histórica de tus proyectos.",
          "Chunking sin versionado: mezcla reglas deprecadas (v1) con decisiones vigentes (v2).",
          "Falta de conexiones transversales: no vincula un principio matemático o físico con el módulo de código que lo implementa.",
          "Sin validación determinista: puede inventar citas de página o cifras con apariencia plausible.",
        ],
      },
      {
        type: "Núcleo Cognitivo FINCH v2.2",
        strengths: [
          "Persistencia Dual ACID (Hipocampo): separa Estado Semántico mutable (v1 ➔ v2) de Eventos Episódicos inmutables.",
          "Grafo Asociativo (Spreading Activation): propaga contexto a 2 saltos sobre 626+ aristas en < 1 ms.",
          "Gestión Temporal (Ebbinghaus & LTP): decaimiento exponencial de nodos inactivos y refuerzo de pesos por frecuencia de uso.",
          "Validador Determinista Anti-Alucinación: verifica cifras y fuentes antes de devolver contexto al cliente MCP.",
        ],
      },
    ],
    terminalDemo: {
      title: "Demostración de Flujo en Terminal & Servidor MCP",
      commands: [
        {
          cmd: "$ finch learn-file ./docs/algebra-lineal-espacios-l2.pdf --category exact-sciences",
          output: [
            "✓ [Ingestor] PDF procesado: 18 páginas extraídas con atribución exacta.",
            "✓ [64-D Engine] 12 nodos conceptuales proyectados en hiperesfera unitaria L2.",
            "✓ [Synaptic Graph] 28 aristas creadas (vinculado con: 'pgvector-hnsw', 'cosine-similarity').",
          ],
        },
        {
          cmd: '$ finch ask "¿Cuál es la regla vigente para manejo de estado y cómo se relaciona con el cálculo vectorial?"',
          output: [
            "⚡ [Spreading Activation] 0.62 ms · 2 saltos (α = 0.65) · 4 nodos activados:",
            "  • [VIGENTE v2] ADR-014: Arquitectura Hexagonal con estado desacoplado (reemplazó a v1 Redux en oct-2026).",
            "  • [CIENCIAS EXACTAS] algebra-lineal-espacios-l2.pdf (Pág. 7): Normalización L2 para equivalencia entre producto punto y similitud coseno.",
            "✓ [Eval Guardrail] PASS · 0 contradicciones activas · Fuerza sináptica actualizada (+0.15 LTP).",
          ],
        },
      ],
    },
  },
  pillars: {
    sectionTag: "02 · ARQUITECTURA HEXAGONAL & MOTOR INTERNO",
    title: "Puertos, Adaptadores e Ingeniería Neuro-Simbólica",
    subtitle:
      "Construido con Arquitectura Hexagonal y principios de Clean Architecture (Puertos y Adaptadores en Python 3.12+), desacoplando el núcleo matemático y de grafos de los adaptadores de almacenamiento e interfaz.",
    diagram: {
      clients: ["Claude Desktop", "Cursor / VS Code", "Antigravity IDE", "CLI (`finch`)"],
      transport: "Servidor MCP Propio (JSON-RPC 2.0 Stdio) & CLI Controller",
      useCases: [
        "IngestKnowledgeUseCase",
        "SpreadingActivationQuery",
        "ConflictResolution (v1➔v2)",
        "BatchConsolidation (REM)",
      ],
      ports: [
        "IMemoryRepository",
        "ISynapseVectorEngine",
        "IGraphTraversalPort",
        "IDocumentParserPort",
      ],
      adapters: [
        "SQLite ACID (Local Dual DB)",
        "PostgreSQL + pgvector (HNSW)",
        "64-D L2 Hashing Engine",
        "PDF / DOCX / AST Parsers",
      ],
    },
    items: [
      {
        id: "hippocampus",
        tag: "PERSISTENCIA DUAL ACID",
        title: "Hipocampo Semántico / Episódico",
        techSubtitle: "Término técnico: Almacenamiento Transaccional Separado con Linaje v1 ➔ v2",
        description:
          "Divide la base de datos SQLite en dos estructuras: una tabla de Hechos Semánticos (estado actual mutable) y un Log Episódico (eventos históricos inmutables). Cuando una decisión evoluciona, depreca el nodo v1 mediante un puntero `superseded_by` y promueve v2 como única verdad activa.",
        metrics: "Transacciones ACID · Trazabilidad completa en Audit Log",
      },
      {
        id: "hypersphere",
        tag: "ÁLGEBRA VECTORIAL 64-D",
        title: "Sinapsis en Hiperesfera L2",
        techSubtitle: "Término técnico: Feature Hashing Firmado de N-Gramas + Clústeres de Dominio",
        description:
          "Proyecta conceptos sobre una hiperesfera unitaria de 64 dimensiones combinando 16 dimensiones de anclaje semántico (ingeniería, ciencias exactas, arquitectura) y 48 canales de hashing neuronal firmado con n-gramas de caracteres, calculando similitud coseno mediante producto punto directo.",
        metrics: "64 Dimensiones L2 · < 0.8 ms en CPU local · $0 API Cost",
      },
      {
        id: "spreading-activation",
        tag: "TEORÍA DE GRAFOS",
        title: "Grafo Sináptico & Spreading Activation",
        techSubtitle: "Término técnico: Búsqueda en Anchura Ponderada (Weighted BFS) a 2 Saltos",
        description:
          "Modela el conocimiento como un grafo dirigido con aristas tipadas (`USES_TECH`, `FOLLOWS_PATTERN`, `PROVES_THEOREM`, `EVOLVED_FROM`). Al consultar un nodo, la activación se propaga hasta 2 saltos con factor de atenuación α = 0.65 para recuperar contexto relacionado implícitamente.",
        metrics: "626+ Aristas Ponderadas · Decaimiento espacial α = 0.65",
      },
      {
        id: "ebbinghaus-ltp",
        tag: "GESTIÓN DE CACHÉ Y PESOS",
        title: "Curva de Ebbinghaus & LTP Hebbiano",
        techSubtitle: "Término técnico: TTL con Decaimiento Exponencial y Re-ponderación por Frecuencia",
        description:
          "Calcula la relevancia temporal de cada nodo con la función exponencial R = exp(-λ · Δt / S). Cada vez que un concepto es utilizado útilmente en una sesión, incrementa su estabilidad S (+0.15), reduciendo su tasa de decaimiento frente a datos transitorios.",
        metrics: "Fórmula R = e^(-λΔt/S) · Priorización dinámica de contexto",
      },
      {
        id: "ingestor",
        tag: "PIPELINE ETL DOCUMENTAL",
        title: "Ingestor de Bibliografía & Código",
        techSubtitle: "Término técnico: Extracción Estructurada PDF, DOCX (XML), Markdown y AST",
        description:
          "Pipeline determinista que procesa libros de ciencias exactas e ingeniería en PDF (preservando número de página), documentos Word (.docx vía árbol XML), apuntes Markdown y estructuras de repositorios para transformarlos en nodos verificables.",
        metrics: "Soporte PDF / DOCX / MD / Repos · Citación exacta de página",
      },
      {
        id: "react-judge",
        tag: "CONSOLIDACIÓN & GUARDRAILS",
        title: "Córtex ReAct, Sueño REM & Juez",
        techSubtitle: "Término técnico: Orquestador Paso a Paso, Compresión Batch Offline y Validador",
        description:
          "Expone 9 herramientas vía protocolo MCP. El proceso de 'Sueño REM' es un worker batch offline que agrupa episodios recientes, elimina redundancias y consolida reglas, mientras un validador determinista audita que ninguna cifra contradiga los nodos fuente.",
        metrics: "9 Herramientas MCP · Validación determinista pre-respuesta",
      },
    ] satisfies FinchPillar[],
  },
  tradeoffs: {
    sectionTag: "03 · INGENIERÍA REAL: DECISIONES, LÍMITES & TRADE-OFFS",
    title: "Por Qué Diseñé Finch Así (y Qué No Resuelve Todavía)",
    subtitle:
      "Toda arquitectura de software implica compromisos. Estas son las decisiones técnicas deliberadas detrás de Finch v2.2 y sus límites actuales.",
    items: [
      {
        tag: "TRADE-OFF 01 · VECTORES LOCALES VS. TRANSFORMERS",
        title: "¿Por qué Hashing de 64-D en vez de Embeddings de 1536-D (OpenAI / Gemini)?",
        decision:
          "Elegí proyección local de 64-D (16 clústeres + 48 canales de hashing firmado de n-gramas) para lograr 0 ms de latencia de red, costo $0 perpetuo, < 5 MB de RAM y privacidad absoluta offline.",
        tradeoff:
          "Pierde sensibilidad ante sinónimos amplios en lenguaje coloquial o paráfrasis abstractas que un modelo denso de 1536 dimensiones capturaría fácilmente.",
        mitigation:
          "En dominios técnicos (matemática, física, código y arquitectura), la terminología es precisa y el grafo de Spreading Activation compensa la brecha semántica conectando conceptos por topología.",
      },
      {
        tag: "TRADE-OFF 02 · ESCALABILIDAD EN RAM VS. DISCO",
        title: "Búsqueda Lineal O(N) en SQLite frente a Índices HNSW",
        decision:
          "Para un segundo cerebro personal (de cientos a ~15.000 nodos), cargar la matriz normalizada en memoria y calcular el producto punto tarda menos de 1 ms sin requerir infraestructura de contenedores activa.",
        tradeoff:
          "A partir de ~50.000–100.000 fragmentos (por ejemplo, al indexar decenas de libros completos), el escaneo lineal O(N) degrada la latencia por encima de los 15-20 ms.",
        mitigation:
          "Gracias a la Arquitectura Hexagonal, el puerto `IVectorRepository` permite conmutar al adaptador PostgreSQL + `pgvector` con índice HNSW (`O(log N)`) sin tocar una sola línea del dominio.",
      },
      {
        tag: "LÍMITES ACTUALES · ROADMAP DE MEJORA",
        title: "Qué NO resuelve todavía la versión v2.2",
        decision:
          "Prioricé la estabilidad transaccional del grafo, la resolución de contradicciones v1 ➔ v2 y el estándar MCP sobre la automatización en segundo plano.",
        tradeoff:
          "1) La actualización ante nuevos commits requiere ejecutar `finch scan` o invocar la herramienta MCP (aún no hay daemon de filesystem watcher continuo). 2) El parser de PDF extrae texto digital pero no incluye OCR pesado para libros escaneados como imagen ni parseo LaTeX complejo en tablas anidadas.",
        mitigation:
          "Planificado para la Fase 2.5/3.0 mediante watchers livianos en Rust y extracción incremental.",
      },
    ] satisfies FinchTradeoff[],
  },
  changelog: {
    sectionTag: "04 · LÍNEA DE TIEMPO EVOLUTIVA",
    title: "Changelog de Ingeniería (v1.0 ➔ v2.2)",
    subtitle:
      "Registro cronológico de cómo evolucionó Finch desde un almacén transaccional hasta un núcleo cognitivo multidisciplinario.",
    releases: [
      {
        version: "v2.2.0",
        date: "Fase Actual · Producción Local",
        codename: "Synaptic Graph, Exponential Decay & Multi-Format Science Ingestor",
        status: "LATEST RELEASE",
        summary:
          "Implementación del Grafo Asociativo con Spreading Activation (BFS ponderado), modelo matemático de retención exponencial (Ebbinghaus + LTP), ingesta de bibliografía en PDF/DOCX/Markdown y CLI nativa.",
        highlights: [
          {
            title: "Grafo Sináptico & Escáner de Repositorios y Apuntes",
            detail:
              "Indexación de 23 repositorios locales y documentos de ingeniería, generando 243 nodos y 626 aristas con propagación en 2 saltos (α = 0.65).",
          },
          {
            title: "Decaimiento Exponencial (Ebbinghaus) & Refuerzo por Uso (LTP)",
            detail:
              "Cálculo dinámico de retención R = e^(-λΔt/S) y aumento de estabilidad (+0.15) cada vez que un nodo demuestra utilidad en una consulta.",
          },
          {
            title: "Ingestor Multiformato con Atribución de Página",
            detail:
              "Soporte nativo para libros de ciencias exactas e ingeniería en PDF (.pdf con número de página), Word (.docx), Markdown (.md) y repositorios.",
          },
          {
            title: "Working Memory (Modo Sprint) & CLI `finch`",
            detail:
              "Memoria de corto plazo para sesiones intensivas y CLI rápida en terminal (`finch status`, `finch ask`, `finch learn-file`, `finch sprint`).",
          },
        ],
        techStack: [
          "Python 3.12",
          "Weighted BFS Graph",
          "Exponential Decay Math",
          "pypdf & DOCX XML Parser",
          "Native CLI",
        ],
      },
      {
        version: "v2.0.0",
        date: "Fase 2 · Expansión Vectorial",
        codename: "64-D L2 Vector Engine, ReAct Loop & Batch Consolidation",
        status: "CORE ENGINE",
        summary:
          "Transición del motor léxico hacia un espacio vectorial continuo de 64 dimensiones sobre hiperesfera unitaria L2, incorporando razonamiento ReAct y consolidación batch offline (Sueño REM).",
        highlights: [
          {
            title: "Motor Vectorial de 64 Dimensiones (NeuralVectorSynapseEngine)",
            detail:
              "Combinación de 16 clústeres de dominio técnico con 48 canales de feature hashing firmado para recuperar conceptos en < 0.8 ms.",
          },
          {
            title: "Orquestador ReAct (Thought ➔ Action ➔ Observation)",
            detail:
              "Descomposición de consultas complejas, inspección multi-capa de memoria y trazabilidad de cada paso.",
          },
          {
            title: "Job de Consolidación Offline (Sueño REM) & Guardrail",
            detail:
              "Proceso batch que agrupa eventos episódicos por afinidad para sintetizar reglas semánticas permanentes y auditar fidelidad.",
          },
        ],
        techStack: [
          "64-D L2 Hypersphere",
          "ReAct Loop",
          "Offline Batch Consolidation",
          "Deterministic Guardrail",
          "Streamlit Lab UI",
        ],
      },
      {
        version: "v1.0.0",
        date: "Fase 1 · Fundación Hexagonal",
        codename: "Dual ACID Storage, Conflict Lineage (v1➔v2) & Open MCP Server",
        status: "FOUNDATION",
        summary:
          "Creación del núcleo en Arquitectura Hexagonal con separación estricta entre Memoria Semántica y Episódica, resolución de contradicciones (v1 ➔ v2) y servidor Model Context Protocol.",
        highlights: [
          {
            title: "Almacenamiento Dual: Estado Semántico vs. Log Episódico",
            detail:
              "Separación de conceptos y reglas vigentes frente al historial cronológico inmutable sobre SQLite transaccional.",
          },
          {
            title: "Motor de Resolución de Contradicciones (v1 ➔ v2)",
            detail:
              "Deprecación automática de decisiones obsoletas manteniendo el linaje completo (`superseded_by`) en el registro de auditoría.",
          },
          {
            title: "Servidor MCP Multi-Cliente (`finch-brain`)",
            detail:
              "Interfaz estándar JSON-RPC 2.0 compatible con Claude Desktop, Cursor, VS Code y Antigravity IDE.",
          },
        ],
        techStack: [
          "Hexagonal Architecture",
          "SQLite ACID",
          "MCP JSON-RPC 2.0",
          "Python Type Hints",
          "14 Automated Test Suites",
        ],
      },
    ] satisfies FinchRelease[],
  },
  roadmap: {
    sectionTag: "05 · PRÓXIMA FRONTERA",
    title: "Roadmap: Tauri 2.0 Desktop, Polars & Nube Híbrida AWS",
    subtitle:
      "Evolución planificada hacia una interfaz de escritorio nativa en Rust y un motor vectorial híbrido para escalar a millones de fragmentos.",
    items: [
      {
        phase: "FASE 2.5 · DESKTOP NATIVO",
        title: "Finch Desktop en Tauri 2.0 (Rust + React 19 + WebGL)",
        subtitle: "Visualización Interactiva del Grafo en Tiempo Real",
        description:
          "Empaquetado nativo en Rust con Tauri 2.0 (< 25 MB de RAM, arranque instantáneo). Incorpora el grafo 3D en WebGL para visualizar qué nodos de ciencia, ingeniería y código se activan en cada consulta, invocable mediante atajo global.",
        specs: [
          "Tauri 2.0 + Rust Core (< 25 MB RAM)",
          "Visualizador de Spreading Activation en vivo",
          "Atajo global & explorador de linaje v1 ➔ v2",
        ],
      },
      {
        phase: "FASE 3.0 · ANALÍTICA EN RUST",
        title: "Ingesta Masiva & Analítica con Polars",
        subtitle: "PolarsKnowledgeAnalyticsEngine",
        description:
          "Integración de Polars (motor DataFrame en Rust multihilo con SIMD) para auditar el historial de miles de commits, detectar acoplamiento estructural entre módulos y ejecutar la consolidación batch sobre grandes volúmenes documentales en milisegundos.",
        specs: [
          "Polars Rust DataFrames (Apache Arrow)",
          "Detección de acoplamiento y deuda técnica",
          "Procesamiento batch vectorizado por SIMD",
        ],
      },
      {
        phase: "FASE 3.5 · ESCALA HÍBRIDA",
        title: "Inferencia Cuantizada Local (ONNX) + PostgreSQL pgvector",
        subtitle: "HybridVectorSynapseEngine & Cloud Sync",
        description:
          "Adaptador opcional con modelos de embeddings cuantizados (INT8 vía ONNX Runtime) ejecutados localmente en CPU/GPU estándar sin depender de APIs externas, sincronizado con PostgreSQL + pgvector (índice HNSW) en AWS para colecciones de +100k fragmentos.",
        specs: [
          "Inferencia local INT8 vía ONNX Runtime (Offline)",
          "Adaptador PostgreSQL + pgvector con índice HNSW",
          "Sincronización cifrada y jobs de consolidación",
        ],
      },
    ] satisfies FinchRoadmapItem[],
  },
  commercialBridge: {
    sectionTag: "06 · APLICACIÓN EN PRODUCTOS REALES",
    title: "¿Qué Significa Esta Ingeniería para Tu Producto o Equipo?",
    lead: "Finch nació como mi núcleo cognitivo personal, pero los patrones de arquitectura que lo impulsan resuelven los problemas más críticos que enfrentan hoy las empresas al llevar IA a producción:",
    cards: [
      {
        title: "Asistentes y Agentes sin Amnesia",
        description:
          "Diseño sistemas de memoria persistente con resolución de contradicciones (v1 ➔ v2) para que tus agentes corporativos recuerden el contexto de cada cliente y reduzcan hasta un 90% el gasto en tokens.",
      },
      {
        title: "RAG Técnico con Cero Alucinaciones",
        description:
          "Implemento pipelines de recuperación sobre documentación legal, clínica o de ingeniería (PDF/DOCX/SQL) con atribución exacta de página, índices HNSW en pgvector y guardrails deterministas.",
      },
      {
        title: "Integración MCP & Arquitectura Limpia",
        description:
          "Desarrollo servidores Model Context Protocol a medida y backends en Python (FastAPI / Hexagonal Architecture) desacoplados, testeables y listos para escalar sin atarte a un único proveedor de LLM.",
      },
    ],
    primaryCta: {
      label: "Hablemos de tu Proyecto",
      href: "/#contactos",
    },
    secondaryCta: {
      label: "Conectar en LinkedIn",
      href: "https://www.linkedin.com/in/ezequiel-suarez-dev/",
    },
  },
};
