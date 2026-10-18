function initHeaderMenu() {
  const checkbox = document.getElementById("check-icon");
  const label = document.querySelector(".icon-menu");
  const menu = document.querySelector(".header__nav-menu");
  const backdrop = document.getElementById("header-backdrop");

  if (!checkbox || !menu || !label) return;

  function syncState(isOpen) {
    checkbox.checked = isOpen;
    menu.setAttribute("aria-hidden", String(!isOpen));
    label.setAttribute("aria-expanded", String(isOpen));
    menu.classList.toggle("active", isOpen);
    if (backdrop) {
      backdrop.classList.toggle("active", isOpen);
    }
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  // Escuchar cambio del checkbox controlado por el label
  checkbox.onchange = () => {
    syncState(checkbox.checked);
  };

  // Cerrar con clic en el backdrop oscurecido
  if (backdrop) {
    backdrop.addEventListener("click", () => {
      if (checkbox.checked) {
        syncState(false);
      }
    });
  }

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && checkbox.checked) {
      syncState(false);
    }
  });

  // Cerrar al hacer clic en un enlace del menú
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024 && checkbox.checked) {
        syncState(false);
      }
    });
  });

  // Cerrar al tocar fuera del menú lateral
  document.addEventListener("click", (e) => {
    if (!checkbox.checked) return;
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnToggle = label.contains(e.target) || e.target === checkbox;
    const isClickOnBackdrop = backdrop && backdrop.contains(e.target);
    if (!isClickInsideMenu && !isClickOnToggle && !isClickOnBackdrop) {
      syncState(false);
    }
  });


  // Si se redimensiona a desktop, restaurar estado y scroll
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 && checkbox.checked) {
      syncState(false);
    }
  });
}

// Limpiar overflow en transiciones de página
document.addEventListener("astro:before-swap", () => {
  document.body.style.overflow = "";
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeaderMenu, { once: true });
} else {
  initHeaderMenu();
}
document.addEventListener("astro:page-load", initHeaderMenu);
