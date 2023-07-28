import register from '../src/components/register.js';

describe('register', () => {
    it('Arroja un mensaje que nos indica que los campos estan vacios', () => {
        const navigateTo = jest.fn();
        document.body.append(register(navigateTo));
        const btn = document.getElementById('btnLogin');
        btn.click();
        const message = document.getElementById('errorMessage');
        expect(message.textContent).toBe('Introduce el correo electrónico y contraseña de tu cuenta.');
      });
});
