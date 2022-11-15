import { Link } from 'react-router-dom'
import "./ProjectList.css"

const ProjectCard = ({ project }) => {  
  
  let previewImage;
  if (!project.images) return null;

  previewImage = project.images[0].url

  return (
    <Link to={`/projects/${project.id}`} className="project-list-card">
      <img className="project-list-img" src={previewImage} alt={project.name}></img>
      <p>{project.name}</p>
      <p>👍{project.appreciations}</p>
    </Link>
  )
}

export default ProjectCard;
