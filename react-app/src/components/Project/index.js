import React, { useState, useEffect } from 'react';
import { useParams, Redirect, NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as commentActions from '../../store/comments.js'
import * as appreciateActions from '../../store/appreciations.js'
// import * as appreciateActions from '../../store/appreciations'
import avatar from '../../assets/behance-profile-image.png'
import "./Project.css";
import CreateComment from './createComment.js';
import DeleteComment from './deleteComment.js';
import EditCommentModal from './editModal.js';

function ProjectGallery() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const appreciate = useSelector((state) => state)
  // const projectComments = useSelector((state) => state.comments);
  const { projectId } = useParams();
  const [proj, setProj] = useState({});
  const [projImg, setProjImg] = useState([]);
  // const [projComments, setProjComments] = useState({ comments: [] });
  const [appreciations, setAppreciations] = useState(0)
  const [appreciateCount, setAppreciateCount] = useState("")
  const [update, setUpdate] = useState(true)
  const [projIds, setProjIds] = useState([])
  const [inList, setInList] = useState(false)
  const comments = useSelector((state) => state.comments);
  // const [comment, setComment] = useState('')
  // console.log(sessionUser, "user")
  // console.log("PROJECTID", projectId)
  // console.log("APPRECIATION LIST: ", appreciations)
  // console.log("SELECTOR", appreciate)
  // console.log(comments, "comments")
  // console.log(proj, "proj");
  // console.log("SETPROJIDS", projIds)
  useEffect(() => {
    // projIds.forEach((id) => id === projectId ? setInList(true) : null)
    if (!projectId) {
      return;
    }
    (async () => {
      dispatch(commentActions.getProjectComments(projectId))
      const likes = await dispatch(appreciateActions.getAppreciations(projectId))
      setAppreciations(likes)
    })();
    (async () => {
      if (sessionUser) {
        let lst = []
        const res = await fetch(`/api/users/${sessionUser.id}/appreciations`)
        const data2 = await res.json()
        data2.project_ids.forEach((id) => lst.push(id))
        lst.forEach((id) => id === Number(projectId) ? setInList(true) : null)
      }
    })();
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
  }, [JSON.stringify(proj), dispatch, setAppreciations, update, JSON.stringify(projIds)]);

  if (!projectId) {
    return null;
  }

  console.log(inList)
  let back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  console.log("INLIST", inList)

  const test = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAppreciate = async (e) => {
    e.preventDefault()
    if (inList === false) {
      await dispatch(appreciateActions.addAppreciations(projectId, sessionUser.id))
      // setAppreciations(appreciations + 1)
      setInList(true)
    } else {
      await dispatch(appreciateActions.removeAppreciations(projectId, sessionUser.id))
      // setAppreciations(appreciations - 1)
      setInList(false)
    }
  }

  return (
    <div className="one" onClick={back}>
      <button className='projClose' onClick={back}>
        <i className="projCloseIcon fa-solid fa-circle-xmark" />
      </button>
      <div className='projContainer'>
        

      {!!proj.User &&
      <div className='projUserSideStabs'>
        <div className='projUserSideBar'>
          
          {/* <Link className='projUsername' to={`/${proj.User.username}`}>
            <img className='projUserIcon' src={avatar} alt="profile-avatar" height="45" width="45" />
          </Link> */}
          <a href={`/${proj.User.username}`}>
          <img className='projUserIcon' src={avatar} alt="profile-avatar" height="45" width="45" />
          </a>
          <div className='projUserSideBarText'>
            Follow
          </div> 
          <button className='appreciateSideButton' onClick={(e) => { handleAppreciate(e); setUpdate(!update) }}>
              <i className="fa-solid fa-thumbs-up fa-1x"></i>
          </button>
          <div className='projUserSideBarText'>
            Apprreciate
          </div> 

  

        </div>
      </div>
      }

      {!!proj.User &&
        <div className='projUserInfo' onClick={test}>
          <div className='projUserInfoCont'>
            <img className='projUserIcon' src={avatar} alt="profile-avatar" height="40" width="40" />
            <div className='projUserCont'>
              <div className='projName'>
                {proj.name}
              </div>
              <Link className='projUsername' to={`/${proj.User.username}`}>
                {proj.User.first_name} {proj.User.last_name}
              </Link>
            </div>
          </div>
        </div>
      }
      <div className="modal" onClick={test}>

        {
          projImg.map((eachImg) => (

            <img className='projImg' src={eachImg}>

            </img>

          ))
        }
        <div className='appreciate-container'>
          {sessionUser &&
            <button className='appreciate-button' onClick={(e) => { handleAppreciate(e); setUpdate(!update) }}>
              <i className="fa-solid fa-thumbs-up fa-3x"></i>
            </button>
          }
          {!sessionUser &&
            <button className='appreciate-button' onClick={() => history.push("/login")}>
              <i className="fa-solid fa-thumbs-up fa-3x"></i>
            </button>
          }
          <div className='project-name-appreciate'>
            {proj.name}
            <div className='below-like-button'>
              &nbsp;
              <i id="thumbs-icon" className="fa-solid fa-thumbs-up fa-1x"></i>
              &nbsp;
              {appreciations}
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              {/* {console.log(proj.comments[0].comment)} */}
              <i className="fa-solid fa-message fa-1x"></i>
              &nbsp;
              {Object.values(comments).length}
              {/* {console.log(projComments)} */}
            </div>
          </div>
        </div>
        {/* <strong>imgs</strong> {JSON.stringify(projImg)}
         */}
        <div className='create-comment'>
          <CreateComment projectId={projectId} proj={proj} />
        </div>
        <div className="comments-section">
          {!!Object.values(comments) &&
            Object.values(comments).map((comments) => {
              console.log('each comment', comments)
              return (
                <div>
                  <div className="each-comment" key={comments?.id}>
                    <div>{comments.comment}</div>
                  </div>
                  <div>
                    {sessionUser?.id === comments?.user?.id && (
                      <>
                      <div className='edit-comment'>
                        <EditCommentModal projectId={projectId} commentId={comments.id} proj={proj} />
                      </div>
                        <div className='delete-comment'>
                          <DeleteComment projectId={projectId} commentId={comments.id} proj={proj} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* {sessionUser && (
          <div>
            <button className="reviewButton" onClick={handleCreateComment}>
              Create Review
            </button>

          </div>
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
      {/* <form onSubmit={handleSubmit}>
              <textarea
                  type="text"
                  placeholder="What do you think about this project?"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)} />
              <button type="submit">add comm</button>
            </form> */}
      {/* </div> */}
      </div>
    </div>
  );
}
export default ProjectGallery;
