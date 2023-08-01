import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
} from 'firebase/firestore';
import { app } from './index.js';

// Initialize firestore
const db = getFirestore(app);

export const saveUser = async (userName, userLastName, userEmail, userBirthday, userPassword) => {
  await setDoc(doc(db, 'users', userEmail), {
    name: userName,
    lastName: userLastName,
    email: userEmail,
    birthday: userBirthday,
    password: userPassword,
  });
};

// eslint-disable-next-line consistent-return
export const showUserName = async (email) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', email));
    if (docSnap.exists()) {
      return `${docSnap.data().name} ${docSnap.data().lastName}`;
    } /* else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    } */
  } catch (error) {
    return error;
  }
};
export const showPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  });
};
