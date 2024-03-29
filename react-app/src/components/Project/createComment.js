import React, { useState, useEffect } from 'react';
import { useParams, Redirect, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as commentActions from '../../store/comments.js'
import "./Project.css"
import { getProjectId } from '../../store/projects.js';


const CreateComment = ({ projectId, proj }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // let { projectId } = useParams();

  const [commentMessage, setCommentMessage] = useState("");
  const [errors, setErrors] = useState([])
  const user = useSelector(state => state.session.user)



  // const [submitSuccess, setSubmitSuccess] = useState(false);


  // if (submitSuccess) {
  //     return <Redirect to={`/projects/${projectId}/comments`} />;
  // }

  // const validations = () => {
  //     const errors = [];
  //     console.log("errors message")
  //     if (commentMessage.length < 1)
  //         errors.push("Please enter in a comment");
  //     return errors;
  // };
  // console.log(history.location, history.length, "HISTORY STUFF")

  const handleSubmit = async (e) => {
    // console.log('handle submit')
    e.preventDefault();
    if (!commentMessage) {
      setErrors(['Comment is required'])
      return;
    }
    if (commentMessage && commentMessage.trim().length === 0) {
      setErrors(["Comment is required!!"])
      return;
    }
    const payload = {
      user_id: user.id,
      comment: commentMessage,
      project_id: projectId,
    };

    let newComment = await dispatch(commentActions.addCommentToProject(payload));
    if (newComment) {
      dispatch(commentActions.getProjectComments(projectId))
      setCommentMessage("")
      // history.push(`/gallery/${projectId}`)
    }

    // if (newComment) {
    //     setCommentMessage("")
    // }

    // const errors = validations();
    // if (errors.length) {
    //     console.log('errors length', errors.length)
    //     setErrors(errors);
    //     return;
    // }
    // return dispatch(commentActions.addCommentToProject(payload)).then(
    //     async (res) => {
    //         setSubmitSuccess(true);
    //     }
    // );
  };

  // return (
  //     <div className="commentContainer">
  //         <form className="commentForm" onSubmit={handleSubmit}>
  //             {/* <div className="commentTitle">Create Your Review</div> */}
  //             {errors ?? (
  //                 <ul>
  //                     {errors.map((error, idx) => (
  //                         <li key={idx}>{error}</li>
  //                     ))}
  //                 </ul>
  //             )}
  //             <div>
  //                 <input
  //                     type="text"
  //                     placeholder="What do you think about this project?"
  //                     value={commentMessage}
  //                     onChange={(e) => setCommentMessage(e.target.value)}
  //                     required
  //                 />
  //             </div>
  //             <div>
  //                 <button className="createCommentButton" type="submit" onSubmit={handleSubmit}>
  //                     Post a Comment
  //                 </button>
  //             </div>
  //         </form>
  //     </div>
  // );
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="create-comment-errors">
        {errors.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </div>
      <div className="comment-textarea">
        <textarea
          style={{width: "100%"}}
          style={{width: "100%", resize:"none"}}
          type="textarea"
          maxLength="100"
          className="comment-input"
          value={commentMessage}
          onChange={(e) => setCommentMessage(e.target.value)}
          placeholder="What do you think about this project?"
          required
        />
        <div className="reply-btn-div">
          <button className="reply-btn" type="submit" onClick={handleSubmit} hidden={!user}>
            Post a comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateComment;
