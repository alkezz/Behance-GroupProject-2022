import React, { useState, useEffect } from 'react';
import { useParams, Redirect, NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as commentActions from '../../store/comments.js'
import * as appreciateActions from '../../store/appreciations.js'
import * as followActions from '../../store/follows'
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
  const followedList = useSelector((state) => state.follows.current_followed_user_ids)
  // const projectComments = useSelector((state) => state.comments);
  const { projectId } = useParams();
  const [proj, setProj] = useState({});
  const [projImg, setProjImg] = useState([]);
  const [followerInfo, setFollowerInfo] = useState({})
  // const [projComments, setProjComments] = useState({ comments: [] });
  const [appreciations, setAppreciations] = useState(0)
  const [appreciateCount, setAppreciateCount] = useState("")
  const [update, setUpdate] = useState(true)
  const [projIds, setProjIds] = useState([])
  const [inList, setInList] = useState(false)
  const comments = useSelector((state) => state.comments);
  const [projectOwner, setProjectOwner] = useState({ User: null })
  // console.log(followerInfo)
  // const [comment, setComment] = useState('')
  console.log(sessionUser, "user")
  // console.log("PROJECTID", projectId)
  // console.log("APPRECIATION LIST: ", appreciations)
  // console.log("SELECTOR", appreciate)
  // console.log(comments, "comments")
  // console.log(proj, "proj");
  // console.log("SETPROJIDS", projIds)
  useEffect(async () => {
    // projIds.forEach((id) => id === projectId ? setInList(true) : null)
    if (!projectId) {
      return;
    }
    if (!proj) {
      return
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
      setProjectOwner(data.User)
    })();
    (async () => {
      const response = await fetch(`/api/projects/${projectId}/images`);
      const data = await response.json();
      setProjImg(data);
    })();
  }, [JSON.stringify(proj), dispatch, setAppreciations, setProj, update, JSON.stringify(projIds)]);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`/api/comments/${projectId}/comments`);
  //     const data = await response.json();
  //     setProjComments(data);
  //   })();
  // }, [dispatch, comments]);

  // useEffect(() => {
  //   (async () => {
  //     const response3 = await fetch(`/api/users/${proj.User.id}/follows`);
  //     const data3 = await response3.json();
  //     setFollowerInfo(data3)
  //   })();
  // }, [])

  if (!projectId) {
    return null;
  }

  console.log(inList)
  let back = (e) => {
    e.stopPropagation();
    console.log("HISTORY", history.goBack)
    history.goBack();
  };
  let followButton
  if (sessionUser.user !== null) {
    if (projectOwner) {
      if (followedList.includes(projectOwner.id)) {
        followButton = (
          <button onClick={(e) => { handleUnFollow(e); setUpdate(!update) }} className='userCard_unfollowBut' hidden={sessionUser.id === projectOwner.id}>
          </button>
        )
      } else {
        followButton = (
          <button onClick={(e) => { handleFollow(e); setUpdate(!update) }} className='userCard_followBut' hidden={sessionUser.id === projectOwner.id}>
            <i className="followIcon fa-solid fa-circle-plus" /> Follow
          </button>
        )
      }
    }
  } else {
    followButton = (
      <button onClick={() => history.push('/login')} className='userCard_followBut'>
        Follow
      </button>

    )
  }

  const handleFollow = (e) => {
    e.preventDefault();
    dispatch(followActions.followUser(Number(sessionUser.id), Number(projectOwner.id)))
  }

  const handleUnFollow = (e) => {
    e.preventDefault();
    dispatch(followActions.unfollowUser(Number(sessionUser.id), Number(projectOwner.id)))
  }

  // const handleSubmit = async (e) => {
  //   // console.log("hit");
  //   // console.log(comment, sessionUser.id, projectId)

  //   const response = await fetch(`/api/comments/new`, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       // comment,
  //       user_id: sessionUser.id,
  //       project_id: projectId,
  //     }),
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     // console.log(data);
  //   }
  // };
  // const handleCreateComment = (e) => {
  //   e.preventDefault();
  //   history.push(`/projects/${projectId}`)
  // }
  // const handleSumit = async (e) => {
  //   e.preventDefault();

  //   // const payload = {
  //   //   comment,
  //   //   user_id: sessionUser.id,
  //   //   project_id: projectId
  //   // };

  //   let createdComment
  //   try {
  //     createdComment = await dispatch(commentActions.addCommentToProject(payload))
  //   } catch (error) {
  //     if (error) console.log(error);
  //     // If error is not a ValidationError, add slice at the end to remove extra
  //     // "Error: "
  //     else console.log('none')
  //   }
  //   if (createdComment) {
  //     console.log('success')
  //   }

  // }

  console.log("INLIST", inList)

  const test = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  // projIds.project_ids.forEach((id) => console.log("FOREACH", id))
  // projIds.forEach((id) => id === Number(projectId) ? setInList(true) : null)
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
      {
        !!proj.User &&
        <div className='projUserSideCont'>
          test
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
        {/* <div>
          <strong>projid</strong> {projectId}
        </div>
        <div>
          <strong>data</strong> {JSON.stringify(proj)}
        </div> */}

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
        <br />
        <div className="comments-container">
          <div className='information-div'>
            <div className='owner-info-div'>
              <div className='owner-text-div'>
                Owner:
              </div>
              <br />
              {proj.User &&
                <>
                  <div className='avatar-username-div'>
                    <img src={avatar} width="40" height="40" />
                    <Link style={{ textDecoration: "none", fontSize: "18px", paddingLeft: "15px" }} to={`/${proj.User.username}`}>
                      {proj.User.first_name} {proj.User.last_name}
                    </Link>
                  </div>
                  {
                    followButton
                  }
                </>
              }
            </div>
            &nbsp;
            &nbsp;
            &nbsp;
            <div className='project-info-div'>
              <div id='project-name'>
                {proj.name}
              </div>
              <br />
              <div id='project-description'>
                {proj.description}
              </div>
              <div>
                <br />
                &nbsp;
                <i id="thumbs-icon-comment-section" className="fa-solid fa-thumbs-up fa-1x"></i>
                &nbsp;
                {appreciations}
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                {/* {console.log(proj.comments[0].comment)} */}
                <i id="thumbs-icon-comment-section" className="fa-solid fa-message fa-1x"></i>
                &nbsp;
                {Object.values(comments).length}
                {/* {console.log(projComments)} */}
              </div>
            </div>
          </div>
          <div>
            &nbsp;
            &nbsp;
            &nbsp;
          </div>
          <div className='comments-section'>
            <div className='create-comment'>
              <img src={avatar} width="40" height="40" style={{ float: "left", marginRight: "20px" }} />
              <CreateComment projectId={projectId} proj={proj} />
            </div>
            <hr id='hr-comments' />
            {!!Object.values(comments) &&
              Object.values(comments).map((comments) => {
                console.log('each comment', comments)
                return (
                  <div>
                    <div className="each-comment" key={comments?.id}>
                      <div style={{ listStyle: "none" }}>
                        <img src={avatar} width="40" height="40" style={{ float: "left", marginRight: "20px" }} />
                        <div>
                          <div style={{ paddingBottom: "10px" }}>{comments.User.first_name} {comments.User.last_name}</div>
                          <div>{comments.comment}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginBottom: "30px" }}>
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
                      <br />
                    </div>
                  </div>
                );
              })}
          </div>
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
  );
}
export default ProjectGallery;
