// import { addDoc, documentId } from 'firebase/firestore';
import * as firebaseFirestore from 'firebase/firestore';
import * as firebaseAuth from 'firebase/auth';
import * as firestoreMock from '../src/lib/firestore.js';
import * as authMock from '../src/lib/authentication.js';
import home from '../src/components/home.js';
import { showPosts } from '../src/components/homeComponents/showAllPost.js';
//import { newPost } from '../src/lib/firestore.js';

/* jest.mock('../src/lib/authentication.js', () => ({
  logoutUser: jest.fn(),
  // getEmail: jest.fn.mockResolvedValue('email@gmail.com'),
}));
jest.mock('firebase/firestore', () => ({
  getDoc: jest.fn(),
}));
jest.mock('../src/lib/firestore.js', () => ({
  showUserName: jest.fn().mockResolvedValue('ejemplo'),
}));
describe('home', () => {
  const navigateTo = jest.fn();

  beforeEach(() => {
    // jest.clearAllMocks();
    // Configurar el DOM y los elementos necesarios antes de cada prueba
    document.body.innerHTML = ''; // Limpiar el contenido del body antes de cada prueba
    document.body.append(home(navigateTo));
  });

  /* it('El botón de cerrar sesión me lleve al Login', () => {
    const btn = document.getElementById('btnLogout');
    btn.click();
    // expect(logoutUser).toHaveBeenCalled();
    expect(navigateTo).toHaveBeenCalledWith('/');
  });
}); */
jest.mock('firebase/firestore', () => ({
  // getDoc: jest.fn(),
  getFirestore: jest.fn(),
  addDoc: jest.fn(),
  collection: jest.fn(),
  onSnapshot: jest.fn(),
}));
jest.mock('../src/lib/authentication.js', () => ({
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
}));
// jest.mock('../src/lib/firestore');
describe('home', () => {
  const navigateTo = jest.fn();
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.append(home(navigateTo));
  });
  it('Arroja un mensaje que nos indica que los campos estan vacios', () => {
    const buttonPublish = document.getElementById('btnPublish');
    buttonPublish.click();
    const messagePublish = document.getElementById('msgPublish');
    expect(messagePublish.textContent).toBe('El campo de publicación no puede estar vacío');
  });
  it('Realiza la publicación', async () => {
    const newPostMock = jest.spyOn(firestoreMock, 'newPost');
    const textPost = document.getElementById('textPost');
    const buttonPublish = document.getElementById('btnPublish');
    textPost.value = 'escuchen esto';
    buttonPublish.click();
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(newPostMock).toHaveBeenCalledWith('email@gmail.com', textPost.value);
  });
  it('El botón de cerrar sesión me lleve al Login', async () => {
    // firebaseAuth.signOut.mockResolvedValue(1234);
    const btn = document.getElementById('btnLogout');
    btn.click();
    // expect(logoutUser).toHaveBeenCalled();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(navigateTo).toHaveBeenCalledWith('/');
  });
  it('Onsnapshot fn', async () => {
    const listenToPostsMock = jest.spyOn(firestoreMock, 'listenToPosts');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(listenToPostsMock).toHaveBeenCalled();
  });
});
describe('showAllPost', () => {
  let sectionPost;
  beforeEach(() => {
    document.body.innerHTML = '';
    sectionPost = document.createElement('section');
    document.body.append(sectionPost);
  });
  it('should add a like when heart icon is clicked', async () => {
    const addLikeMock = jest.spyOn(firestoreMock, 'addLike');
    const deleteLikeMock = jest.spyOn(firestoreMock, 'deleteLike');
    const listenToPostsMock = jest.spyOn(firestoreMock, 'listenToPosts');
    const getEmailMock = jest.spyOn(authMock, 'getEmail');
    getEmailMock.mockResolvedValue('test@example.com');
    listenToPostsMock.mockImplementationOnce(async (updateFunction) => {
      const postWithLikes = [
        {
          id: 'post1',
          contentPost: 'Liked post',
          creator: 'test@example.com',
          likes: [],
        },
      ];
      await updateFunction(postWithLikes);
    });

    await showPosts(sectionPost);
    await new Promise((resolve) => setTimeout(resolve, 0));
    // Simula el clic en el corazón
    const heartIcon = document.getElementById('toggle-heart-0');
    // await new Promise((resolve) => setTimeout(resolve, 0));
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
  it('click the option Edit', async () => {
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
    // await new Promise((resolve) => setTimeout(resolve, 0));
    const btnSaveChanges = document.getElementById('btnSaveChanges');
    const selectElement = document.getElementById('menuPost');
    // Índice de la opción que deseas hacer clic
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
  it('should not to call the function', async () => {
    // const editPostMock = jest.spyOn(firestoreMock, 'editPost');
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
    // await new Promise((resolve) => setTimeout(resolve, 0));
    const btnSaveChanges = document.getElementById('btnSaveChanges');
    const selectElement = document.getElementById('menuPost');
    // Índice de la opción que deseas hacer clic
    selectElement.selectedIndex = 1;
    selectElement.dispatchEvent(new Event('change'));
    expect(btnSaveChanges.style.display).toBe('block');
    const textFieldPost = document.querySelector('#post1 > div > textarea');
    textFieldPost.value = '';
    textFieldPost.dispatchEvent(new Event('change'));
    expect(btnSaveChanges.disabled).toBe(true);
  });
});
// FirebaseError: [code=unavailable]: Failed to get document because the client is offline.
