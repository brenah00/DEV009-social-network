import { async } from 'regenerator-runtime';
import {
  loginGoogle, loginUser,
} from '../lib/authentication.js';

function login(navigateTo) {
  /*localStorage.setItem("email","hola@gmail.com");
  localStorage.setItem("password","1234567890");
  console.log(window.localStorage);*/
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
  buttonLogin.addEventListener("click", async() => {
    //navigateTo("/home");
    if(inputEmailUser.value.length === 0 || inputPassword.value.length === 0){
      alert('Favor de llenar ambos campos');
    }else if (!inputEmailUser.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      } else {
      // Validación exitosa, intentar ingresar
        const loginResult = await loginUser(inputEmailUser.value, inputPassword.value);
        switch(loginResult){
          case 'Firebase: Error (auth/user-not-found).':
            alert('Correo no registrado, favor de registrarse');
            break;
          case 'Firebase: Error (auth/wrong-password).':
            alert('Contraseña incorrecta');
            break;
          default:
            navigateTo("/home");
        }
      }
    }
  );

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
