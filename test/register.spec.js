import { documentId } from "firebase/firestore";
import register from "../src/components/register.js";

describe("register", () => {
  it("Arroja un mensaje que nos indica que los campos estan vacios", () => {
    const navigateTo = jest.fn();
    document.body.append(register(navigateTo));
    const btn = document.getElementById("btnRegister");
    btn.click();
    const message = document.getElementById("errorMessage");
    expect(message.textContent).toBe("Por favor llena todos los campos");
  });

  it("Arroja un mensaje que solicita un correo electrónico con el formato correcto", () => {
    const navigateTo = jest.fn();
    document.body.append(register(navigateTo));
    const name = document.getElementById("name");
    const lastName = document.getElementById("userLastName");
    const email = document.getElementById("userEmailRegister");
    const pass = document.getElementById("userPasswordRegister");
    const birthDate = document.getElementById("userBirthDate");
    const btn = document.getElementById("btnRegister");
    name.value = "prueba";
    lastName.value = "apellido";
    birthDate.value = "2000-01-01";
    email.value = "correo-invalido";
    pass.value = "1234567890";
    btn.click();
    const message = document.getElementById("errorMessage");
    expect(message.textContent).toBe("Por favor, ingresa un correo electrónico válido.");
  });

  it("Arroja un mensaje que solicita un password de mínimo 8 digitos", () => {
    const navigateTo = jest.fn();
    document.body.append(register(navigateTo));
    const name = document.getElementById("name");
    const lastName = document.getElementById("userLastName");
    const email = document.getElementById("userEmailRegister");
    const pass = document.getElementById("userPasswordRegister");
    const birthDate = document.getElementById("userBirthDate");
    const btn = document.getElementById("btnRegister");
    name.value = "prueba";
    lastName.value = "apellido";
    birthDate.value = "2000-01-01";
    email.value = "correo-valido@correo.com";
    pass.value = "1234";
    btn.click();
    const message = document.getElementById("errorMessage");
    expect(message.textContent).toBe('Introduce una contraseña con 8 o más caracteres');
  });
});
