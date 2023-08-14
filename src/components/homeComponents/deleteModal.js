import { deletePost } from '../../lib/firestore.js';

// Función para ocultar la ventana modal
export function hideModal() {
  const modal = document.querySelector('#modal');
  modal.remove();
}
export function deletePostConfirmation(idPost) {
  // Creamos la ventana modal y sus elementos en JavaScript
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const message = document.createElement('p');
  message.textContent = '¿Está seguro que desea eliminar la publicación?';

  const okButton = document.createElement('button');
  okButton.id = 'okButton';
  okButton.textContent = 'OK';

  const cancelButton = document.createElement('button');
  cancelButton.id = 'cancelButton';
  cancelButton.textContent = 'Cancelar';

  modalContent.append(message, okButton, cancelButton);
  modal.appendChild(modalContent);

  // Evento para ejecutar la función de eliminación al hacer clic en el botón "OK"
  okButton.addEventListener('click', async () => {
    await deletePost(idPost);
    hideModal();
  });
  // Evento para cerrar la ventana modal al hacer clic en el botón "Cancelar"
  cancelButton.addEventListener('click', () => {
    hideModal();
  });
  return modal;
}

// Función para mostrar la ventana modal específica para cada publicación
export function showModal(idPost) {
  const deletePostModal = deletePostConfirmation(idPost);
  document.body.appendChild(deletePostModal);
  deletePostModal.style.display = 'block';
}
