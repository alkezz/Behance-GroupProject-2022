import React, { useState, useEffect } from 'react';
import { useParams, Redirect, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as commentActions from '../store/comments.js'

function ProjectGallery() {
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
    dispatch(commentActions.getProjectComments(projectId))
  }, [projectId, dispatch]);

  if (!projectId) {
    return null;
  }

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
    <ul>
      <li>
        <strong>projid</strong> {projectId}
      </li>
      <li>
        <strong>data</strong> {JSON.stringify(proj)}
      </li>
      <li>
        <strong>imgs</strong> {JSON.stringify(projImg)}
        <ul>
            {
                !!projImg.images && projImg.images.map((eachImg) => (
                    <li>
                        <img style={{height:"200px"}}src={eachImg.url}>

                        </img>
                    </li>
                ))
            }
        </ul>
      </li>
      <li>
        <strong>comments</strong> {JSON.stringify(projectComments)}
            {
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
            }
      </li>
      <form onSubmit={handleSubmit}>
        <textarea
            type="text"
            placeholder="What do you think about this project?"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)} />
        <button type='submit'>add comm</button>
      </form>
    </ul>
  );
}
export default ProjectGallery;
