import { useState } from "react";

export const SingleMessage = ({ singleMessage, fetchPosts }) => {
  const [numLikes, setNumLikes] = useState(singleMessage.hearts);
  const [liked, setLiked] = useState(false);

  const onLikeIncrease = async () => {
    // Send a POST request to like the message using the message's _id
    try {
      const response = await fetch(
        `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${singleMessage._id}/like`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setNumLikes(numLikes + 1);

        setLiked(true);

        fetchPosts();
      } else {
        // Handle errors if the POST request fails
        console.error("Failed to like the thought");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error occurred while liking the thought", error);
    }
  };

  return (
    <div className="thought">
      <p>{singleMessage.message}</p>
      <button
        className={`like-button ${liked ? "liked" : ""}`}
        onClick={onLikeIncrease}
      >
        <span role="img" aria-label="Heart">
          ❤️
        </span>
      </button>
      <p className="num-likes">{numLikes} likes</p>
    </div>
  );
};
