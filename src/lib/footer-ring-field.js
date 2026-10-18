/**
 * Cursor Ring Field (Gradient Dots Edition) — Animación interactiva para el Footer
 * Inspirada en Originkit (cursor-ring-field) y Google Antigravity, adaptada con
 * PUNTITOS CON GRADIENTE ("Gradient Dots"):
 * - Campo de puntos esféricos con gradiente propio distribuidos orgánicamente.
 * - Un anillo magnético sigue al cursor con suavizado (o navega solo cuando el puntero no está).
 * - Los puntitos cercanos al borde del anillo son empujados radialmente con ~86% de retención
 *   de velocidad y regresan flotando mediante física de resorte.
 * - Al pasar el anillo, cada puntito crece en escala, enciende su halo y transiciona
 *   hacia un gradiente vibrante según el tema (Violeta/Magenta/Índigo en Light Mode,
 *   Coral/Naranja/Ámbar en Dark Mode).
 */

let cleanupRingField = null;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Pre-renderiza sprites de puntitos con gradiente rico (núcleo + gradiente diagonal + halo suave)
 * para mantener 60fps constantes sin recalcular gradientes por cada partícula en cada frame.
 */
function createGradientDotSprites(isDark) {
  const size = 32;
  const half = size / 2;

  function makeOrb(colorCore, colorMid, colorEdge, glowAlpha) {
    const off = document.createElement("canvas");
    off.width = size;
    off.height = size;
    const octx = off.getContext("2d");

    // 1. Halo exterior difuso delicado
    if (glowAlpha > 0) {
      const outerGlow = octx.createRadialGradient(
        half,
        half,
        half * 0.15,
        half,
        half,
        half * 0.95
      );
      outerGlow.addColorStop(0, colorMid);
      outerGlow.addColorStop(0.5, colorEdge);
      outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      octx.globalAlpha = glowAlpha;
      octx.fillStyle = outerGlow;
      octx.beginPath();
      octx.arc(half, half, half * 0.95, 0, Math.PI * 2);
      octx.fill();
    }

    // 2. Núcleo con gradiente nítido (puntito gradient fino)
    octx.globalAlpha = 1;
    const coreRadius = half * 0.38;
    const orbGrad = octx.createRadialGradient(
      half - coreRadius * 0.25,
      half - coreRadius * 0.25,
      coreRadius * 0.08,
      half,
      half,
      coreRadius
    );
    orbGrad.addColorStop(0, colorCore);
    orbGrad.addColorStop(0.55, colorMid);
    orbGrad.addColorStop(1, colorEdge);

    octx.fillStyle = orbGrad;
    octx.beginPath();
    octx.arc(half, half, coreRadius, 0, Math.PI * 2);
    octx.fill();

    return off;
  }

  if (isDark) {
    return {
      // Modo Oscuro: Coral / Naranja / Ámbar
      idle: makeOrb(
        "rgba(255, 170, 145, 0.85)",
        "rgba(232, 75, 60, 0.7)",
        "rgba(207, 63, 77, 0.3)",
        0.06
      ),
      activeA: makeOrb(
        "#ffffff",
        "#ff7b54",
        "#e84b3c",
        0.4
      ),
      activeB: makeOrb(
        "#fff8e7",
        "#ffb26b",
        "#cf3f4d",
        0.4
      ),
      ringGlowInner: "rgba(232, 75, 60, 0.09)",
      ringGlowMid: "rgba(255, 123, 84, 0.04)",
    };
  }

  // Modo Claro: Violeta / Magenta / Índigo
  return {
    idle: makeOrb(
      "rgba(217, 70, 239, 0.85)",
      "rgba(154, 84, 224, 0.7)",
      "rgba(99, 102, 241, 0.3)",
      0.06
    ),
    activeA: makeOrb(
      "#ffffff",
      "#d946ef",
      "#9a54e0",
      0.38
    ),
    activeB: makeOrb(
      "#fdf4ff",
      "#9a54e0",
      "#6366f1",
      0.38
    ),
    ringGlowInner: "rgba(154, 84, 224, 0.08)",
    ringGlowMid: "rgba(217, 70, 239, 0.035)",
  };
}

