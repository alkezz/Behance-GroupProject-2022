import avatar from '../../assets/behance-profile-image.png'
import "./ProjectList.css"


const ProjectCard = ({ project }) => {

  let previewImage;
  if (!project.images) return null;

  previewImage = project.images[0]

  return (
    <div className="project-card">
      <img className="project-list-img" src={previewImage} alt={project.name}></img>
      <div className='project-list-name'>{project.name}</div>
      <div className='project-list-info'>
        <div className='project-list-user'>
          <img className='project-list-user-avatar' src={avatar} alt="user avatar" width="14" height="14" />
          <span>{project.User.first_name} {project.User.last_name}</span>
        </div>
        <div className="project-list-likes"><i className="fa-solid fa-thumbs-up"></i> {project.appreciations}</div>
      </div>
    </div>
  )
}

export default ProjectCard;
