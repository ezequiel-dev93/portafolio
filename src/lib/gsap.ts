import gsap from "gsap";

const splitText = (selector: string) => {
  const el = document.querySelector(selector);
  if (!el) return [];

  const text = el.textContent || "";
  el.textContent = "";

  const letters = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity, filter";
    el.appendChild(span);
    return span;
  });

  return letters;
};

export const animateHeroTitle = () => {
  const title = document.querySelector<HTMLElement>("#hero-title");
  if (!title || title.dataset.animationInitialized === "true") {
    return;
  }

  // Soporte para usuarios con preferencia de movimiento reducido
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(
      [
        "#hero-title .hero-title__de",
        "#hero-title .hero-title__amp",
        "#hero-title .ai-a",
        "#hero-title .ai-i",
      ],
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
      }
    );
    return;
  }

  const aiA = document.querySelector<HTMLElement>("#hero-title .ai-a");
  const aiI = document.querySelector<HTMLElement>("#hero-title .ai-i");

  // Cálculo exacto de las distancias hasta los bordes absolutos de la pantalla
  let offsetLeft = 500;
  let offsetRight = 1000;

  if (aiA && aiI && typeof window !== "undefined") {
    const rectA = aiA.getBoundingClientRect();
    const rectI = aiI.getBoundingClientRect();

    // Distancia exacta hasta superar el borde izquierdo de la pantalla
    offsetLeft = rectA.left + rectA.width + 50;

    // Distancia exacta hasta superar el borde derecho de la pantalla
    offsetRight = window.innerWidth - rectI.left + 50;
  }

  // Perspectiva 3D para el contenedor del Hero
  gsap.set(title, { perspective: 900 });

  // 1. Ocultar y posicionar elementos ANTES de iniciar
  gsap.set("#hero-title .hero-title__de", {
    autoAlpha: 0,
    y: 20,
  });

  gsap.set("#hero-title .hero-title__amp", {
    autoAlpha: 0,
    scale: 0,
    rotation: -30,
  });

  gsap.set("#hero-title .ai-a", {
    autoAlpha: 0,
    x: -offsetLeft,
    scale: 1.5,
    rotation: -25,
    filter: "blur(6px)",
  });

  gsap.set("#hero-title .ai-i", {
    autoAlpha: 0,
    x: offsetRight,
    scale: 1.5,
    rotation: 25,
    filter: "blur(6px)",
  });

  const mainLetters = splitText("#hero-title .hero-title__desarrollador");
  const softwareLetters = splitText("#hero-title .hero-title__software");

  if (mainLetters.length > 0) {
    gsap.set(mainLetters, {
      y: 35,
      autoAlpha: 0,
      filter: "blur(6px)",
    });
  }

  if (softwareLetters.length > 0) {
    gsap.set(softwareLetters, {
      y: 40,
      autoAlpha: 0,
      scale: 0.85,
      rotationX: -45,
      filter: "blur(4px)",
    });
  }

  const startTimeline = () => {
    if (title.dataset.animationInitialized === "true") return;
    title.dataset.animationInitialized = "true";

    const tl = gsap.timeline();

    // 1. "Desarrollador" entra letra por letra con suave desenfoque
    if (mainLetters.length > 0) {
      tl.to(mainLetters, {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        stagger: 0.035,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    // 2. "De" emerge suavemente abriendo la segunda línea
    tl.to(
      "#hero-title .hero-title__de",
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.45,
        ease: "power3.out",
      },
      "-=0.35"
    );

    // 3. "Software" entra letra por letra con gradiente y perspectiva 3D
    if (softwareLetters.length > 0) {
      tl.to(
        softwareLetters,
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          rotationX: 0,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 0.75,
          ease: "power4.out",
        },
        "-=0.3"
      );
    }

    // 4. Mientras "Software" va terminando de llegar, surge "&" con pop elástico:
    tl.to(
      "#hero-title .hero-title__amp",
      {
        scale: 1,
        autoAlpha: 0.9,
        rotation: 0,
        duration: 0.45,
        ease: "back.out(2.2)",
      },
      "-=0.55"
    );

    // 5. En ese MISMO instante ('<'), 'A' entra desde el borde izquierdo y 'I' desde el borde derecho:
    tl.to(
      "#hero-title .ai-a",
      {
        x: 0,
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
      },
      "<" // ¡Simultáneamente con el conector '&'!
    );

    tl.to(
      "#hero-title .ai-i",
      {
        x: 0,
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
      },
      "<" // ¡Simultáneamente con 'A'!
    );

    // 6. Al colisionar en el centro: estallido de neón cian eléctrico y resplandor
    tl.fromTo(
      "#hero-title .hero-title__ai",
      { filter: "drop-shadow(0 0 45px rgba(0, 229, 255, 1))" },
      {
        filter: "drop-shadow(0 0 16px rgba(0, 229, 255, 0.45))",
        duration: 0.65,
        ease: "power2.out",
      },
      "-=0.15"
    );
  };

  // Sincronización con LoadingScreen: si la pantalla de carga está visible, esperar a que comience el fade-out
  const loader = document.getElementById("loader");
  if (loader && !loader.classList.contains("fade-out")) {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          if (loader.classList.contains("fade-out")) {
            observer.disconnect();
            startTimeline();
            return;
          }
        }
      }
    });
    observer.observe(loader, { attributes: true });

    // Fallback de seguridad si el loader se remueve sin clase fade-out
    setTimeout(() => {
      observer.disconnect();
      startTimeline();
    }, 1200);
  } else {
    startTimeline();
  }
};
