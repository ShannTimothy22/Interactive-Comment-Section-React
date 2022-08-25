import React from "react";
import plus from "../images/icon-plus.svg";
import minus from "../images/icon-minus.svg";
import profile from "../images/avatars/image-amyrobson.png";
import reply from "../images/icon-reply.svg";

const comment = () => {
  return (
    <div className="grid-container grid-container--comment comment-container">
      <div className="score">
        <span>
          <img src={plus} alt="plus" />
        </span>
        <span>12</span>
        <span>
          <img src={minus} alt="minus" />
        </span>
      </div>
      <div className="button">
        <button>
          <span>
            <img src={reply} alt="reply" />
          </span>
          <h3>Reply</h3>
        </button>
      </div>
      <div className="info">
        <img src={profile} alt="comment-pic" />
        <h1>amyrobson</h1>
        <h2>1 month ago</h2>
      </div>
      <div className="comment">
        <p>
          Impressive! Though it seems the drag feature could be improved. But
          overall it looks incredible. You've nailed the design and the
          responsiveness at various breakpoints works really well.
        </p>
      </div>
    </div>
  );
};

export default comment;
