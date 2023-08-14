import * as firebaseAuth from 'firebase/auth';
import { logoutUser } from '../src/lib/authentication.js';

jest.mock('firebase/auth');

describe('authentication.js', () => {
  it('cerrar sesión', async () => {
    firebaseAuth.signOut.mockResolvedValue();
    await logoutUser();
    expect(firebaseAuth.signOut).toHaveBeenCalled();
  });

  /* it('cerrar sesión con error', async () => {
    firebaseAuth.signOut.mockRejectedValue(new Error('sesion no cerrada'));
    await logoutUser();
    expect(firebaseAuth.signOut).toHaveBeenCalled();
  }); */

  /* it('validacion del logeo', async () => {
    const mockOnAuthStateChanged = jest.fn((callback) => {
      callback({ uid: 'user123' }); // Simular un usuario autenticado
    });
    firebaseAuth.onAuthStateChanged.mockImplementation(mockOnAuthStateChanged);
    const loginValid = await loginValidate();
    expect(loginValid).toBe(true);
  }); */
});
