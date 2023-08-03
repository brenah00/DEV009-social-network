import {
  newRegister,
} from '../lib/authentication.js';
import { saveUser } from '../lib/firestore.js';

function createRegister(
  message,
  button,
  userName,
  userLastName,
  userEmail,
  userBirthDate,
  userPassword,
) {
  const section = document.createElement('section');
  const elementDiv = document.createElement('div');
  const logo = document.createElement('img');
  const title = document.createElement('h2');
  elementDiv.className = 'register-container';
  section.className = 'register-user';

  message.id = 'errorMessage';
  message.textContent = '';
  title.textContent = 'REGISTRO';
  logo.src = 'https://i.postimg.cc/h4yFZp0F/MyMusic1.png';
  userName.placeholder = 'Nombre';
  userName.id = 'name';
  userLastName.placeholder = 'Apellidos';
  userLastName.id = 'userLastName';
  userEmail.placeholder = 'Correo electrónico';
  userEmail.id = 'userEmailRegister';
  userEmail.type = 'email';
  userBirthDate.id = 'userBirthDate';
  userBirthDate.placeholder = 'Fecha de nacimiento';
  userBirthDate.type = 'date';
  userPassword.placeholder = 'Contraseña';
  userPassword.id = 'userPasswordRegister';
  userPassword.type = 'password';
  button.id = 'btnRegister';
  button.textContent = 'Registrarse';
  elementDiv.append(
    title,
    userName,
    userLastName,
    userEmail,
    userBirthDate,
    userPassword,
    message,
    button,
  );
  section.append(logo, elementDiv);
  return section;
}
function register(navigateTo) {
  const button = document.createElement('button');
  const userName = document.createElement('input');
  const userLastName = document.createElement('input');
  const userEmail = document.createElement('input');
  const userBirthDate = document.createElement('input');
  const userPassword = document.createElement('input');
  const message = document.createElement('p');
  const viewRegister = createRegister(
    message,
    button,
    userName,
    userLastName,
    userEmail,
    userBirthDate,
    userPassword,
  );
  button.addEventListener('click', async () => {
    const correoRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      userName.value.length === 0
      || userLastName.value.length === 0
      || userEmail.value.length === 0
      || userBirthDate.value.length === 0
      || userPassword.value.length === 0
    ) {
      message.textContent = 'Por favor llena todos los campos';
    } else if (!userEmail.value.match(correoRegExp)) {
      message.textContent = 'Por favor, ingresa un correo electrónico válido.';
    } else if (userPassword.value.length < 8) {
      message.textContent = 'Introduce una contraseña con 8 o más caracteres';
      // console.log('Contraseña incorrecta');
    } else {
      // Validación exitosa, intentar realizar el registro
      // console.log('Creación de usuario');
      const registrationResult = await newRegister(
        userEmail.value,
        userPassword.value,
      );
      if (registrationResult === 'Firebase: Error (auth/email-already-in-use).') {
        // Hubo un error en el registro, mostrar el mensaje de error
        message.textContent = 'Este correo ya se encuentra registrado';
      } else {
        await saveUser(
          userName.value,
          userLastName.value,
          userEmail.value,
          userBirthDate.value,
          userPassword.value,
        );
        navigateTo('/home');
      }
    }
  });
  return viewRegister;
}

export default register;
