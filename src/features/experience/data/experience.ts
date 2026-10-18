import type { Experience } from "@/features/experience/types/experience";

export const experience: Experience[] = [

  {
    time: "Ene 2026 – Presente",
    role: "Desarrollador de Software",
    company: "Reelify - SaaS en Desarrollo",
    primaryInfo: [
      "Diseño y desarrollo end-to-end de una plataforma SaaS orientada a la automatización de video para redes sociales, con el objetivo de reducir drásticamente costos y tiempos en la producción de contenido."
    ],
    secundaryInfo: [
      "Construyendo un flujo asíncrono y distribuido para orquestar la generación de guiones, síntesis de voz, recursos visuales y el renderizado final de video.",

      "Estructurando el sistema bajo los principios de Screaming Architecture, priorizando un dominio desacoplado, casos de uso limpios y flexibilidad ante cambios tecnológicos.",

      "Implementando una arquitectura multi-tenant escalable con procesamiento de trabajos (jobs) en segundo plano y un sistema de control de consumo de créditos."
    ]
  },
  {
    time: "Ago 2026 - Sep 2026",
    role: "Desarrollador de Software",
    company: "FastAPI SaaS Boilerplate (Enterprise Edition)",
    link: "https://fastapi-saas-landing.pages.dev/",
    primaryInfo: [
      "Starter kit backend y frontend de grado empresarial diseñado para lanzar productos SaaS B2B con IA integrada en días, no meses. Arquitectura desacoplada construida con FastAPI (Python 3.12), PostgreSQL, Redis y dashboard en Next.js 16 (React 19, Tailwind v4).",
      "Implementa un motor de IA multi-provider con streaming SSE, medición atómica de cuotas por SQL concurrente, privacidad técnica GDPR (Art. 15 y 17) y suite exhaustiva de 183 tests automatizados."
    ],
    secundaryInfo: [
      "Diseñé un motor de IA agnóstico (protocolo con adaptadores para OpenAI GPT-4o, Anthropic Claude 3.5 y Gemini 2.0) con streaming SSE estructurado, keepalive ping y auto-reembolso atómico de cuotas si el proveedor falla.",
      "Implementé medición de uso atómica a nivel SQL (prevención de race conditions) con respuestas HTTP 402 Payment Required y sincronización automática con los ciclos de facturación de Stripe.",
      "Arquitectura multi-tenant con RBAC granular, API Keys por organización (hasheadas con SHA-256 y prefijos seguros) y autenticación híbrida con AWS Cognito y modo local de 1-click sin dependencias cloud.",
      "Módulo de privacidad GDPR con exportación estructurada JSON (Art. 15/20) y soft-anonymization con borrado asíncrono en Cognito vía Redis/ARQ, preservando la continuidad de las API Keys del tenant.",
      "Sistema de billing recurrente con Stripe con ledger de idempotencia para webhooks, portal de autoservicio y contrato OpenAPI tipado de punta a punta con openapi-fetch."
    ],
  },
  {
    time: "Oct 2026",
    role: "Desarrollador Front-End / Creative Developer",
    company: "Plataforma Web Inmersiva - Artista & Músico",
    primaryInfo: [
      "Diseñada bajo un enfoque editorial y narrativo de alto impacto visual y sensorial para un destacado músico y compositor folklórico argentino. Combina renderizado híbrido SSR/estático de alta velocidad con un motor 3D interactivo, construida con Astro, Three.js, GSAP, Lenis, Web Audio API y Tailwind CSS v4.",
      "Implementa un canvas WebGL reactivo con simulación de partículas y niebla nocturna, paisaje sonoro procedimental sintetizado en tiempo real (crepitar de fogón sin consumo de ancho de banda por audio pregrabado), sistema dual de color (Modo Noche / Fogón Diurno) con persistencia en localStorage, mapa interactivo geolocalizado con countdown regresivo en vivo y arquitectura desacoplada basada en la metáfora escénica (Screaming Architecture)."
    ],
    secundaryInfo: [
      "Estructuré el proyecto bajo Screaming Architecture basada en una metáfora teatral (capa 'Cinematográfico' para el escenario/WebGL/sonido y 'Protagonista' para el contenido), garantizando separación estricta entre guión de datos tipados (.data.ts), vistas declarativas (.astro) y coreografía de animación (.motion.ts).",
      "Diseñé e integré una escena WebGL en segundo plano con Three.js libre de memory leaks ni warnings de renderizado, orquestando un sistema de partículas dinámicas e iluminación ambiental reactivas a las coordenadas del puntero y al avance del scroll.",
      "Configuré el despliegue serverless optimizado en Vercel con pre-aprobación de binarios nativos (Sharp y esbuild), inyección de metadatos Schema.org JSON-LD (MusicGroup y MusicEvent), accesibilidad semántica con skip-links y carga diferida que maximiza las métricas de Core Web Vitals y Lighthouse."
    ]
  },
];
