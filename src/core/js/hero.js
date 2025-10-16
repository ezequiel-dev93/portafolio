import { animate } from "motion";

const COLORS = ["#E3343B", "#663399", "#3BE477", "#3FA7D6"];

const createSquares = (container, count = 40) => {
  const squares = [];

  for (let i = 0; i < count; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    // Posición inicial
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    square.style.top = `${top}%`;
    square.style.left = `${left}%`;

    const size = 6 + Math.random() * 8;
    square.style.width = `${size}px`;
    square.style.height = `${size}px`;

    square.style.backgroundColor =
      COLORS[Math.floor(Math.random() * COLORS.length)];
    square.style.opacity = 0.4 + Math.random() * 0.5;

    container.appendChild(square);
    squares.push(square);

    // Animación base INFINITA CSS
    const amplitudeX = (Math.random() - 0.5) * 40;
    const amplitudeY = (Math.random() - 0.5) * 40;
    const duration = 10 + Math.random() * 15;
    
    square.style.setProperty('--float-x', `${amplitudeX}px`);
    square.style.setProperty('--float-y', `${amplitudeY}px`);
    square.style.animation = `floatAnimation ${duration}s ease-in-out infinite`;
  }

  return squares;
};

const addMouseInteraction = (squares) => {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateSquares = () => {
    squares.forEach((square) => {
      const rect = square.getBoundingClientRect();
      const squareCenterX = rect.left + rect.width / 2;
      const squareCenterY = rect.top + rect.height / 2;
      
      const dx = mouseX - squareCenterX;
      const dy = mouseY - squareCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        const force = 1000 / (distance + 50);
        const angle = Math.atan2(dy, dx);
        
        const targetX = Math.cos(angle) * force;
        const targetY = Math.sin(angle) * force;
        
        // Aplicar transformación adicional SOBRE la animación CSS
        square.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.9)`;
        square.style.opacity = '0.9';
      } else {
        // Remover solo la transformación adicional
        square.style.transform = '';
        square.style.opacity = '';
      }
    });

    requestAnimationFrame(animateSquares);
  };

  animateSquares();
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("hero-background");
  if (container) {
    const squares = createSquares(container, 40);
    addMouseInteraction(squares);
  }
});