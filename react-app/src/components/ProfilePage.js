import React, { useState, useEffect } from 'react';
import { useParams, Redirect, Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
// import * as profileActions from '../../store/songs'

function ProfilePage() {
  const dispatch = useDispatch()
  const [prof, setProf] = useState({ username: null, projects: [] });
  const [followerInfo, setFollowerInfo] = useState({})
  const [apprecInfo, setApprecInfo] = useState({})
  const { username } = useParams();

  const projList = prof.projects.map((project) => {
    return (
      <div key={project.id}>
        <Link to={`/gallery/${project.id}`}>{project.name}</Link>
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
    if (!username) {
      return;
    }
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
    <div>
      <div>
        <strong>User Id</strong> {prof.username}
      </div>
      <div>
        <strong>Name</strong> {prof.first_name} {prof.last_name}
      </div>
      <div>
        {JSON.stringify(prof)}
      </div>
      <div>
        {JSON.stringify(apprecInfo)}
      </div>
      <div>
        <strong>Appreciations</strong> {!!Object.keys(apprecInfo).length && apprecInfo.project_ids.length}
      </div>
      <div>
        {JSON.stringify(followerInfo)}
      </div>
      <div>
        <strong>Following</strong> {!!Object.keys(followerInfo).length && followerInfo.current_followed_user_ids.length}
      </div>
      <div>
        <strong>Followers</strong> {!!Object.keys(followerInfo).length && followerInfo.followed_by_user_ids.length}
      </div>
      <div>
        <strong>followsOLD</strong> {followcount()}
      </div>
      {!!prof && projList}
    </div>
  );
}
export default ProfilePage;
