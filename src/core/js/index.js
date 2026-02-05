/* Cambia el titulo de la pestaña cuando el usuario cambia de pestaña */
const docTitle = document.title;

window.addEventListener("blur", ()=> {
    document.title = "Regresas? ;(";
});

window.addEventListener("focus", () => {
    document.title = docTitle;
});

/* Dark Mode */
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('mode-dark-toggle');
  const body = document.body;
  
  // Verificar preferencia del sistema
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Verificar si el usuario ya ha hecho una selección (en localStorage)
  const userPrefersDark = localStorage.getItem('dark-mode');
  
  // Determinar el modo inicial
  let isDarkMode;
  
  if (userPrefersDark === null) {
      // Si no hay preferencia guardada, usar la del sistema
      isDarkMode = systemPrefersDark;
      localStorage.setItem('dark-mode', systemPrefersDark);
  } else {
      // Si hay preferencia guardada, usarla
      isDarkMode = userPrefersDark === 'true';
  }
  
  // Aplicar el modo inicial
  if (isDarkMode) {
      body.classList.add('dark-mode');
      darkModeToggle.querySelector('.mode-dark__toggle').classList.add('active');
  }
  
  // Escuchar cambios en la preferencia del sistema (solo si no hay selección de usuario)
  if (userPrefersDark === null) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          const newSystemPref = e.matches;
          body.classList.toggle('dark-mode', newSystemPref);
          darkModeToggle.querySelector('.mode-dark__toggle').classList.toggle('active', newSystemPref);
          localStorage.setItem('dark-mode', newSystemPref);
      });
  }
  
    // Manejar el click del usuario
  darkModeToggle.addEventListener('click', () => {
      const isActive = body.classList.toggle('dark-mode');
      darkModeToggle.querySelector('.mode-dark__toggle').classList.toggle('active');
      localStorage.setItem('dark-mode', isActive);
  });
});

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

