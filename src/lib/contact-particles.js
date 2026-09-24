import * as THREE from "three";
import { gsap } from "gsap";

export function initContactParticles() {
  const canvas = document.querySelector("#contact-particles");
  if (!canvas) return;

  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;

  if (width === 0 || height === 0) {
    setTimeout(initContactParticles, 100);
    return;
  }

  // Renderer 
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  // Escena & cámara 
  const scene = new THREE.Scene();

  // Cámara ortográfica: mapea 1 unidad = 1px virtualmente
  const frustumH = height;
  const frustumW = width;
  const camera = new THREE.OrthographicCamera(
    -frustumW / 2, frustumW / 2,
    frustumH / 2, -frustumH / 2,
    0.1, 1000
  );
  camera.position.z = 100;

  // Textura del punto (canvas 2D)
  const dotTexture = (() => {
    const size = 32;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.Texture(c);
    tex.needsUpdate = true;
    return tex;
  })();

  // Partículas 
  const COUNT = 180;

  // Datos por partícula: posición x, y, z + velocidad de caída
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT); // unidades/frame

  function randomX() { return (Math.random() - 0.5) * width; }
  function randomY() { return (Math.random() * 0.5 + 0.5) * frustumH; }  // arriba del viewport

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = randomX();
    positions[i * 3 + 1] = randomY();
    positions[i * 3 + 2] = 0;
    speeds[i] = 0.3 + Math.random() * 0.9; // velocidad aleatoria
  }

  const geometry = new THREE.BufferGeometry();
  const posAttr = new THREE.BufferAttribute(positions, 3);
  geometry.setAttribute("position", posAttr);

  // Material con shader (igual al Hero)
  const vertexShader = /* glsl */`
    uniform float size;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size;
      gl_Position  = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = /* glsl */`
    uniform sampler2D dotTexture;
    uniform vec3 color;
    uniform float globalAlpha;
    void main() {
      vec4 tex = texture2D(dotTexture, gl_PointCoord);
      gl_FragColor = vec4(color, globalAlpha) * tex;
    }
  `;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      dotTexture: { value: dotTexture },
      color: { value: new THREE.Color(0x000000) },
      globalAlpha: { value: 1.0 },
      size: { value: 3.5 },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Colores dark / light (mismo patrón que Hero)
  const COLORS = {
    dark: new THREE.Color(0xffffff),  // puntos blancos sobre fondo oscuro
    light: new THREE.Color(0x1a1a1a),  // puntos casi negros sobre fondo claro
  };

  function applyColorFromMode() {
    const isDark = document.body.classList.contains("dark-mode");
    material.uniforms.color.value.set(isDark ? COLORS.dark : COLORS.light);
  }
  applyColorFromMode();

  const modeObserver = new MutationObserver(applyColorFromMode);
  modeObserver.observe(document.body, { attributeFilter: ["class"] });

  // Loop de animación 
  // prefers-reduced-motion: pausamos el movimiento
  const mm = gsap.matchMedia();
  let paused = false;

  mm.add("(prefers-reduced-motion: reduce)", () => {
    paused = true;
    return () => { paused = false; };
  });

  function render() {
    if (!paused) {
      for (let i = 0; i < COUNT; i++) {
        // mover hacia abajo
        positions[i * 3 + 1] -= speeds[i];

        // reciclar cuando sale del viewport por abajo
        if (positions[i * 3 + 1] < -frustumH / 2 - 20) {
          positions[i * 3] = randomX();
          positions[i * 3 + 1] = frustumH / 2 + 20; // vuelve arriba
        }
      }
      posAttr.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  gsap.ticker.add(render);

  // Fade-in suave al entrar
  gsap.fromTo(material.uniforms.globalAlpha, { value: 0 }, { value: 1, duration: 2, ease: "power2.out" });

  // Resize
  let resizeTm;
  function onResize() {
    canvas.style.width = "";
    canvas.style.height = "";
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;

    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener("resize", () => {
    clearTimeout(resizeTm);
    resizeTm = setTimeout(onResize, 200);
  });

  // Cleanup (Astro View Transitions)
  document.addEventListener("astro:before-swap", () => {
    modeObserver.disconnect();
    gsap.ticker.remove(render);
    mm.revert();
    renderer.dispose();
  }, { once: true });
}
