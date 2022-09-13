import React, { useState, useEffect } from "react";
import plus from "../images/icon-plus.svg";
import minus from "../images/icon-minus.svg";
import reply from "../images/icon-reply.svg";
import FormControl from "./formControl";
import edit from "../images/icon-edit.svg";
import deletes from "../images/icon-delete.svg";
import DeleteModal from "./deleteModal";

const Reply = ({
  comments,
  updateScore,
  addReply,
  editComment,
  deleteComment,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [time, setTime] = useState("");
  const [voted, setVoted] = useState(false);
  const [score, setScore] = useState(comments.score);
  const [content, setContent] = useState(comments.content);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  //console.log(comments);
  //console.log(comments.replyingTo);

  const createdAt = new Date(comments.createdAt);
  const now = new Date();
  const timeDiff = now.getTime() - createdAt.getTime();

  const commentPostTime = (times) => {
    let sec = (times / 1000).toFixed(0);
    let min = (times / (1000 * 60)).toFixed(0);
    let hrs = (times / (1000 * 60 * 60)).toFixed(0);
    let days = (times / (1000 * 60 * 60 * 24)).toFixed(0);
    let weeks = (times / (1000 * 60 * 60 * 24 * 7)).toFixed(0);
    let months = (times / (1000 * 60 * 60 * 24 * 31)).toFixed(0);
    let years = (times / (1000 * 60 * 60 * 24 * 12)).toFixed(0);

    if (sec < 60) {
      return "0 seconds";
    } else if (min < 60) {
      return min + " mins";
    } else if (hrs < 24) {
      return hrs + " hrs";
    } else if (days < 7) {
      return days + " days";
    } else if (weeks < 4) {
      return weeks + " weeks";
    } else if (months < 12) {
      return months + " months";
    } else {
      return years + " year";
    }
  };

  useEffect(() => {
    setTime(commentPostTime(timeDiff));
    //console.log(time);
  }, [timeDiff]);

  const updateComment = () => {
    editComment(content, comments.id, "reply");
    setIsEditing(false);
  };

  const removeReply = () => {
    deleteComment(comments.id, "reply");
    setDeleteModal(false);
    //console.log(comments.id);
  };

  const plusScore = () => {
    if (voted === false) {
      let n = score + 1;
      setScore(n);
      updateScore(comments.id, n, "comment");
      setVoted(true);
    }
  };

  const minusScore = () => {
    if (voted === true) {
      let n = score - 1;
      setScore(n);
      updateScore(comments.id, n, "comment");
      setVoted(false);
    }
  };

  const addNewReply = (newReply) => {
    addReply(newReply);
    setIsReplying(false);
  };

  return (
    <>
      <div className="grid-container grid-container--comment comment-container">
        <div className="score">
          <button className="score-btn" onClick={plusScore}>
            <img src={plus} alt="plus" />
          </button>
          <span>{score}</span>
          <button className="score-btn" onClick={minusScore}>
            <img src={minus} alt="minus" />
          </button>
        </div>
        <div className="button">
          <button
            className={`${!comments.currentUser ? "" : "display--none"}`}
            onClick={() => setIsReplying(!isReplying)}
          >
            <span>
              <img src={reply} alt="reply" />
            </span>
            <h3>Reply</h3>
          </button>
          <button
            className={`${comments.currentUser ? "" : "display--none"}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            <span>
              <img src={edit} alt="edit" />
            </span>
            <h3>Edit</h3>
          </button>
          <button
            className={`${comments.currentUser ? "" : "display--none"}`}
            onClick={() => {
              setDeleteModal(!deleteModal);
            }}
          >
            <span>
              <img src={deletes} alt="delete" />
            </span>
            <h3>Delete</h3>
          </button>
        </div>
        <div className="info">
          <div className={`profile-pic ${comments.username}`}></div>
          <h1>{comments.username}</h1>
          {comments.currentUser && <p className="user-indicator">you</p>}
          <h2>{`${time} ago`}</h2>
        </div>
        <div className="comment">
          {isEditing ? (
            <div className="user-container">
              <form className="grid-container grid-container--form form">
                <textarea
                  value={content}
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => setContent(e.currentTarget.value)}
                ></textarea>
                <button type="submit" className="btn" onClick={updateComment}>
                  update
                </button>
              </form>
            </div>
          ) : (
            <p>
              {comments.replyingTo ? `@${comments.replyingTo}, ` : ""}
              {comments.content}
            </p>
          )}
        </div>
      </div>
      {isReplying && (
        <FormControl
          addComment={addNewReply}
          type="reply"
          replyingTo={comments.username}
        ></FormControl>
      )}
      {deleteModal && (
        <DeleteModal
          removeComment={removeReply}
          setDeleteModal={setDeleteModal}
        ></DeleteModal>
      )}
      <div className="reply-container">
        {comments.replies.map((reply) => {
          return (
            <Reply
              key={reply.id}
              comments={reply}
              addNewReply={addNewReply}
            ></Reply>
          );
        })}
      </div>
    </>
  );
};

export default Reply;
