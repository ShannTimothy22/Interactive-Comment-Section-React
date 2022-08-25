import React, { useState } from "react";
import Comment from "./components/comment";
import profile from "./images/avatars/image-juliusomo.png";

function App() {
  return (
    <section className="app">
      <div className="main-container">
        <Comment></Comment>
      </div>
      <div className="user-container">
        <form className="grid-container grid-container--form form">
          <img className="profile" src={profile} alt="profile" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Add a comment..."
          ></textarea>
          <button type="submit" className="btn">
            send
          </button>
        </form>
      </div>
    </section>
  );
}

export default App;
