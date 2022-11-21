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
    <form className="edit-comment-form" onSubmit={handleSubmit}>
      <div className="editedComment-errors">
        {errors.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </div>
      <div className="comment-textarea">
        <textarea
          style={{width: "100%"}}
          type="textarea"
          maxLength="281"
          className="comment-input"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
          placeholder="What do you think about this project?"
          required
        />
        <div className="reply-btn-div">
          <button className="reply-btn" type="submit" onClick={handleSubmit}>
            Edit Comment
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditCommentForm
