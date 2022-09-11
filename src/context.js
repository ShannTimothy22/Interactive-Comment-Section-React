import React, { useState, useContext, useReducer, useEffect } from "react";
import { reducer } from "./reducer";

const AppContext = React.createContext();

//set comment to parent of reply
const defaultState = {
  comment: [],
  score: 0,
  isReply: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [comments, setComment] = useState("");
  const [replies, setReply] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comments) {
      const newComment = {
        id: new Date().getTime().toString(),
        comments,
        replies: [],
        score,
      };

      dispatch({ type: "ADD_COMMENT", payload: newComment });
      setComment("");
      //console.log(newComment);
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };

  const handleReply = (e) => {
    e.preventDefault();
    dispatch({ type: "REPLY_TOGGLE" });
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (replies) {
      const newReply = {
        id: new Date().getTime().toString(),
        replies,
        score,
      };
      dispatch({ type: "ADD_REPLY", payload: newReply });
      setReply("");
      //console.log(newReply);
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        comments,
        replies,
        handleSubmit,
        handleReply,
        handleSubmitReply,
        setComment,
        setReply,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
