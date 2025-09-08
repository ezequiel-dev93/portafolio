import { animate } from "motion";

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("check-icon");
  const label = document.querySelector(".icon-menu");
  const menu = document.querySelector(".header__nav-menu");

  if (!checkbox || !menu || !label) return;

  function openMenu() {
    menu.setAttribute("aria-hidden", "false");
    label.setAttribute("aria-expanded", "true");

    menu.style.display = "flex";
    menu.classList.add("active");

    requestAnimationFrame(() => {
      animate(menu, { opacity: [0, 1], x: ["100%", "0%"] }, { duration: 0.4 });
    });
  }

  function closeMenu() {
    label.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");

    animate(menu, { opacity: [1, 0], x: ["0%", "100%"] }, { duration: 0.3 })
      .finished.then(() => {
        menu.classList.remove("active");
        menu.style.opacity = "";
        menu.style.transform = "";
        menu.style.display = "";
      });
  }

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && checkbox.checked) {
      checkbox.checked = false;
      closeMenu();
    }
  });

  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        checkbox.checked = false;
        closeMenu();
      }
    });
  });
});
