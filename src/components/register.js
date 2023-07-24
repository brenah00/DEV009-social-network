import {
  newRegister
} from '../lib/authentication.js';

function register(navigateTo) {
  const section = document.createElement('section');
  const elementDiv = document.createElement('div');
  elementDiv.className = 'register-container';
  section.className = 'register-user';
  const logo = document.createElement('img');
  const title = document.createElement('h2');
  const button = document.createElement('button');

  const userName = document.createElement('input');
  const userLastName = document.createElement('input');
  const userEmail = document.createElement('input');
  const userBirthDate = document.createElement('input');
  const userPassword = document.createElement('input');

  title.textContent = 'REGISTRO';
  logo.src = 'https://i.postimg.cc/h4yFZp0F/MyMusic1.png';
  userName.placeholder = 'Nombre';
  userLastName.placeholder = 'Apellidos';
  userEmail.placeholder = 'Correo electrónico';
  userEmail.type = 'email';
  userBirthDate.placeholder = 'Fecha de nacimiento';
  userBirthDate.type = 'date';
  userPassword.placeholder = 'Contraseña';
  userPassword.type = 'password';
  button.textContent = 'Registrarse';
  button.addEventListener('click', () => {
    navigateTo('/home');
    console.log(newRegister(userEmail.value,userPassword.value));
  });

  elementDiv.append(
    title,
    userName,
    userLastName,
    userEmail,
    userBirthDate,
    userPassword,
    button,

  );
  section.append(logo, elementDiv);
  return section;
}

export default register;
