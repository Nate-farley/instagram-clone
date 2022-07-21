import React, {useState, useEffect, useContext} from "react";
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from "../services/firebase";


export default function usePhotos() {
    const [photos, setPhotos] = useState(null);

    //const { userId = '' }= useContext(UserContext);
    
    const { user: { uid: userId = '' } } = useContext(UserContext);
   
    console.log(userId);
  
    useEffect(() => {
      async function getTimelinePhotos() {
        // does the user actually follow people?
        const [{ following }] = await getUserByUserId(userId);
        let followedUserPhotos = [];

        console.log('following', following);

        if (following?.length > 0) {
            followedUserPhotos = await getPhotos(userId, following);

        }
            followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);
            console.log(followedUserPhotos);
        
        
      }
      
     
     
      
      console.log(userId);
      getTimelinePhotos();
      
    }, [userId]);

    return { photos };

    
  }












