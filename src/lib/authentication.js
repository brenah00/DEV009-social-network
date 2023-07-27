import {createUserWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../lib/index.js';
import { async } from 'regenerator-runtime';

export const newRegister = async(email, password) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredentials;
    } catch (error) {
        return error.message;
    }
};
export const loginGoogle = async() => {
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider);
      return credentials;
    } catch (error) {
      return error;
    }
};
export const loginUser = async(email, password) => {
     
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return userCredentials.user;
    } catch (error) {
        return error.message;
    }
};
export const logoutUser = async() =>{
    signOut(auth).then(() => {
        console.log('sesion cerrada');
        // Sign-out successful.
    }).catch((error) => {
        console.log('sesion NO cerrada');
        // An error happened.
    });
};
export async function getEmail() {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe(); // Dejamos de escuchar cambios de autenticación una vez que tenemos el resultado
        if (user) {
          const userEmail = user.email;
          resolve(userEmail); // Resolvemos la promesa con el correo electrónico
        } else {
          resolve(null); // No hay usuario autenticado, resolvemos la promesa con null
        }
      });
    });
  }
