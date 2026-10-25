export interface SocialLink {
  name: string;
  url: string;
  ariaLabel: string;
  icon: "linkedin" | "github" | "email";
}

export interface ProfileData {
  title: {
    line1: string;
    de: string;
    software: string;
    amp: string;
    ai: string;
  };
  description: string;
  cta: {
    label: string;
    href: string;
    ariaLabel: string;
  };
  socialLinks: SocialLink[];
}

export const profileData: ProfileData = {
  title: {
    line1: "Desarrollador",
    de: "De",
    software: "Software",
    amp: "&",
    ai: "AI",
  },
  description:
    "Hola, soy Ezequiel Suarez. Diseño y desarrollo aplicaciones escalables con arquitecturas limpias, integrando soluciones en la nube e inteligencia artificial orientadas al negocio.",
  cta: {
    label: "Ver Experiencia",
    href: "#experiencia",
    ariaLabel: "Ir a la sección de Experiencia laboral",
  },
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ezequiel-suarez-dev/",
      ariaLabel: "Ver perfil de LinkedIn de Ezequiel Suarez",
      icon: "linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/ezequiel-dev93",
      ariaLabel: "Ver perfil de GitHub de Ezequiel Suarez",
      icon: "github",
    },
    {
      name: "Email",
      url: "mailto:ezequielsuarez.dev@gmail.com",
      ariaLabel: "Enviar email a Ezequiel Suarez",
      icon: "email",
    },
  ],
};

export default profileData;