export function initFooterRingField() {
  if (cleanupRingField) {
    cleanupRingField();
    cleanupRingField = null;
  }

  const canvas = document.getElementById("footer-ring-field");
  const footer = document.querySelector(".section-footer");
  if (!canvas || !footer) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let dots = [];
  let isDark = document.body.classList.contains("dark-mode");
  let sprites = createGradientDotSprites(isDark);

  // Estado del anillo magnético (Ring)
  let ringX = 0;
  let ringY = 0;
  let prevRingX = 0;
  let prevRingY = 0;
  let targetX = 0;
  let targetY = 0;
  let ringSpeed = 0;
  let pointerActive = false;
  let lastPointerTime = 0;

  // Control del loop de renderizado
  let rafId = null;
  let isVisible = false;
  let startTime = performance.now();

  function buildDotField() {
    dots = [];
    if (width <= 0 || height <= 0) return;

    // Densidad adaptativa (~360 puntitos delicados en desktop, proporcional en mobile)
    const targetCount = width < 640 ? 160 : width < 1024 ? 260 : 360;
    const area = width * height;
    const cellSize = Math.sqrt(area / targetCount);
    const cols = Math.max(8, Math.round(width / cellSize));
    const rows = Math.max(5, Math.round(height / cellSize));
    const stepX = width / cols;
    const stepY = height / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const jitterX = (Math.random() - 0.5) * stepX * 0.76;
        const jitterY = (Math.random() - 0.5) * stepY * 0.76;
        const hx = (c + 0.5) * stepX + jitterX;
        const hy = (r + 0.5) * stepY + jitterY;

        dots.push({
          hx,
          hy,
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
          phase: Math.random() * Math.PI * 2,
          freq: 0.9 + Math.random() * 1.1,
          variant: Math.random() > 0.45 ? "A" : "B",
          baseRadius: 0.85 + Math.random() * 0.85, // Puntitos chicos y elegantes (0.85px a 1.7px)
          energy: 0,
        });
      }
    }
  }

  function resize() {
    const rect = footer.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (ringX === 0 && ringY === 0) {
      ringX = targetX = prevRingX = width * 0.5;
      ringY = targetY = prevRingY = height * 0.5;
    }

    buildDotField();
    if (prefersReducedMotion) {
      renderFrame(performance.now());
    }
  }

  function renderFrame(now) {
    const t = (now - startTime) * 0.001;
    ctx.clearRect(0, 0, width, height);

    // Si el puntero no se movió recientemente dentro del footer, el anillo navega solo suavemente
    const idleElapsed = now - lastPointerTime;
    if (!pointerActive || idleElapsed > 2600) {
      const wanderRx = Math.min(width * 0.35, 440);
      const wanderRy = Math.min(height * 0.28, 140);
      targetX =
        width * 0.5 +
        Math.cos(t * 0.55) * wanderRx +
        Math.sin(t * 0.23) * (wanderRx * 0.25);
      targetY =
        height * 0.5 +
        Math.sin(t * 0.85) * wanderRy;
    }

    // Seguimiento suave del anillo hacia el objetivo
    prevRingX = ringX;
    prevRingY = ringY;
    const followFactor = pointerActive ? 0.13 : 0.05;
    ringX = lerp(ringX, targetX, followFactor);
    ringY = lerp(ringY, targetY, followFactor);

    const instSpeed = Math.hypot(ringX - prevRingX, ringY - prevRingY);
    ringSpeed = lerp(ringSpeed, instSpeed, 0.18);

    // Radio del anillo y grosor de su banda de influencia
    const baseRadius = width < 640 ? 92 : 135;
    const ringRadius =
      baseRadius + Math.sin(t * 1.7) * 10 + Math.min(ringSpeed * 0.6, 26);
    const bandSigma = width < 640 ? 38 : 50;
    const twoSigmaSq = 2 * bandSigma * bandSigma;

    // Halo atmosférico suave acompañando el anillo
    const auraOuter = ringRadius + bandSigma * 1.45;
    const auraGrad = ctx.createRadialGradient(
      ringX,
      ringY,
      Math.max(4, ringRadius * 0.35),
      ringX,
      ringY,
      auraOuter
    );
    auraGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
    auraGrad.addColorStop(0.55, sprites.ringGlowInner);
    auraGrad.addColorStop(0.8, sprites.ringGlowMid);
    auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(ringX, ringY, auraOuter, 0, Math.PI * 2);
    ctx.fill();

    // Constantes físicas (86% retención de velocidad + resorte suave de retorno)
    const velocityRetention = 0.86;
    const springK = 0.044;
    const pushStrength = 1.65 + Math.min(ringSpeed * 0.08, 1.1);

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const px = dot.hx + dot.ox;
      const py = dot.hy + dot.oy;

      const dx = px - ringX;
      const dy = py - ringY;
      const dist = Math.hypot(dx, dy) || 0.0001;

      // Distancia al borde (circunferencia) del anillo
      const ringDelta = dist - ringRadius;
      const ringWave = Math.exp(-(ringDelta * ringDelta) / twoSigmaSq);

      // Empuje interior suave para despejar el centro del anillo
      const innerPush =
        dist < ringRadius
          ? Math.pow(1 - dist / ringRadius, 1.5) * 0.42
          : 0;

      if (!prefersReducedMotion) {
        const totalPush = (ringWave * 1.28 + innerPush) * pushStrength;
        if (totalPush > 0.002) {
          const nx = dx / dist;
          const ny = dy / dist;
          dot.vx += nx * totalPush;
          dot.vy += ny * totalPush;
        }

        // Pequeña flotación orgánica ambiental
        const floatX = Math.cos(t * dot.freq + dot.phase) * 0.03;
        const floatY = Math.sin(t * dot.freq + dot.phase) * 0.03;

        // Fuerza de retorno elástica hacia su posición original
        dot.vx += -dot.ox * springK + floatX;
        dot.vy += -dot.oy * springK + floatY;

        // Retención del 86% de velocidad para que floten de regreso con memoria
        dot.vx *= velocityRetention;
        dot.vy *= velocityRetention;

        dot.ox += dot.vx;
        dot.oy += dot.vy;
      }

      // Energía (brillo + escala + gradiente intenso cuando el anillo cruza el puntito)
      const speedMag = Math.hypot(dot.vx, dot.vy);
      const pulse = (Math.sin(t * dot.freq + dot.phase) + 1) * 0.04;
      const targetEnergy = Math.min(
        1,
        ringWave * 1.2 +
          (dist < ringRadius ? 0.2 : 0) +
          Math.min(speedMag * 0.09, 0.35) +
          pulse
      );
      dot.energy = lerp(dot.energy, targetEnergy, 0.18);

      const e = dot.energy;
      const drawX = dot.hx + dot.ox;
      const drawY = dot.hy + dot.oy;

      // Tamaño visual fino y controlado
      const scale = 1 + e * 0.45;
      const spriteSize = dot.baseRadius * 3.4 * scale;
      const halfSprite = spriteSize * 0.5;

      // Dibujamos el puntito gradient base (sutil)
      const baseAlpha = isDark ? 0.38 : 0.32;
      ctx.globalAlpha = lerp(baseAlpha, 0.15, e);
      ctx.drawImage(
        sprites.idle,
        drawX - halfSprite,
        drawY - halfSprite,
        spriteSize,
        spriteSize
      );

      // Superponemos el puntito gradient iluminado cuando el anillo se acerca
      if (e > 0.03) {
        const activeSprite =
          dot.variant === "A" ? sprites.activeA : sprites.activeB;
        ctx.globalAlpha = Math.min(1, Math.pow(e, 0.72));
        ctx.drawImage(
          activeSprite,
          drawX - halfSprite,
          drawY - halfSprite,
          spriteSize,
          spriteSize
        );
      }
    }

    ctx.globalAlpha = 1;
  }

  function tick(now) {
    if (!isVisible) {
      rafId = null;
      return;
    }
    renderFrame(now);
    rafId = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (prefersReducedMotion) {
      renderFrame(performance.now());
      return;
    }
    if (!rafId && isVisible) {
      rafId = requestAnimationFrame(tick);
    }
  }

  function stopLoop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // Eventos de puntero sobre el footer
  function onPointerMove(e) {
    const rect = footer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= -40 && x <= rect.width + 40 && y >= -60 && y <= rect.height + 40) {
      targetX = Math.max(0, Math.min(rect.width, x));
      targetY = Math.max(0, Math.min(rect.height, y));
      pointerActive = true;
      lastPointerTime = performance.now();
    } else {
      pointerActive = false;
    }
  }

  function onPointerLeave() {
    pointerActive = false;
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  footer.addEventListener("pointerleave", onPointerLeave, { passive: true });

  // Observar visibilidad del footer para animar solo cuando está cerca o en pantalla
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      });
    },
    { rootMargin: "160px 0px" }
  );
  io.observe(footer);

  // Observar cambios de tamaño del footer
  const ro = new ResizeObserver(() => {
    resize();
  });
  ro.observe(footer);

  // Observar cambios de tema (Light / Dark Mode) y regenerar sprites de gradiente
  const themeObserver = new MutationObserver(() => {
    const nextDark = document.body.classList.contains("dark-mode");
    if (nextDark !== isDark) {
      isDark = nextDark;
      sprites = createGradientDotSprites(isDark);
      if (prefersReducedMotion || !isVisible) {
        renderFrame(performance.now());
      }
    }
  });
  themeObserver.observe(document.body, { attributeFilter: ["class"] });

  resize();

  cleanupRingField = () => {
    stopLoop();
    io.disconnect();
    ro.disconnect();
    themeObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    footer.removeEventListener("pointerleave", onPointerLeave);
  };

  document.addEventListener(
    "astro:before-swap",
    () => {
      if (cleanupRingField) {
        cleanupRingField();
        cleanupRingField = null;
      }
    },
    { once: true }
  );
}
