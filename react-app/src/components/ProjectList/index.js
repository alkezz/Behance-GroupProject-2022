import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProjectCard from './ProjectCard'
import './ProjectList.css'

const ProjectList = () => {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/projects/');
      const data = await response.json();
      setProjects(data)
    })();
  }, [setProjects])

  const allProjects = projects
  console.log(allProjects)
  if (!allProjects) return null;

  return (
    <div className="landing-page-container">
      <div className="landing-page-grid">
        {allProjects.map(proj => (
          <Link to={`/gallery/${proj.id}`} key={proj.id} className='project-list-card'>
            <ProjectCard project={proj} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProjectList;
