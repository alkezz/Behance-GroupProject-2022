import React, { useState, useEffect, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as projectActions from '../../store/projects';
import "./CreateProject.css"

function CreateProject() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState([])
    const [is_preview, setIsPreview] = useState(true)
    const [errors, setErrors] = useState([])
    const [proj, setProj] = useState({});
    const [submitted, setSubmitted] = useState(false)
    const formData = new FormData();
    if (!sessionUser) {
        return null
    }
    if (!proj) {
        return null
    }
    const handleImageUpload = (e) => {
        e.preventDefault()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        const errorList = []
        if (name.length > 50 || name.length < 10) errorList.push("Name but be between 10 and 50 characters")
        if (description.length > 100 || description.length < 20) errorList.push("Description must be between 20 and 50 characters")
        setErrors(errorList)
        if (errors.length) return
        const new_project = {
            name,
            description
        }
        console.log("NEW_PROJECT", new_project)
        const project_images = {
            url,
            is_preview
        }
        console.log("PROJECT_IMAGES", project_images)
        dispatch(projectActions.createProject(new_project, project_images))
    }
    return (
        <div className="create-project-container">
            <form className="create-project-form" onSubmit={handleSubmit} action="/api/projects/project-images/upload" method="post" encType="multipart/form-data">
                <h1>Start building your project:</h1>
                <label>Project Name</label>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="create-project-fields" />
                <div>
                    {errors.map((error, idx) =>
                        error === "Name but be between 10 and 50 characters" ? <li key={idx} id='error-list'>{error}</li> : null
                    )}
                </div>
                <label>Provide a brief description of your project</label>
                <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="create-project-fields" />
                <div>
                    {errors.map((error, idx) =>
                        error === "Description must be between 20 and 50 characters" ? <li key={idx} id='error-list'>{error}</li> : null
                    )}
                </div>
                <div className="create-project-image-container">
                    <div className="create-project-image-prompt">
                        Attach image files
                    </div>
                    <div className="create-project-image-input">
                        <div>
                            <input type="file" name="file" multiple encType="multipart/form-data" onChange={async (e) => {
                                for (let i = 0; i < e.target.files.length; i++) {
                                    let img = e.target.files[i]
                                    formData.append('file', img)
                                }
                            }} />
                            <button type='button' name="upload" value="Upload" onClick={async (e) => await fetch('/api/projects/upload', {
                                method: "POST",
                                body: formData
                            }).then((data) => data.json()).then((res) => setUrl(res.images)).then(() => window.alert("Upload complete!"))}>Upload</button>
                        </div>
                    </div>
                </div>
                <button type="submit" name="upload" value="Upload" className="submit-button">Submit</button>
            </form>
        </div>
    )

}

export default CreateProject
