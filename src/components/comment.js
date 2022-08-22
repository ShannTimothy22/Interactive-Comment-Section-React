import React from "react";

const comment = () => {
  return (
    <div className="comment-container">
      <div className="score">
        <span>+</span>
        <span>score</span>
        <span>-</span>
      </div>
      <div className="info">
        <img src="" alt="comment-pic" />
        <h1>
          name<span className="date">date</span>
        </h1>
      </div>
      <div className="comment">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          praesentium unde incidunt tempora illum necessitatibus dolore, omnis
          dolorum ut maxime?
        </p>
      </div>
    </div>
  );
};

export default comment;
