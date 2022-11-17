import React, { useState, useEffect, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as projectActions from '../../store/projects';
import "./CreateProject.css"

function CreateProject() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState("")
    const [url, setUrl] = useState([])
    const [is_preview, setIsPreview] = useState(true)
    const [errors, setErrors] = useState([])
    const [proj, setProj] = useState({});
    const [submitted, setSubmitted] = useState(false)
    const formData = new FormData();

    useEffect(() => {

    })

    if (!sessionUser) {
        return null
    }
    if (!proj) {
        return null
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        setImages("")
        const errorList = []
        if (name.length > 50 || name.length < 10) errorList.push("Name but be between 10 and 50 characters")
        if (description.length > 100 || description.length < 20) errorList.push("Description must be between 20 and 50 characters")
        setErrors(errorList)
        if (errors.length) return
        let imageInput = document.querySelector("#imageinput")
        for (let i = 0; i < imageInput.files.length; i++) {
            let img = imageInput.files[i]
            console.log("IMG", img)
            formData.append('file', img)
        }
        const pictures = await fetch('/api/projects/upload', {
            method: "POST",
            body: formData
        }).then((res) => res.json())
        const new_project = {
            name,
            description,
            user_id: sessionUser.id,
            images: pictures.images
        }
        // console.log(new_project)
        dispatch(projectActions.createProject(new_project)); window.alert("Upload complete!")
    }
    return (
        <div className="create-project-container">
            <form className="create-project-form" onSubmit={handleSubmit}>
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
                            <input type="file" name="file" id='imageinput' multiple encType="multipart/form-data" />
                        </div>

                    </div>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    )

}

export default CreateProject
