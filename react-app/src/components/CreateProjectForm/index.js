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
    useEffect(() => {
        (async () => {
            const response = await fetch("/api/projects/")
            const projectList = await response.json()
            setProj(projectList)
        })();
    }, [])
    console.log(proj.Projects)
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
        dispatch(projectActions.createProject(new_project))
        const project_images = {
            url,
            is_preview
        }
        dispatch(projectActions.addProjectImages(new_project, project_images))
    }
    return (
        <h1>WIP</h1>
    )
}

export default CreateProject
