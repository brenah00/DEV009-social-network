// importamos la funcion que vamos a testear
import home from '../src/components/home.js';

describe('myFunction', () => {
  it('consigue levantar home', () => {
    home();
  });
});
