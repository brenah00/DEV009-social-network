import { getEmail } from '../../lib/authentication.js';
import { showModal } from './deleteModal.js';
import {
  showUserName, listenToPosts, editPost, addLike, deleteLike,
} from '../../lib/firestore.js';

// Construcción de icono de like
function createLike(post, index, userActual) {
  const corazonDiv = document.createElement('div');
  corazonDiv.className = 'corazon';

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.className = 'toggle-heart';
  checkbox.setAttribute('id', `toggle-heart-${index}`);

  const label = document.createElement('label');
  label.className = 'toggle-heart-label';
  label.setAttribute('for', `toggle-heart-${index}`);
  label.setAttribute('aria-label', 'like');
  label.textContent = '❤';

  if (post.likes.includes(userActual)) {
    checkbox.checked = true;
  }

  corazonDiv.append(checkbox, label);

  checkbox.addEventListener('change', () => {
    if (checkbox.checked === true) {
      addLike(post.id, userActual);
    } else {
      deleteLike(post.id, userActual);
    }
  });
  return corazonDiv;
}

export async function showPosts(sectionPost) {
  const userActual = await getEmail();
  const updateFunction = (updatedPosts) => {
    const sortedPosts = updatedPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    sectionPost.innerHTML = '';
    sortedPosts.forEach((post, index) => {
      const contentPost = document.createElement('article');
      const textContentPost = document.createElement('div');
      const creator = document.createElement('h3');
      const postContent = document.createElement('textarea');
      const buttonSave = document.createElement('button');
      const msgOption = document.createElement('option');
      const buttonEdit = document.createElement('option');
      const buttonDelete = document.createElement('option');
      const msgPost = document.createElement('p');
      const dateInformation = document.createElement('p');
      const countLikes = document.createElement('label');
      const postMenu = document.createElement('select');

      contentPost.className = 'post-box';
      contentPost.id = post.id;
      textContentPost.className = 'text-box';
      postContent.textContent = post.contentPost;
      postContent.disabled = true;
      buttonSave.id = 'btnSaveChanges';
      buttonSave.textContent = 'Guardar';
      buttonSave.style.display = 'none';
      msgOption.textContent = '...';
      buttonEdit.textContent = 'Editar';
      buttonEdit.value = 'Editar';
      buttonDelete.textContent = 'Eliminar';
      msgPost.textContent = ' ';
      postMenu.id = 'menuPost';
      dateInformation.textContent = post.date;
      countLikes.textContent = `${post.likes.length} me gusta`;
      // Obtenemos el nombre del usuario que publicó el post
      showUserName(post.creator).then((userName) => {
        creator.textContent = userName;
      });
      const likeIcon = createLike(post, index, userActual);
      postMenu.addEventListener('change', async (event) => {
        const selectOption = event.target.options.selectedIndex;
        if (selectOption === 1) {
          postContent.disabled = false;
          buttonSave.style.display = 'block';
        }
        if (selectOption === 2) {
          showModal(post.id);
        }
      });
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
        if (buttonSave.disabled === false) {
          await editPost(contentPost.id, postContent.value);
          postContent.disabled = true;
          buttonSave.style.display = 'none';
        }
      });
      textContentPost.appendChild(postContent);
      postMenu.append(msgOption, buttonEdit, buttonDelete);
      // eslint-disable-next-line max-len
      contentPost.append(creator, textContentPost, buttonSave, likeIcon, countLikes, dateInformation);
      if (userActual === post.creator) {
        contentPost.append(msgPost, postMenu);
      }
      sectionPost.appendChild(contentPost);
    });
  };
  listenToPosts(updateFunction);
}
