const GET_ALL_PROJECTS = 'projects/GET_ALL_PROJECTS';
const GET_PROJECT_ID = 'projects/GET_PROJECT_ID';
// const GET_PROJECT_IMAGES = 'projects/GET_PROJECT_IMAGES';
const GET_PROJECT_COMMENTS = 'projects/GET_PROJECT_COMMENTS';
const ADD_PROJECT = 'projects/ADD_PROJECT';
const ADD_PROJECT_IMAGES = 'projects/ADD_PROJECT_IMAGES';
const EDIT_PROJECT = 'spots/EDIT_PROJECT';
const DELETE_PROJECT = 'spots/DELETE_PROJECT';

//actions
const allProjects = (projects) => {
    return {
        type: GET_ALL_PROJECTS,
        projects
    }
}

const projectId = (projectId) => {
    return {
        type: GET_PROJECT_ID,
        projectId
    }
}

// const getProjectImages = (projectImages) => {
//     return {
//         type: GET_PROJECT_IMAGES,
//         projectImages
//     }
// }

const getProjectComments = (comments) => {
    return {
        type: GET_PROJECT_COMMENTS,
        comments,
    }
}


const addProject = (project) => {
    return {
        type: ADD_PROJECT,
        project
    }
}

const addProjectImage = (images) => {
    return {
        type: ADD_PROJECT_IMAGES,
        images
    }
}

const projectEdit = (editedProject) => {
    return {
        type: EDIT_PROJECT,
        editedProject
    }
}

const deleteProject = (projectId) => {
    return {
        type: DELETE_PROJECT,
        projectId
    }
}
//thunks --

//get all projects
export const getAllProjects = () => async (dispatch) => {
    const response = await fetch("/api/projects");
    if (response.ok) {
        const projects = await response.json();
        dispatch(allProjects(projects));
        const all = {};
        projects.forEach((project) => (all[project.id] = project));
        return { ...all };
    }
    return {};
};
//get current project
export const getProjectId = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}`)
    if (response.ok) {
        const allProjects = await response.json();
        dispatch(projectId(allProjects));
        return allProjects
    }
    return response
}
//get all project images
// export const getAllProjectImages = () => async (dispatch) => {
//     const response = await fetch(`/api/projects/:id`)
//     if (response.ok) {
//         const projectimage = await response.json();
//         dispatch(getProjectImages(projectimage));
//         return projectimage
//     }
//     return response
// }
//get all project comments
export const getAllProjectComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}/comments`)
    if (response.ok) {
        const comments = await response.json();
        dispatch(getProjectComments(comments))
        return comments
    }
    return response
}
//create a project
export const createProject = (project) => async (dispatch) => {
    const response = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(project),
    });
    if (response.ok) {
        const newProject = await response.json();
        dispatch(addProject(newProject))
        return newProject
    }
    return response;
}
//add project images
export const addProjectImages = (project) => async (dispatch) => {
    const response = await fetch(`/api/projects/project-images/${project.id}`, {
        method: "POST",
        body: JSON.stringify(project),
    });
    if (response.ok) {
        const newProjectImages = await response.json();
        dispatch(addProjectImage(newProjectImages))
        return newProjectImages
    }
    return response;
}


//edit project
export const editProject = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot),
    });
    if (response.ok) {
        const editedProject = await response.json();
        dispatch(projectEdit(editedProject));
        return editedProject;
    }
    return response;
};

//delete a spot
export const deleteProjectId = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        // body: JSON.stringify(spotId)
    });
    if (response.ok) {
        const deletedProject = await response.json();
        dispatch(deleteProject(deletedProject))
        return dispatch
    }
    return response
}

const initialState = {};
const projectsReducer = (state = initialState, action) => {
    // const newState = { ...state }
    switch (action.type) {
        case GET_ALL_PROJECTS: {
            const allSpots = {};
            action.projects.forEach((project) => (allProjects[project.id] = project));
            return allSpots;
        }
        case GET_PROJECT_ID: {
            const newState = {};
            action.projectId.forEach(project => newState[projectId.id] = project);
            let project = { ...newState };
            return project;
        }
        case GET_PROJECT_COMMENTS: {
            const newState = { ...state };
            newState[action.comments.id] = action.comments
            return newState
        }
        case ADD_PROJECT: {
            let newState = { ...state };
            newState[action.project.id] = action.project;
            return newState;
        }
        case ADD_PROJECT_IMAGES: {
            let newState = { ...state };
            newState[action.images.id] = action.images;
            return newState
        }
        case EDIT_PROJECT: {
            const newState = { ...state };
            newState[action.editedProject.id] = action.editedProject;
            return newState;
        }
        case DELETE_PROJECT: {
            const newState = { ...state };
            delete newState[action.projectId];
            return newState;
        }
        default:
            return state;
    }
};

export default projectsReducer;
