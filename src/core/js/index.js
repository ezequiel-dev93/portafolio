/* Cambia el titulo de la pestaña cuando el usuario cambia de pestaña */
const docTitle = document.title;

window.addEventListener("blur", ()=> {
    document.title = "Regresas? ;(";
});

window.addEventListener("focus", () => {
    document.title = docTitle;
});

/* Dark Mode con View Transitions (Circular Ripple Reveal) */
function initDarkMode() {
  const toggles = document.querySelectorAll('.mode-dark-btn, #mode-dark-toggle');
  const body = document.body;
  const docEl = document.documentElement;

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const userPrefersDark = localStorage.getItem('dark-mode');

  let isDarkMode = userPrefersDark === null ? systemPrefersDark : userPrefersDark === 'true';

  // Sincronizar estado inicial en html y body
  docEl.classList.toggle('dark-mode', isDarkMode);
  body.classList.toggle('dark-mode', isDarkMode);

  function updateButtons(active) {
    toggles.forEach(btn => {
      btn.setAttribute('aria-pressed', String(active));
      btn.setAttribute('aria-label', active ? 'Activar modo claro' : 'Activar modo oscuro');
    });
  }

  function toggleMode(e, btn) {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsViewTransition = typeof document.startViewTransition === 'function';

    const applyThemeChange = () => {
      const active = !docEl.classList.contains('dark-mode');
      docEl.classList.toggle('dark-mode', active);
      body.classList.toggle('dark-mode', active);
      updateButtons(active);
      localStorage.setItem('dark-mode', String(active));
      return active;
    };

    if (!supportsViewTransition || isReducedMotion) {
      applyThemeChange();
      return;
    }

    // Coordenadas del origen de la onda (clic del mouse o centro del botón si fue teclado)
    let x = e.clientX;
    let y = e.clientY;

    if (!x && !y) {
      const rect = btn.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      applyThemeChange();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 520,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  }

  // Si hay botones, configurar toggle
  if (toggles.length) {
    updateButtons(isDarkMode);

    toggles.forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        toggleMode(e, btn);
      };
    });
  }
}

document.addEventListener('DOMContentLoaded', initDarkMode);
document.addEventListener('astro:page-load', initDarkMode);

// smoothScroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* Show More / Ver más */
function initShowMore() {
  document.querySelectorAll('[data-show-more]').forEach(container => {
    const id = container.dataset.showMore;
    const showText = container.dataset.showText || 'Ver más';
    const hideText = container.dataset.hideText || 'Ver menos';
    const btn = container.querySelector('.show-more__btn');
    const hidden = container.querySelector(`#show-more-${id}`);

    if (!btn || !hidden) return;

    // Hide button if there are no hidden items
    if (!hidden.children.length) {
      btn.style.display = 'none';
      return;
    }

    btn.onclick = async () => {
      const isExpanded = hidden.classList.toggle('is-visible');
      btn.setAttribute('aria-expanded', String(isExpanded));
      btn.querySelector('.show-more__btn-text').textContent = isExpanded ? hideText : showText;

      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (
          isExpanded &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          const items = hidden.querySelectorAll(
            '.experience-card__item, .projects__cards'
          );
          if (items.length) {
            gsap.fromTo(
              items,
              { y: 28, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.55,
                stagger: 0.1,
                ease: 'power3.out',
                clearProps: 'transform',
              }
            );
          }
        }
        ScrollTrigger.refresh();
      } catch {
        // Fallback silencioso si GSAP no está cargado
      }
    };
  });
}

document.addEventListener('DOMContentLoaded', initShowMore);
document.addEventListener('astro:page-load', initShowMore);