import * as THREE from "three";
import { gsap } from "gsap";

/**
 * Esfera Sináptica 3D en WebGL — Optimizada para Desktop & Mobile
 * - Adaptación de densidad según dispositivo (3000 nodos en Desktop / 1200 en Mobile)
 * - Soporte completo para `prefers-reduced-motion: reduce` (renderizado estático sin loops)
 * - Fallback elegante si el navegador o hardware no soporta WebGL
 * - Pausa automática de GPU/CPU vía IntersectionObserver cuando el Hero sale del viewport
 */
export function initFinchSphere() {
  const canvas = document.querySelector("#finch-sphere-canvas");
  if (!canvas || canvas.dataset.finchSphereInit === "true") return;

  const wrapEl = canvas.parentElement;
  let width = canvas.offsetWidth || (wrapEl ? wrapEl.offsetWidth : window.innerWidth);
  let height = canvas.offsetHeight || (wrapEl ? wrapEl.offsetHeight : window.innerHeight);

  if (width === 0 || height === 0) {
    setTimeout(initFinchSphere, 80);
    return;
  }

  canvas.dataset.finchSphereInit = "true";

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 1. Renderer WebGL con Fallback seguro si no hay soporte WebGL
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (err) {
    if (wrapEl) wrapEl.classList.add("finch-page__canvas-wrap--fallback");
    return;
  }

  const maxDpr = isMobile ? 1.5 : 2;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  // 2. Escena, Raycaster y Cámara
  const scene = new THREE.Scene();

  const raycaster = new THREE.Raycaster();
  raycaster.params.Points.threshold = 8;

  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
  function getCameraZ(w) {
    if (w < 480) return 340;
    if (w < 768) return 330;
    return 320;
  }
  camera.position.set(0, 0, getCameraZ(width));

  const galaxy = new THREE.Group();
  scene.add(galaxy);

  // 3. Textura circular generada en memoria
  const dotTexture = (() => {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.55, "rgba(255, 255, 255, 0.95)");
    grad.addColorStop(0.8, "rgba(255, 255, 255, 0.35)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.Texture(c);
    tex.needsUpdate = true;
    return tex;
  })();

  // 4. Paletas de Color (Dark Mode & Light Mode)
  const THEME_PALETTES = {
    dark: {
      dots: [
        new THREE.Color(0x00e5ff),
        new THREE.Color(0x0284c7),
        new THREE.Color(0x6e6a63),
      ],
      activeDot: new THREE.Color(0x00e5ff),
      segmentBone: new THREE.Color(0xeae6df),
      segmentOpacity: 0.26,
    },
    light: {
      dots: [
        new THREE.Color(0x0284c7),
        new THREE.Color(0x0369a1),
        new THREE.Color(0x8c8273),
      ],
      activeDot: new THREE.Color(0x00e5ff),
      segmentBone: new THREE.Color(0x6e6455),
      segmentOpacity: 0.29,
    },
  };

  function getCurrentPalette() {
    const isDark =
      document.body.classList.contains("dark-mode") ||
      document.documentElement.classList.contains("dark-mode");
    return isDark ? THEME_PALETTES.dark : THEME_PALETTES.light;
  }

  let currentPalette = getCurrentPalette();

  // 5. Creación de Nodos (Adaptativo para rendimiento móvil)
  const dotsAmount = isMobile ? 1200 : 3000;
  const maxDist = isMobile ? 17.5 : 12;
  const maxDistSq = maxDist * maxDist;

  const vertices = new Array(dotsAmount);
  const positions = new Float32Array(dotsAmount * 3);
  const sizes = new Float32Array(dotsAmount);
  const colorsAttribute = new Float32Array(dotsAmount * 3);

  for (let i = 0; i < dotsAmount; i++) {
    const vector = new THREE.Vector3();

    vector.colorIndex = Math.floor(Math.random() * 3);
    vector.theta = Math.random() * Math.PI * 2;
    vector.phi =
      (((1 - Math.sqrt(Math.random())) * Math.PI) / 2) *
      (Math.random() > 0.5 ? 1 : -1);

    vector.x = Math.cos(vector.theta) * Math.cos(vector.phi);
    vector.y = Math.sin(vector.phi);
    vector.z = Math.sin(vector.theta) * Math.cos(vector.phi);
    vector.multiplyScalar(120 + (Math.random() - 0.5) * 5);
    vector.scaleX = 5;
    vector.glowMix = 0;

    vertices[i] = vector;
    vector.toArray(positions, i * 3);
    currentPalette.dots[vector.colorIndex].toArray(colorsAttribute, i * 3);
    sizes[i] = 5;
  }

  const bufferWrapGeom = new THREE.BufferGeometry();
  const attributePositions = new THREE.BufferAttribute(positions, 3);
  bufferWrapGeom.setAttribute("position", attributePositions);

  const attributeSizes = new THREE.BufferAttribute(sizes, 1);
  bufferWrapGeom.setAttribute("size", attributeSizes);

  const attributeColors = new THREE.BufferAttribute(colorsAttribute, 3);
  bufferWrapGeom.setAttribute("color", attributeColors);

  const dotTweens = [];
  function moveDot(vector, index) {
    const tempVector = vector.clone();
    tempVector.multiplyScalar((Math.random() - 0.5) * 0.2 + 1);
    const tw = gsap.to(vector, {
      duration: Math.random() * 3 + 3,
      x: tempVector.x,
      y: tempVector.y,
      z: tempVector.z,
      yoyo: true,
      repeat: -1,
      delay: -Math.random() * 3,
      ease: "none",
      onUpdate() {
        attributePositions.array[index * 3] = vector.x;
        attributePositions.array[index * 3 + 1] = vector.y;
        attributePositions.array[index * 3 + 2] = vector.z;
      },
    });
    dotTweens.push(tw);
  }

  if (!isReducedMotion) {
    const moveProb = isMobile ? 0.35 : 0.5;
    for (let i = 0; i < dotsAmount; i++) {
      if (Math.random() < moveProb) {
        moveDot(vertices[i], i);
      }
    }
  }

  const vertexShader = /* glsl */ `
    attribute float size;
    attribute vec3 color;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = size * ( 350.0 / - mvPosition.z );
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = /* glsl */ `
    varying vec3 vColor;
    uniform sampler2D uTexture;
    void main() {
      vec4 textureColor = texture2D( uTexture, gl_PointCoord );
      if ( textureColor.a < 0.3 ) discard;
      vec4 outColor = vec4(vColor.xyz, 1.0) * textureColor;
      gl_FragColor = outColor;
    }
  `;

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: dotTexture },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
  });

  const wrap = new THREE.Points(bufferWrapGeom, shaderMaterial);
  scene.add(wrap);

  // 6. Creación de los Segmentos Sinápticos
  const segmentIndices = [];

  for (let i = dotsAmount - 1; i >= 0; i--) {
    const vA = vertices[i];
    for (let j = i - 1; j >= 0; j--) {
      const vB = vertices[j];
      const dx = vA.x - vB.x;
      const dy = vA.y - vB.y;
      const dz = vA.z - vB.z;
      if (dx * dx + dy * dy + dz * dz < maxDistSq) {
        segmentIndices.push(i, j);
      }
    }
  }

  const numSegments = segmentIndices.length / 2;
  const segmentPositions = new Float32Array(numSegments * 6);

  function updateSegmentPositions() {
    for (let s = 0; s < numSegments; s++) {
      const vA = vertices[segmentIndices[s * 2]];
      const vB = vertices[segmentIndices[s * 2 + 1]];
      const offset = s * 6;
      segmentPositions[offset] = vA.x;
      segmentPositions[offset + 1] = vA.y;
      segmentPositions[offset + 2] = vA.z;
      segmentPositions[offset + 3] = vB.x;
      segmentPositions[offset + 4] = vB.y;
      segmentPositions[offset + 5] = vB.z;
    }
  }
  updateSegmentPositions();

  const segmentsGeom = new THREE.BufferGeometry();
  const segmentPosAttr = new THREE.BufferAttribute(segmentPositions, 3);
  segmentsGeom.setAttribute("position", segmentPosAttr);

  const segmentsMat = new THREE.LineBasicMaterial({
    color: currentPalette.segmentBone,
    transparent: true,
    opacity: currentPalette.segmentOpacity,
  });

  const segments = new THREE.LineSegments(segmentsGeom, segmentsMat);
  galaxy.add(segments);

  // 7. Actualización de color individual de un nodo
  const tempColor = new THREE.Color();
  function updateDotColor(index) {
    const v = vertices[index];
    const baseCol = currentPalette.dots[v.colorIndex];
    tempColor.copy(baseCol).lerp(currentPalette.activeDot, v.glowMix);
    attributeColors.array[index * 3] = tempColor.r;
    attributeColors.array[index * 3 + 1] = tempColor.g;
    attributeColors.array[index * 3 + 2] = tempColor.b;
  }

  // 8. Cambio reactivo entre Dark Mode y Light Mode
  function applyTheme() {
    currentPalette = getCurrentPalette();
    segmentsMat.color.copy(currentPalette.segmentBone);
    segmentsMat.opacity = currentPalette.segmentOpacity;

    for (let i = 0; i < dotsAmount; i++) {
      updateDotColor(i);
    }
    attributeColors.needsUpdate = true;
    if (isReducedMotion) {
      renderer.render(scene, camera);
    }
  }

  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.body, { attributeFilter: ["class"] });
  themeObserver.observe(document.documentElement, {
    attributeFilter: ["class"],
  });

  // 9. Interacción Raycaster al pasar el cursor
  let hovered = [];
  let prevHovered = [];

  function onDotHover(index) {
    if (isReducedMotion) return;
    const v = vertices[index];
    if (v.tl) v.tl.kill();
    v.tl = gsap.timeline();
    v.tl.to(v, {
      duration: 1,
      scaleX: 11.5,
      glowMix: 1,
      ease: "elastic.out(2, 0.2)",
      onUpdate() {
        attributeSizes.array[index] = v.scaleX;
        updateDotColor(index);
        attributeColors.needsUpdate = true;
      },
    });
  }

  function mouseOut(index) {
    if (isReducedMotion) return;
    const v = vertices[index];
    if (v.tl) v.tl.kill();
    v.tl = gsap.timeline();
    v.tl.to(v, {
      duration: 0.4,
      scaleX: 5,
      glowMix: 0,
      ease: "power2.out",
      onUpdate() {
        attributeSizes.array[index] = v.scaleX;
        updateDotColor(index);
        attributeColors.needsUpdate = true;
      },
    });
  }

  const mouse = new THREE.Vector2(-100, -100);
  function onMouseMove(e) {
    if (isReducedMotion) return;
    const canvasBounding = canvas.getBoundingClientRect();
    if (
      e.clientY < canvasBounding.top ||
      e.clientY > canvasBounding.bottom ||
      e.clientX < canvasBounding.left ||
      e.clientX > canvasBounding.right
    ) {
      mouse.set(-100, -100);
      return;
    }
    mouse.x = ((e.clientX - canvasBounding.left) / width) * 2 - 1;
    mouse.y = -((e.clientY - canvasBounding.top) / height) * 2 + 1;
  }
  if (!isReducedMotion && !isMobile) {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
  }

  // 10. Render Loop y Control de Visibilidad (0% GPU fuera de pantalla)
  let isTickerActive = false;

  function render() {
    updateSegmentPositions();
    segmentPosAttr.needsUpdate = true;

    if (!isMobile) {
      raycaster.setFromCamera(mouse, camera);
      const intersections = raycaster.intersectObjects([wrap]);
      hovered = [];

      if (intersections.length) {
        for (let i = 0; i < intersections.length; i++) {
          const index = intersections[i].index;
          hovered.push(index);
          if (prevHovered.indexOf(index) === -1) {
            onDotHover(index);
          }
        }
      }

      for (let i = 0; i < prevHovered.length; i++) {
        if (hovered.indexOf(prevHovered[i]) === -1) {
          mouseOut(prevHovered[i]);
        }
      }

      prevHovered = hovered.slice(0);
    }

    attributeSizes.needsUpdate = true;
    attributePositions.needsUpdate = true;
    renderer.render(scene, camera);
  }

  function startLoop() {
    if (isReducedMotion || isTickerActive) return;
    isTickerActive = true;
    dotTweens.forEach((tw) => tw.resume());
    gsap.ticker.add(render);
  }

  function stopLoop() {
    if (!isTickerActive) return;
    isTickerActive = false;
    gsap.ticker.remove(render);
    dotTweens.forEach((tw) => tw.pause());
  }

  // Primer frame inmediato (sirve también como vista fija para prefers-reduced-motion)
  renderer.render(scene, camera);
  if (!isReducedMotion) {
    startLoop();
  }

  // Pausar cuando el Hero no está visible en el viewport
  const heroSection = document.querySelector("#top-finch") || wrapEl;
  let io;
  if (heroSection && "IntersectionObserver" in window && !isReducedMotion) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
          }
        });
      },
      { threshold: 0.05 }
    );
    io.observe(heroSection);
  }

  // 11. Resize Handler
  let resizeTm;
  function onResize() {
    if (!canvas) return;
    canvas.style.width = "";
    canvas.style.height = "";
    width = canvas.offsetWidth || (wrapEl ? wrapEl.offsetWidth : window.innerWidth);
    height = canvas.offsetHeight || (wrapEl ? wrapEl.offsetHeight : window.innerHeight);
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.position.z = getCameraZ(width);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    clearTimeout(resizeTm);
    resizeTm = setTimeout(onResize, 200);
  }
  window.addEventListener("resize", onWindowResize);

  // 12. Cleanup en navegación de Astro
  document.addEventListener(
    "astro:before-swap",
    () => {
      stopLoop();
      if (io) io.disconnect();
      vertices.forEach((v) => {
        gsap.killTweensOf(v);
        if (v.tl) v.tl.kill();
      });
      themeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      clearTimeout(resizeTm);
      canvas.dataset.finchSphereInit = "false";
      renderer.dispose();
      bufferWrapGeom.dispose();
      shaderMaterial.dispose();
      segmentsGeom.dispose();
      segmentsMat.dispose();
      dotTexture.dispose();
    },
    { once: true }
  );
}
