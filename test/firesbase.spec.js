import * as firebaseAuth from 'firebase/auth';
// import { auth } from 'firebase/auth';
import { logoutUser /* , loginValidate */ } from '../src/lib/authentication.js';

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
  /* it('should return true if user is authenticated', async () => {
    // Simular onAuthStateChanged para invocar el listener con un usuario
    const listener = jest.fn(); // Crear una función falsa
    firebaseAuth.onAuthStateChanged.mockImplementationOnce((callback) => {
      listener({ uid: 'user123' }); // Simular un usuario autenticado
      return () => {}; // Simular función de limpieza (unsubscribe)
    });

    const isAuthenticated = await loginValidate();

    expect(isAuthenticated).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1); // Verificar que el listener se llamó una vez
  }); */
});
