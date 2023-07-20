function register(navigateTo) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  const button = document.createElement('button');
  const userName = document.createElement('input');
  const userLastName = document.createElement('input');
  const userEmail = document.createElement('input');
  const userBirthDate = document.createElement('input');
  const userPassword = document.createElement('input');

  title.textContent = "REGISTRO";
  userName.placeholder = 'Nombre';
  userLastName.placeholder = 'Apellidos';
  userEmail.placeholder = 'Correo electrónico';
  userEmail.type = 'email';
  userBirthDate.placeholder = 'Fecha de nacimiento';
  userBirthDate.type = 'date';
  userPassword.placeholder = 'Contraseña';
  userPassword.type = 'password';
  button.textContent = 'Registrarse';
  button.addEventListener('click',()=>{
    navigateTo('/home');
  });
  section.append(title,userName,userLastName,userEmail,userBirthDate,userPassword,button);
  return section;
}
export default register;
