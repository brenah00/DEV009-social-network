import {
  getEmail,
  logoutUser,
} from '../lib/authentication.js';
import { showUserName } from '../lib/firestore.js';
function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const user = document.createElement('p');
  title.textContent = 'HOME';
  const button = document.createElement('button');
  button.textContent = 'Cerrar sesión';
  //const usuario = await showUserName('blenda_916@gmail.com');
  //alert(usuario);
  //user.innerHTML = `${showUserName('blenda_916@gmail.com')}`;
  //console.log(showUserName('blenda_916@gmail.com'));
  showName(user);
  button.addEventListener('click', () => {
    navigateTo('/');
    logoutUser();
  });
  section.append(title,user, button);
  return section;
}

async function showName(user) {
  console.log(await getEmail());
  user.innerHTML = await showUserName(await getEmail());
};

export default home;
