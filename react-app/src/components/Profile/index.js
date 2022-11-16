import React, { useState, useEffect } from 'react';
import { useParams, Redirect, Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../assets/behance-profile-image.png'
import "./Profile.css"
// import * as profileActions from '../../store/songs'

function ProfilePage() {
  const dispatch = useDispatch()
  const [prof, setProf] = useState({username:null,projects:[]});
  console.log(prof)
  const [followerInfo, setFollowerInfo] = useState({})
  const [apprecInfo, setApprecInfo] = useState({})
  const { username }  = useParams();

  const projList = prof.projects.map((project) => {
    return (
      <div className='projPreview' key={project.id}>
        <Link className='projPreviewImgCont' to={`/gallery/${project.id}`}><img className='projPreviewImg' src={project.images[0].url} /></Link>
        <div className='userText'>
          {prof.first_name} {prof.last_name}
        </div>
        <div className='projectText'>
          {project.name}
        </div>
        <div className='projectAppr'>
          <i className="apprIcon fa-solid fa-thumbs-up"/>
          <div className='projectAppr_text'>{project.appreciations}</div>
        </div>
      </div>
    );
  });

  const followcount = () => {
    let count = 0
    prof.projects.forEach((e) => {
      count += e.appreciations
    })
    return count
  }

  useEffect(() => {
    document.title = `Enhance :: ${username}`
    if (!username) {
      return;
    }
    if(username !== "gallery"){
    (async () => {
      const response = await fetch(`/api/users/username/${username}`);
      const data = await response.json();
      setProf(data);
      const response2 = await fetch(`/api/users/${data.id}/appreciations`);
      const response3 = await fetch(`/api/users/${data.id}/follows`);
      const data2 = await response2.json();
      const data3 = await response3.json();
      setApprecInfo(data2);
      setFollowerInfo(data3)
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
  }, [username, dispatch]);

  if (!prof.username) {
    return <>
      <div>
      Oops! We can’t find that page.
      </div>
    </>;
  }

  return (
    <div className='profilePage'>
      <div className='profileContent'>
        <div className='userCard'>
          <img className='userIcon' src={avatar} alt="profile-avatar" height="110" width="110" />
          <div className='userCard_name'>
            {prof.first_name} {prof.last_name }
          </div>
          <div className='userCard_username'>
            {prof.username}
          </div>
          <button className='userCard_followBut'>
            Follow
          </button>
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

          {!!prof && projList}
          {/* {!!prof && JSON.stringify(prof)}
          {JSON.stringify(apprecInfo)} */}
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
