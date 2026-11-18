import { toast, type ToastType } from "@/utils/toast";

export type ContactFieldName = "name" | "email" | "message";

export interface FieldValidationResult {
  valid: boolean;
  inlineMessage: string;
  toastTitle: string;
  toastDescription: string;
  toastType: ToastType;
}

declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      sendForm: (
        serviceId: string,
        templateId: string,
        form: HTMLFormElement
      ) => Promise<{ status: number; text: string }>;
    };
  }
}

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 80;
const MIN_MESSAGE_LENGTH = 15;
const MAX_MESSAGE_LENGTH = 1000;

/*
 - Valida el campo Nombre completo o Empresa (#name)
*/
export function validateNameField(rawValue: string): FieldValidationResult {
  const value = rawValue.trim();

  if (value.length === 0) {
    return {
      valid: false,
      inlineMessage: "Ingresá tu nombre o el de tu empresa.",
      toastTitle: "Nombre requerido",
      toastDescription: "Completá tu nombre o el nombre de tu empresa para continuar.",
      toastType: "warning",
    };
  }

  if (value.length < MIN_NAME_LENGTH) {
    const missing = MIN_NAME_LENGTH - value.length;
    return {
      valid: false,
      inlineMessage: `El nombre es muy corto (mínimo ${MIN_NAME_LENGTH} caracteres).`,
      toastTitle: "Nombre incompleto",
      toastDescription: `Agregá al menos ${missing} ${missing === 1 ? "carácter" : "caracteres"} más en tu nombre.`,
      toastType: "warning",
    };
  }

  if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/.test(value)) {
    return {
      valid: false,
      inlineMessage: "El nombre debe contener letras válidas.",
      toastTitle: "Formato de nombre inválido",
      toastDescription: "El nombre no puede estar formado únicamente por números o símbolos.",
      toastType: "error",
    };
  }

  if (value.length > MAX_NAME_LENGTH) {
    return {
      valid: false,
      inlineMessage: `El nombre no puede superar los ${MAX_NAME_LENGTH} caracteres.`,
      toastTitle: "Nombre demasiado extenso",
      toastDescription: `Por favor reducí el texto a un máximo de ${MAX_NAME_LENGTH} caracteres.`,
      toastType: "warning",
    };
  }

  return {
    valid: true,
    inlineMessage: "¡Nombre válido!",
    toastTitle: "Nombre correcto",
    toastDescription: `Perfecto, "${value}" quedó registrado.`,
    toastType: "success",
  };
}

