import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/index.js";

function login(navigateTo) {
  const section = document.createElement("section");
  const elementDiv = document.createElement('div');
  elementDiv.className = 'login-container';
  section.className = 'login-user';
  const logo = document.createElement('img');
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
  logo.src = 'https://www.logocrea.com/wp-content/uploads/2016/07/musica1.png';
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

  elementDiv.append(
    title,
    inputEmailUser,
    inputPassword,
    buttonLogin,
    button,
    buttonGoogle);

  section.append(
    logo,
    elementDiv
  );
  return section;
}

export default login;
