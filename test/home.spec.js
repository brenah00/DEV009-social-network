// importamos la funcion que vamos a testear
// import { render, screen, fireEvent } from '@testing-library/react';
// import { expect } from '@jest/globals';
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
    // se ponga el correo tal en el inputEmail = email123
    // se ponga la contraseña tal en input Password = 12345
    const btn = document.getElementById('btnLogin');
    btn.click();
    expect
  });
});
