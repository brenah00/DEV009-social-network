function register(navigateTo) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  title.textContent = "REGISTRO";
  const button = document.createElement('button');
  button.textContent = 'Registrarse';
  button.addEventListener('click',()=>{
    navigateTo('/home');
  });
  section.append(title,button);
  return section;
}
export default register;
