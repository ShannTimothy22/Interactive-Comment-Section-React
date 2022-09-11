import React from "react";

const DeleteModal = ({ setDeleteModal, removeComment }) => {
  const cancelDelete = () => {
    setDeleteModal(false);
  };

  const deleteComment = () => {
    removeComment();
    setDeleteModal(false);
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="header">
          <h1>Delete Comment</h1>
        </div>
        <div className="content">
          <p>
            Are you sure you want to delete this comment ? This will remove the
            comment and can't be undone
          </p>
        </div>
        <div className="button-container">
          <button className="cancel" onClick={cancelDelete}>
            No,cancel
          </button>
          <button className="delete" onClick={deleteComment}>
            Yes,delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
