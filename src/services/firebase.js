
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

   return querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
      
        
       
        
    }));





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

    export async function getUserPhotosByUserId(userId) {

      const q = query(collection(db, 'photos'), where('userId', '==' , userId));
   

      const querySnapshot = await getDocs(q);
  
      const photos = querySnapshot.docs.map((photo) => ({
          ...photo.data(),
          docId: photo.id
        }));

    return photos;
    }

  
    export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
      
      console.log(loggedInUserUsername);
      console.log(profileUserId);


      const photoColRef = collection(db, 'users');

      const q1 = query(photoColRef, where('username', '==', loggedInUserUsername), where('following', 'array-contains', profileUserId));
   
      
      const querySnapshot = await getDocs(q1);
    
      const [ querySnapshots = {}] = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
        
      }));
      
      console.log(querySnapshots);
      console.log(querySnapshots.userId);
      return querySnapshots.userId;
    }
    
    export async function toggleFollow(
      isFollowingProfile,
      activeUserDocId,
      profileDocId,
      profileUserId,
      followingUserId
    ) {
      // 1st param: karl's doc id
      // 2nd param: raphael's user id
      // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
      await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
    
      // 1st param: karl's user id
      // 2nd param: raphael's doc id
      // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
      await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
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


