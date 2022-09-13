import React, { useState } from "react";
import profile from "../images/avatars/image-juliusomo.png";
import Alert from "./alert";

const FormControl = ({ addComment, type, replyingTo }) => {
  const [comment, setComment] = useState("");
  const [alert, setAlert] = useState(false);
  const replyTo = replyingTo ? `@${replyingTo}, ` : "";

  const removeAlert = () => {
    setAlert(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(alert);
    if (!comment) {
      setAlert(true);
    } else {
      const newComment = {
        id: new Date().getTime().toString(),
        content: replyTo + comment,
        createdAt: new Date(),
        score: 0,
        username: "juliusomo",
        replies: [],
        currentUser: true,
      };
      addComment(newComment);
      setComment("");
    }
  };

  return (
    <div className="user-container">
      <form
        className="grid-container grid-container--form form"
        onSubmit={handleSubmit}
      >
        {alert && <Alert removeAlert={removeAlert}></Alert>}
        <img className="profile" src={profile} alt="profile" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
        ></textarea>
        <button type="submit" className="btn">
          {type}
        </button>
      </form>
    </div>
  );
};

export default FormControl;
