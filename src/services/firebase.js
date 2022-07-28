
import { db }  from "../lib/firebase";
import { collection, query, where, getDocs, limit, doc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore";



export async function doesUsernameExist(username) {
    const q = query(collection(db, 'users'), where('username', '==' , username.toLowerCase()));
   

    const querySnapshot = await getDocs(q);

  

    const userNames = querySnapshot.docs.length > 0;

  

   return userNames; 
   

   
      
}


export async function getUserByUsername(username) {
  const q = query(collection(db, 'users'), where('username', '==' , username.toLowerCase()));
   

    const querySnapshot = await getDocs(q);

    const usernames = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
      
        
       
        
    }));



 console.log(usernames);

    return usernames;


}



export async function getUserByUserId(userId) {
    const q = query(collection(db, 'users'), where('userId', '==' , userId));
   

    const querySnapshot = await getDocs(q);

    const user = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
      
        
       
        
    }));





    return user;


}


export async function getSuggestedProfiles(userId, following) {
    let q = query(collection(db, 'users'), limit(10));

    if (following?.length > 0) {
         q = query(collection(db, 'users'), where('userId', 'not-in', [...following, userId]));
      } else {
        q = query(collection(db, 'users'), where('userId', '!=', userId));
       
      }

    const querySnapshot = await getDocs(q); 

    const profiles = querySnapshot.docs.map((user) => ({ ...user.data(),  docId: user.id,  }));


   
    return profiles;

    }





export async function updateLoggedInUserFollowing( loggedInUserDocId, profileId, isFollowingProfile) {

    
    const updateFollowingRef = doc(db, "users", loggedInUserDocId);

    const updateFollowing = await updateDoc(updateFollowingRef, {
        following:  isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
        
    });
   

    return updateFollowing;

}

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile) {

    const updateFollowerRef = doc(db, "users", profileDocId);

   const updateFollower =  await updateDoc(updateFollowerRef, {
        followers: isFollowingProfile ? arrayRemove(loggedInUserDocId) : arrayUnion(loggedInUserDocId)
    });
  

    return updateFollower;

   

}


export async function getPhotos(userId, following) {
  

   const photoRef = collection(db, "photos");

    const q = query(photoRef, where('userId', 'in' , [...following]));

   

  

    const querySnapshot = await getDocs(q);

    const userFollowedPhotos = querySnapshot.docs.map((photo) => ({ ...photo.data(),  docId: photo.id, ...photo.data() }));
  


    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
          let userLikedPhoto = false;
          if (photo.likes.includes(userId)) {
            userLikedPhoto = true;
          }
          // photo.userId = 2
          const user = await getUserByUserId(photo.userId);
       
          // raphael
          const { username } = user[0];
  
          return { username, ...photo, userLikedPhoto };
          
        })
       
      );


       
    
      return photosWithUserDetails;
    
    }




/*





const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
          let userLikedPhoto = false;
          if (photo.likes.includes(userId)) {
            userLikedPhoto = true;
          }
          // photo.userId = 2
          const user = await getUserByUserId(photo.userId);
          // raphael
          const { username } = user[0];
          return { username, ...photo, userLikedPhoto };
        })
       
      );

      console.log('photosWithUserDetails', photosWithUserDetails);
    
    
      return photosWithUserDetails;




const userNames = querySnapshot.docs.length > 0;

const userNames = querySnapshot.docs.map((user) => user.data.length > 0);


const userNames = querySnapshot.docs.map((item) => ({

        ...item.data().length > 0
    
    
    }));


const q = query(collection(db, 'users'),limit(10));
    console.log(q)

    const querySnapshot = await getDocs(q); 

    const profileResults = querySnapshot.docs.map((user) => ({ ...user.data(), docId: user.id  }));

    const filterResults = profileResults.filter

    console.log(profileResults);
    return profileResults;



    */


