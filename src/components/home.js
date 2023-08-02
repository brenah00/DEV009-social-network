import { async } from 'regenerator-runtime';
import {
  getEmail,
  logoutUser,
} from '../lib/authentication.js';
import { showUserName, showPost } from '../lib/firestore.js';

async function showName(user) {
  user.innerHTML = await showUserName(await getEmail());
}
async function showPosts(sectionPost) {
  const allPost = await showPost();
  console.log(allPost);
  allPost.forEach((post) => {
    const contentPost = document.createElement('div');
    contentPost.className = 'post-box';
    const title = document.createElement('h2');
    const postContent = document.createElement('p');
    title.textContent = post.title;
    postContent.textContent = post.content;
    contentPost.append(title, postContent);
    sectionPost.append(contentPost);
  });
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
  const sectionPost = document.createElement('section');
  newPost.id = 'newPost';
  showName(user);
  button.addEventListener('click', () => {
    navigateTo('/');
    logoutUser();
  });
  showPosts(sectionPost);
  section.append(title, user, newPost, sectionPost, button);
  return section;
}
export default home;
