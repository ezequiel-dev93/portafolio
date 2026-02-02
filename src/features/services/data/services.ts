import type { Service } from "@/core/types/Services";

const services: Service[] = [
  {
    slug: "frontend",
    title: "Desarrollo Front-End",
    summary: "Interfaces modernas, accesibles y responsivas. Enfoque en performance, UX y buenas prácticas.",
    features: ["Accesibilidad AA", "Performance", "Diseño modular"],
    icon: "💻",
  },
  {
    slug: "arquitectura",
    title: "Arquitectura & Escalabilidad",
    summary: "Diseño de arquitecturas limpias y escalables. Organización de proyectos orientados a crecimiento y mantenibilidad.",
    features: ["Arquitectura limpia", "Content Collections", "Buenas prácticas de DX"],
    icon: "📐",
  },
  {
    slug: "automatizacion",
    title: "Automatización con Python",
    summary: "Automatización de tareas, procesamiento de datos y scripts personalizados para aumentar la eficiencia.",
    features: ["Streamlit", "Pandas", "Automatización de informes"],
    icon: "⚡",
  },
  {
    slug: "ia",
    title: "IA Aplicada (En formación)",
    summary: "Formación activa en ML, DL y NLP con Python. Aplico librerías como Scikit-Learn, TensorFlow y PyTorch en proyectos personales.",
    features: ["Machine Learning", "Deep Learning", "NLP"],
    icon: "🤖",
  },
];

export default services;
