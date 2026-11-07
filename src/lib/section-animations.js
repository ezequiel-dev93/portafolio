import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let mmInstance = null;
let bodyResizeObserver = null;

export function initSectionAnimations() {
  if (mmInstance) {
    mmInstance.revert();
  }
  if (bodyResizeObserver) {
    bodyResizeObserver.disconnect();
  }

  mmInstance = gsap.matchMedia();

  mmInstance.add(
    {
      isMotionOk: "(prefers-reduced-motion: no-preference)",
      isDesktopPointer:
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
    },
    (context) => {
      const { isMotionOk, isDesktopPointer } = context.conditions;
      if (!isMotionOk) return;

      const isMobile = window.innerWidth <= 768;
      const triggerStart = isMobile ? "clamp(top 91%)" : "clamp(top 86%)";
      const triggerEnd = isMobile ? "clamp(bottom 9%)" : "clamp(bottom 14%)";
      const titleStart = isMobile ? "clamp(top 92%)" : "clamp(top 88%)";

      // 1. Hero Content — Parallax suave al hacer scroll hacia abajo
      const heroSection = document.querySelector(".hero");
      const heroContent = document.querySelector(".hero__content");
      if (heroSection && heroContent) {
        gsap.fromTo(
          heroContent,
          { yPercent: 0, autoAlpha: 1 },
          {
            yPercent: -12,
            autoAlpha: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "clamp(top top)",
              end: "clamp(bottom top)",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Títulos de sección — Escaneo Láser Neón Cian (Laser Scan reveal unificado y reversible)
      const sectionTitles = gsap.utils.toArray(
        ".experience__title-h2, .projects__title-h2, .ai-eng__title-h2, .about__title-h2, .skill__title-h2, .contactCta__title"
      );

      sectionTitles.forEach((title) => {
        const triggerParent = title.parentElement || title;
        gsap.fromTo(
          title,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            filter: "drop-shadow(-6px 0 14px rgba(0, 229, 255, 0.95))",
            autoAlpha: 0.1,
            x: -12,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            filter: "drop-shadow(0 0 0px rgba(0, 229, 255, 0))",
            autoAlpha: 1,
            x: 0,
            duration: 0.85,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: triggerParent,
              start: titleStart,
              end: isMobile ? "bottom 14%" : "bottom 18%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      const cardStart = isMobile ? "top 90%" : "top 86%";
      const cardEnd = isMobile ? "bottom 15%" : "bottom 22%";

      // 3. Experiencia — Opción 1: Staggered Module Power-On (Por tarjeta + Reverso al cambiar de sección)
      const visibleExpItems = gsap.utils.toArray(
        "#experiencia .experience-card > .experience-card__item"
      );

      visibleExpItems.forEach((item) => {
        const link = item.querySelector(".experience-card__link");
        const expTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: cardStart,
            end: cardEnd,
            toggleActions: "play reverse play reverse",
          },
        });

        // Entrada de DERECHA a IZQUIERDA con recorrido amplio y enfoque progresivo
        expTl.fromTo(
          item,
          {
            x: () => Math.min(window.innerWidth * 0.42, 500),
            y: 24,
            scale: 0.92,
            skewX: -5,
            autoAlpha: 0,
            filter: "blur(7px)",
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            skewX: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
          }
        );

        // Pulso de encendido y energización perimetral cian (reversible con keyframes)
        if (link) {
          expTl.fromTo(
            link,
            {
              borderColor: "rgba(0, 229, 255, 0.15)",
              boxShadow: "0 0 0px rgba(0, 229, 255, 0)",
            },
            {
              keyframes: [
                {
                  borderColor: "#00E5FF",
                  boxShadow: "0 0 30px rgba(0, 229, 255, 0.5)",
                  duration: 0.4,
                  ease: "power2.out",
                },
                {
                  borderColor: "rgba(153, 153, 153, 0.2)",
                  boxShadow: "0 0 0px rgba(0, 229, 255, 0)",
                  duration: 0.4,
                  ease: "power2.inOut",
                },
              ],
            },
            0.05
          );
        }
      });

      // 4. Proyectos — Opción C: Lateral Warp desde el inicio de pantalla + Border Scanner (Por tarjeta + Reverso)
      const visibleProjectCards = gsap.utils.toArray(
        "#proyectos .projects__items:not(.projects__items--hidden) > .projects__cards"
      );

      visibleProjectCards.forEach((card) => {
        const actionBtns = card.querySelectorAll(".projects__action-btn");
        const projTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: cardStart,
            end: cardEnd,
            toggleActions: "play reverse play reverse",
          },
        });

        // 1. Entrada lateral amplia desde el inicio de pantalla con desenfoque de velocidad (Lateral Warp)
        projTl.fromTo(
          card,
          {
            x: () => -Math.min(window.innerWidth * 0.44, 540),
            scale: 0.88,
            skewX: 6,
            autoAlpha: 0,
            filter: "blur(8px)",
          },
          {
            x: 0,
            scale: 1,
            skewX: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
          }
        );

        // 2. Haz de luz y resplandor perimetral cian (Border Scanner reversible)
        projTl.fromTo(
          card,
          {
            borderColor: "rgba(0, 229, 255, 0.15)",
            boxShadow: "0 0 0px rgba(0, 229, 255, 0)",
          },
          {
            keyframes: [
              {
                borderColor: "#00E5FF",
                boxShadow: "0 0 34px rgba(0, 229, 255, 0.55)",
                duration: 0.42,
                ease: "power2.out",
              },
              {
                borderColor: "rgba(153, 153, 153, 0.2)",
                boxShadow: "0 0 0px rgba(0, 229, 255, 0)",
                duration: 0.43,
                ease: "power2.inOut",
              },
            ],
          },
          0.05
        );

        // 3. Pop elástico luminoso en los botones de acción (GitHub / Web)
        if (actionBtns.length) {
          projTl.fromTo(
            actionBtns,
            { scale: 0.5, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.45,
              stagger: 0.1,
              ease: "back.out(2.2)",
            },
            0.35
          );
        }
      });

      // Smooth scroll asistido para el botón HUD "Ver Experiencia"
      const hudBtn = document.querySelector(".hero__hud-widget");
      if (hudBtn && !hudBtn.dataset.listenerSet) {
        hudBtn.dataset.listenerSet = "true";
        hudBtn.addEventListener("click", (e) => {
          const expSec = document.querySelector("#experiencia");
          if (expSec) {
            e.preventDefault();
            expSec.scrollIntoView({ behavior: "smooth" });
          }
        });
      }

      // Tilt 3D suave en todas las cards de proyectos (solo desktop con puntero)
      if (isDesktopPointer) {
        const allProjectCards = gsap.utils.toArray(".projects__cards");
        allProjectCards.forEach((card) => {
          const xTo = gsap.quickTo(card, "rotationY", {
            duration: 0.4,
            ease: "power2.out",
          });
          const yTo = gsap.quickTo(card, "rotationX", {
            duration: 0.4,
            ease: "power2.out",
          });

          const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.set(card, { transformPerspective: 900 });
            xTo(relX * 6);
            yTo(-relY * 6);
          };

          const onLeave = () => {
            xTo(0);
            yTo(0);
          };

          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
        });
      }

      // 5. Ingeniería de IA (Finch Flagship Card) — Encendido Cyber-HUD + Stagger de Métricas
      const aiEngCard = document.querySelector("#ingenieria-ia .ai-eng__card");
      const aiEngMetrics = gsap.utils.toArray("#ingenieria-ia .ai-eng__metric-card");

      if (aiEngCard) {
        const aiTl = gsap.timeline({
          scrollTrigger: {
            trigger: aiEngCard,
            start: cardStart,
            end: cardEnd,
            toggleActions: "play reverse play reverse",
          },
        });

        aiTl.fromTo(
          aiEngCard,
          {
            y: 36,
            scale: 0.94,
            autoAlpha: 0,
            filter: "blur(6px)",
          },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.82,
            ease: "power3.out",
          }
        );

        if (aiEngMetrics.length) {
          aiTl.fromTo(
            aiEngMetrics,
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.48,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.4"
          );
        }
      }

      // 6. Sobre Mí — Lectura editorial secuencial por párrafo (bidireccional)
      const aboutDesc = document.querySelector("#sobre-mi .about__description");
      const aboutParagraphs = gsap.utils.toArray("#sobre-mi .about__text");

      if (aboutDesc && aboutParagraphs.length) {
        gsap.fromTo(
          aboutParagraphs,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.13,
            ease: "power2.out",
            scrollTrigger: {
              trigger: aboutDesc,
              start: triggerStart,
              end: triggerEnd,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 6. Habilidades (Skills) — Categorías + Pop elástico en cada tecnología (bidireccional)
      const skillsGrid = document.querySelector(".skill__categories");
      const skillCategories = gsap.utils.toArray(".skill__category");

      if (skillsGrid && skillCategories.length) {
        const skillsTl = gsap.timeline({
          scrollTrigger: {
            trigger: skillsGrid,
            start: triggerStart,
            end: triggerEnd,
            toggleActions: "play reverse play reverse",
          },
        });

        skillsTl.fromTo(
          skillCategories,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.11,
            ease: "power3.out",
          }
        );

        const allBadges = gsap.utils.toArray(
          ".skill__category .skill__list > li"
        );
        if (allBadges.length) {
          skillsTl.fromTo(
            allBadges,
            { scale: 0.82, y: 12, autoAlpha: 0 },
            {
              scale: 1,
              y: 0,
              autoAlpha: 1,
              duration: 0.42,
              stagger: 0.025,
              ease: "back.out(1.7)",
            },
            "-=0.38"
          );
        }
      }

      // 7. CTA de Contacto — Tarjeta Cyber-HUD con encendido + Botón magnético (bidireccional)
      const contactCard =
        document.querySelector(".contactCta__card") ||
        document.querySelector(".contactCta__inner");
      const contactBtn = document.querySelector(".contactCta__btn");

      if (contactCard) {
        gsap.fromTo(
          contactCard,
          {
            y: 36,
            scale: 0.94,
            autoAlpha: 0,
            filter: "blur(6px)",
          },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactCard,
              start: cardStart,
              end: cardEnd,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      if (isDesktopPointer && contactBtn) {
        const xBtn = gsap.quickTo(contactBtn, "x", {
          duration: 0.35,
          ease: "power3.out",
        });
        const yBtn = gsap.quickTo(contactBtn, "y", {
          duration: 0.35,
          ease: "power3.out",
        });

        contactBtn.addEventListener("mousemove", (e) => {
          const rect = contactBtn.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          xBtn(dx * 0.22);
          yBtn(dy * 0.28);
        });

        contactBtn.addEventListener("mouseleave", () => {
          xBtn(0);
          yBtn(0);
        });
      }

      // 8. Footer — Reveal progresivo en 3 niveles (1. Identidad, 2. Explorar y Contactos, 3. Copyright y demás)
      const footerEl =
        document.querySelector(".footer") ||
        document.querySelector(".section-footer");
      const footerIdentity = document.querySelector(
        ".section-footer__identity"
      );
      const footerMiddleItems = gsap.utils.toArray(
        ".section-footer__middle > *"
      );
      const footerBottom = document.querySelector(".section-footer__bottom");
      const footerWatermark = document.querySelector(
        ".section-footer__watermark"
      );

      if (footerEl && (footerIdentity || footerMiddleItems.length)) {
        const footerTl = gsap.timeline({
          scrollTrigger: {
            trigger: footerEl,
            start: "clamp(top 95%)",
            toggleActions: "play none none reverse",
          },
        });

        if (footerIdentity) {
          footerTl.fromTo(
            footerIdentity,
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.65,
              ease: "power3.out",
            }
          );
        }

        if (footerMiddleItems.length) {
          footerTl.fromTo(
            footerMiddleItems,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger: 0.14,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }

        if (footerBottom) {
          footerTl.fromTo(
            footerBottom,
            { y: 16, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.35"
          );
        }

        if (footerWatermark) {
          footerTl.fromTo(
            footerWatermark,
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              ease: "power2.out",
            },
            "-=0.45"
          );
        }
      }
    }
  );

  // Observar cambios de altura en el body (carga de estilos en dev, fuentes, imágenes, etc.)
  // para mantener todos los puntos de ScrollTrigger (especialmente el Footer) sincronizados
  let lastBodyHeight = document.body.scrollHeight;
  let refreshTimer = null;

  if (typeof ResizeObserver !== "undefined") {
    bodyResizeObserver = new ResizeObserver(() => {
      const currentHeight = document.body.scrollHeight;
      if (Math.abs(currentHeight - lastBodyHeight) > 4) {
        lastBodyHeight = currentHeight;
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 120);
      }
    });
    bodyResizeObserver.observe(document.body);
  }

  window.addEventListener(
    "load",
    () => {
      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 300);
    },
    { once: true }
  );
}
