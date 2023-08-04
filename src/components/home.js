import { getEmail, logoutUser } from '../lib/authentication.js';
import { showUserName, showPost, newPost } from '../lib/firestore.js';

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
  sortedPosts.forEach((post, index) => {
    const contentPost = document.createElement('article');
    contentPost.className = 'post-box';
    const textContentPost = document.createElement('div');
    textContentPost.className = 'text-box';
    const creator = document.createElement('h3');
    const postContent = document.createElement('p');
    const dateInformation = document.createElement('p');
    dateInformation.textContent = post.date;

    // Obtenemos el nombre del usuario que publicó el post
    showUserName(post.creator).then((userName) => {
      creator.textContent = userName;
    });

    const corazonDiv = document.createElement('div');
    corazonDiv.className = 'corazon'; // Agregamos la clase "corazon" al div del corazón

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.className = 'toggle-heart'; // Agregamos la clase "toggle-heart" al checkbox
    checkbox.setAttribute('id', `toggle-heart-${index}`); // Asignamos un id único para cada checkbox

    const label = document.createElement('label');
    label.setAttribute('for', `toggle-heart-${index}`); // Usamos el valor del índice como identificador único para cada etiqueta
    label.className = 'toggle-heart-label'; // Agregamos la clase "toggle-heart-label" a la etiqueta

    label.setAttribute('aria-label', 'like');
    label.textContent = '❤';

    // Agregamos el checkbox y la etiqueta al div del corazón
    corazonDiv.appendChild(checkbox);
    corazonDiv.appendChild(label);

    // Agregamos el div del corazón al cuerpo del documento
    postContent.textContent = post.contentPost;
    textContentPost.appendChild(postContent);
    contentPost.append(creator, textContentPost, corazonDiv, dateInformation);
    sectionPost.appendChild(contentPost); // Usamos "appendChild" para agregar el post al final
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
  const messagePublish = document.createElement('p');
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
    const postContent = textPost.value.trim();
    // Obtener el contenido del campo de publicación y eliminar espacios
    // en blanco al inicio y al final
    if (postContent === '') {
      messagePublish.textContent = 'El campo de publicación no puede estar vacío';
      return;
    }
    // Si el campo no está vacío, ocultar el mensaje de error
    // (si se mostró previamente) y proceder con la publicación
    messagePublish.textContent = '';
    await newPost(await getEmail(), postContent);
  });

  showPosts(sectionPost);
  section.append(title, user, textPost, messagePublish, buttonPublish, sectionPost, button);
  return section;
}
export default home;
