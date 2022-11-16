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
        console.log(errors)
        if (errors.length) return
        const new_project = {
            name,
            description
        }
        const project_images = {
            url,
            is_preview
        }
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
                <div>
                    <input type="file" name="file" multiple value='' encType="multipart/form-data" onChange={async (e) => await fetch('/api/projects/upload', {
                        method: "POST",
                        headers: {
                            'Content-Type': "multipart/form-data"
                        },
                        body: e.target.files[0].webkitRelativePath
                    }).then((data) => console.log(data.json()))} />
                    {/* <button onSubmit={handleImageUpload} type="submit" name="upload" value="Upload" class="btn btn-success">Upload</button> */}
                </div>
                <button type="submit" name="upload" value="Upload" className="submit-button">Submit</button>
            </form>
        </div>
    )

}

export default CreateProject
