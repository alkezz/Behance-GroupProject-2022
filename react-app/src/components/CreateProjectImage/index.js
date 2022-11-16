import React, { useState, useEffect, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as projectActions from '../../store/projects';

function CreateImages() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session);
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit} action="/api/projects/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file" multiple />
            <input type="submit" name="upload" value="Upload" class="btn btn-success" />
        </form>
    )
}

export default CreateImages
