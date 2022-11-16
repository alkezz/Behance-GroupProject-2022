import React, { useState } from 'react';
import { useDispatch, useSelector, useSelector } from 'react-redux';
import { getAllProjects } from '../../store/projects';
import { addCommentToProject, getProjectComments } from '../../store/comments';
import './comments.css'

const CommentForm = ({ project }) => {
    const [comment, setComment] = useState('');
    const [errorValidations, setErrorValidations] = useState([]);
    const updateComment = (e) => setComment(e.target.value);

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    let errors = [];

    const commentSubmit = async (e) => {
        e.preventDefault();
        const data = {
            comment: comment,
            project_id: project.id,
            user_id: user.id
        }
        let newComment = await dispatchEvent(addCommentToProject(data))
        if (comment.length === 0) {
            errors.push("This field is required")
            setErrorValidations(errors)
        }
        dispatch(getAllProjects())
        dispatch(getProjectComments(project.id))

        setComment('')
        return newComment
    }

    return (
        <form className='commentForm' onSubmit={commentSubmit}>
            <ul>{errorValidations.map(error => <li>{error}</li>)}</ul>
            <input type="text"
                className='comment-input'
                value={comment}
                onChange={updateComment}
                placeholder='What are your thoughts on this project?'
                required />
            <button type="submit">Post</button>
        </form>
    )


}
export default CommentForm
