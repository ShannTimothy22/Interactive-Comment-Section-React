import React, { useState, useEffect } from "react";
import Comment from "./components/comment";
import FormControl from "./components/formControl";

function App() {
  // const getData = async () => {
  //   const resp = await fetch("./data.json");
  //   const data = await resp.json();
  //   window.datas = data.comments;
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  // const getLocalStorage = () => {
  //   let comment = localStorage.getItem("comment");
  //   if (comment.length > 0) {
  //     return JSON.parse(localStorage.getItem("comment"));
  //   } else {
  //     return window.datas;
  //   }
  // };

  const [comment, setComment] = useState(
    JSON.parse(localStorage.getItem("comment")) ?? []
  );
  const [currentUser, setCurrentUser] = useState([]);

  const getData = async () => {
    const resp = await fetch("./data.json");
    const data = await resp.json();
    setComment(data.comments);
    setCurrentUser(data.currentUser);
    //console.log(data.comments);
    //console.log(currentUser);
  };

  //console.log(comment);

  useEffect(() => {
    if (comment.length === 0) {
      getData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comment", JSON.stringify(comment));
  }, [comment]);

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
        if (item.id === id) {
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
