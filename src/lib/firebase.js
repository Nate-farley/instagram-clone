import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// here im importing the seed file;

//import { seedDatabase } from '../seed';



const firebaseConfig = {

  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  };

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);


  // here im going to call the seeddata funcation to add data to firestore but only ONCE!!
  //seedDatabase(FieldValue);
  


  export { firebase, db };

