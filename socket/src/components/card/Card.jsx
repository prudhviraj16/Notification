import React, { useState } from "react";
import "./card.css";
import Heart from "../../img/heart.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";
import HeartFilled from "../../img/heartFilled.svg";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    setLiked(!liked);

    socket.emit("sendNotification", {
      senderName: user,
      receivername: post.username,
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img
            src={HeartFilled}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}

        <img
          src={Comment}
          className="cardIcon"
          alt=""
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          className="cardIcon"
          alt=""
          onClick={() => handleNotification(3)}
        />
        <img src={Info} className="cardIcon infoIcon" alt="" />
      </div>
    </div>
  );
};

export default Card;
