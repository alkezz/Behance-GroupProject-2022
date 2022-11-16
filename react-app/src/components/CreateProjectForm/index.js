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
    const [url, setUrl] = useState("")
    const [is_preview, setIsPreview] = useState(true)
    const [errors, setErrors] = useState([])
    const [proj, setProj] = useState({});
    if (!sessionUser) {
        return null
    }
    if (!proj) {
        return null
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
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Create a project!</h1>
                    <label>
                        <div>
                            <input
                                type='text'
                                placeholder="Name of Project"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="create-project-fields"
                            />
                        </div>
                        <div>
                            {errors.map((error, idx) =>
                                error === "Name but be between 10 and 50 characters" ? <li key={idx} id='error-list'>{error}</li> : null
                            )}
                        </div>
                    </label>
                    <label>
                        <div>
                            <input
                                type='text'
                                placeholder="Description of Project"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="create-project-fields"
                            />
                        </div>
                        <div>
                            {errors.map((error, idx) =>
                                error === "Description must be between 20 and 50 characters" ? <li key={idx} id='error-list'>{error}</li> : null
                            )}
                        </div>
                    </label>
                    <div>
                        <form action="/api/projects/upload" method="post" enctype="multipart/form-data">
                            <p class="card-text">Choose a file to upload it to AWS S3</p>
                            <input type="file" name="file" multiple />
                            <input type="submit" name="upload" value="Upload" class="btn btn-success" />
                        </form>
                    </div>
                    <button type="submit" name="upload" value="Upload" class="btn btn-success">Submit</button>
                </form>
            </div>
        </>
    )
}

export default CreateProject
