import React, {useContext} from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";
import "react-loading-skeleton/dist/skeleton.css";
import LoggedInUserContext from '../context/logged-in-user';



// we need to get the logged in users posted photos



export default function Timeline() {
 

    const { user } = useContext(LoggedInUserContext);

    const { user: { following } = {} } = useContext(
      LoggedInUserContext
    );
  
    const { photos } = usePhotos(user);
   
   console.log(following);
  
    return (
      <div className="container col-span-2">
        {following === undefined ?(
          <Skeleton count={2} width={640} height={500} className="mb-5" />
        ) : following.length === 0 ?(
          <p className="flex justify-center font-bold">Follow other people to see Photos</p>
        ) : photos? (
         photos.map((content) => <Post key={content.docId} content={content} />)          
        ) : null}
  
        
      </div>
    );
  }


/*
{!photos ? (
            <Skeleton count={2} width={640} height={500} />
           ) : photos?.length > 0 ? (
            photos.map((content) => <Post key={content.docId} content={content} />)
           ) : (
            <p className="text-center text-2xl">Follow people to see photos!</p>
        
           )}

*/