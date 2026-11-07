import * as THREE from "three";
import { gsap } from "gsap";

/**
 * Esfera Sináptica 3D en WebGL — Adaptación exacta de `js/demo1.js` (Mamboleoo / Codrops)
 * - 3000 nodos distribuidos con la fórmula esférica original de Demo 1 (radio 120)
 * - Movimiento radial individual por nodo (`moveDot` con GSAP `yoyo: true, repeat: -1`)
 * - Activación Sináptica con `THREE.Raycaster` (`threshold = 6.5`): al pasar el cursor de lado
 *   a lado, los nodos bajo el cursor se disparan con rebote elástico (`elastic.out(2, 0.2)`,
 *   `scaleX: 5 -> 11`) y se encienden en el Cian Eléctrico intenso de la letra "S" del logo (#00E5FF).
 * - Líneas sinápticas en Color Hueso (#EAE6DF en Dark Mode / Hueso-Piedra en Light Mode).
 */
export function initFinchSphere() {
  const canvas = document.querySelector("#finch-sphere-canvas");
  if (!canvas || canvas.dataset.finchSphereInit === "true") return;

  let width = canvas.offsetWidth || window.innerWidth;
  let height = canvas.offsetHeight || window.innerHeight;

  if (width === 0 || height === 0) {
    setTimeout(initFinchSphere, 80);
    return;
  }

  canvas.dataset.finchSphereInit = "true";

  // 1. Renderer WebGL
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  // 2. Escena, Raycaster y Cámara (Parámetros exactos de demo1.js)
  const scene = new THREE.Scene();

  const raycaster = new THREE.Raycaster();
  raycaster.params.Points.threshold = 8;

  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
  function getCameraZ(w) {
    if (w < 480) return 430;
    if (w < 768) return 390;
    return 350; // Valor original exacto de demo1.js
  }
  camera.position.set(0, 0, getCameraZ(width));

  const galaxy = new THREE.Group();
  scene.add(galaxy);

  // 3. Textura circular equivalente a img/dotTexture.png de demo1.js
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
  // En demo1.js hay 3 colores base:
  // [0]: Color protagonista (Cian de la letra "S" del logo: #00E5FF)
  // [1]: Color intermedio (Cian hielo / Hueso-Cian: #67E8F9 / #0284C7)
  // [2]: Color de soporte profundo (Hueso tenue / Acero: #5c6b73) para que al activar con el cursor resalten con fuerza
  const THEME_PALETTES = {
    dark: {
      dots: [
        new THREE.Color(0x00e5ff), // Cian Eléctrico (Letra "S" del logo)
        new THREE.Color(0x0284c7), // Cian Profundo (Letra "S" del logo)
        new THREE.Color(0x6e6a63), // Hueso oscuro subcortical en reposo (equivalente a 0x535353 de demo1.js)
      ],
      activeDot: new THREE.Color(0x00e5ff), // Encendido Cian Eléctrico puro al pasar el cursor
      segmentBone: new THREE.Color(0xeae6df), // Líneas en Color Hueso cálido
      segmentOpacity: 0.26,
    },
    light: {
      dots: [
        new THREE.Color(0x0284c7), // Cian Profundo (Letra "S")
        new THREE.Color(0x0369a1), // Cian Marino (Letra "S")
        new THREE.Color(0x8c8273), // Hueso-Piedra en reposo
      ],
      activeDot: new THREE.Color(0x00e5ff), // Encendido Cian Eléctrico puro al pasar el cursor
      segmentBone: new THREE.Color(0x6e6455), // Líneas en Color Hueso tostado para contraste en fondo claro
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

  // 5. Creación de los 3000 Nodos (Algoritmo exacto de demo1.js)
  const dotsAmount = 3000;
  const vertices = new Array(dotsAmount);
  const positions = new Float32Array(dotsAmount * 3);
  const sizes = new Float32Array(dotsAmount);
  const colorsAttribute = new Float32Array(dotsAmount * 3);

  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

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
    vector.glowMix = 0; // 0 = reposo, 1 = activado por el cursor

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

  // Función moveDot exacta de demo1.js
  function moveDot(vector, index) {
    const tempVector = vector.clone();
    tempVector.multiplyScalar((Math.random() - 0.5) * 0.2 + 1);
    gsap.to(vector, {
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
  }

  if (!isReducedMotion) {
    for (let i = 0; i < dotsAmount; i++) {
      if (Math.random() > 0.5) {
        moveDot(vertices[i], i);
      }
    }
  }

  // Shaders exactos de index.html (wrapVertexShader & wrapFragmentShader)
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

  // 6. Creación de los Segmentos Sinápticos (distancia < 12, igual que en demo1.js)
  const segmentIndices = [];
  const maxDistSq = 12 * 12;

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

  // Líneas de Color Hueso (Warm Bone en Dark Mode / Hueso-Piedra en Light Mode)
  const segmentsMat = new THREE.LineBasicMaterial({
    color: currentPalette.segmentBone,
    transparent: true,
    opacity: currentPalette.segmentOpacity,
  });

  const segments = new THREE.LineSegments(segmentsGeom, segmentsMat);
  galaxy.add(segments);

  // 7. Actualización de color individual de un nodo (mezcla reposo <-> activación cian)
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
  }

  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.body, { attributeFilter: ["class"] });
  themeObserver.observe(document.documentElement, {
    attributeFilter: ["class"],
  });

  // 9. Interacción Raycaster al pasar el cursor (Exacto a onDotHover / mouseOut de demo1.js + encendido de color Cian)
  let hovered = [];
  let prevHovered = [];

  function onDotHover(index) {
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

  // Coordenadas normalizadas del cursor respecto al canvas (exacto a demo1.js)
  const mouse = new THREE.Vector2(-100, -100);
  function onMouseMove(e) {
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
  window.addEventListener("mousemove", onMouseMove, { passive: true });

  // 10. Render Loop (Exacto a demo1.js)
  function render() {
    updateSegmentPositions();
    segmentPosAttr.needsUpdate = true;

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
    attributeSizes.needsUpdate = true;
    attributePositions.needsUpdate = true;
    renderer.render(scene, camera);
  }

  gsap.ticker.add(render);

  // 11. Resize Handler (Exacto a demo1.js)
  let resizeTm;
  function onResize() {
    if (!canvas) return;
    canvas.style.width = "";
    canvas.style.height = "";
    width = canvas.offsetWidth || window.innerWidth;
    height = canvas.offsetHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.position.z = getCameraZ(width);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
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
      gsap.ticker.remove(render);
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
