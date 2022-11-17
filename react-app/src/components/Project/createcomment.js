import React, { useState, useEffect } from 'react';
import { useParams, Redirect, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as commentActions from '../../store/comments.js'
import "./Project.css"


const CreateComment = () => {
    const dispatch = useDispatch();
    let { projectId } = useParams();
    const [commentMessage, setCommentMessage] = useState("");
    const [errors, setErrors] = useState([])
    const user = useSelector(state => state.session.user)
    const [submitSuccess, setSubmitSuccess] = useState(false);


    if (submitSuccess) {
        return <Redirect to={`/projects/${projectId}/comments`} />;
    }

    const validations = () => {
        const errors = [];
        console.log("errors message")
        if (commentMessage.length < 1)
            errors.push("Please enter in a comment");
        return errors;
    };

    const handleSubmit = (e) => {
        console.log('handle submit')
        e.preventDefault();
        let data = {
            comment: commentMessage,
            user_id: user.id,
            project_id: projectId,
        };

        const errors = validations();
        if (errors.length) {
            console.log('errors length', errors.length)
            setErrors(errors);
            return;
        }
        return dispatch(commentActions.addCommentToProject(data)).then(
            async (res) => {
                setSubmitSuccess(true);
            }
        );
    };

    return (
        <div className="commentContainer">
            <form className="commentForm" onSubmit={handleSubmit}>
                {/* <div className="commentTitle">Create Your Review</div> */}
                {errors ?? (
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                )}
                <div>
                    {/* <strong>comments</strong> {JSON.stringify(projectComments)} */}
                    {/* {
                      !!projectComments && projectComments.map((com) => (
                          <div>
                              <div>
                                  {com.User.first_name} {com.User.last_name}
                              </div>
                              <div>
                                  {com.comment}
                              </div>
                          </div>
                      ))
                  } */}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="What do you think about this project?"
                        value={commentMessage}
                        onChange={(e) => setCommentMessage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button className="createCommentButton" type="submit">
                        Post a Comment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateComment;
