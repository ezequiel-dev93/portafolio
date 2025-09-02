import gsap from "gsap";

const splitText = (selector: string) => {
  const el = document.querySelector(selector);
  if (!el) return [];

  const text = el.textContent || "";
  el.textContent = "";

  const letters = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    el.appendChild(span);
    return span;
  });

  return letters;
};

export const animateHeroTitle = () => {
  const letters = splitText("#hero-title .title-main");

  const tl = gsap.timeline();

  tl.from(letters, {
    y: 50,
    opacity: 0,
    stagger: 0.05,
    duration: 0.8,
    ease: "power3.out",
  });

  tl.from("#hero-title .title-highlight", {
    scale: 0.6,
    rotationX: 80,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
  }, "-=0.5");
};