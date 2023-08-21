import { getEmail, logoutUser, loginValidate } from '../lib/authentication.js';
import { showUserName, newPost } from '../lib/firestore.js';
import { showPosts } from './homeComponents/showAllPost.js';

async function showName(user) {
  user.innerHTML = await showUserName(await getEmail());
}
async function userValidation(navigateTo) {
  if (await loginValidate() === false) {
    navigateTo('/');
  }
}
function home(navigateTo) {
  userValidation(navigateTo);
  const sectionHome = document.createElement('section');
  const textPost = document.createElement('textarea');
  const sectionAllPosts = document.createElement('section');
  const logo = document.createElement('img');
  const user = document.createElement('p');
  const buttonPublish = document.createElement('button');
  const messagePublish = document.createElement('p');
  const buttonLogout = document.createElement('button');
  const sectionPost = document.createElement('section');

  sectionHome.id = 'contentHome';
  textPost.id = 'textPost';
  sectionAllPosts.id = 'section-all-posts';
  logo.src = 'https://i.postimg.cc/bJVfLCbz/My-Music-8.png';
  buttonPublish.id = 'btnPublish';
  buttonPublish.textContent = 'Publicar';
  messagePublish.id = 'msgPublish';
  buttonLogout.textContent = 'Cerrar sesión';
  buttonLogout.id = 'btnLogout';
  textPost.placeholder = 'Que estás escuchando?';
  sectionPost.className = 'post-section';
  showName(user);

  buttonLogout.addEventListener('click', () => {
    localStorage.clear();
    logoutUser();
    navigateTo('/');
  });

  buttonPublish.addEventListener('click', async () => {
    const postContent = textPost.value.trim();
    if (postContent === '') {
      messagePublish.textContent = 'El campo de publicación no puede estar vacío';
    } else {
      messagePublish.textContent = '';
      await newPost(await getEmail(), postContent);
      textPost.value = '';
    }
  });

  showPosts(sectionPost);
  sectionAllPosts.append(user, textPost, messagePublish, buttonPublish, sectionPost);
  sectionHome.append(logo, sectionAllPosts, buttonLogout);
  return sectionHome;
}
export default home;
