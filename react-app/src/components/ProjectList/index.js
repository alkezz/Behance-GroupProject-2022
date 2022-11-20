import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useHistory } from "react-router-dom"
import ProjectCard from './ProjectCard'
<<<<<<< HEAD
import followActions from "../../store/follows"
=======
import * as followActions from '../../store/follows'
>>>>>>> 21129f3f94c3e05534766d7ea67d647de34bd124
import './ProjectList.css'
import { useDispatch, useSelector } from "react-redux"

const ProjectList = () => {
<<<<<<< HEAD
  const dispatch = useDispatch()
=======
  
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
>>>>>>> 21129f3f94c3e05534766d7ea67d647de34bd124
  const location = useLocation()
  const sessionUser = useSelector((state) => state.session.user)
  const [projects, setProjects] = useState([])
  const history = useHistory()
  useEffect(() => {
    (async () => {
      await fetch('/api/projects/').then(response => {
        response.json().then(data => {
          setProjects(data)
        })
      })
    })();
    document.title = `Enhance :: For you`
  }, [])

<<<<<<< HEAD
  // if (sessionUser) {
  //   dispatch(followActions.userFollows(sessionUser.id))
  // }

=======
  if (sessionUser) {
    console.log("Yo I'm a user")
    dispatch(followActions.userFollows(sessionUser.id))
  }
  
>>>>>>> 21129f3f94c3e05534766d7ea67d647de34bd124
  const allProjects = projects
  if (!allProjects) return null;

  return (
    <div className="landing-page-container">
      <div className="landing-page-grid">
        {allProjects.map(proj => (
          <Link to={{ pathname: `/gallery/${proj.id}`, state: { prev: location.pathname } }} key={proj.id} className='project-list-card'>
            <ProjectCard project={proj} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProjectList;
