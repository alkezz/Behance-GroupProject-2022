import React, { useState, useEffect } from 'react';
import { useParams, Redirect, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
// import * as profileActions from '../../store/songs'

function ProfilePage() {
  const [prof, setProf] = useState({username:null,projects:[]});
  const { username }  = useParams();

  const projList = prof.projects.map((project) => {
    return (
      <li key={project.id}>
        <NavLink to={`/gallery/${project.id}`}>{project.name}</NavLink>
      </li>
    );
  });

  useEffect(() => {
    if (!username) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/username/${username}`);
      const data = await response.json();
      setProf(data);
    })();
  }, [username]);

  if (!prof.username) {
    return <>
      <div>
      Oops! We can’t find that page.
      </div>
    </>;
  }

  return (
    <ul>
      <li>
        <strong>User Id</strong> {prof.username}
      </li>
      <li>
        <strong>Name</strong> {prof.first_name} {prof.last_name }
      </li>
      {!!prof && projList}
    </ul>
  );
}
export default ProfilePage;
