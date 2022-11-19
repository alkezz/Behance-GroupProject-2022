import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useParams, Redirect, Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import AppeciationsList from '../ApprecList';
import * as followActions from '../../store/follows'
import { deleteProjectId } from '../../store/projects';
import avatar from '../../assets/behance-profile-image.png'
import "./Profile.css"
import MiniNav from '../MiniNav';
import Rando from './rando';
import ProjectList from '../ProjectList';
// import * as profileActions from '../../store/songs'

function ProfilePage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session);
  const followedList = useSelector((state) => state.follows.current_followed_user_ids)
  const [prof, setProf] = useState({ username: null, projects: [] });
  // console.log(prof)
  const [update, setUpdate] = useState(true)
  const [followerInfo, setFollowerInfo] = useState({})
  const [apprecInfo, setApprecInfo] = useState({ "project_ids": [] })
  const { username } = useParams();

  const deleteProject = async (e) => {

    e.preventDefault();
    let projectId = document.getElementById("delete-project-button").value;
    const response = await fetch(`/api/projects/${projectId}/`, {
      method: "DELETE"
    })
    const data = await response.json()
    setUpdate(!update)
    let refresh = sessionUser.user.username

    history.push(`/${refresh}`)
  }

  const toEditPage = (e, id) => {
    e.preventDefault();
    console.log("Project id in profile page", id)
    history.push(`/project/${id}/edit`)
  }

  const projList = prof.projects.map((project) => {
    return (
      <div className='projPreview' key={project.id}>
        <Link className='projPreviewImgCont' style={{"borderRadius": "4px"}} to={{ pathname: `/gallery/${project.id}`, state: { background: location } }}><img className='projPreviewImg' style={{"borderRadius": "4px"}} src={project.images[0]} /></Link>
        <div className='userText'>
          {prof.first_name} {prof.last_name}
        </div>
        <Link className='projectText' to={`/gallery/${project.id}`}>
          {project.name}
        </Link>
        {!!sessionUser.user && sessionUser.user.id === prof.id && (
          <div className="project-features">
            <button id="edit-project-button" value={project.id} onClick={(e) => {toEditPage(e, project.id)}}>Edit Project</button>
            <button id="delete-project-button" value={project.id} onClick={(e) => {deleteProject(e, project.id)}}>Delete Project</button>
          </div>
        )}
        <div className={(!!sessionUser.user && sessionUser.user.id == prof.id) ? 'projectAppr':'projectAppr userEx'} >
          <i className="apprIcon fa-solid fa-thumbs-up" />
          <div className='projectAppr_text'>{project.appreciations}</div>
        </div>
      </div>
    );
  });
  let followButton
  if (sessionUser.user !== null && !!username) {
    if (followedList.includes(prof.id)) {
      followButton = (
        <button onClick={(e) => { handleUnFollow(e); setUpdate(!update) }} className='userCard_unfollowBut' hidden={sessionUser.user.username.toLowerCase() === username.toLowerCase()}>
        </button>
      )
    } else {
      followButton = (
        <button onClick={(e) => { handleFollow(e); setUpdate(!update) }} className='userCard_followBut' hidden={sessionUser.user.username.toLowerCase() === username.toLowerCase()}>
          <i className="followIcon fa-solid fa-circle-plus" /> Follow
        </button>
      )
    }
  } else {
    followButton = (
      <button onClick={() => history.push('/login')} className='userCard_followBut'>
        Follow
      </button>

    )
  }

  const followcount = () => {
    let count = 0
    prof.projects.forEach((e) => {
      count += e.appreciations
    })
    return count
  }



  const handleFollow = (e) => {
    setUpdate(true)
    e.preventDefault();
    dispatch(followActions.followUser(sessionUser.user.id, prof.id))
  }

  const handleUnFollow = (e) => {
    setUpdate(true)
    e.preventDefault();
    dispatch(followActions.unfollowUser(sessionUser.user.id, prof.id))
  }

  useEffect(() => {
    document.title = `Enhance :: ${username}`
    if (!username) {
      return;
    }

    if (username !== "gallery") {
      (async () => {
        const response = await fetch(`/api/users/username/${username}`);
        let data
        if (response) {
          data = await response.json();
          setProf(data);
          // console.log("test", data)
          const response2 = await fetch(`/api/users/${data.id}/appreciations`);
          const response3 = await fetch(`/api/users/${data.id}/follows`);
          const data2 = await response2.json();
          const data3 = await response3.json();
          setApprecInfo(data2);
          setFollowerInfo(data3)
        }
      })();
    }

    // (async () => {
    //   const response = await fetch(`/api/users/${prof.id}/appreciations`);
    //   const data = await response.json();
    //   setApprecInfo(data);
    // })();
    // (async () => {
    //   const response = await fetch(`/api/users/${prof.id}/follows`);
    //   const data = await response.json();
    //   setFollowerInfo(data);
    // })();
  }, [username, dispatch, update]);

  if (!prof.username) {
    return <>
      {console.log(location)}
    </>;
  }

  return (
    <div className='profilePage'>
      <div className='profileContent'>
        <div className='userCard'>
          <img className='userIcon' src={avatar} alt="profile-avatar" height="110" width="110" />
          <div className='userCard_name'>
            {prof.first_name} {prof.last_name}
          </div>
          <div className='userCard_username'>
            {prof.username}
          </div>
          {
            followButton
          }
          <div className='userStats'>
            <div className='statsRow'>
              <div className='userStat'>
                Appreciations
              </div>
              <div className='userStat'>
                {prof.projects.reduce((prev, curr) => prev + curr.appreciations, 0)}
              </div>
            </div>
            <div className='statsRow'>
              <div className='userStat'>
                Followers
              </div>
              <div className='userStatNum'>
                {!!Object.keys(followerInfo).length && followerInfo.followed_by_user_ids.length}
              </div>
            </div>
            <div className='statsRow'>
              <div className='userStat'>
                Following
              </div>
              <div className='userStatNum'>
                {!!Object.keys(followerInfo).length && followerInfo.current_followed_user_ids.length}
              </div>
            </div>
          </div>
          <div>
            You can email me here at:
          </div>
          <div>
            {prof.email}
          </div>
          <div className='ourInfo'>
            <Rando />
          </div>
        </div>
        <div className='userProjects'>
          <MiniNav data={prof}></MiniNav>
          <Switch>
            <Route exact path={`/${prof.username}` || `/${prof.username}/work`}>
              <div className={(!!sessionUser.user && sessionUser.user.id === prof.id) ? 'userProjectsGrid': 'userProjectsGridU'}>
                {!!prof && projList}
              </div>
            </Route>
            <Route path={`/${prof.username}/appreciations`}>
              <AppeciationsList appreciations={apprecInfo} />
            </Route>
          </Switch>
          {/* {!!prof && projList.length}
          {!!prof && JSON.stringify(prof)}
          {JSON.stringify(apprecInfo)}
          {JSON.stringify(followerInfo)} */}
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
