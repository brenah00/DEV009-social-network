import { async } from 'regenerator-runtime';
import { app } from '../lib/index.js';
import { getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
//Initialize firestore
const db = getFirestore(app);

export const saveUser = async(userName, userLastName, userEmail, userBirthday, userPassword) => {
    await setDoc(doc(db, "users", userEmail), {
        name: userName,
        lastName: userLastName,
        email: userEmail,
        birthday: userBirthday,
        password: userPassword
    });
  };
export const showUserName = async(email) => {

    /*const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data().name);
    console.log(docSnap.data().name + ' '+docSnap.data().lastName);
        return docSnap.data().name + ' '+docSnap.data().lastName;
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }*/
    const docRef = doc(db, "users", email);
    try{
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
                return docSnap.data().name + ' '+docSnap.data().lastName;
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }catch(error){
        return error;
    }
    

    
};