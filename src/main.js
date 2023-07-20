// Este es el punto de entrada de tu aplicacion

import login from './components/login.js';
import register from './components/register.js';

const root = document.getElementById("root");

root.append(login());

root.append(register());
