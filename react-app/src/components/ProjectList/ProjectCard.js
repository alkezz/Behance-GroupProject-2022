import { Link } from 'react-router-dom'
import "./ProjectList.css"

const ProjectCard = ({ project }) => {

  let previewImage;
  if (!project.images) return null;

  previewImage = project.images[0].url

  return (
    <div className="project-card">
      <img className="project-list-img" src={previewImage} alt={project.name}></img>
      <div className='project-list-info'>
        <div className='project-list-name'>{project.name}</div>
        <div className="project-list-likes"><i className="fa-solid fa-thumbs-up"></i> {project.appreciations}</div>
      </div>
    </div>
  )
}

export default ProjectCard;
