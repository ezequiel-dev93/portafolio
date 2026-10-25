export interface ContactCtaData {
  title: string;
  lead: string;
  description: string;
  cta: {
    label: string;
    href: string;
    ariaLabel: string;
  };
}

export const contactData: ContactCtaData = {
  title: "Contacto",
  lead: "¿Tenés una idea?",
  description:
    "Contame qué estás desarrollando y diseñemos juntos cómo llevarlo al siguiente nivel con soluciones escalables y de alto impacto.",
  cta: {
    label: "Contame Tu Proyecto",
    href: "/contact",
    ariaLabel: "Ir a la página de contacto",
  },
};

export default contactData;
