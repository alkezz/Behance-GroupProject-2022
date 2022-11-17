import React, { useState, useEffect } from 'react';
import { useParams, Redirect, Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as followActions from '../../store/follows'
import avatar from '../../assets/behance-profile-image.png'
import "./Profile.css"
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
  const [apprecInfo, setApprecInfo] = useState({})
  const { username } = useParams();

  const projList = prof.projects.map((project) => {
    return (
      <div className='projPreview' key={project.id}>
        <Link className='projPreviewImgCont' to={{ pathname: `/gallery/${project.id}`, state: { background: location } }}><img className='projPreviewImg' src={project.images[0]} /></Link>
        <div className='userText'>
          {prof.first_name} {prof.last_name}
        </div>
        <div className='projectText'>
          {project.name}
        </div>
        <div className='projectAppr'>
          <i className="apprIcon fa-solid fa-thumbs-up" />
          <div className='projectAppr_text'>{project.appreciations}</div>
        </div>
      </div>
    );
  });
  let followButton
<<<<<<< HEAD
  if (sessionUser.user !== null && !!username) {
    if (followedList.includes(prof.id)) {
      followButton = (
        <button onClick={(e) => { handleUnFollow(e); setUpdate(!update) }} className='userCard_unfollowBut' hidden={sessionUser.user.username.toLowerCase() === username.toLowerCase()}>
        </button>
      )
    }
    else {
      followButton = (
        <button onClick={(e) => { handleFollow(e); setUpdate(!update) }} className='userCard_followBut' hidden={sessionUser.user.username.toLowerCase() === username.toLowerCase()}>
=======
  if(sessionUser.user !== null && !!username){
    if (followedList.includes(prof.id)) {
      followButton = (
        <button onClick={(e) => {handleUnFollow(e);setUpdate(!update)}} className='userCard_unfollowBut' hidden={sessionUser.user.username.toLowerCase() === username.toLowerCase()}>
        </button>
      )
    } else {
      followButton = (
        <button onClick={(e) => {handleFollow(e);setUpdate(!update)}} className='userCard_followBut' hidden={sessionUser.user.username.toLowerCase() === username.toLowerCase()}>
>>>>>>> e07cf8480ef3eabe28e6fdf20b3f4037eceec1d8
          Follow
        </button>
      )
    }
<<<<<<< HEAD
=======
  } else {
    followButton = (
      <button onClick={() => history.push('/login')} className='userCard_followBut'>
        Follow
      </button>

    )
>>>>>>> e07cf8480ef3eabe28e6fdf20b3f4037eceec1d8
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
<<<<<<< HEAD
    if (username !== "gallery") {
      (async () => {
        const response = await fetch(`/api/users/username/${username}`);
        let data
        if (response) {
          data = await response.json();
          setProf(data);
          const response2 = await fetch(`/api/users/${data.id}/appreciations`);
          const response3 = await fetch(`/api/users/${data.id}/follows`);
          const data2 = await response2.json();
          const data3 = await response3.json();
          console.log("eff")
          setApprecInfo(data2);
          setFollowerInfo(data3)
        }
        // console.log("test", data)
      })();
=======
    if(username !== "gallery"){
    (async () => {
      const response = await fetch(`/api/users/username/${username}`);
      let data
      if(response) {
        data = await response.json();
        setProf(data);
        // console.log("test", data)
        const response2 = await fetch(`/api/users/${data.id}/appreciations`);
        const response3 = await fetch(`/api/users/${data.id}/follows`);
        const data2 = await response2.json();
        const data3 = await response3.json();
        console.log("eff")
        setApprecInfo(data2);
        setFollowerInfo(data3)
      }
    })();
>>>>>>> e07cf8480ef3eabe28e6fdf20b3f4037eceec1d8
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
      <div>
<<<<<<< HEAD
        Oops! We can’t find that page.
=======
>>>>>>> e07cf8480ef3eabe28e6fdf20b3f4037eceec1d8
      </div>
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
              <div className='userStat'>
                {!!Object.keys(followerInfo).length && followerInfo.followed_by_user_ids.length}
              </div>
            </div>
            <div className='statsRow'>
              <div className='userStat'>
                Following
              </div>
              <div className='userStat'>
                {!!Object.keys(followerInfo).length && followerInfo.current_followed_user_ids.length}
              </div>
            </div>
          </div>
        </div>
        <div className='userProjects'>
          <div className='userProjectsGrid' >
            {!!prof && projList}
          </div>
          {!!prof && projList.length}
          {!!prof && JSON.stringify(prof)}
          {JSON.stringify(apprecInfo)}
          {JSON.stringify(followerInfo)}
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
