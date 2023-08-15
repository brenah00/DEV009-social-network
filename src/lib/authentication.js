import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from './index.js';

// Initialize Authentication
const auth = getAuth(app);

export const newRegister = async (email, password) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredentials;
  } catch (error) {
    return error.message;
  }
};

export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, provider);
    return credentials;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    return userCredentials.user;
  } catch (error) {
    return error.message;
  }
};

export const logoutUser = async () => {
  signOut(auth).then(() => {
    console.log('sesion cerrada');
    // Sign-out successful.
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
export const loginValidate = async () => new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
});
export const getEmail = async () => new Promise((resolve) => {
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
