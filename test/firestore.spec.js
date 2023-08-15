import * as firebaseFirestore from 'firebase/firestore';
import {
  editPost, showUserName, db, deletePost, addLike, deleteLike, listenToPosts, /* newPost, */
} from '../src/lib/firestore';

jest.mock('firebase/firestore');
describe('firestore.js', () => {
  it('showUserName should return the user\'s full name', async () => {
    // Simular el comportamiento de la función getDoc
    const mockData = { name: 'John', lastName: 'Doe' };
    // Simular el objeto devuelto por getDoc
    const mockDoc = {
      exists: () => true,
      data: () => mockData,
    };
    firebaseFirestore.getDoc.mockResolvedValue(mockDoc);

    const userName = await showUserName('john@example.com');

    expect(userName).toBe('John Doe');
  });
  it('showUserName should return an error', async () => {
    firebaseFirestore.getDoc.mockRejectedValue(new Error('Usuario no encontrado'));

    const userName = await showUserName('john@example.com');

    expect(userName.message).toBe('Usuario no encontrado');
  });

  it('editPost', async () => {
    firebaseFirestore.updateDoc.mockResolvedValue();
    await editPost('post123', 'texto a editar');
    expect(firebaseFirestore.updateDoc).toHaveBeenCalledWith(firebaseFirestore.doc(db, 'posts', 'post123'), { contentPost: 'texto a editar' });
  });

  it('deletePost', async () => {
    firebaseFirestore.deleteDoc.mockResolvedValue();
    await deletePost('post123');
    expect(firebaseFirestore.deleteDoc).toHaveBeenCalledWith(firebaseFirestore.doc(db, 'posts', 'post123'));
  });

  it('addLike', async () => {
    const mockData = { name: 'John', lastName: 'Doe', likes: ['user1'] };
    firebaseFirestore.getDoc.mockResolvedValue({ data: () => mockData });
    firebaseFirestore.updateDoc.mockResolvedValue();
    await addLike('post123', 'user2');
    expect(firebaseFirestore.updateDoc).toHaveBeenCalledWith(firebaseFirestore.doc(db, 'posts', 'post123'), { likes: ['user1', 'user2'] });
  });
  it('deleteLike', async () => {
    const mockData = { name: 'John', lastName: 'Doe', likes: ['user1'] };
    firebaseFirestore.getDoc.mockResolvedValue({ data: () => mockData });
    firebaseFirestore.updateDoc.mockResolvedValue();
    await deleteLike('post123', 'user1');
    expect(firebaseFirestore.updateDoc).toHaveBeenCalledWith(firebaseFirestore.doc(db, 'posts', 'post123'), { likes: [] });
  });
  it('should update function when posts are updated', () => {
    // Simular los datos de los documentos en el snapshot
    const mockPostData = [
      { id: 'post1', data: () => ({ title: 'Post 1' }) },
      { id: 'post2', data: () => ({ title: 'Post 2' }) },
    ];

    // Simular la función de actualización
    const updateFunction = jest.fn();

    // Simular la función onSnapshot para invocar el callback con los datos falsos
    firebaseFirestore.onSnapshot.mockImplementationOnce((query, callback) => {
      const mockSnapshot = {
        forEach: (forEachCallback) => {
          mockPostData.forEach((postData) => {
            forEachCallback(postData);
          });
        },
      };
      callback(mockSnapshot);
      return jest.fn(); // Simular función de unsubscribe
    });

    // Llamar a la función listenToPosts con la función de actualización simulada
    const unsubscribe = listenToPosts(updateFunction);

    // Verificar que la función de actualización se llamó con los datos falsos
    expect(updateFunction).toHaveBeenCalledWith([
      { id: 'post1', title: 'Post 1' },
      { id: 'post2', title: 'Post 2' },
    ]);

    // Llamar a la función de unsubscribe
    unsubscribe();

    // Verificar que onSnapshot se llamó con la consulta correcta
    expect(firebaseFirestore.collection).toHaveBeenCalledWith(db, 'posts');
  });
  /* it('newPost', async () => {
    const dataToSave = {
      contentPost: 'Hola a todos',
      date: new Date().toLocaleString(),
      creator: 'correo@example.com',
      likes: [],
    };
    firebaseFirestore.addDoc.mockResolvedValue();
    await newPost('correo@example.com', 'Hola a todos');
    eslint-disable-next-line max-len
    // expect(firebaseFirestore.addDoc)
    // .toHaveBeenCalledWith(firebaseFirestore.collection(db, 'posts', dataToSave));
  }); */
});