/*
 - Valida paso a paso el Correo Electrónico (#email):
 - detecta falta de '@', falta de usuario, falta de proveedor (gmail, empresa, etc.) y extensión (.com, .ar, etc.)
*/
export function validateEmailField(rawValue: string): FieldValidationResult {
  const value = rawValue.trim();

  if (value.length === 0) {
    return {
      valid: false,
      inlineMessage: "Ingresá tu correo electrónico.",
      toastTitle: "Correo electrónico requerido",
      toastDescription: "Necesito tu correo para poder enviarte la devolución de tu proyecto.",
      toastType: "warning",
    };
  }

  if (/\s/.test(value)) {
    return {
      valid: false,
      inlineMessage: "El correo no debe contener espacios en blanco.",
      toastTitle: "Correo con espacios",
      toastDescription: "Eliminá los espacios en blanco dentro de la dirección de correo.",
      toastType: "error",
    };
  }

  if (!value.includes("@")) {
    return {
      valid: false,
      inlineMessage: "Falta incluir el '@' y el dominio (ej: usuario@gmail.com).",
      toastTitle: "Falta el símbolo '@'",
      toastDescription: `A "${value}" le falta el '@' y el proveedor de correo (ej: ${value}@gmail.com).`,
      toastType: "warning",
    };
  }

  const parts = value.split("@");
  if (parts.length > 2) {
    return {
      valid: false,
      inlineMessage: "El correo solo puede contener un símbolo '@'.",
      toastTitle: "Formato de correo inválido",
      toastDescription: "Verificá que la dirección tenga un único símbolo '@'.",
      toastType: "error",
    };
  }

  const [localPart, domainPart] = parts;

  if (!localPart) {
    return {
      valid: false,
      inlineMessage: "Falta tu nombre de usuario antes del '@'.",
      toastTitle: "Usuario de correo incompleto",
      toastDescription: `Escribí tu usuario antes de "@${domainPart || "gmail.com"}".`,
      toastType: "warning",
    };
  }

  if (!domainPart) {
    return {
      valid: false,
      inlineMessage: "Falta el dominio después del '@' (ej: gmail.com, empresa.com).",
      toastTitle: "Falta el proveedor de correo",
      toastDescription: `Completá qué sigue después de "${localPart}@" (ej: gmail.com, outlook.com o tu dominio).`,
      toastType: "warning",
    };
  }

  if (!domainPart.includes(".")) {
    return {
      valid: false,
      inlineMessage: `Falta la extensión en '@${domainPart}' (ej: @${domainPart}.com).`,
      toastTitle: "Dominio de correo incompleto",
      toastDescription: `Agregá la extensión final al dominio (por ejemplo: "${localPart}@${domainPart}.com").`,
      toastType: "warning",
    };
  }

  const domainSegments = domainPart.split(".");
  const tld = domainSegments[domainSegments.length - 1] || "";

  if (domainSegments.some((seg) => seg.length === 0) || tld.length < 2) {
    return {
      valid: false,
      inlineMessage: "Completá la extensión del correo luego del punto (ej: .com, .ar).",
      toastTitle: "Extensión de dominio incompleta",
      toastDescription: "La terminación después del punto debe tener al menos 2 letras (ej: .com, .org, .ar).",
      toastType: "warning",
    };
  }

  const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!strictEmailRegex.test(value)) {
    return {
      valid: false,
      inlineMessage: "El formato del correo electrónico contiene caracteres inválidos.",
      toastTitle: "Correo inválido",
      toastDescription: "Revisá que no haya símbolos especiales no permitidos en el correo.",
      toastType: "error",
    };
  }

  return {
    valid: true,
    inlineMessage: "¡Correo electrónico válido!",
    toastTitle: "Correo verificado",
    toastDescription: `Dirección "${value}" lista para recibir respuesta.`,
    toastType: "success",
  };
}

/*
 - Valida la Descripción del proyecto (#message) con contador de caracteres restantes
*/
export function validateMessageField(rawValue: string): FieldValidationResult {
  const value = rawValue.trim();

  if (value.length === 0) {
    return {
      valid: false,
      inlineMessage: "Contame brevemente sobre tu proyecto o consulta.",
      toastTitle: "Falta la descripción",
      toastDescription: "Escribí unas líneas contando sobre tu idea, sitio web o propuesta.",
      toastType: "warning",
    };
  }

  if (value.length < MIN_MESSAGE_LENGTH) {
    const remaining = MIN_MESSAGE_LENGTH - value.length;
    const label = remaining === 1 ? "carácter" : "caracteres";
    return {
      valid: false,
      inlineMessage: `Contame un poco más sobre tu idea (faltan ${remaining} ${label}).`,
      toastTitle: "Descripción muy breve",
      toastDescription: `Agregá al menos ${remaining} ${label} más para que pueda analizar mejor tu proyecto.`,
      toastType: "warning",
    };
  }

  if (value.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      inlineMessage: `El mensaje supera el límite de ${MAX_MESSAGE_LENGTH} caracteres.`,
      toastTitle: "Descripción demasiado extensa",
      toastDescription: `Reducí el mensaje a un máximo de ${MAX_MESSAGE_LENGTH} caracteres.`,
      toastType: "warning",
    };
  }

  return {
    valid: true,
    inlineMessage: "¡Excelente! Descripción lista.",
    toastTitle: "Descripción completa",
    toastDescription: "El detalle de tu proyecto está listo para enviarse.",
    toastType: "success",
  };
}

