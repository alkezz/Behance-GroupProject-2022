import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteProjectComment } from '../../store/comments'

function DeleteComment({ projectId, commentId, proj }) {
    let dispatch = useDispatch();
    let history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)


    const handleDeleteClick = () => {

        dispatch(deleteProjectComment(commentId));
        history.push(`/gallery/${projectId}`);

    };

    return (
        <div>

            <div className='delete-comment'>
                <div className='delete-click'>
                    <button className='deleteComment' onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default DeleteComment
