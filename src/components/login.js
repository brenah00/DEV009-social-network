function login(navigateTo) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  const buttonLogin = document.createElement('button');
  const button = document.createElement('button');
  const inputEmailUser = document.createElement('input');
  const inputPassword = document.createElement('input');

  inputEmailUser.placeholder = 'Write email';
  inputPassword.placeholder = 'pass';
  inputPassword.type = 'password';
  title.textContent = "INICIAR SESION";
  button.textContent = 'Registro';
  buttonLogin.textContent = 'Iniciar sesión';

  buttonLogin.addEventListener('click',() => {
    navigateTo('/home');
  });
  
  button.addEventListener('click',() => {
    navigateTo('/register');
  });
  section.append(title,inputEmailUser,inputPassword,buttonLogin,button);
  return section;
}
export default login;
