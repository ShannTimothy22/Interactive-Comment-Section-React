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
{
  /* {comment.map((item) => {
          //console.log(item)
          return (
            <div
              key={item.id}
              className="grid-container grid-container--comment comment-container"
            >
              <div className="score">
                <span>
                  <img src={plus} alt="plus" />
                </span>
                <span>{item.score}</span>
                <span>
                  <img src={minus} alt="minus" />
                </span>
              </div>
              <div className="button">
                <button onClick={handleReply}>
                  <span>
                    <img src={replys} alt="reply" />
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
                <p>{item.comments}</p>
              </div>
              {item.replies.map((item) => {
                console.log(item);
                return (
                  <div
                    key={item.id}
                    className="grid-container grid-container--comment comment-container"
                  >
                    <div className="score">
                      <span>
                        <img src={plus} alt="plus" />
                      </span>
                      <span>{item.score}</span>
                      <span>
                        <img src={minus} alt="minus" />
                      </span>
                    </div>
                    <div className="info">
                      <img src={profile} alt="comment-pic" />
                      <h1>amyrobson</h1>
                      <h2>1 month ago</h2>
                    </div>
                    <div className="comment">
                      <p>{item.replies}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        {isReply && (
          <div className="user-container">
            <form
              className="grid-container grid-container--form form"
              onSubmit={handleSubmitReply}
            >
              <img className="profile" src={profile} alt="profile" />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Add a comment..."
                value={replies}
                onChange={(e) => {
                  setReply(e.target.value);
                }}
              ></textarea>
              <button type="submit" className="btn">
                reply
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="user-container">
        <form
          className="grid-container grid-container--form form"
          onSubmit={handleSubmit}
        >
          <img className="profile" src={profile} alt="profile" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Add a comment..."
            value={comments}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <button type="submit" className="btn">
            send
          </button>
        </form> */
}

export default App;
