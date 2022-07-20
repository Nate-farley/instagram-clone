
import { db }  from "../lib/firebase";
import { collection, query, where, getDocs, limit, doc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore";



export async function doesUsernameExist(username) {
    const q = query(collection(db, 'users'), where('username', '==' , username.toLowerCase()));
    console.log(q)

    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);

    const userNames = querySnapshot.docs.length > 0;

    console.log(userNames)

   return userNames; 
   

   
      
}

export async function getUserByUserId(userId) {
    const q = query(collection(db, 'users'), where('userId', '==' , userId));
    console.log(q)

    const querySnapshot = await getDocs(q);

    const user = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));



    console.log(user);

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

    const profiles = querySnapshot.docs.map((user) => ({ ...user.data,  docId: user.id, ...user.data() }));


    console.log(profiles);
    return profiles;

    }





export async function updateLoggedInUserFollowing( loggedInUserDocId, profileId, isFollowingProfile) {

    
    const updateFollowingRef = doc(db, "users", loggedInUserDocId);

    const updateFollowing = await updateDoc(updateFollowingRef, {
        following:  isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
        
    });
    console.log('dlkfdlfjdlk')
    console.log(updateFollowing)
    console.log(isFollowingProfile);
    console.log(profileId);
    

    return updateFollowing;

}

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile) {

    const updateFollowerRef = doc(db, "users", profileDocId);

   const updateFollower =  await updateDoc(updateFollowerRef, {
        followers: isFollowingProfile ? arrayRemove(loggedInUserDocId) : arrayUnion(loggedInUserDocId)
    });
    console.log(updateFollower)
    console.log(isFollowingProfile);

    return updateFollower;

   

}



/*
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


