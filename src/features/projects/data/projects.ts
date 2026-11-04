import type { Project } from '@/features/projects/types/projects';

const projects: Project[] = [
  {
    title: 'Finch Neural',
    description:
      'Construí un segundo cerebro cognitivo con búsqueda vectorial sobre índices HNSW a costo cero. Implementé Arquitectura Hexagonal integrando un servidor MCP, un arnés evaluador en tiempo real y memoria sináptica para reducir >90% de contexto.',
    tags: ['PYTHON', 'STREAMLIT', 'POSTGRESQL'],
    isPrivate: true,
  },
  {
    title: 'Cognitive Agent Memory',
    description:
      'Diseñé un motor de memoria persistente y soberana para agentes de IA entre sesiones. Implementé Arquitectura Hexagonal con servidor MCP, versionado semántico y resolución automática de contradicciones para reducir un 90% el consumo de tokens.',
    tags: ['PYTHON', 'STREAMLIT', 'SQLITE'],
    isPrivate: true,
  },
  {
    title: 'RAG Enterprise',
    description:
      'Desarrollé un sistema RAG empresarial para consultar documentos privados con citaciones exactas por página y prevención estricta de alucinaciones. Implementé Arquitectura Hexagonal con almacenamiento vectorial HNSW y telemetría de latencia en tiempo real.',
    github: 'https://github.com/ezequiel-dev93/rag-enterprise-pgvector',
    tags: ['PYTHON', 'STREAMLIT', 'POSTGRESQL'],
  },
  {
    title: 'DevAssistant MCP Server',
    description:
      'Desarrollé un servidor bajo el estándar abierto MCP para dotar a los LLMs de memoria continua y auditoría de repositorios. Implementé Arquitectura Hexagonal mediante Ports & Adapters para generar blueprints de código respetando la arquitectura del proyecto.',
    github: 'https://github.com/ezequiel-dev93/dev-assistent-server-mcp',
    tags: ['PYTHON', 'PYDANTIC', 'SQLITE'],
  },
  {
    title: 'Star Wars Holocron',
    description:
      'Construí una API REST modular orientada a dominio para consultar y gestionar el catálogo de Star Wars. Implementé Screaming Architecture desacoplando entidades, casos de uso y repositorios con tipado estricto de extremo a extremo.',
    github: 'https://github.com/ezequiel-dev93/star-wars-holocron',
    web: 'https://holocron.ezequielsuarez-dev.com/',
    tags: ['NAVE', 'TYPESCRIPT', 'SUPABASE'],
  },
  {
    title: 'Star Wars Dataforce',
    description:
      'Automaticé un pipeline ETL y motor de extracción asíncrona con validación estricta de esquemas para transformar y cargar masivamente datos íntegros y normalizados al backend de Holocron.',
    github: 'https://github.com/ezequiel-dev93/star-wars-dataforce',
    tags: ['PYTHON', 'PYDANTIC', 'PLAYWRIGHT'],
  },
  {
    title: 'Gestor de Favoritos',
    description:
      'Implementé una SPA interactiva integrada con la API nativa de Chrome para organizar marcadores mediante drag & drop fluido, persistencia local y búsqueda instantánea.',
    github: 'https://github.com/ezequiel-dev93/gestor-favoritos',
    tags: ['VITE', 'REACT', 'TYPESCRIPT', 'TAILWIND'],
  },
  {
    title: 'Scrapper Automatizado',
    description:
      'Diseñé un motor de extracción web resiliente y procesamiento estructurado de datos para auditar precios de MercadoLibre y exportar reportes analíticos limpios en Excel.',
    github: 'https://github.com/ezequiel-dev93/scraping_python',
    tags: ['PYTHON', 'POLARS', 'PLAYWRIGHT'],
  },
  {
    title: 'Generador de Informes',
    description:
      'Desarrollé una plataforma analítica de productividad para parametrizar plantillas operativas, validar estructuras de datos y automatizar la generación masiva de reportes en Excel.',
    github: 'https://github.com/ezequiel-dev93/informes_automatizados',
    tags: ['PYTHON', 'STREAMLIT'],
  },
];

export default projects;
