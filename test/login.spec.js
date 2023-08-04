import * as authentication from 'firebase/auth';
import login from '../src/components/login.js';
import { loginUser } from '../src/lib/authentication.js';

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
    // Mockeamos loginValidate para que resuelva con true
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

  it('Redirecciona a Home una vez que el usuario ha sido creado', async () => {
    jest.spyOn(authentication, 'signInWithPopup').mockResolvedValue({
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
    // Verifica si navigateTo fue llamado con '/home'
    expect(navigateTo).toHaveBeenCalledWith('/home');
  });
  it('El boton de registro nos lleva a /register', () => {
    const btn = document.getElementById('btnRegister');
    btn.click();
    expect(navigateTo).toHaveBeenCalledWith('/register');
  });
  it('Arroja un mensaje que nos indica que los campos estan vacios', () => {
    const btn = document.getElementById('btnLogin');
    btn.click();
    const message = document.getElementById('errorMessage');
    expect(message.textContent).toBe('Introduce el correo electrónico y contraseña de tu cuenta.');
  });
  it('Arroja un mensaje que solicita un correo electrónico con el formato correcto', () => {
    const email = document.getElementById('userEmail');
    const pass = document.getElementById('userPassword');
    const btn = document.getElementById('btnLogin');
    email.value = 'correo-invalido';
    pass.value = 'password12345';
    btn.click();
    const message = document.getElementById('errorMessage');
    expect(message.textContent).toBe('Verifica el correo electrónico que has introducido.');
  });
  it('Arroja un mensaje que notifica que el usuario no se encuentra registrado', async () => {
    jest.spyOn(authentication, 'signInWithEmailAndPassword').mockRejectedValue(new Error('Firebase: Error (auth/user-not-found).'));
    const email = document.getElementById('userEmail');
    const pass = document.getElementById('userPassword');
    const btn = document.getElementById('btnLogin');
    email.value = 'correo-valido@correo.com';
    pass.value = 'password123';
    btn.click();
    const message = document.getElementById('errorMessage');
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(message.textContent).toBe('El correo electrónico que has introducido no está conectado a una cuenta.');
  });
  it('Arroja un mensaje que notifica que la contraseña es incorrecta', async () => {
    jest.spyOn(authentication, 'signInWithEmailAndPassword').mockRejectedValue(new Error('Firebase: Error (auth/wrong-password).'));
    const email = document.getElementById('userEmail');
    const pass = document.getElementById('userPassword');
    const btn = document.getElementById('btnLogin');
    email.value = 'correo-valido@correo.com';
    pass.value = 'password123';
    btn.click();
    const message = document.getElementById('errorMessage');
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(message.textContent).toBe('La contraseña que has introducido es incorrecta. ¿Has olvidado la contraseña?');
  });
  it('Nos lleva a home', async () => {
    jest.spyOn(authentication, 'signInWithEmailAndPassword').mockResolvedValue({
      user: {
        accessToken: 'token12345',
        email: 'test@example.com',
      },
    });
    /* jest.spyOn('../src/lib/authentication.js', 'loginValidate').mockResolvedValue(true); */
    const email = document.getElementById('userEmail');
    const pass = document.getElementById('userPassword');
    const btn = document.getElementById('btnLogin');
    email.value = 'correo-valido@correo.com';
    pass.value = 'password123';
    btn.click();
    // const message = document.getElementById('errorMessage');
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(navigateTo).toHaveBeenCalledWith('/home');
  });
});
describe('Test para validar el inicio de sesión con mocks', () => {
  it('Debe iniciar sesión correctamente', async () => {
    jest.spyOn(authentication, 'signInWithEmailAndPassword').mockResolvedValue({
      user: {
        accessToken: 'token12345',
        email: 'test@example.com',
      },
    });
    const userLogged = await loginUser('test@example.com', 'password123');
    expect(userLogged.accessToken).toBe('token12345');
  });
  it('Debe retornar el mensaje de error "Firebase: Error (auth/user-not-found)."', async () => {
    jest.spyOn(authentication, 'signInWithEmailAndPassword').mockRejectedValue(new Error('Firebase: Error (auth/user-not-found).'));

    const user = await loginUser('test@example.com', 'password123');
    expect(user).toBe('Firebase: Error (auth/user-not-found).');
  });
  it('Debe retornar el mensaje de error "Firebase: Error (auth/wrong-password)."', async () => {
    jest.spyOn(authentication, 'signInWithEmailAndPassword').mockRejectedValue(new Error('Firebase: Error (auth/wrong-password).'));

    const user = await loginUser('test@example.com', 'password123');
    expect(user).toBe('Firebase: Error (auth/wrong-password).');
  });
});
