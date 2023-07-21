import {
  createUserWithEmailAndPassword, 
} from 'firebase/auth';

import { auth } from '../lib/index.js';

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
  logo.src = 'https://www.logocrea.com/wp-content/uploads/2016/07/musica1.png';
  userName.placeholder = 'Nombre';
  userLastName.placeholder = 'Apellidos';
  userEmail.placeholder = 'Correo electrónico';
  userEmail.type = 'email';
  userBirthDate.placeholder = 'Fecha de nacimiento';
  userBirthDate.type = 'date';
  userPassword.placeholder = 'Contraseña';
  userPassword.type = 'password';
  button.textContent = 'Registrarse';
  button.addEventListener('click', async () => {
    navigateTo('/home');
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userEmail.value,
        userPassword.value,
      );
    } catch (error) {
      console.log(error);
    }
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
