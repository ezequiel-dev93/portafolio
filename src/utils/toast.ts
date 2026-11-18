export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastOptions {
  id?: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

const DEFAULT_DURATION = 4000;
const MAX_VISIBLE_TOASTS = 3;

const ICONS: Record<ToastType, string> = {
  success: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  error: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`,
  info: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
};

interface ActiveToast {
  id: string;
  el: HTMLElement;
  timerId: number | null;
  remaining: number;
  startTime: number;
  dismiss: () => void;
}

const activeToasts = new Map<string, ActiveToast>();

function getToasterContainer(): HTMLElement {
  let container = document.getElementById("sonner-toaster");
  if (!container) {
    container = document.createElement("aside");
    container.id = "sonner-toaster";
    container.className = "sonner-toaster";
    container.setAttribute("aria-label", "Notificaciones del sistema");
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-relevant", "additions text");
    document.body.appendChild(container);
  }
  return container;
}

export function showToast(options: ToastOptions): void {
  if (typeof document === "undefined") return;

  const {
    type = "info",
    title,
    description = "",
    duration = DEFAULT_DURATION,
    id = `${type}-${title}-${description}`,
  } = options;

  const container = getToasterContainer();

  // Si ya existe un toast idéntico activo, reiniciamos su temporizador y le damos un pulso sutil
  const existing = activeToasts.get(id);
  if (existing) {
    if (existing.timerId !== null) {
      window.clearTimeout(existing.timerId);
    }
    existing.el.classList.remove("is-pulsing");
    void existing.el.offsetWidth;
    existing.el.classList.add("is-pulsing");

    const titleEl = existing.el.querySelector(".sonner-toast__title");
    const descEl = existing.el.querySelector(".sonner-toast__desc");
    if (titleEl) titleEl.textContent = title;
    if (descEl) {
      descEl.textContent = description;
      (descEl as HTMLElement).style.display = description ? "block" : "none";
    }

    existing.remaining = duration;
    existing.startTime = performance.now();
    existing.timerId = window.setTimeout(existing.dismiss, duration);
    return;
  }

  // Limitar cantidad máxima de toasts simultáneos en pantalla
  if (activeToasts.size >= MAX_VISIBLE_TOASTS) {
    const oldestKey = activeToasts.keys().next().value;
    if (oldestKey) {
      activeToasts.get(oldestKey)?.dismiss();
    }
  }

  const toastEl = document.createElement("div");
  toastEl.className = `sonner-toast sonner-toast--${type}`;
  toastEl.setAttribute("role", type === "error" ? "alert" : "status");

  const iconWrap = document.createElement("div");
  iconWrap.className = "sonner-toast__icon";
  iconWrap.innerHTML = ICONS[type];

  const contentWrap = document.createElement("div");
  contentWrap.className = "sonner-toast__content";

  const titleEl = document.createElement("strong");
  titleEl.className = "sonner-toast__title";
  titleEl.textContent = title;
  contentWrap.appendChild(titleEl);

  if (description) {
    const descEl = document.createElement("p");
    descEl.className = "sonner-toast__desc";
    descEl.textContent = description;
    contentWrap.appendChild(descEl);
  }

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "sonner-toast__close";
  closeBtn.setAttribute("aria-label", "Cerrar notificación");
  closeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

  const progressBar = document.createElement("div");
  progressBar.className = "sonner-toast__progress";
  progressBar.style.animationDuration = `${duration}ms`;

  toastEl.appendChild(iconWrap);
  toastEl.appendChild(contentWrap);
  toastEl.appendChild(closeBtn);
  toastEl.appendChild(progressBar);

  let isDismissed = false;
  const dismiss = () => {
    if (isDismissed) return;
    isDismissed = true;
    const item = activeToasts.get(id);
    if (item && item.timerId !== null) {
      window.clearTimeout(item.timerId);
    }
    activeToasts.delete(id);

    toastEl.classList.remove("is-visible");
    toastEl.classList.add("is-leaving");
    window.setTimeout(() => {
      toastEl.remove();
    }, 320);
  };

  closeBtn.addEventListener("click", dismiss);

  const toastRecord: ActiveToast = {
    id,
    el: toastEl,
    timerId: null,
    remaining: duration,
    startTime: performance.now(),
    dismiss,
  };

  // Pausar el temporizador al pasar el mouse por encima (estilo Sonner)
  toastEl.addEventListener("pointerenter", () => {
    if (toastRecord.timerId !== null) {
      window.clearTimeout(toastRecord.timerId);
      toastRecord.timerId = null;
      const elapsed = performance.now() - toastRecord.startTime;
      toastRecord.remaining = Math.max(800, toastRecord.remaining - elapsed);
      progressBar.style.animationPlayState = "paused";
    }
  });

  toastEl.addEventListener("pointerleave", () => {
    if (!isDismissed && toastRecord.timerId === null) {
      toastRecord.startTime = performance.now();
      toastRecord.timerId = window.setTimeout(dismiss, toastRecord.remaining);
      progressBar.style.animationPlayState = "running";
    }
  });

  activeToasts.set(id, toastRecord);
  container.appendChild(toastEl);

  // Trigger de animación de entrada en el siguiente frame
  requestAnimationFrame(() => {
    toastEl.classList.add("is-visible");
  });

  toastRecord.timerId = window.setTimeout(dismiss, duration);
}

export const toast = {
  show: showToast,
  success(title: string, description?: string, id?: string, duration?: number) {
    showToast({ type: "success", title, description, id, duration });
  },
  warning(title: string, description?: string, id?: string, duration?: number) {
    showToast({ type: "warning", title, description, id, duration });
  },
  error(title: string, description?: string, id?: string, duration?: number) {
    showToast({ type: "error", title, description, id, duration });
  },
  info(title: string, description?: string, id?: string, duration?: number) {
    showToast({ type: "info", title, description, id, duration });
  },
};
