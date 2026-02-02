import type { Project } from '@/core/types/projects';

const projects: Project[] = [
  {
    title: 'SaaS de Video Automatizado',
    description: 'Producto orientado a la generación automatica de videos para redes sociales. Implmentación un flujo end-to-end y una arquitectura centrada en el dominio, diseñada para escalar y evolucionar como producto.',
    link: 'https://www.ezequielsuarez-dev.com/',
    tags: ['NAVE','REACT','TYPESCRIPT','TAILWIND','SUPABASE'],
  },
  {
    title: 'Star Wars Holocron',
    description: 'API REST orientada a dominio basada en Star Wars, diseñada con Screaming Architecture y foco en mantenibilidad y escalabilidad.',
    link: 'https://github.com/ezequiel-dev93/star-wars-holocron.git',
    tags: ['NAVE', 'TYPESCRIPT', 'SUPABASE', 'AWS'],
  },
  {
    title: 'Gestor de Favoritos',
    description:'Aplicación web para la gestión avanzada de favoritos en Chrome. Implementa un sistema CRUD completo utilizando la API de Chrome, con búsqueda, drag & drop y arquitectura modular enfocada en mantenibilidad y escalabilidad.',
    link:'https://github.com/ezequiel-dev93/gestor-favoritos.git',
    tags: ['VITE', 'REACT', 'TYPESCRIPT', 'TAILWIND' ],
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
  {
    title: 'Sitio Web para Músico',
    description: 'Una propuesta visual que captura la esencia y la energía en cada uno de sus detalles. Está lista para evolucionar al ritmo de nuevas ideas, adaptándose con facilidad a las necesidades del proyecto.',
    link: 'https://www.ezequielsuarez-dev.com/',
    tags: ['NAVE', 'TYPESCRIPT', 'TAILWIND'],
  },
];

export default projects;
