// Este es el punto de entrada de tu aplicacion

import login from './components/login.js';
import register from './components/register.js';
import home from './components/home.js';
import error from './components/error.js';

const root = document.getElementById("root");
/*
root.append(login());

root.append(register());

root.append(home());
*/
const routes = [
    {path:'/',component:login},
    {path:'/register',component:register},
    {path:'/home',component:home},
    {path:'/error',component:error}
];
const defaultRoute = '/';

function navigateTo(hash){
    const route = routes.find((routeFind)=>{
        return routeFind.path === hash;
    });
    if(route && route.component){
        window.history.pushState(
            {},
            route.path,
            window.location.origin + route.path
        );
        if(root.firstChild){
            root.removeChild(root.firstChild);
        }
        root.appendChild(route.component(navigateTo));
    } else{
        navigateTo('/error');
    }
}
window.onpopstate = () => {
    console.log('hubo un cambio)');
    navigateTo(window.location.pathname);  
}
navigateTo(window.location.pathname || defaultRoute);