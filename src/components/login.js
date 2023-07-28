import {
  loginGoogle, loginUser,
} from '../lib/authentication.js';

function createLogin(inputEmailUser, inputPassword, buttonRegister, buttonLogin, buttonGoogle) {
  const section = document.createElement('section');
  const elementDiv = document.createElement('div');
  const logo = document.createElement('img');
  const logoGoogle = document.createElement('img');
  const title = document.createElement('h2');

  elementDiv.className = 'login-container';
  section.className = 'login-user';
  inputEmailUser.placeholder = 'Correo electrónico';
  inputEmailUser.type = 'email';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.type = 'password';
  title.textContent = 'INICIAR SESION';
  buttonRegister.id = 'btnRegister';
  buttonRegister.textContent = 'Registro';
  buttonLogin.textContent = 'Iniciar sesión';
  buttonLogin.id = 'btnLogin';
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
  // eslint-disable-next-line max-len
  const viewLogin = createLogin(inputEmailUser, inputPassword, buttonRegister, buttonLogin, buttonGoogle);
  buttonLogin.addEventListener('click', async () => {
    if (inputEmailUser.value.length === 0 || inputPassword.value.length === 0) {
      alert('Favor de llenar ambos campos');
    } else if (!inputEmailUser.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert('Por favor, ingresa un correo electrónico válido.');
    } else {
      // Validación exitosa, intentar ingresar
      const loginResult = await loginUser(inputEmailUser.value, inputPassword.value);
      switch (loginResult) {
        case 'Firebase: Error (auth/user-not-found).':
          alert('Correo no registrado, favor de registrarse');
          break;
        case 'Firebase: Error (auth/wrong-password).':
          alert('Contraseña incorrecta');
          break;
        default:
          navigateTo('/home');
      }
    }
  });
  buttonRegister.addEventListener('click', () => {
    navigateTo('/register');
  });

  buttonGoogle.addEventListener('click', () => {
    navigateTo('/home');
    console.log(loginGoogle());
  });
  return viewLogin;
}

export default login;
