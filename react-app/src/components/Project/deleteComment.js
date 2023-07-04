import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteProjectComment } from '../../store/comments'
import "./Project.css"

function DeleteComment({ projectId, commentId, proj, setShowModal }) {
    let dispatch = useDispatch();
    let history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)


    const handleDeleteClick = () => {

        dispatch(deleteProjectComment(commentId));
        // history.push(`/gallery/${projectId}`);

    };

    return (

            <div className='delete-comment' style={{display:"flex",flexDirection:"column",width:"300px",height:"100px", color:"black", justifyContent:"center", alignItems:"center"}}>
                <div style={{textAlign:"center", marginBottom:"10px"}}>Are you sure you want to delete this comment?</div>
                <div className='delete-click'>
                    <button style={{ borderRadius: "5em", color: "black", backgroundColor: "white", marginRight:"5px" }} className='deleteComment' onClick={() => setShowModal(false)}>Cancel</button>

                    <button style={{ borderRadius: "5em", color: "white", backgroundColor: "#0057ff", marginLeft:"5px"  }} className='deleteComment' onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>

    )
}

export default DeleteComment
