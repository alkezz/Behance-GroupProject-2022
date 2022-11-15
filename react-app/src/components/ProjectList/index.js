import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProjectCard from './ProjectCard'
import './ProjectList.css'

const ProjectList = () => {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/api/projects').then(response => {
      response.json().then(data => {
        setProjects(data)
      })
    })
  }, [fetch])

  const allProjects = projects.Projects
  if (!allProjects) return null;

  return (
    <div className="landing-page-container">
      <div className="landing-page-grid">
        {allProjects.map(proj => (
          <Link to={`/projects/${proj.id}`} key={proj.id} className='project-list-card'>
            <ProjectCard project={proj} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProjectList;
