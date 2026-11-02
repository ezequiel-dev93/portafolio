import type { Project } from '@/features/projects/types/projects';

const projects: Project[] = [
  {
    title: 'RAG Enterprise',
    description:
      'Desarrollé un sistema RAG empresarial en Python y Streamlit con PostgreSQL (pgvector) bajo Arquitectura Hexagonal para consultar documentos privados con citaciones verificables, cero alucinaciones y modo demo a costo cero.',
    github: 'https://github.com/ezequiel-dev93/rag-enterprise-pgvector',
    tags: ['PYTHON', 'STREAMLIT', 'POSTGRESQL'],
  },
  {
    title: 'DevAssistant MCP Server',
    description:
      'Desarrollé un servidor MCP en Python bajo Arquitectura Hexagonal y persistencia SQLite para dotar a asistentes de IA de memoria continua y auditar repositorios según sus patrones de software.',
    github: 'https://github.com/ezequiel-dev93/dev-assistent-server-mcp',
    tags: ['PYTHON', 'PYDANTIC', 'SQLITE'],
  },
  {
    title: 'Star Wars Holocron',
    description:
      'Construí una API REST modular en TypeScript y Supabase bajo Screaming Architecture para consultar y gestionar el catálogo de Star Wars con desacoplamiento total por dominios.',
    github: 'https://github.com/ezequiel-dev93/star-wars-holocron',
    web: 'https://holocron.ezequielsuarez-dev.com/',
    tags: ['NAVE', 'TYPESCRIPT', 'SUPABASE'],
  },
  {
    title: 'Star Wars Dataforce',
    description:
      'Automaticé un pipeline ETL y scraping asíncrono con Python, Playwright y Pydantic para validar y cargar masivamente datos íntegros al backend de Holocron.',
    github: 'https://github.com/ezequiel-dev93/star-wars-dataforce',
    tags: ['PYTHON', 'PYDANTIC', 'PLAYWRIGHT'],
  },
  {
    title: 'Gestor de Favoritos',
    description:
      'Implementé una SPA interactiva en React, TypeScript y Chrome API para organizar y buscar marcadores con drag & drop superando las limitaciones del navegador nativo.',
    github: 'https://github.com/ezequiel-dev93/gestor-favoritos',
    tags: ['VITE', 'REACT', 'TYPESCRIPT', 'TAILWIND'],
  },
  {
    title: 'Scrapper Automatizado',
    description:
      'Diseñé un motor de extracción en Python con Playwright y Polars para procesar grandes volúmenes de datos de MercadoLibre y exportar reportes analíticos en Excel.',
    github: 'https://github.com/ezequiel-dev93/scraping_python',
    tags: ['PYTHON', 'POLARS', 'PLAYWRIGHT'],
  },
  {
    title: 'Generador de Informes',
    description:
      'Desarrollé una plataforma analítica en Python y Streamlit para parametrizar plantillas y automatizar la edición y exportación masiva de informes operativos en Excel.',
    github: 'https://github.com/ezequiel-dev93/informes_automatizados',
    tags: ['PYTHON', 'STREAMLIT'],
  },
];

export default projects;
