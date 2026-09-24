/* Cambia el titulo de la pestaña cuando el usuario cambia de pestaña */
const docTitle = document.title;

window.addEventListener("blur", ()=> {
    document.title = "Regresas? ;(";
});

window.addEventListener("focus", () => {
    document.title = docTitle;
});

/* Dark Mode */
function initDarkMode() {
  const toggles = document.querySelectorAll('.mode-dark-btn, #mode-dark-toggle');
  const body = document.body;

  if (!toggles.length) return;

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const userPrefersDark = localStorage.getItem('dark-mode');

  let isDarkMode = userPrefersDark === null ? systemPrefersDark : userPrefersDark === 'true';

  function updateButtons(active) {
    toggles.forEach(btn => {
      btn.setAttribute('aria-pressed', String(active));
      btn.setAttribute('aria-label', active ? 'Activar modo claro' : 'Activar modo oscuro');
    });
  }

  // Aplicar estado inicial
  body.classList.toggle('dark-mode', isDarkMode);
  updateButtons(isDarkMode);

  // Escuchar clicks en cada botón (desktop y mobile)
  toggles.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const active = body.classList.toggle('dark-mode');
      updateButtons(active);
      localStorage.setItem('dark-mode', active);
    };
  });
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

    btn.onclick = () => {
      const isExpanded = hidden.classList.toggle('is-visible');
      btn.setAttribute('aria-expanded', String(isExpanded));
      btn.querySelector('.show-more__btn-text').textContent = isExpanded ? hideText : showText;
    };
  });
}

document.addEventListener('DOMContentLoaded', initShowMore);
document.addEventListener('astro:page-load', initShowMore);
