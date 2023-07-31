import { documentId } from 'firebase/firestore';
import register from '../src/components/register.js';
import { newRegister } from '../src/lib/authentication.js';
import { saveUser } from '../src/lib/firestore.js';

describe('register', () => {
  it('Arroja un mensaje que nos indica que los campos estan vacios', () => {
    const navigateTo = jest.fn();
    document.body.append(register(navigateTo));
    const btn = document.getElementById('btnRegister');
    btn.click();
    const message = document.getElementById('errorMessage');
    expect(message.textContent).toBe('Por favor llena todos los campos');
  });

  it('Arroja un mensaje que solicita un correo electrónico con el formato correcto', () => {
    const navigateTo = jest.fn();
    document.body.append(register(navigateTo));
    const name = document.getElementById('name');
    const lastName = document.getElementById('userLastName');
    const email = document.getElementById('userEmailRegister');
    const pass = document.getElementById('userPasswordRegister');
    const birthDate = document.getElementById('userBirthDate');
    const btn = document.getElementById('btnRegister');
    name.value = 'prueba';
    lastName.value = 'apellido';
    birthDate.value = '2000-01-01';
    email.value = 'correo-invalido';
    pass.value = '1234567890';
    btn.click();
    const message = document.getElementById('errorMessage');
    expect(message.textContent).toBe('Por favor, ingresa un correo electrónico válido.');
  });

  it('Arroja un mensaje que solicita un password de mínimo 8 digitos', () => {
    const navigateTo = jest.fn();
    document.body.append(register(navigateTo));
    const name = document.getElementById('name');
    const lastName = document.getElementById('userLastName');
    const email = document.getElementById('userEmailRegister');
    const pass = document.getElementById('userPasswordRegister');
    const birthDate = document.getElementById('userBirthDate');
    const btn = document.getElementById('btnRegister');
    name.value = 'prueba';
    lastName.value = 'apellido';
    birthDate.value = '2000-01-01';
    email.value = 'correo-valido@correo.com';
    pass.value = '1234';
    btn.click();
    const message = document.getElementById('errorMessage');
    expect(message.textContent).toBe('Introduce una contraseña con 8 o más caracteres');
  });
});
// Mock de createUserWithEmailAndPassword
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
    user: {
      uid: 'user-uid', // Simulamos un UID para el usuario registrado
      email: 'johndoe@example.com',
      // Otras propiedades del usuario simulado si son necesarias para el test
    },
  }),
}));
describe('Test para validar el retorno de las credenciales en newRegister', () => {
  it('Debe retornar las credenciales del usuario registrado correctamente', async () => {
    // Ejecutar la función newRegister con credenciales válidas
    const userCredentials = await newRegister('johndoe@example.com', 'password123');
    const user = {
      email: 'johndoe@example.com',
      uid: 'user-uid',
    };
    // Hacer las aserciones sobre el resultado esperado (credenciales del usuario)
    expect(userCredentials.user).toEqual(user);
    expect(userCredentials.user.uid).toBe('user-uid');
  });
  it('Debe retornar un error', async () => {
    // Ejecutar la función newRegister con credenciales válidas
    jest.spyOn(require('firebase/auth'), 'createUserWithEmailAndPassword').mockRejectedValue(new Error('Firebase: Error (auth/email-already-in-use).'));

    const user = await newRegister('johndoe@example.com', 'password123');
    // Hacer las aserciones sobre el resultado esperado (credenciales del usuario)
    // expect(userCredentials).toEqual(user);
    expect(user).toBe('Firebase: Error (auth/email-already-in-use).');
  });
});
