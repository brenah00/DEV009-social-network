import {createUserWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup } from 'firebase/auth';
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
/*export const loginUser = async() => {
    
};*/
