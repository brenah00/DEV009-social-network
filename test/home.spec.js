import login from '../src/components/login.js';

describe('myFunction', () => {
  it('El boton de registro nos lleva a /register', () => {
    const navigateTo = jest.fn();
    document.body.append(login(navigateTo));
    const btn = document.getElementById('btnRegister');
    btn.click();
    expect(navigateTo).toHaveBeenCalledWith('/register');
  });
  it('Arroja un mensaje que nos indica que los campos estan vacios', () => {
    const navigateTo = jest.fn();
    document.body.append(login(navigateTo));
    const btn = document.getElementById('btnLogin');
    btn.click();
    const message = document.getElementById('errorMessage');
    expect(message.textContent).toBe('Introduce el correo electrónico y contraseña de tu cuenta.');
  });
  /* const email = document.getElementById('userEmail');
    const pass = document.getElementById('userPassword');
    email.value = '';
    pass.value = ''; */
  it('Arroja un mensaje que solicita un correo electrónico con el formato correcto', () => {
    const navigateTo = jest.fn();
    document.body.append(login(navigateTo));
    const email = document.getElementById('userEmail');
    const pass = document.getElementById('userPassword');
    const btn = document.getElementById('btnLogin');
    email.value = 'correo-invalido';
    pass.value = '1234567890';
    btn.click();
    const message = document.getElementById('errorMessage');
    expect(message.textContent).toBe('Verifica el correo electrónico que has introducido.');
  });
});
