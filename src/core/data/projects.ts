import type { Project } from '@/core/types/projects';

const projects: Project[] = [
  {
    title: 'Sitio Web para Músico',
    description:
      'Una propuesta visual que captura la esencia y la energía en cada uno de sus detalles. Es amigable y está lista para evolucionar al ritmo de nuevas ideas, adaptándose con facilidad a las necesidades del proyecto.',
    tags: ['NAVE', 'TYPESCRIPT', 'TAILWIND'],
    image: '/img/cards/Img-Music.webp',
  },
  {
    title: 'Generador de Informes',
    description:
      'Aplicación que te permite crear informes a medida, usar plantillas reutilizables y generar archivos de Excel de manera automatizada. También puedes subir tu archivo, hacer modificaciones y descargarlos fácilmente.',
    link: 'https://github.com/ezequiel-dev93/informes_automatizados',
    tags: ['PYTHON', 'STREAMLIT'],
    image: '/img/cards/Generador-informes.webp',
  },
  {
    title: 'Scrapper Automatizado',
    description: 'Extrae productos de MercadoLibre con Playwright y Polars, genera reportes en Excel con limpieza de datos y sistema de logging.',
    link: 'https://github.com/ezequiel-dev93/scraping_python.git',
    tags: ['PYTHON', 'POLARS', 'PLAYWIRiGHT'],
    image: '/img/cards/scraping.webp',
  },  
    /* Queda Pendiente de Actualizar la Extension de Chrome. 
    {
    title: 'Gestor de Favoritos',
    description: 'Aplicación web que organiza y gestiona carpetas de favoritos en Chrome con una interfaz moderna y responsive. Incluye búsqueda, arrastrar y soltar (drag & drop), y sistema de modales para mejorar la experiencia de usuario.',
    link:'https://github.com/ezequiel-dev93/gestor-favoritos.git',
    tags: ['REACT', 'TYPESCRIPT', 'TAILWIND' ],
    image: '/img/cards/Gestor-favoritos.webp',

  },
   */
];

export default projects;
