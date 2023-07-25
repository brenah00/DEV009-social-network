import {
  logoutUser,
} from '../lib/authentication.js';

function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  title.textContent = 'HOME';
  const button = document.createElement('button');
  button.textContent = 'Cerrar sesión';
  button.addEventListener('click', () => {
    navigateTo('/');
    logoutUser();
  });
  section.append(title, button);
  return section;
}
export default home;
