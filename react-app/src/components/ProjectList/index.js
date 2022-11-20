import { useState, useEffect } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import ProjectCard from './ProjectCard'
import './ProjectList.css'

const ProjectList = () => {
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
  }, [])


  const allProjects = projects
  if (!allProjects) return null;

  return (
    <div className="landing-page-container">
      <div className="landing-page-grid">
        {allProjects.map(proj => (
          <Link to={{pathname:`/gallery/${proj.id}`, state: { prev: location.pathname }}} key={proj.id} className='project-list-card'>
            <ProjectCard project={proj} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProjectList;
