import type { Experience } from "@/features/experience/types/experience";

export const experience: Experience[] = [

  {
    time: "ene 2026 – Presente",
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
    time: "Agos 2026 - Sep 2026",
    role: "Desarrollador de Software",
    company: "SaaS Boilerplate (Producto Digital / Lemos Squeezy)",
    primaryInfo: [
      "Diseñado como base reutilizable para para construir productos SaaS, con una arquitectura preparada para evolucionar y escalar.",
      "Backend modular para SaaS B2B construido con FastAPI, Screaming Architecture y principios SOLID, con separación clara entre dominios, casos de uso e infraestructura.",
      "Implementa multi-tenacy con RBAC, autentificación dual mediante AWS Cognito + APIO Keys y billing recurrente con Stripe."],
    secundaryInfo: [
      "Diseñé el sistema de billing con Stripe incorporando idempotencia y un ledger de deduplicación para evitar el procesamiento duplicado de webhooks y mantener sincronizado el estado de facturación.",
      "Automaticé el pipeline de CI con GitHub Actions y Docker, incorporando una configuración multi-stage orientada a despliegues reproducibles.",
      "Exporté el contrato OpenAPI como una interfaz estable para facilitar la generación de tipos TypeScript y la integración con clientes como Next.js, Astro y React."
    ],
  },
  {
    time: "Abr, 2025 - may 2025",
    role: "Desarrollador Front-End",
    company: "Freelancer",
    primaryInfo: [
      "Desarrollo de un sitio web profesional para un músico, enfocado en fortalecer su presencia digital y mejorar la conexión con su audiencia.",
    ],
    secundaryInfo: [
      "Implementación de una interfaz accesible y responsive, priorizando claridad visual y navegación intuitiva.",

      "Optimización de SEO, performance y accesibilidad, alcanzando 100% en Best Practices, 96% en Performance y 94% en Accessibility (Lighthouse).",

      "Diseño de la arquitectura siguiendo principios de Screaming Architecture para facilitar la escalabilidad y evolución del producto."
    ]
  },
];
