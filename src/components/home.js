import {
  getEmail,
  logoutUser,
} from '../lib/authentication.js';
import { showUserName, showPost } from '../lib/firestore.js';

async function showName(user) {
  user.innerHTML = await showUserName(await getEmail());
}
function home(navigateTo) {
  const newPost = document.createElement('textarea');
  const section = document.createElement('section');
  section.id = 'contentHome';
  const title = document.createElement('h2');
  const user = document.createElement('p');
  title.textContent = 'HOME';
  const button = document.createElement('button');
  button.textContent = 'Cerrar sesión';
  newPost.placeholder = 'Que estás escuchando?';
  newPost.id = 'newPost';
  showName(user);
  button.addEventListener('click', () => {
    navigateTo('/');
    logoutUser();
  });
  showPost();
  section.append(title, user, newPost, button);
  return section;
}
export default home;
