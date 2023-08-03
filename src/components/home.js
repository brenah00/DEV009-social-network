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

  // Ordenamos los posts por fecha en orden descendente
  const sortedPosts = allPost.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
    
   // Limpiamos la sección de posts antes de agregar los posts ordenados
   sectionPost.innerHTML = '';
  const userNames = []
  

  console.log(allPost);
 
  for (const post of sortedPosts) {
    const contentPost = document.createElement('div');
    contentPost.className = 'post-box';
    const textContentPost = document.createElement('div');
    textContentPost.className = 'text-box';
    const creator = document.createElement('h3');
    const postContent = document.createElement('p');
    const dateInformation = document.createElement('p');
    dateInformation.textContent = post.date;

    // Obtenemos el nombre del usuario que publicó el post
    const userName = await showUserName(post.creator);
    creator.textContent = userName;

    postContent.textContent = post.contentPost;
    textContentPost.appendChild(postContent);
    contentPost.append(creator, textContentPost, dateInformation);
    sectionPost.appendChild(contentPost); // Usamos "appendChild" para agregar el post al final
  }
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
