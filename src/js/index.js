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

/*Formulario De Contacto
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('button');
    const form = document.getElementById('form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const honeypot = document.getElementById("honeypot").value;
      if (honeypot) return; // Bot detected
  
      btn.value = 'Enviando...';
  
      const serviceID = 'default_service';
      const templateID = 'template_mzf465a';
  
      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          btn.value = 'Enviar mensaje';
          Toastify({
            text: "¡Mensaje enviado correctamente!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
          }).showToast();
          form.reset();
        }, (err) => {
          btn.value = 'Enviar mensaje';
          Toastify({
            text: "Error al enviar el mensaje",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
          }).showToast();
        });
    });
});
  



*/


