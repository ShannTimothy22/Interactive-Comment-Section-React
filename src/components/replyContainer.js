import React from "react";
import Reply from "./reply";

const ReplyContainer = ({
  comments,
  updateScore,
  addReply,
  editComment,
  deleteComment,
}) => {
  return (
    <div className="reply-container">
      {comments.map((comment) => {
        return (
          <Reply
            comments={comment}
            key={comment.id}
            updateScore={updateScore}
            addReply={addReply}
            editComment={editComment}
            deleteComment={deleteComment}
          ></Reply>
        );
      })}
    </div>
  );
};

export default ReplyContainer;
