import type { Project } from '@/core/types/projects';

// Importar imágenes de los proyectos
import imgMusic from '@/shared/assets/cards/img-music.webp';
import gestorFavoritos from '@/shared/assets/cards/gestor-favoritos-chrome.webp';
import Scraping from '@/shared/assets/cards/scraping.webp';
import Informes from '@/shared/assets/cards/generador-informes.webp';

const projects: Project[] = [
  {
    title: 'Sitio Web para Músico',
    description: 'Una propuesta visual que captura la esencia y la energía en cada uno de sus detalles. Está lista para evolucionar al ritmo de nuevas ideas, adaptándose con facilidad a las necesidades del proyecto.',
    tags: ['NAVE', 'TYPESCRIPT', 'TAILWIND'],
    image: imgMusic,
  },
  {
    title: 'Gestor de Favoritos',
    description:'Aplicación web que organiza y gestiona carpetas de favoritos en Chrome con una interfaz moderna. sistema completo CRUD utilizando la API de Chrome, incluye búsqueda, Arrastrar y Soltar (drag & drop).',
    link:'https://github.com/ezequiel-dev93/gestor-favoritos.git',
    tags: ['VITE', 'REACT', 'TYPESCRIPT', 'TAILWIND' ],
    image: gestorFavoritos,
  },
  {
    title: 'Scrapper Automatizado',
    description: 'Extrae productos de MercadoLibre. Genera reportes en Excel con limpieza de datos y sistema de logging y arquitectura modular para facilitar el mantenimiento y la escalabilidad.',
    link: 'https://github.com/ezequiel-dev93/scraping_python.git',
    tags: ['PYTHON', 'POLARS', 'PLAYWIRiGHT'],
    image: Scraping,
  },
  {
    title: 'Generador de Informes',
    description:
      'Permite crear informes a medida, usar plantillas reutilizables y generar archivos de Excel de manera automatizada. También puedes subir tu archivo, hacer modificaciones y descargarlos.',
    link: 'https://github.com/ezequiel-dev93/informes_automatizados.git',
    tags: ['PYTHON', 'STREAMLIT'],
    image: Informes,
  }
];

export default projects;
