import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  orderBy,
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
export const newPost = async (user, textToPost) => {
  await addDoc(collection(db, 'posts'), {
    contentPost: textToPost,
    date: new Date().toLocaleString(),
    creator: user,
    likes: [],
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
  const allPost = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    // console.log(querySnapshot);
    querySnapshot.forEach((post) => {
      allPost.push(post.data());
    });
    return allPost;
  } catch (error) {
    return error;
  }
};
