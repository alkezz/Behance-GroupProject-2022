import React, { useState, useEffect, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as projectActions from '../../store/projects';
import "./CreateProject.css"

function CreateProject() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [is_preview, setIsPreview] = useState(true)
    const [errors, setErrors] = useState([])
    const [proj, setProj] = useState({});

    let handleSubmit;
    const testbut = async () => {
        let test = document.querySelector('#test')
        console.log(typeof test.files)
        console.log(test.files)
        const formData = new FormData();
        formData.append("file", test.files[0]);
        const res = await fetch(`/api/projects/upload`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const newProjectImages = await res.json();
            console.log(newProjectImages)
        }
        console.log(res)
    }
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch("/api/projects/")
    //         const projectList = await response.json()
    //         setProj(projectList)
    //     })();
    // }, [])
    // console.log(proj.Projects)
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setErrors([])
    //     const errorList = []
    //     if (name.length > 50 || name.length < 10) errorList.push("Name but be between 10 and 50 characters")
    //     if (description.length > 100 || description.length < 20) errorList.push("Description must be between 20 and 50 characters")
    //     setErrors(errorList)
    //     if (errors.length) return

    //     const new_project = {
    //         name,
    //         description,
    //         user_id: session.user.id
    //     }

    //     const project_images = {
    //         url,
    //         is_preview
    //     }

    //     const response = await fetch("/api/projects", {
    //         method: "POST",
    //         body: JSON.stringify(new_project),
    //     });
    //     if (response.ok) {
    //         const newProject = await response.json();
    //         dispatch(addProject(newProject))
    //         return newProject
    //     }

    //     const response2 = await fetch(`/api/projects/project-images/${project.id}/upload`, {
    //         method: "POST",
    //         body: JSON.stringify(images),
    //     });
    //     if (response.ok) {
    //         const newProjectImages = await response.json();
    //         dispatch(addProjectImage(newProjectImages))
    //         return newProjectImages
    //     }
    //     return response;
    // }
    return (<div><form action="/api/projects/3/project-images/upload" method="post" encType="multipart/form-data">
    <p class="card-text">Choose a file to upload it to AWS S3</p>
    <input type="file" id='test' name="file" multiple />
    <button type="submit" name="upload" value="Upload" class="btn btn-success" />
</form>
<button onClick={testbut}>test</button></div>)
}

export default CreateProject
