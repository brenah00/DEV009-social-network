import { getEmail, logoutUser } from '../lib/authentication.js';
import {
  showUserName, showPost, newPost, editPost,
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
  const userActual = await getEmail();
  // Limpiamos la sección de posts antes de agregar los posts ordenados
  sectionPost.innerHTML = '';
  sortedPosts.forEach((post, index) => {
    const contentPost = document.createElement('article');
    contentPost.className = 'post-box';
    const textContentPost = document.createElement('div');
    textContentPost.className = 'text-box';
    const creator = document.createElement('h3');
    const postContent = document.createElement('textarea');
    const buttonSave = document.createElement('button');
    buttonSave.textContent = 'Guardar';
    contentPost.id = post.id;
    const buttonEdit = document.createElement('button');
    buttonEdit.textContent = 'Editar';
    const msgPost = document.createElement('p');
    msgPost.textContent = ' ';
    const dateInformation = document.createElement('p');
    dateInformation.textContent = post.date;
    postContent.disabled = true;
    postContent.addEventListener('change', () => {
      if (postContent.value.length > 0) {
        buttonSave.disabled = false;
        buttonSave.style.background = 'rgba(94, 23, 235, 1)';
      } else {
        buttonSave.disabled = true;
        buttonSave.style.background = 'rgba(94, 23, 235, .5)';
      }
    });
    buttonSave.addEventListener('click', async () => {
      await editPost(contentPost.id, postContent.value);
      postContent.disabled = true;
    });
    buttonEdit.addEventListener('click', () => {
      postContent.disabled = false;
    });
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
    if (userActual === post.creator) {
      contentPost.append(
        creator,
        textContentPost,
        corazonDiv,
        dateInformation,
        msgPost,
        buttonSave,
        buttonEdit,
      );
    } else {
      contentPost.append(creator, textContentPost, corazonDiv, dateInformation);
    }
    sectionPost.appendChild(contentPost); // Usamos "appendChild" para agregar el post al final
  });
}

function home(navigateTo) {
  const textPost = document.createElement('textarea');
  textPost.id = 'textPost';
  const section = document.createElement('section');
  section.id = 'contentHome';
  const title = document.createElement('h2');
  const user = document.createElement('p');
  title.textContent = 'HOME';
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
  // textPost.id = 'newPost';
  // 3oYybeQPhuo3HUsNihx6
  // Hola, este es el nuevo lanzamiento de Bruno Mars
  // editPost('3oYybeQPhuo3HUsNihx6', 'Hola, esto es una prueba de editar la publicación');
  showName(user);
  buttonLogout.addEventListener('click', () => {
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
  section.append(title, user, textPost, messagePublish, buttonPublish, sectionPost, buttonLogout);
  return section;
}
export default home;
