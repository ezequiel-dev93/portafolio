document.addEventListener("DOMContentLoaded", () => {
    const userNameField = document.querySelector("#name");
    const emailField = document.querySelector("#email");
    const messageField = document.querySelector("#message");
  
    
  
    const setErrors = (message, field, isError = true) => {
      const messageElement = field.closest('.contact__form-group').querySelector('.contact__message');
  
      if (field.value.trim() === "") {
        field.classList.remove("contact__input--error", "contact__input--success");
        messageElement.innerText = "";
        messageElement.classList.remove("contact__message--error", "contact__message--success");
      } else if (isError) {
        field.classList.add("contact__input--error");
        field.classList.remove("contact__input--success");
        messageElement.innerText = message;
        messageElement.classList.add("contact__message--error");
        messageElement.classList.remove("contact__message--success");
      } else {
        field.classList.remove("contact__input--error");
        field.classList.add("contact__input--success");
        messageElement.innerText = "¡Correcto!";
        messageElement.classList.remove("contact__message--error");
        messageElement.classList.add("contact__message--success");
      }
    };
  
    const validateEmptyField = (message, field) => {
      const fieldValue = field.value.trim();
      if (fieldValue.length === 0) {
        setErrors(message, field, true);
        return false;
      } else {
        setErrors("", field, false);
        return true;
      }
    };
  
    const validateEmailFormat = (field) => {
      const fieldValue = field.value.trim();
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
      if (fieldValue.length > 5 && !regex.test(fieldValue)) {
        setErrors("Correo inválido", field, true);
        return false;
      } else {
        setErrors("", field, false);
        return true;
      }
    };
  
    userNameField.addEventListener("input", () => validateEmptyField("Nombre requerido", userNameField));
    emailField.addEventListener("input", () => validateEmailFormat(emailField));
    emailField.addEventListener("blur", () => validateEmptyField("Email requerido", emailField));
    messageField.addEventListener("input", () => validateEmptyField("Mensaje requerido", messageField));
  });
  