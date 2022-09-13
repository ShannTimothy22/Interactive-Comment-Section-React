import React, { useState, useContext, useReducer, useEffect } from "react";
import Comment from "./components/comment";
import FormControl from "./components/formControl";

function App() {
  const [comment, setComment] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const getData = async () => {
    const resp = await fetch("./data.json");
    const data = await resp.json();
    setComment(data.comments);
    setCurrentUser(data.currentUser);
    //console.log(currentUser);
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if (comment) {
  //     setComment(JSON.parse(localStorage.getItem("comment")));
  //     //console.log(comment);
  //   } else {
  //     getData();
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("commentsa", JSON.stringify(comment));
  //   //console.log(comment);
  // }, [comment]);

  const updateScore = (id, score, type) => {
    let newComment = [...comment];

    if (type === "comment") {
      newComment.forEach((item) => {
        item.score = score;
      });
    }
    if (type === "reply") {
      newComment.forEach((item) => {
        item.replies.forEach((items) => {
          items.score = score;
        });
      });
    }

    setComment(newComment);
  };

  const addComment = (newComments) => {
    let newComment = [...comment, newComments];
    setComment(newComment);
  };

  const addReply = (newReply, id) => {
    let newComment = [...comment];
    newComment.forEach((item) => {
      if (item.id === id) {
        item.replies = [...newReply];
      }
    });
    setComment(newComment);
  };

  const editComment = (content, id, type) => {
    let newComment = [...comment];
    if (type === "comment") {
      newComment.forEach((item) => {
        if (item.id == id) {
          item.content = content;
        }
      });
    }
    if (type === "reply") {
      newComment.forEach((item) => {
        item.replies.forEach((reply) => {
          reply.content = content;
        });
      });
    }
  };

  const deleteComment = (id, type, parentId) => {
    let newComment = [...comment];
    let newReply = [];

    if (type === "comment") {
      newComment = newComment.filter((item) => item.id !== id);
    }
    if (type === "reply") {
      comment.forEach((item) => {
        if (item.id === parentId) {
          newReply = item.replies.filter((item) => item.id !== id);
          item.replies = newReply;
          //console.log(id, type, parentId);
        }
      });
    }

    setComment(newComment);
  };

  //console.log(comment);

  return (
    <section className="app">
      <div className="main-container">
        {comment.map((comments) => {
          return (
            <Comment
              comments={comments}
              key={comments.id}
              updateScore={updateScore}
              addComment={addComment}
              addReply={addReply}
              editComment={editComment}
              deleteComment={deleteComment}
            ></Comment>
          );
        })}
      </div>
      <div className="user-container">
        <FormControl
          addComment={addComment}
          type={"send"}
          currentUser={currentUser}
        />
      </div>
    </section>
  );
}

export default App;
