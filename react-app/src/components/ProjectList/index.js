import { useState, useEffect } from "react"
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
          <div key={proj.id} className="project-card">
        <ProjectCard project={proj} />
         </div>
      ))}
      </div>
    </div>
  )
}

export default ProjectList;
