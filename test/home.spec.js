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
    expect(message.textContent).toBe('Favor de llenar ambos campos');
  });
});
