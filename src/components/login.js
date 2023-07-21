import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/index.js";

function login(navigateTo) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  const buttonLogin = document.createElement("button");
  const button = document.createElement("button");
  const inputEmailUser = document.createElement("input");
  const inputPassword = document.createElement("input");
  const buttonGoogle = document.createElement("button");

  inputEmailUser.placeholder = "Correo electrónico";
  inputEmailUser.type = "email";
  inputPassword.placeholder = "Contraseña";
  inputPassword.type = "password";
  title.textContent = "INICIAR SESION";
  button.textContent = "Registro";
  buttonLogin.textContent = "Iniciar sesión";
  buttonGoogle.textContent = "Iniciar con Google";

  buttonLogin.addEventListener("click", () => {
    navigateTo("/home");
  });

  button.addEventListener("click", () => {
    navigateTo("/register");
  });

  buttonGoogle.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  });

  section.append(
    title,
    inputEmailUser,
    inputPassword,
    buttonLogin,
    button,
    buttonGoogle
  );
  return section;
}

export default login;
