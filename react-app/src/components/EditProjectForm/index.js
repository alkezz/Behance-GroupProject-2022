import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as projectActions from '../../store/projects';
import "./EditProject.css"

function EditProject() {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true)
    
    const formData = new FormData();
    const { projectId } = useParams();
    
    const projectInfo = fetch(`/api/projects/${projectId}`)
    .catch(data => console.log(data.json()))
    // .then(data => setDescription(data["description"]))
    // .then(data => setName(data["name"]))
    
    useEffect(() => {
        (async () => {
            const data = await fetch(`/api/projects/${projectId}`)
            const res = await data.json()
            console.log(res)
            setName(`${res.name}`)
            setDescription(`${res.description}`)
        })();
    }, [])
    
    // if (loaded === false) {
    //     return null
    // }
    
    if (!sessionUser) {
        return null
    }
    if (!projectInfo) {
        return null
    }
    
    // if (!isLoaded) {
    //     return <h1>Please Hold</h1>
    // }
    
    let correctFile = true
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        setImages("")
        const errorList = []
        if (name.length > 50 || name.length < 5) errorList.push("Name but be between 5 and 50 characters")
        if (description.length > 100 || description.length < 20) errorList.push("Description must be between 20 and 50 characters")
        setErrors(errorList)
        if (errorList.length) {
            return
        } else {
            let imageInput = document.querySelector("#imageinput")
            if (!imageInput.files.length || imageInput.files.length > 5) {
                errorList.push("Please select 1 to 5 images to upload")
                return setErrors(errorList)
            }
            for (let i = 0; i < imageInput.files.length; i++) {
                let img = imageInput.files[i]
                if (img.type !== "image/gif" && 
                img.type !== "image/jpeg" && 
                img.type !== "image/png") {
                    correctFile = false
                }
                formData.append('file', img)
            }
            if (correctFile === false) errorList.push("You may only upload .GIF, .JPEG/.JPG, and .PNG files!")
            if (errorList.length) return
            const pictures = await fetch(`/api/projects/upload`, {
                method: "POST",
                body: formData
            }).then((res) => res.json())
            
            
            const new_project = {
                name,
                description,
                images: pictures.images
            }
            
            

            dispatch(projectActions.editProject(new_project, projectId)).then((data) => {
                history.push(`/${sessionUser.username}`)
            })
        }
    }
    
    
    
    return (
        
        <div className="create-project-container">
           <form className="create-project-form" onSubmit={handleSubmit}>
                <h1>Let's rebuild your project:</h1>
                <label>Project Name</label>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="create-project-fields" />
                <div>
                    {errors.map((error, idx) =>
                        error === "Name but be between 5 and 50 characters" ? <li key={idx} id='error-list'>{error}</li> : null
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
                        error === "Description must be between 10 and 50 characters" ? <li key={idx} id='error-list'>{error}</li> : null
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
                        <div>
                        {errors.map((error, idx) =>
                            error === "Please select 1 to 5 images to upload" ? <li key={idx} id="error-list">{error}</li> : null
                        )}
                    </div>
                    <div>
                    {errors.map((error, idx) =>
                        error === "You may only upload .GIF, .JPEG/.JPG, and .PNG files!" ? <li key={idx} id='error-list'>{error}</li> : null
                    )}
                </div>
                    </div>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    
    )

}

export default EditProject
