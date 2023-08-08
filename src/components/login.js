/* eslint-disable no-underscore-dangle */
import {
  loginGoogle,
  loginUser,
  loginValidate,
} from '../lib/authentication.js';
import { saveUser } from '../lib/firestore.js';

// eslint-disable-next-line max-len
function createLogin(inputEmailUser, inputPassword, message, buttonRegister, buttonLogin, buttonGoogle) {
  const section = document.createElement('section');
  const elementDiv = document.createElement('div');
  const logo = document.createElement('img');
  const logoGoogle = document.createElement('img');
  const title = document.createElement('h2');

  message.id = 'errorMessage';
  message.textContent = '';
  elementDiv.className = 'login-container';
  section.className = 'login-user';
  inputEmailUser.placeholder = 'Correo electrónico';
  inputEmailUser.type = 'email';
  inputEmailUser.id = 'userEmail';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.type = 'password';
  inputPassword.id = 'userPassword';
  title.textContent = 'INICIAR SESION';
  buttonRegister.id = 'btnRegister';
  buttonRegister.textContent = 'Registro';
  buttonLogin.textContent = 'Iniciar sesión';
  buttonLogin.id = 'btnLogin';
  buttonGoogle.id = 'btnGoogle';
  buttonGoogle.textContent = 'Iniciar con Google';
  logoGoogle.src = 'https://cdn-icons-png.flaticon.com/512/300/300221.png';
  logo.src = 'https://i.postimg.cc/h4yFZp0F/MyMusic1.png';
  buttonGoogle.append(
    logoGoogle,
  );
  elementDiv.append(
    title,
    inputEmailUser,
    inputPassword,
    message,
    buttonLogin,
    buttonRegister,
    buttonGoogle,
  );

  section.append(
    logo,
    elementDiv,
  );
  return section;
}
function login(navigateTo) {
  /* localStorage.setItem("email","hola@gmail.com");
  localStorage.setItem("password","1234567890");
  console.log(window.localStorage); */
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');
  const inputEmailUser = document.createElement('input');
  const inputPassword = document.createElement('input');
  const buttonGoogle = document.createElement('button');
  const message = document.createElement('p');
  // eslint-disable-next-line max-len
  const viewLogin = createLogin(inputEmailUser, inputPassword, message, buttonRegister, buttonLogin, buttonGoogle);
  buttonLogin.addEventListener('click', async () => {
    if (inputEmailUser.value.length === 0 || inputPassword.value.length === 0) {
     
      message.textContent = 'Introduce el correo electrónico y contraseña de tu cuenta.';
    } else if (!inputEmailUser.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      message.textContent = 'Verifica el correo electrónico que has introducido.';
    } else {
      // Validación exitosa, intentar ingresar
      const loginResult = await loginUser(inputEmailUser.value, inputPassword.value);
      switch (loginResult) {
        case 'Firebase: Error (auth/user-not-found).':
          message.textContent = 'El correo electrónico que has introducido no está conectado a una cuenta.';
          break;
        case 'Firebase: Error (auth/wrong-password).':
          message.textContent = 'La contraseña que has introducido es incorrecta. ¿Has olvidado la contraseña?';
          break;
        default:
          if (await loginValidate() === true) {
            navigateTo('/home');
          }
      }
    }
  });
  buttonRegister.addEventListener('click', () => {
    navigateTo('/register');
  });

  buttonGoogle.addEventListener('click', async () => {
    const userCredentials = await loginGoogle();
    await saveUser(
      userCredentials._tokenResponse.firstName,
      userCredentials._tokenResponse.lastName,
      userCredentials.user.email,
      '',
      '',
    );
    navigateTo('/home');
  });
  return viewLogin;
}
export default login;
