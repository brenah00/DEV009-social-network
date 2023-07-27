import {
  getEmail,
  logoutUser,
} from '../lib/authentication.js';
import { showUserName } from '../lib/firestore.js';

async function showName(user) {
  user.innerHTML = await showUserName(await getEmail());
}
function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const user = document.createElement('p');
  title.textContent = 'HOME';
  const button = document.createElement('button');
  button.textContent = 'Cerrar sesión';
  showName(user);
  button.addEventListener('click', () => {
    navigateTo('/');
    logoutUser();
  });
  section.append(title, user, button);
  return section;
}
export default home;
