import * as firebaseFirestore from 'firebase/firestore';
import {
  editPost, showUserName, db, deletePost, addLike, deleteLike, listenToPosts,
} from '../src/lib/firestore';

jest.mock('firebase/firestore');
describe('showUserName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Debería retornar el nombre completo del usuario autenticado', async () => {
    const mockData = { name: 'Juan', lastName: 'Perez' };
    const mockDoc = {
      exists: () => true,
      data: () => mockData,
    };

    firebaseFirestore.getDoc.mockResolvedValue(mockDoc);

    const userName = await showUserName('juan@example.com');

    expect(userName).toBe('Juan Perez');
  });
  it('Debería retornar el mensaje de error que el usuario no ha sido encontrado', async () => {
    firebaseFirestore.getDoc.mockRejectedValue(new Error('Usuario no encontrado'));

    const userName = await showUserName('john@example.com');

    expect(userName.message).toBe('Usuario no encontrado');
  });
});
describe('editPost', () => {
  it('La funciín updateDoc debería ser llamada con el id del post a editar y el nuevo contenido', async () => {
    firebaseFirestore.updateDoc.mockResolvedValue();
    await editPost('post123', 'texto a editar');
    expect(firebaseFirestore.updateDoc).toHaveBeenCalledWith(firebaseFirestore.doc(db, 'posts', 'post123'), { contentPost: 'texto a editar' });
  });
});
describe('deletePost', () => {
  it('La función deleteDoc debería ser llamada con el id del post a eliminar', async () => {
    firebaseFirestore.deleteDoc.mockResolvedValue();
    await deletePost('post123');
    expect(firebaseFirestore.deleteDoc).toHaveBeenCalledWith(firebaseFirestore.doc(db, 'posts', 'post123'));
  });
});

describe('addLike', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('El correo user2@example.com debe ser agregado al arreglo de likes', async () => {
    const mockData = { name: 'John', lastName: 'Doe', likes: ['user1@example.com'] };
    firebaseFirestore.getDoc.mockResolvedValue({ data: () => mockData });
    firebaseFirestore.updateDoc.mockResolvedValue();
    await addLike('post123', 'user2@example.com');
    expect(mockData.likes.includes('user2@example.com')).toBe(true);
  });
  it('No debería llamar la funcion updateDoc porque el usuario ya existe en el arreglo de likes', async () => {
    const mockData = { name: 'John', lastName: 'Doe', likes: ['user1', 'user2'] };
    firebaseFirestore.getDoc.mockResolvedValue({ data: () => mockData });
    firebaseFirestore.updateDoc.mockResolvedValue();
    await addLike('post123', 'user2');
    expect(firebaseFirestore.updateDoc).not.toHaveBeenCalled();
  });
});
describe('deleteLike', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('El correo user2@example.com debe ser eliminado al arreglo de likes', async () => {
    const mockData = { name: 'John', lastName: 'Doe', likes: ['user1@example.com'] };
    firebaseFirestore.getDoc.mockResolvedValue({ data: () => mockData });
    firebaseFirestore.updateDoc.mockResolvedValue();
    await deleteLike('post123', 'user1@example.com');
    expect(mockData.likes.includes('user1@example.com')).toBe(false);
    expect(firebaseFirestore.updateDoc).toHaveBeenCalledWith(firebaseFirestore.doc(db, 'posts', 'post123'), { likes: [] });
  });
  it('No debería llamar la funcion updateDoc porque el usuario NO existe en el arreglo de likes', async () => {
    const mockData = { name: 'John', lastName: 'Doe', likes: [] };
    firebaseFirestore.getDoc.mockResolvedValue({ data: () => mockData });
    firebaseFirestore.updateDoc.mockResolvedValue();
    await deleteLike('post123', 'user1');
    expect(firebaseFirestore.updateDoc).not.toHaveBeenCalled();
  });
});
describe('listenToPost', () => {
  it('Debería actualizarse cuando un doc es modificado', () => {
    // Simular los datos de los documentos en el snapshot
    const mockPostData = [
      { id: 'post1', data: () => ({ title: 'Post 1' }) },
      { id: 'post2', data: () => ({ title: 'Post 2' }) },
    ];
    const updateFunction = jest.fn();
    firebaseFirestore.onSnapshot.mockImplementationOnce((query, callback) => {
      const mockSnapshot = {
        forEach: (forEachCallback) => {
          mockPostData.forEach((postData) => {
            forEachCallback(postData);
          });
        },
      };
      callback(mockSnapshot);
      return jest.fn();
    });

    // Llamar a la función listenToPosts con la función de actualización simulada
    const unsubscribe = listenToPosts(updateFunction);

    // Verificar que la función de actualización se llamó con los datos falsos
    expect(updateFunction).toHaveBeenCalledWith([
      { id: 'post1', title: 'Post 1' },
      { id: 'post2', title: 'Post 2' },
    ]);
    unsubscribe();
  });
});
