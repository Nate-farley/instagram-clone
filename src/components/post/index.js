import React, { useRef } from "react";
import Header from "./header";
import PropTypes from "prop-types";
import Image from "./images";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";

export default function Post({content}) {

    const commentInput = useRef(null);

    const handleFocus = () => commentInput.current.focus();

  

   

    return (

        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12" >
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus} />
            <Footer caption={content.caption} username={content.username} />
            <Comments docId={content.docId} comments={content.comments} posted={content.dateCreated} commentsInput={commentInput} />
        </div>
    );
}


Post.propTypes = {
    content: PropTypes.shape({
      username: PropTypes.string,
      imageSrc: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      docId: PropTypes.string.isRequired,
      userLikedPhoto: PropTypes.bool.isRequired,
      likes: PropTypes.array.isRequired,
      comments: PropTypes.array.isRequired,
      dateCreated: PropTypes.number.isRequired
    })
  };