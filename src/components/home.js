import { getEmail, logoutUser } from '../lib/authentication.js';
import { showUserName, newPost } from '../lib/firestore.js';
import { showPosts } from './homeComponents/showAllPost.js';

async function showName(user) {
  user.innerHTML = await showUserName(await getEmail());
}

function home(navigateTo) {
  const sectionHome = document.createElement('section');
  sectionHome.id = 'contentHome';
  const textPost = document.createElement('textarea');
  textPost.id = 'textPost';
  const sectionAllPosts = document.createElement('section');
  sectionAllPosts.id = 'section-all-posts';
  const logo = document.createElement('img');
  const user = document.createElement('p');
  logo.src = 'https://i.postimg.cc/bJVfLCbz/My-Music-8.png';
  const buttonPublish = document.createElement('button');
  buttonPublish.id = 'btnPublish';
  buttonPublish.textContent = 'Publicar';
  const messagePublish = document.createElement('p');
  messagePublish.id = 'msgPublish';
  const buttonLogout = document.createElement('button');
  buttonLogout.textContent = 'Cerrar sesión';
  buttonLogout.id = 'btnLogout';
  textPost.placeholder = 'Que estás escuchando?';
  const sectionPost = document.createElement('section');
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
    }
  });

  showPosts(sectionPost);
  sectionAllPosts.append(user, textPost, messagePublish, buttonPublish, sectionPost);
  sectionHome.append(logo, sectionAllPosts, buttonLogout);
  return sectionHome;
}
export default home;
