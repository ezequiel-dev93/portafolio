import type { Project } from '@/features/projects/types/projects';

const projects: Project[] = [
  {
    title: 'Star Wars Holocron',
    description: 'API REST orientada a dominio basada en Star Wars, diseñada con Screaming Architecture y foco en mantenibilidad y escalabilidad.',
    link: 'https://github.com/ezequiel-dev93/star-wars-holocron.git',
    tags: ['NAVE', 'TYPESCRIPT', 'SUPABASE'],
  },
  {
    title: 'Gestor de Favoritos',
    description: 'Aplicación web para la gestión avanzada de favoritos en Chrome. Implementa un sistema CRUD completo utilizando la API de Chrome, con búsqueda, drag & drop y arquitectura modular enfocada en mantenibilidad y escalabilidad.',
    link: 'https://github.com/ezequiel-dev93/gestor-favoritos.git',
    tags: ['VITE', 'REACT', 'TYPESCRIPT', 'TAILWIND'],
  },
  {
    title: 'Scrapper Automatizado',
    description: 'Extracción de productos de MercadoLibre. Incluye limpieza de datos, generación de reportes en Excel, logging y arquitectura modular orientada a escalabilidad.',
    link: 'https://github.com/ezequiel-dev93/scraping_python.git',
    tags: ['PYTHON', 'POLARS', 'PLAYWRIGHT'],
  },
  {
    title: 'Generador de Informes',
    description:
      'Permite crear informes a medida, usar plantillas reutilizables y generar archivos de Excel de manera automatizada. También puedes subir tu archivo, hacer modificaciones y descargarlos.',
    link: 'https://github.com/ezequiel-dev93/informes_automatizados.git',
    tags: ['PYTHON', 'STREAMLIT'],
  },
];

export default projects;
