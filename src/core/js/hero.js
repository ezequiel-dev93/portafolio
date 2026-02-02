import Thpace from "thpace";

export function initHero() {
  const canvas = document.getElementById("hero__canvas");

  if (!canvas) return;

  const thpace = new Thpace(canvas, {
    background: "#0b0b0b",
    particles: {
      count: 80,
      color: "#ffffff",
      size: 1.2,
      speed: 0.3,
    },
    interactivity: {
      mouse: true,
      radius: 120,
    },
  });

  thpace.start();

  window.addEventListener("resize", () => {
    thpace.resize();
  });
}