/*
 - Aplica el estado visual y ARIA a un campo del formulario
*/
function applyFieldUIState(
  field: HTMLInputElement | HTMLTextAreaElement,
  result: FieldValidationResult | null
): void {
  const group = field.closest(".contact__form-group");
  const messageElement = group?.querySelector<HTMLElement>(".contact__message");

  if (!result) {
    field.classList.remove("contact__input--error", "contact__input--success");
    field.setAttribute("aria-invalid", "false");
    if (messageElement) {
      messageElement.textContent = "";
      messageElement.classList.remove(
        "contact__message--error",
        "contact__message--success"
      );
    }
    return;
  }

  if (result.valid) {
    field.classList.remove("contact__input--error");
    field.classList.add("contact__input--success");
    field.setAttribute("aria-invalid", "false");
    if (messageElement) {
      messageElement.textContent = result.inlineMessage;
      messageElement.classList.remove("contact__message--error");
      messageElement.classList.add("contact__message--success");
    }
  } else {
    field.classList.add("contact__input--error");
    field.classList.remove("contact__input--success");
    field.setAttribute("aria-invalid", "true");
    if (messageElement) {
      messageElement.textContent = result.inlineMessage;
      messageElement.classList.add("contact__message--error");
      messageElement.classList.remove("contact__message--success");
    }
  }
}

