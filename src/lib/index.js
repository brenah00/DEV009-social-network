// aqui exportaras las funciones que necesites
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc1X4Bn_JSI3EzBIAUHhPck_l06-yuZ6s",
  authDomain: "social-network-4c6aa.firebaseapp.com",
  projectId: "social-network-4c6aa",
  storageBucket: "social-network-4c6aa.appspot.com",
  messagingSenderId: "316343450985",
  appId: "1:316343450985:web:2a090a97dd7a1fc6bc91f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};
