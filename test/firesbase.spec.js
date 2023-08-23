import * as firebaseAuth from 'firebase/auth';
import { logoutUser, getEmail, loginValidate } from '../src/lib/authentication.js';

jest.mock('firebase/auth');
describe('logoutUser', () => {
  it('Debería cerrar sesión', async () => {
    firebaseAuth.signOut.mockResolvedValue();
    await logoutUser();
    expect(firebaseAuth.signOut).toHaveBeenCalled();
  });
});

describe('getEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Debe retornar el email user@example.com del usuario autenticado', async () => {
    const user = {
      email: 'user@example.com',
    };
    const mockOnAuthStateChanged = jest.fn((auth, callback) => {
      callback(user);
    });
    firebaseAuth.onAuthStateChanged.mockImplementation(mockOnAuthStateChanged);
    const email = await getEmail();
    expect(email).toBe('user@example.com');
  });
  it('Debería retornar NULL', async () => {
    const user = null;
    const mockOnAuthStateChanged = jest.fn((auth, callback) => {
      callback(user);
    });
    firebaseAuth.onAuthStateChanged.mockImplementation(mockOnAuthStateChanged);
    const email = await getEmail();
    expect(email).toBe(null);
  });
});

describe('loginValidate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Debería retornar TRUE si el usuario está autenticado', async () => {
    const user = {
      email: 'user@example.com',
    };
    const mockOnAuthStateChanged = jest.fn((auth, callback) => {
      callback(user);
    });
    firebaseAuth.onAuthStateChanged.mockImplementation(mockOnAuthStateChanged);
    const email = await loginValidate();
    expect(email).toBe(true);
  });
  it('Debería retornar FALSE si el usuario no está autenticado', async () => {
    const user = null;
    const mockOnAuthStateChanged = jest.fn((auth, callback) => {
      callback(user);
    });
    firebaseAuth.onAuthStateChanged.mockImplementation(mockOnAuthStateChanged);
    const email = await loginValidate();
    expect(email).toBe(false);
  });
});
