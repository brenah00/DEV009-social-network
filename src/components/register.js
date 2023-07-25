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
  button.addEventListener('click', async () => {
    //console.log(userBirthDate.value)
    const correoRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      userName.value.length === 0 ||
      userLastName.value.length === 0 ||
      userEmail.value.length === 0 ||
      userBirthDate.value.length === 0 ||
      userPassword.value.length === 0
  ) {
      alert('Por favor llena todos los campos');
  } else if (!userEmail.value.match(correoRegExp)) {
      alert('Por favor, ingresa un correo electrónico válido.');
  } else if (userPassword.value.length < 8) {
      alert('Introduce una contraseña con 8 o más caracteres');
  } else {
      // Validación exitosa, intentar realizar el registro
      const registrationResult = await newRegister(
          userEmail.value,
          userPassword.value
      );
      console.log(registrationResult)  
       if (registrationResult === 'Firebase: Error (auth/email-already-in-use).') {
          // Hubo un error en el registro, mostrar el mensaje de error
          alert('Error al registrar: Este correo ya está registrado');
      } else {
        navigateTo('/home');
      }
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
