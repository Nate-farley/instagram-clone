import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// here im importing the seed file;

//import { seedDatabase } from '../seed';



const firebaseConfig = {

    apiKey: "AIzaSyDKOT7Nn9TStG26anX5mqjBAxqT8Mwm5S4",
    authDomain: "instagram-clone-7f2fa.firebaseapp.com",
    projectId: "instagram-clone-7f2fa",
    storageBucket: "instagram-clone-7f2fa.appspot.com",
    messagingSenderId: "834426855589",
    appId: "1:834426855589:web:d4bb2f15dd62fd39d22d4c"

  };

  const firebase = initializeApp(firebaseConfig);
  const { FieldValue }  = getFirestore(firebase);
  console.log(FieldValue);

  // here im going to call the seeddata funcation to add data to firestore but only ONCE!!
  //seedDatabase(FieldValue);
  


  export { firebase, FieldValue };

