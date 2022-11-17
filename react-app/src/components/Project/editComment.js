import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { commentEdit } from '../../store/comments'

function EditCommentForm({projectId, proj}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [comment, setComment] = useState('');
    const [error, setErrorValidaitons] = useState([]);
    const user = useSelector(state => state.session.user)

    const errorAlerts = () => {
        const errorNotifications = [];
        if(!comment) errorNotifications.push('This field is required')

        return errorNotifications
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorValidaitons = []

        const payload = {
            user_id: proj.User.id,
            comment: comment,
            project_id: projectId
        }

        let updatedComment = await dispatch(commentEdit(payload, comment.id))
        if(updatedComment) {
            history.push(`/gallery/${projectId}`)
        }


    }
    return (
        <form className="edit-comment-form" onSubmit={handleSubmit}>
          <div className="create-comment-errors">
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div className="comment-textarea">
            <textarea
              type="textarea"
              maxLength="281"
              className="comment-input"
              value={commentMessage}
              onChange={(e) => setCommentMessage(e.target.value)}
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
