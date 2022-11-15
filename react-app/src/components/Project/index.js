import React, { useState, useEffect } from 'react';
import { useParams, Redirect, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as commentActions from '../../store/comments.js'
import "./Project.css"

function ProjectGallery() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user.id);
  const projectComments = useSelector((state) => state.comments);
  const [proj, setProj] = useState({});
  const [projImg, setProjImg] = useState({});
  const [comment, setComment] = useState('')

  const { projectId }  = useParams();

  useEffect(() => {
    if (!projectId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/projects/${projectId}`);
      const data = await response.json();
      setProj(data);
    })();
    (async () => {
      const response = await fetch(`/api/projects/${projectId}/images`);
      const data = await response.json();
      setProjImg(data);
    })();
    // dispatch(commentActions.getProjectComments(projectId))
  }, [projectId, dispatch]);

  if (!projectId) {
    return null;
  }

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            comment,
            user_id: sessionUser,
            project_id: projectId
        };

        let createdComment
        try {
            createdComment = await dispatch(commentActions.addCommentToProject(payload))
          } catch (error) {
            if (error) console.log(error);
            // If error is not a ValidationError, add slice at the end to remove extra
            // "Error: "
            else console.log('none')
          }
          if (createdComment) {
            console.log('success')
          }

    }

  return (
    <div className="one" onClick={back}>
      <button type="button" onClick={back}>
            Close
          </button>
          <div className='userInfo'></div>
        <div className="modal">
          <div>
            <div>
              <strong>projid</strong> {projectId}
            </div>
            <div>
              <strong>data</strong> {JSON.stringify(proj)}
            </div>
            <div>
              <strong>imgs</strong> {JSON.stringify(projImg)}
              <div>
                  {
                      !!projImg.images && projImg.images.map((eachImg) => (
                          <div>
                              <img style={{height:"200px"}}src={eachImg.url}>

                              </img>
                          </div>
                      ))
                  }
              </div>
            </div>
            <div>
              <strong>comments</strong> {JSON.stringify(projectComments)}
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
            <form onSubmit={handleSubmit}>
              <textarea
                  type="text"
                  placeholder="What do you think about this project?"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)} />
              <button type='submit'>add comm</button>
            </form>
          </div>
      </div>
    </div>
  );
}
export default ProjectGallery;
