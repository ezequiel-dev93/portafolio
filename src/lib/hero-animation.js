import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHero() {
  const canvas = document.querySelector("#hero-scene");
  if (!canvas || canvas.dataset.heroInitialized === "true") return;

  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;

  if (width === 0 || height === 0) {
    setTimeout(initHero, 100);
    return;
  }

  canvas.dataset.heroInitialized = "true";

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0); // transparente — el fondo lo pone .hero en CSS

  // Escena & cámara
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
  function getHeroCameraZ(w, h) {
    const aspect = w / Math.max(h, 1);
    if (aspect < 0.65) return 112;
    if (aspect < 1) return 94;
    return 80;
  }
  camera.position.set(0, 0, getHeroCameraZ(width, height));

  // Textura del punto (canvas 2D, sin archivos externos) 
  const dotTexture = (() => {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(241, 241, 241, 0.8)");
    grad.addColorStop(0.4, "rgba(241, 241, 241, 0.8)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.Texture(c);
    tex.needsUpdate = true;
    return tex;
  })();

  // Geometría con deduplicación de vértices compartidos (~83% menos tweens sin perder ni un punto visual)
  const radius = 64;
  const detail = isMobile ? 9 : 13;
  const sphereGeom = new THREE.IcosahedronGeometry(radius, detail);

  const posAttr = sphereGeom.getAttribute("position");
  const rawCount = posAttr.count;
  const uniqueVectors = [];
  const seenKeys = new Set();

  for (let i = 0; i < rawCount; i++) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);
    const key = `${Math.round(vx * 100)},${Math.round(vy * 100)},${Math.round(vz * 100)}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueVectors.push(new THREE.Vector3(vx, vy, vz));
    }
  }
  sphereGeom.dispose();

  const count = uniqueVectors.length;
  const positions = new Float32Array(count * 3);
  const vectors = uniqueVectors;

  for (let i = 0; i < count; i++) {
    vectors[i].toArray(positions, i * 3);
  }

  const customGeom = new THREE.BufferGeometry();
  const positionBuf = new THREE.BufferAttribute(positions, 3);
  customGeom.setAttribute("position", positionBuf);

  // Animamos cada punto único con GSAP (solo si el usuario no pidió movimiento reducido)
  const vertexTweens = [];
  if (!isReducedMotion) {
    vectors.forEach((v, i) => {
      const tw = gsap.to(v, {
        x: 0,
        z: 0,
        duration: 4,
        ease: "back.out(1.7)",
        delay: Math.abs(v.y / radius) * 2,
        repeat: -1,
        yoyo: true,
        yoyoEase: "back.out(1.7)",
        onUpdate() {
          positions[i * 3] = v.x;
          positions[i * 3 + 2] = v.z;
        },
      });
      vertexTweens.push(tw);
    });
  }

  // Shaders 
  const vertexShader = /* glsl */`
    uniform float size;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position  = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = /* glsl */`
    uniform sampler2D dotTexture;
    uniform vec3 color;
    uniform float alpha;
    void main() {
      vec4 texColor = texture2D(dotTexture, gl_PointCoord);
      gl_FragColor  = vec4(color, alpha) * texColor;
    }
  `;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      dotTexture: { value: dotTexture },
      color: { value: new THREE.Color(0xffffff) },
      size: { value: 0.2 },
      alpha: { value: 1.0 },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  });

  const dots = new THREE.Points(customGeom, material);
  scene.add(dots);

  // Color según modo (modo oscuro/claro)
  const COLORS = {
    dark: new THREE.Color(0xffffff),
    light: new THREE.Color(0x000000),
  };

  function applyColorFromMode() {
    const isDark =
      document.body.classList.contains("dark-mode") ||
      document.documentElement.classList.contains("dark-mode");
    material.uniforms.color.value.set(isDark ? COLORS.dark : COLORS.light);
    if (isReducedMotion) {
      renderer.render(scene, camera);
    }
  }

  // Aplicar el color inicial
  applyColorFromMode();

  // Observar cambios en el class del body y html
  const modeObserver = new MutationObserver(applyColorFromMode);
  modeObserver.observe(document.body, {
    attributeFilter: ["class"],
  });
  modeObserver.observe(document.documentElement, {
    attributeFilter: ["class"],
  });

  // Render loop continuo (GSAP ticker) — mantiene la esfera viva y orgánica en toda la página
  function render() {
    positionBuf.needsUpdate = true;
    renderer.render(scene, camera);
  }

  renderer.render(scene, camera);
  if (!isReducedMotion) {
    gsap.ticker.add(render);
  }

  // Pausar cuando la pestaña está oculta para ahorrar batería/CPU
  function onVisibilityChange() {
    if (isReducedMotion) return;
    if (document.hidden) {
      gsap.ticker.remove(render);
      vertexTweens.forEach((tw) => tw.pause());
    } else {
      vertexTweens.forEach((tw) => tw.resume());
      gsap.ticker.add(render);
    }
  }
  document.addEventListener("visibilitychange", onVisibilityChange);

  // Mouse
  function onMouseMove(e) {
    if (isReducedMotion) return;
    const mx = (e.clientX / window.innerWidth) - 0.5;
    const my = (e.clientY / window.innerHeight) - 0.5;
    gsap.to(dots.rotation, {
      x: my * Math.PI * 0.7,
      z: mx * Math.PI * 0.4,
      duration: 4,
      ease: "power1.out",
    });
  }
  if (!isReducedMotion && !isMobile) {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
  }

  // Resize
  let resizeTm;
  function onResize() {
    canvas.style.width = "";
    canvas.style.height = "";
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    if (isReducedMotion) {
      renderer.render(scene, camera);
    }
  }
  function onWindowResize() {
    clearTimeout(resizeTm);
    resizeTm = setTimeout(onResize, 200);
  }
  window.addEventListener("resize", onWindowResize);

  // ScrollTrigger: recorrido de la esfera desde el Hero, pasando por las secciones y recuperando protagonismo al llegar al Footer
  let pageScrollTl = null;
  if (!isReducedMotion) {
    pageScrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    pageScrollTl
      // Tramo 1: Al bajar del Hero hacia las secciones intermedias
      .to(
        dots.rotation,
        { y: Math.PI * 0.75, duration: 0.7, ease: "none" },
        0
      )
      .to(
        camera.position,
        {
          z: () => getHeroCameraZ(window.innerWidth, window.innerHeight) * 0.74,
          duration: 0.7,
          ease: "none",
        },
        0
      )
      .to(
        material.uniforms.alpha,
        { value: 0.42, duration: 0.45, ease: "none" },
        0
      )
      // Tramo 2: Al llegar al Footer, la esfera cede el protagonismo al Cursor Ring Field del Footer
      .to(
        dots.rotation,
        { y: Math.PI * 1.25, duration: 0.3, ease: "none" },
        0.7
      )
      .to(
        material.uniforms.alpha,
        { value: 0.06, duration: 0.28, ease: "none" },
        0.72
      );
  }

  // Cleanup (Astro View Transitions) 
  document.addEventListener("astro:before-swap", () => {
    if (pageScrollTl) pageScrollTl.kill();
    vertexTweens.forEach((tw) => tw.kill());
    gsap.killTweensOf(vectors);
    gsap.killTweensOf(dots.rotation);
    gsap.ticker.remove(render);
    modeObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("resize", onWindowResize);
    clearTimeout(resizeTm);
    canvas.dataset.heroInitialized = "false";
    renderer.dispose();
    customGeom.dispose();
    material.dispose();
    dotTexture.dispose();
  }, { once: true });
}