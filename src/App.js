import React from "react";
import Comment from "./components/comment";

function App() {
  return (
    <section className="app">
      <div className="main-container">
        <Comment></Comment>
      </div>
      <div className="user-container">
        <img src="" alt="profile" />
        <form>
          <textarea name="" id="" cols="30" rows="10"></textarea>
          <button>Send</button>
        </form>
      </div>
    </section>
  );
}

export default App;
