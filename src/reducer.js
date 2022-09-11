export const reducer = (state, action) => {
  if (action.type === "ADD_COMMENT") {
    const newComment = [...state.comment, action.payload];
    //console.log(newComment);
    return {
      ...state,
      comment: newComment,
      score: 0,
    };
  }
  if (action.type === "NO_VALUE") {
    return {
      ...state,
    };
  }
  if (action.type === "REPLY_TOGGLE") {
    return {
      ...state,
      isReply: !state.isReply,
    };
  }
  if (action.type === "ADD_REPLY") {
    const temp = state.comment.find((item) => item.id === id);
    console.log(temp);
    const newReply = [{ ...state.comment.replies }, action.payload];
    console.log(state.comment);
    return {
      ...state,
      replies: newReply,
    };
  }
};
