import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { commentEdit } from '../../store/comments'

function EditCommentForm({ projectId, onClick, commentId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrorsValidaitons] = useState([]);
  const user = useSelector(state => state.session.user)
  const comment = useSelector(state => state.comments)
  const [editedComment, setEditedComment] = useState(comment[commentId].comment);

  const errorAlerts = () => {
    const errorNotifications = [];
    if (!editedComment) errorNotifications.push('This field is required')

    return errorNotifications
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrorsValidaitons = []
    if (!editedComment) {
      setErrorsValidaitons(['Comment is required'])
      return;
    }
    if (editedComment && editedComment.trim().length === 0) {
      setErrorsValidaitons(["Comment is required!!"])
      return;
    }
    if (editedComment.length >= 75) {
      setErrorsValidaitons(["Your comment is too long."])
      return;
    }
    const payload = {
      user_id: user.id,
      comment: editedComment,
      project_id: projectId
    }

    dispatch(commentEdit(payload, commentId))
    onClick()
    // if (updatedComment) {
    //   history.push(`/gallery/${projectId}`)
    // }


  }
  return (
    <form className="edit-comment-form" onSubmit={handleSubmit} style={{ display: "flex", width: "300px", resize: "none" }}>
      <div className="comment-textarea">
        <div className='edit-comment-title'>Edit Your Comment</div>
        <div className="editedComment-errors">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
        <div className="editedComment-errors">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>

        <textarea
          style={{ width: "100%", borderRadius: "10px", width: "493px", borderColor: "lightgray", marginBottom: "10px" }}

          type="textarea"
          maxLength="281"
          className="comment-edit-box"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
          placeholder="What do you think about this project?"
          required
        />

        <button className="reply-btn" type="submit" onClick={handleSubmit}>
          Edit Comment
        </button>
      </div>


      <div className="reply-btn-div">
        <button className="reply-btn" type="submit" onClick={handleSubmit}>
          Edit Comment
        </button>
      </div>

    </form>
  );
}

export default EditCommentForm
