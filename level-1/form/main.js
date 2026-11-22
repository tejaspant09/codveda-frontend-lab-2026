import { validate, strength } from "./logic.js";

const form = document.querySelector("form");
const fields = [...form.querySelectorAll("input")];
const result = document.querySelector("#result");

function check(field) {
  const error = validate(field.name, field.value);
  field.setAttribute("aria-invalid", String(Boolean(error)));
  document.querySelector(`#${field.name}-error`).textContent = error;
  return !error;
}

fields.forEach((field) => {
  field.addEventListener("focus", () => {
    result.textContent = "";
  });
  field.addEventListener("input", () => {
    check(field);
    result.textContent = "";
    if (field.name === "password") {
      document.querySelector("#password-strength").textContent =
        `Strength: ${strength(field.value)}`;
    }
  });
  field.addEventListener("blur", () => check(field));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const validity = fields.map(check);
  if (validity.every(Boolean)) {
    result.textContent =
      "Validation passed. Demo only; nothing was sent and no account was created.";
  } else {
    result.textContent = "";
    fields[validity.indexOf(false)].focus();
  }
});

// Enable only after every listener and the submit guard are attached.
document.querySelector("#form-fields").disabled = false;
