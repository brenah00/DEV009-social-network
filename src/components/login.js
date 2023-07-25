import {
  loginGoogle, loginUser,
} from '../lib/authentication.js';

function login(navigateTo) {
  const section = document.createElement('section');
  const elementDiv = document.createElement('div');
  elementDiv.className = 'login-container';
  section.className = 'login-user';
  const logo = document.createElement('img');
  const logoGoogle = document.createElement('img');
  const title = document.createElement('h2');
  const buttonLogin = document.createElement('button');
  const button = document.createElement('button');
  const inputEmailUser = document.createElement('input');
  const inputPassword = document.createElement('input');
  const buttonGoogle = document.createElement('button');

  inputEmailUser.placeholder = 'Correo electrónico';
  inputEmailUser.type = 'email';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.type = 'password';
  title.textContent = 'INICIAR SESION';
  button.textContent = 'Registro';
  buttonLogin.textContent = 'Iniciar sesión';
  buttonGoogle.textContent = 'Iniciar con Google';
  logoGoogle.src = 'https://cdn-icons-png.flaticon.com/512/300/300221.png';
  logo.src = 'https://i.postimg.cc/h4yFZp0F/MyMusic1.png';
  buttonLogin.addEventListener("click", () => {
    navigateTo("/home");
    console.log(loginUser(inputEmailUser.value, inputPassword.value));
  });

  button.addEventListener("click", () => {
    navigateTo("/register");
  });

  buttonGoogle.addEventListener("click", () => {
    navigateTo("/home");
    console.log(loginGoogle());
  });
 buttonGoogle.append(
  logoGoogle
 );
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
