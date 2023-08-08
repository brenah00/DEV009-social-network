/* eslint-disable no-underscore-dangle */
import {
  loginGoogle,
  loginUser,
  loginValidate,
} from '../lib/authentication.js';
import { saveUser } from '../lib/firestore.js';

// eslint-disable-next-line max-len
function createLogin(inputEmailUser, inputPassword, message, buttonRegister, buttonLogin, buttonGoogle, inputStorage) {
  const section = document.createElement('section');
  const elementDiv = document.createElement('div');
  const logo = document.createElement('img');
  const logoGoogle = document.createElement('img');
  const title = document.createElement('h2');
  const permanentSesion = document.createElement('label');
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
  inputStorage.setAttribute('type', 'checkbox');
  permanentSesion.textContent = 'Desea mantener iniciada la sesión?';

  buttonGoogle.append(
    logoGoogle,
  );
  elementDiv.append(
    title,
    inputEmailUser,
    inputPassword,
    inputStorage,
    permanentSesion,
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
async function loginFn(navigateTo) {
  await loginUser(window.localStorage.email, window.localStorage.password);
  navigateTo('/home');
}
// eslint-disable-next-line consistent-return
function login(navigateTo) {
  if (window.localStorage.length > 0) {
    loginFn(navigateTo);
  } else {
    const buttonLogin = document.createElement('button');
    const buttonRegister = document.createElement('button');
    const inputEmailUser = document.createElement('input');
    const inputPassword = document.createElement('input');
    const buttonGoogle = document.createElement('button');
    const message = document.createElement('p');
    const inputStorage = document.createElement('input');

    // eslint-disable-next-line max-len
    const viewLogin = createLogin(inputEmailUser, inputPassword, message, buttonRegister, buttonLogin, buttonGoogle, inputStorage);
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
            if (inputStorage.checked === true) {
              localStorage.setItem('email', inputEmailUser.value);
              localStorage.setItem('password', inputPassword.value);
              // console.log(window.localStorage.length);
            } else {
              localStorage.clear();
            }
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
}
export default login;
