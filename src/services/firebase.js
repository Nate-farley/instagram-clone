
import { db }  from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";


export async function doesUsernameExist(username) {
    const q = query(collection(db, 'users'), where('username', '==' , username.toLowerCase()));
    console.log(q)

    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);

 
   return querySnapshot.docs.length > 0;

   

           
      // doc.data() is never undefined for query doc snapshots
      
   
      
}


/*
querySnapshot.forEach((user) => user);

*/