/*
 - Inicializa la validación interactiva y el envío del formulario de contacto
*/
export function initContactFormValidation(): void {
  const form = document.querySelector<HTMLFormElement>("#form");
  const nameField = document.querySelector<HTMLInputElement>("#name");
  const emailField = document.querySelector<HTMLInputElement>("#email");
  const messageField = document.querySelector<HTMLTextAreaElement>("#message");
  const submitBtn = document.querySelector<HTMLButtonElement>("#button");
  const honeypotField = document.querySelector<HTMLInputElement>("#honeypot");

  if (!form || !nameField || !emailField || !messageField || !submitBtn) return;
  if (form.dataset.validationBound === "true") return;
  form.dataset.validationBound = "true";

  // Guardar último valor notificado por toast en cada campo para no repetir el mismo toast si no cambió
  const lastToastedSuccessValue: Record<ContactFieldName, string> = {
    name: "",
    email: "",
    message: "",
  };

  const touchedFields: Record<ContactFieldName, boolean> = {
    name: false,
    email: false,
    message: false,
  };

  function evaluateField(
    fieldName: ContactFieldName,
    fieldEl: HTMLInputElement | HTMLTextAreaElement,
    options: { triggerToast: boolean; allowEmptyReset: boolean }
  ): FieldValidationResult {
    const trimmed = fieldEl.value.trim();

    if (options.allowEmptyReset && trimmed.length === 0 && !touchedFields[fieldName]) {
      applyFieldUIState(fieldEl, null);
      return {
        valid: false,
        inlineMessage: "",
        toastTitle: "",
        toastDescription: "",
        toastType: "info",
      };
    }

    const result =
      fieldName === "name"
        ? validateNameField(fieldEl.value)
        : fieldName === "email"
          ? validateEmailField(fieldEl.value)
          : validateMessageField(fieldEl.value);

    applyFieldUIState(fieldEl, result);

    if (options.triggerToast) {
      if (!result.valid) {
        toast.show({
          id: `field-${fieldName}-error`,
          type: result.toastType,
          title: result.toastTitle,
          description: result.toastDescription,
        });
        lastToastedSuccessValue[fieldName] = "";
      } else if (lastToastedSuccessValue[fieldName] !== trimmed) {
        lastToastedSuccessValue[fieldName] = trimmed;
        toast.success(
          result.toastTitle,
          result.toastDescription,
          `field-${fieldName}-ok`,
          3000
        );
      }
    }

    return result;
  }

  // Eventos en tiempo real (input) y al salir del campo (blur)
  const fieldConfigs: Array<{
    name: ContactFieldName;
    el: HTMLInputElement | HTMLTextAreaElement;
  }> = [
      { name: "name", el: nameField },
      { name: "email", el: emailField },
      { name: "message", el: messageField },
    ];

  fieldConfigs.forEach(({ name, el }) => {
    el.addEventListener("input", () => {
      if (el.value.trim().length > 0) {
        touchedFields[name] = true;
      }
      evaluateField(name, el, {
        triggerToast: false,
        allowEmptyReset: true,
      });
    });

    el.addEventListener("blur", () => {
      // Si el usuario escribió algo o ya había interactuado con el campo, validamos y mostramos toast
      if (el.value.trim().length > 0 || touchedFields[name]) {
        touchedFields[name] = true;
        evaluateField(name, el, {
          triggerToast: true,
          allowEmptyReset: false,
        });
      }
    });
  });

  // Envío del formulario
  form.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();

    if (honeypotField && honeypotField.value.trim() !== "") {
      return;
    }

    touchedFields.name = true;
    touchedFields.email = true;
    touchedFields.message = true;

    const nameRes = evaluateField("name", nameField, {
      triggerToast: false,
      allowEmptyReset: false,
    });
    const emailRes = evaluateField("email", emailField, {
      triggerToast: false,
      allowEmptyReset: false,
    });
    const messageRes = evaluateField("message", messageField, {
      triggerToast: false,
      allowEmptyReset: false,
    });

    const firstInvalid: {
      el: HTMLInputElement | HTMLTextAreaElement;
      res: FieldValidationResult;
      name: ContactFieldName;
    } | null = !nameRes.valid
        ? { el: nameField, res: nameRes, name: "name" }
        : !emailRes.valid
          ? { el: emailField, res: emailRes, name: "email" }
          : !messageRes.valid
            ? { el: messageField, res: messageRes, name: "message" }
            : null;

    if (firstInvalid) {
      firstInvalid.el.focus();
      toast.show({
        id: `submit-invalid-${firstInvalid.name}`,
        type: firstInvalid.res.toastType,
        title: firstInvalid.res.toastTitle,
        description: firstInvalid.res.toastDescription,
        duration: 4500,
      });
      return;
    }

    // Todos los campos son válidos -> Enviar con EmailJS
    submitBtn.textContent = "Enviando...";
    submitBtn.setAttribute("aria-busy", "true");
    submitBtn.disabled = true;

    try {
      const serviceID = "default_service";
      const templateID = "template_mzf465a";

      if (!window.emailjs) {
        throw new Error("El servicio de correo no está disponible en este momento.");
      }

      const response = await window.emailjs.sendForm(serviceID, templateID, form);

      if (response.status === 200) {
        toast.success(
          "¡Mensaje enviado correctamente!",
          "Gracias por escribirme. Analizaré tu proyecto y te responderé a la brevedad.",
          "form-submit-success",
          5200
        );

        form.reset();
        touchedFields.name = false;
        touchedFields.email = false;
        touchedFields.message = false;
        lastToastedSuccessValue.name = "";
        lastToastedSuccessValue.email = "";
        lastToastedSuccessValue.message = "";

        applyFieldUIState(nameField, null);
        applyFieldUIState(emailField, null);
        applyFieldUIState(messageField, null);
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (err) {
      console.error("Error en el envío:", err);
      toast.error(
        "No se pudo enviar el mensaje",
        "Ocurrió un problema de conexión. Por favor intentá nuevamente o escribime directo a mi correo.",
        "form-submit-error",
        5200
      );
    } finally {
      submitBtn.textContent = "Enviar";
      submitBtn.removeAttribute("aria-busy");
      submitBtn.disabled = false;
    }
  });
}
