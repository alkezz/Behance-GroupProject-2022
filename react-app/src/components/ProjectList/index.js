import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useHistory } from "react-router-dom"
import ProjectCard from './ProjectCard'
import * as followActions from '../../store/follows'
import './ProjectList.css'

const ProjectList = () => {

  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const location = useLocation()
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

  if (sessionUser) {
    console.log("Yo I'm a user")
    dispatch(followActions.userFollows(sessionUser.id))
  }

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
