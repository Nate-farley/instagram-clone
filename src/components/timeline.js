import React from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";
import "react-loading-skeleton/dist/skeleton.css";


// we need to get the logged in users posted photos



export default function Timeline() {

    const { photos } = usePhotos();

    console.log('photos', photos);

    return (
        <div className="container col-span-2">
           {!photos ? (
            <Skeleton count={2} width={640} height={500} />
           ) : photos?.length > 0 ? (
            photos.map((content) => <Post key={content.docId} content={content} />)
           ) : (
            <p className="text-center text-2xl">Follow people to see photos!</p>
        
           )}
        </div>
    );
}