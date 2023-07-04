import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteComment from "./deleteComment";
import { deleteProjectComment } from '../../store/comments'
// import "./EditComment.css"


function DeleteCommentModal({ commentId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='delete-comment' onClick={() => setShowModal(true)}>
            <div className='delete-click'>
                <button style={{ borderRadius: "5em", color: "white", backgroundColor: "#0057ff" }} className='deleteComment' >Delete</button>
            </div>
        </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteComment commentId={commentId} setShowModal={setShowModal} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
