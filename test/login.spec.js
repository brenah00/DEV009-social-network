import * as authentication from 'firebase/auth';
import login from '../src/components/login.js';
// import { loginUser } from '../src/lib/authentication.js';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(),
}));
jest.mock('../src/lib/authentication', () => {
  const originalModule = jest.requireActual('../src/lib/authentication');
  return {
    ...originalModule,
    loginValidate: jest.fn().mockResolvedValue(true),
  };
});
describe('login', () => {
  const navigateTo = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    // Configurar el DOM y los elementos necesarios antes de cada prueba
    document.body.innerHTML = ''; // Limpiar el contenido del body antes de cada prueba
    document.body.append(login(navigateTo));
  });
  it('Nos lleva a home cuando el usuario ha iniciado sesión correctamente con Google', async () => {
    authentication.signInWithPopup.mockResolvedValue({
      user: {
        uid: 'google-user-uid',
        email: 'google@example.com',
      },
      _tokenResponse: {
        firstName: 'Example',
        lastName: 'Google',
      },
    });
    // Prueba para verificar las acciones del botón buttonGoogle
    const buttonGoogle = document.getElementById('btnGoogle');
    buttonGoogle.click();
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(navigateTo).toHaveBeenCalledWith('/home');
  });
  it('El boton de registro nos lleva a /register', () => {
    const btnRegister = document.getElementById('btnRegister');
    btnRegister.click();
    expect(navigateTo).toHaveBeenCalledWith('/register');
  });
  it('Arroja un mensaje que nos indica que los campos estan vacios', () => {
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.click();
    const message = document.getElementById('errorMessage');
    expect(message.textContent).toBe('Introduce el correo electrónico y contraseña de tu cuenta.');
  });
  it('Arroja un mensaje que solicita un correo electrónico con el formato correcto', () => {
    const email = document.getElementById('userEmail');
    const pass = document.getElementById('userPassword');
    const btnLogin = document.getElementById('btnLogin');
    email.value = 'correo-invalido';
    pass.value = 'password12345';
    btnLogin.click();
    const message = document.getElementById('errorMessage');
    expect(message.textContent).toBe('Verifica el correo electrónico que has introducido.');
  });
  it('Arroja un mensaje que notifica que el usuario no se encuentra registrado', async () => {
    jest.spyOn(authentication, 'signInWithEmailAndPassword').mockRejectedValue(new Error('Firebase: Error (auth/user-not-found).'));
    const email = document.getElementById('userEmail');
    const pass = document.getElementById('userPassword');
    const btnLogin = document.getElementById('btnLogin');
    email.value = 'correo-valido@correo.com';
    pass.value = 'password123';
    btnLogin.click();
    const message = document.getElementById('errorMessage');
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(message.textContent).toBe('El correo electrónico que has introducido no está conectado a una cuenta.');
  });
  it('Arroja un mensaje que notifica que la contraseña es incorrecta', async () => {
    authentication.signInWithEmailAndPassword.mockRejectedValue(new Error('Firebase: Error (auth/wrong-password).'));
    const email = document.getElementById('userEmail');
    const pass = document.getElementById('userPassword');
    const btnLogin = document.getElementById('btnLogin');
    email.value = 'correo-valido@correo.com';
    pass.value = 'password123';
    btnLogin.click();
    const message = document.getElementById('errorMessage');
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(message.textContent).toBe('La contraseña que has introducido es incorrecta.');
  });
  it('Debería redirigir a home cuando el usuario ha iniciado sesión correctamente con correo y contraseña, debería almacenar los datos del usuario', async () => {
    authentication.signInWithEmailAndPassword.mockResolvedValue({
      user: {
        accessToken: 'token12345',
        email: 'correo-valido@correo.com',
      },
    });
    const email = document.querySelector('#userEmail');
    const pass = document.querySelector('#userPassword');
    const btnLogin = document.querySelector('#btnLogin');
    const checkSave = document.querySelector('#checkStorage');
    email.value = 'correo-valido@correo.com';
    pass.value = 'password123';
    checkSave.click();
    btnLogin.click();
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(navigateTo).toHaveBeenCalledWith('/home');
    expect(localStorage.email).toBe('correo-valido@correo.com');
    expect(localStorage.password).toBe('password123');
  });
  it('Debería redirigir a home cuando hay datos almacenados en localStorage', async () => {
    authentication.signInWithEmailAndPassword.mockResolvedValue({
      user: {
        accessToken: 'token12345',
        email: 'test@example.com',
      },
    });

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(navigateTo).toHaveBeenCalledWith('/home');
  });
});
