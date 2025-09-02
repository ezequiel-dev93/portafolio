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
];

export default projects;
