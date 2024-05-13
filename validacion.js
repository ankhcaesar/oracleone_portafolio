import { tiposError, mensajes } from "./errores.js";

const campoDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-form]");



formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const contMensaje = {
    nombre: e.target.elements["nombre"].value,
    email: e.target.elements["email"].value,
    asunto: e.target.elements["asunto"].value
  }
  localStorage.setItem("registro", JSON.stringify(contMensaje))
})

campoDeFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificarCampo(campo))
  campo.addEventListener("invalid", evento => evento.preventDefault())
});


function verificarCampo(campo) {
  let spanError = document.querySelector(`span.${campo.name}__mensajeError`);

  let mensaje = "";
  campo.setCustomValidity = "";


  tiposError.forEach(error => {
    if (campo.validity[error]) {
      mensaje = mensajes[campo.name][error]
    }
  })


  const mensajeError = document.querySelector(`#${campo.name} + span.${campo.name}__mensajeError`);
  const validarInputCheck = campo.checkValidity();
  if (!validarInputCheck) {
    mensajeError.textContent = mensaje;
  } else {
    mensajeError.textContent = "";

  }
}