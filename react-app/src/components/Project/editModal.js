import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentForm from "./editComment.js";
// import "./EditComment.css"


function EditCommentModal({ commentId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-post-button-comment" onClick={() => setShowModal(true)}><i className="fa-regular fa-pen-to-square"></i></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm commentId={commentId} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
