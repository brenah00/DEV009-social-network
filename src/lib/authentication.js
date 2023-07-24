import {createUserWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut
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
        return error;
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
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return error;
    });  
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
