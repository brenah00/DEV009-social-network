import * as firebaseAuth from 'firebase/auth';
// import { auth } from 'firebase/auth';
import { logoutUser, getEmail, loginValidate } from '../src/lib/authentication.js';

jest.mock('firebase/auth');
describe('authentication.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('cerrar sesión', async () => {
    firebaseAuth.signOut.mockResolvedValue();
    await logoutUser();
    expect(firebaseAuth.signOut).toHaveBeenCalled();
  });
  it('should return user email if authenticated', async () => {
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
  it('should return null', async () => {
    const user = null;
    const mockOnAuthStateChanged = jest.fn((auth, callback) => {
      callback(user);
    });
    firebaseAuth.onAuthStateChanged.mockImplementation(mockOnAuthStateChanged);
    const email = await getEmail();
    expect(email).toBe(null);
  });
  it('should return true if authenticated', async () => {
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
  it('should return false', async () => {
    const user = null;
    const mockOnAuthStateChanged = jest.fn((auth, callback) => {
      callback(user);
    });
    firebaseAuth.onAuthStateChanged.mockImplementation(mockOnAuthStateChanged);
    const email = await loginValidate();
    expect(email).toBe(false);
  });
});
