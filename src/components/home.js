import {
  getEmail,
  logoutUser,
} from '../lib/authentication.js';
import {
  showUserName,
  showPost,
  newPost,
} from '../lib/firestore.js';

async function showName(user) {
  user.innerHTML = await showUserName(await getEmail());
}
async function showPosts(sectionPost) {
  const allPost = await showPost();
  // console.log(allPost);
  allPost.forEach(async (post) => {
    const contentPost = document.createElement('div');
    contentPost.className = 'post-box';
    const textContentPost = document.createElement('div');
    textContentPost.className = 'text-box';
    const creator = document.createElement('h3');
    const postContent = document.createElement('p');
    const dateInformation = document.createElement('p');
    dateInformation.textContent = post.date;
    creator.textContent = await showUserName(post.creator);
    postContent.textContent = post.contentPost;
    textContentPost.appendChild(postContent);
    contentPost.append(creator, textContentPost, dateInformation);
    sectionPost.append(contentPost);
  });
}
function home(navigateTo) {
  const textPost = document.createElement('textarea');
  const section = document.createElement('section');
  section.id = 'contentHome';
  const title = document.createElement('h2');
  const user = document.createElement('p');
  title.textContent = 'HOME';
  const buttonPublish = document.createElement('button');
  buttonPublish.textContent = 'Publicar';
  const button = document.createElement('button');
  button.textContent = 'Cerrar sesión';
  textPost.placeholder = 'Que estás escuchando?';
  const sectionPost = document.createElement('section');
  sectionPost.className = 'post-section';
  textPost.id = 'newPost';
  showName(user);
  button.addEventListener('click', () => {
    navigateTo('/');
    logoutUser();
  });
  buttonPublish.addEventListener('click', async () => {
    await newPost(await getEmail(), textPost.value);
  });
  showPosts(sectionPost);
  section.append(title, user, textPost, buttonPublish, sectionPost, button);
  return section;
}
export default home;
