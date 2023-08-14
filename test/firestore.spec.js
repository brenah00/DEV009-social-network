import * as firebaseFirestore from 'firebase/firestore';
import {
  editPost, showUserName, db, deletePost, addLike, deleteLike,
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
});
