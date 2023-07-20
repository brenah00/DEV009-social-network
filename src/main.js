// Este es el punto de entrada de tu aplicacion

import login from "./components/login";
import register from "./components/register";

const root = document.getElementById("root");

const routes = [
  { path: "/", component: login },
  { path: "/register", component: register },
];

const defaultRoute = "/"; .
