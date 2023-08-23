// import * as deleteModal from '../src/components/homeComponents/deleteModal.js';
import * as firestoreMock from '../src/lib/firestore.js';
import * as authMock from '../src/lib/authentication.js';
import home from '../src/components/home.js';
import { showPosts } from '../src/components/homeComponents/showAllPost.js';

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  addDoc: jest.fn(),
  collection: jest.fn(),
  onSnapshot: jest.fn(),
  getDoc: jest.fn(),
}));
jest.mock('../src/lib/authentication.js', () => ({
  loginValidate: jest.fn().mockResolvedValue(true),
  getEmail: jest.fn().mockResolvedValue('email@gmail.com'),
  logoutUser: jest.fn(),
}));
jest.mock('../src/lib/firestore', () => ({
  newPost: jest.fn(),
  showUserName: jest.fn().mockResolvedValue('Test Prueba'),
  listenToPosts: jest.fn(),
  addLike: jest.fn(),
  deleteLike: jest.fn(),
  editPost: jest.fn(),
  deletePost: jest.fn(),
}));

describe('home', () => {
  const navigateTo = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    document.body.append(home(navigateTo));
  });
  it('Debería mostrar un mensaje que nos indica que los campos estan vacios', () => {
    const buttonPublish = document.getElementById('btnPublish');
    buttonPublish.click();
    const messagePublish = document.getElementById('msgPublish');
    expect(messagePublish.textContent).toBe('El campo de publicación no puede estar vacío');
  });
  it('Debería realizar la publicación', async () => {
    const newPostMock = jest.spyOn(firestoreMock, 'newPost');
    const textPost = document.getElementById('textPost');
    const buttonPublish = document.getElementById('btnPublish');
    textPost.value = 'escuchen esto';
    buttonPublish.click();
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(newPostMock).toHaveBeenCalledWith('email@gmail.com', 'escuchen esto');
  });
  it('El botón de cerrar sesión debería llevarme Login', async () => {
    const btn = document.getElementById('btnLogout');
    btn.click();
    expect(navigateTo).toHaveBeenCalledWith('/');
  });
  it('Debería llamar a la función listenToPost para mostrar los post', async () => {
    const listenToPostsMock = jest.spyOn(firestoreMock, 'listenToPosts');
    expect(listenToPostsMock).toHaveBeenCalled();
  });
});
describe('showPost', () => {
  let sectionPost;
  beforeEach(() => {
    document.body.innerHTML = '';
    sectionPost = document.createElement('section');
    document.body.append(sectionPost);
  });
  it('Debería añadir un like cuando el ícono de corazón es clicleado', async () => {
    const postWithLikes = [
      {
        id: 'post1',
        contentPost: 'Liked post',
        creator: 'test@example.com',
        likes: [],
      },
    ];
    const addLikeMock = jest.spyOn(firestoreMock, 'addLike');
    const deleteLikeMock = jest.spyOn(firestoreMock, 'deleteLike');
    const listenToPostsMock = jest.spyOn(firestoreMock, 'listenToPosts');
    const getEmailMock = jest.spyOn(authMock, 'getEmail');
    getEmailMock.mockResolvedValue('test@example.com');
    listenToPostsMock.mockImplementationOnce(async (updateFunction) => {
      await updateFunction(postWithLikes);
    });

    await showPosts(sectionPost);

    // Simula el clic en el corazón
    const heartIcon = document.getElementById('like-0');
    heartIcon.click();

    /* Verifica que la función addLike se haya llamado
    correctamente y que el corazón se haya marcado */
    expect(addLikeMock).toHaveBeenCalledWith('post1', 'test@example.com');
    expect(heartIcon.checked).toBe(true);

    // Simula otro clic en el corazón
    heartIcon.click();

    /* Verifica que la función deleteLike se haya llamado
    correctamente y que el corazón se haya desmarcado */
    expect(deleteLikeMock).toHaveBeenCalledWith('post1', 'test@example.com');
    expect(heartIcon.checked).toBe(false);
  });
  it('Debería editar el texto del post', async () => {
    const editPostMock = jest.spyOn(firestoreMock, 'editPost');
    const listenToPostsMock = jest.spyOn(firestoreMock, 'listenToPosts');
    const getEmailMock = jest.spyOn(authMock, 'getEmail');
    getEmailMock.mockResolvedValue('test@example.com');
    listenToPostsMock.mockImplementationOnce(async (updateFunction) => {
      const postWithLikes = [
        {
          id: 'post1',
          contentPost: 'Liked post',
          creator: 'test@example.com',
          date: '9/8/2023, 9:51:52',
          likes: ['test@example.com'],
        },
        {
          id: 'post1',
          contentPost: 'Liked post',
          creator: 'test@example.com',
          date: '10/8/2023, 15:50:06',
          likes: [],
        },
      ];
      await updateFunction(postWithLikes);
    });

    await showPosts(sectionPost);
    const btnSaveChanges = document.getElementById('btnSaveChanges');
    const selectElement = document.getElementById('menuPost');
    // Se selecciona la opción de editar
    selectElement.selectedIndex = 1;
    expect(btnSaveChanges.style.display).toBe('none');
    selectElement.dispatchEvent(new Event('change'));
    expect(btnSaveChanges.style.display).toBe('block');
    const newText = 'Hola, este es el test de editar un post';
    const textFieldPost = document.querySelector('#post1 > div > textarea');
    textFieldPost.value = 'Hola, este es el test de editar un post';
    textFieldPost.dispatchEvent(new Event('change'));
    btnSaveChanges.click();
    expect(editPostMock).toHaveBeenCalledWith('post1', newText);
  });
  it('El botón de guardar cambios debería estar deshabilidado', async () => {
    const listenToPostsMock = jest.spyOn(firestoreMock, 'listenToPosts');
    const getEmailMock = jest.spyOn(authMock, 'getEmail');
    getEmailMock.mockResolvedValue('test@example.com');
    listenToPostsMock.mockImplementationOnce(async (updateFunction) => {
      const postWithLikes = [
        {
          id: 'post1',
          contentPost: 'Liked post',
          creator: 'test@example.com',
          date: '9/8/2023, 9:51:52',
          likes: [],
        },
        {
          id: 'post1',
          contentPost: 'Liked post',
          creator: 'test@example.com',
          date: '10/8/2023, 15:50:06',
          likes: [],
        },
      ];
      await updateFunction(postWithLikes);
    });

    await showPosts(sectionPost);
    const btnSaveChanges = document.getElementById('btnSaveChanges');
    const selectElement = document.getElementById('menuPost');
    // Se selecciona la opción de editar
    selectElement.selectedIndex = 1;
    selectElement.dispatchEvent(new Event('change'));
    expect(btnSaveChanges.style.display).toBe('block');
    const textFieldPost = document.querySelector('#post1 > div > textarea');
    textFieldPost.value = '';
    textFieldPost.dispatchEvent(new Event('change'));
    expect(btnSaveChanges.disabled).toBe(true);
  });
  it('Debería mostrar la confirmación de eliminar post', async () => {
    const listenToPostsMock = jest.spyOn(firestoreMock, 'listenToPosts');
    const getEmailMock = jest.spyOn(authMock, 'getEmail');
    getEmailMock.mockResolvedValue('test@example.com');
    listenToPostsMock.mockImplementationOnce(async (updateFunction) => {
      const postWithLikes = [
        {
          id: 'post1',
          contentPost: 'Liked post',
          creator: 'test@example.com',
          date: '9/8/2023, 9:51:52',
          likes: ['test@example.com'],
        },
        {
          id: 'post2',
          contentPost: 'Liked post',
          creator: 'anothertest@example.com',
          date: '10/8/2023, 15:50:06',
          likes: [],
        },
      ];
      await updateFunction(postWithLikes);
    });

    await showPosts(sectionPost);

    const selectElement = document.getElementById('menuPost');
    // Se selecciona la opción de eliminar
    selectElement.selectedIndex = 2;
    selectElement.dispatchEvent(new Event('change'));
    const deleteConfirmation = document.querySelector('#modal');
    expect(deleteConfirmation).toBeTruthy();
  });
  it('La confirmación de eliminar post debería eliminarse del cuerpo del documento al dar clic en cancelar', async () => {
    const listenToPostsMock = jest.spyOn(firestoreMock, 'listenToPosts');
    const getEmailMock = jest.spyOn(authMock, 'getEmail');
    getEmailMock.mockResolvedValue('test@example.com');
    listenToPostsMock.mockImplementationOnce(async (updateFunction) => {
      const postWithLikes = [
        {
          id: 'post1',
          contentPost: 'Liked post',
          creator: 'test@example.com',
          date: '9/8/2023, 9:51:52',
          likes: ['test@example.com'],
        },
      ];
      await updateFunction(postWithLikes);
    });

    await showPosts(sectionPost);
    const selectElement = document.getElementById('menuPost');
    // Se selecciona la opción de eliminar
    selectElement.selectedIndex = 2;
    selectElement.dispatchEvent(new Event('change'));
    const modal = document.querySelector('#modal');
    expect(modal).toBeTruthy();
    const cancelButton = document.querySelector('#cancelButton');
    cancelButton.click();
    const modalDeleted = document.querySelector('#modal');
    expect(modalDeleted).toBe(null);
  });
  it('Se debe llamar a la funcion deletePost y el modal debe eliminarse del cuerpo del documento', async () => {
    const deletePostsMock = jest.spyOn(firestoreMock, 'deletePost');
    const listenToPostsMock = jest.spyOn(firestoreMock, 'listenToPosts');
    const getEmailMock = jest.spyOn(authMock, 'getEmail');
    getEmailMock.mockResolvedValue('test@example.com');
    listenToPostsMock.mockImplementationOnce(async (updateFunction) => {
      const postWithLikes = [
        {
          id: 'post1',
          contentPost: 'Liked post',
          creator: 'test@example.com',
          date: '9/8/2023, 9:51:52',
          likes: ['test@example.com'],
        },
      ];
      await updateFunction(postWithLikes);
    });

    await showPosts(sectionPost);
    const selectElement = document.getElementById('menuPost');
    // Se selecciona la opción de eliminar
    selectElement.selectedIndex = 2;
    selectElement.dispatchEvent(new Event('change'));
    const modal = document.querySelector('#modal');
    expect(modal).toBeTruthy();
    const okButton = document.querySelector('#okButton');
    okButton.click();
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(deletePostsMock).toHaveBeenCalledWith('post1');
    const modalDeleted = document.querySelector('#modal');
    expect(modalDeleted).toBe(null);
  });
});
