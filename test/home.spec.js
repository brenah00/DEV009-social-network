import home from '../src/components/home.js';

/* jest.mock('../src/lib/authentication.js', () => ({
  logoutUser: jest.fn(),
  // getEmail: jest.fn.mockResolvedValue('email@gmail.com'),
}));
jest.mock('firebase/firestore', () => ({
  getDoc: jest.fn(),
}));
jest.mock('../src/lib/firestore.js', () => ({
  showUserName: jest.fn().mockResolvedValue('ejemplo'),
}));
describe('home', () => {
  const navigateTo = jest.fn();

  beforeEach(() => {
    // jest.clearAllMocks();
    // Configurar el DOM y los elementos necesarios antes de cada prueba
    document.body.innerHTML = ''; // Limpiar el contenido del body antes de cada prueba
    document.body.append(home(navigateTo));
  });

  /* it('El botón de cerrar sesión me lleve al Login', () => {
    const btn = document.getElementById('btnLogout');
    btn.click();
    // expect(logoutUser).toHaveBeenCalled();
    expect(navigateTo).toHaveBeenCalledWith('/');
  });
}); */
describe('home', () => {
  const navigateTo = jest.fn();
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.append(home(navigateTo));
  });

  it('Arroja un mensaje que nos indica que los campos estan vacios', () => {
    const buttonPublish = document.getElementById('btnPublish');
    buttonPublish.click();
    const messagePublish = document.getElementById('msgPublish');
    expect(messagePublish.textContent).toBe('El campo de publicación no puede estar vacío');
  });
});
