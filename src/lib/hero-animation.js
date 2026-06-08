import * as THREE from "three";
import { gsap } from "gsap";

export function initHero() {
  const canvas = document.querySelector("#hero-scene");
  if (!canvas) return;

  let width  = canvas.offsetWidth;
  let height = canvas.offsetHeight;

  if (width === 0 || height === 0) {
    setTimeout(initHero, 100);
    return;
  }

  // ── Renderer ──────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0); // transparente — el fondo lo pone .hero en CSS

  // ── Escena & cámara ───────────────────────────────────────────────────────
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
  camera.position.set(0, 0, 80);

  // ── Textura del punto (canvas 2D, sin archivos externos) ──────────────────
  const dotTexture = (() => {
    const size = 64;
    const c    = document.createElement("canvas");
    c.width = c.height = size;
    const ctx  = c.getContext("2d");
    const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    grad.addColorStop(0,   "rgba(241, 241, 241, 0.8)");
    grad.addColorStop(0.4, "rgba(241, 241, 241, 0.8)");
    grad.addColorStop(1,   "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.Texture(c);
    tex.needsUpdate = true;
    return tex;
  })();

  // ── Geometría ─────────────────────────────────────────────────────────────
  const radius     = 64;
  const sphereGeom = new THREE.IcosahedronGeometry(radius, 13);
  const bufferGeom = new THREE.BufferGeometry();
  const verts      = sphereGeom.getAttribute
  
  const posAttr  = sphereGeom.getAttribute("position");
  const count    = posAttr.count;
  const positions = new Float32Array(count * 3);

  // Copiamos posiciones originales y animamos cada vértice
  const vectors = [];
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3(
      posAttr.getX(i),
      posAttr.getY(i),
      posAttr.getZ(i)
    );
    vectors.push(v);
    v.toArray(positions, i * 3);
  }

  const customGeom = new THREE.BufferGeometry();
  const positionBuf = new THREE.BufferAttribute(positions, 3);
  customGeom.setAttribute("position", positionBuf);

  // Animamos cada punto con GSAP (equivalente a TweenMax.to)
  vectors.forEach((v, i) => {
    gsap.to(v, {
      x:        0,
      z:        0,
      duration: 4,
      ease:     "back.out(1.7)",
      delay:    Math.abs(v.y / radius) * 2,
      repeat:   -1,
      yoyo:     true,
      yoyoEase: "back.out(1.7)",
      onUpdate() {
        positions[i * 3]     = v.x;
        positions[i * 3 + 2] = v.z;
      },
    });
  });

  // ── Shaders ───────────────────────────────────────────────────────────────
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
    void main() {
      vec4 texColor = texture2D(dotTexture, gl_PointCoord);
      gl_FragColor  = vec4(color, 1.0) * texColor;
    }
  `;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      dotTexture: { value: dotTexture },
      color:      { value: new THREE.Color(0xffffff) },
      size:       { value: 0.2 },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite:  false,
  });

  const dots = new THREE.Points(customGeom, material);
  scene.add(dots);

  // ── Color según modo (modo oscuro/claro) Agregar Funcionalidad de cambio de color según modo oscuro/claro




  

  // ── Render loop (GSAP ticker) ─────────────────────────────────────────────
  function render() {
    positionBuf.needsUpdate = true;
    renderer.render(scene, camera);
  }
  gsap.ticker.add(render);

  // ── Mouse ─────────────────────────────────────────────────────────────────
  function onMouseMove(e) {
    const mx = (e.clientX / window.innerWidth)  - 0.5;
    const my = (e.clientY / window.innerHeight) - 0.5;
    gsap.to(dots.rotation, {
      x:        my * Math.PI * 0.7,
      z:        mx * Math.PI * 0.4,
      duration: 4,
      ease:     "power1.out",
    });
  }
  window.addEventListener("mousemove", onMouseMove);

  // ── Resize ────────────────────────────────────────────────────────────────
  let resizeTm;
  function onResize() {
    canvas.style.width  = "";
    canvas.style.height = "";
    width  = canvas.offsetWidth;
    height = canvas.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener("resize", () => {
    clearTimeout(resizeTm);
    resizeTm = setTimeout(onResize, 200);
  });

  // ── Cleanup (Astro View Transitions) ──────────────────────────────────────
  document.addEventListener("astro:before-swap", () => {
    gsap.ticker.remove(render);
    window.removeEventListener("mousemove", onMouseMove);
    renderer.dispose();
  }, { once: true });
}