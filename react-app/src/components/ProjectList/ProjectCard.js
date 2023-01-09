import { Link, useLocation } from 'react-router-dom';
import avatar from '../../assets/behance-profile-image.png'
import "./ProjectList.css"


const ProjectCard = ({ project }) => {
  const location = useLocation()
  let previewImage;
  if (!project.images) return null;

  previewImage = project.images[0]

  return (
    <div className="project-card">
      <img className="project-list-img" src={previewImage} alt={project.name}></img>
      <div className='project-list-name'>{project.name}</div>
      <div className='project-list-info'>
        <Link to={{pathname:`/${project.User.username}`, state: {prev: location.pathname}}} className='project-list-user'>
          <img className='project-list-user-avatar' src={project.User.user_image ? project.User.user_image : avatar} onError={e => e.target.src = avatar} alt="user avatar" style={{borderRadius:"50%", width:"20px", height:"20px"}}/>
          <span>{project.User.first_name} {project.User.last_name}</span>
        </Link>
        <div className="project-list-likes"><i className="fa-solid fa-thumbs-up"></i> {project.appreciations}</div>
      </div>
    </div>
  )
}

export default ProjectCard;
