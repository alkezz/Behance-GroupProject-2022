import React, {useState, useEffect} from 'react';
import {
    useLocation,
    useHistory,
    Link
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import './ApprecList.css'
// import * as profileActions from '../../store/songs'

function AppeciationsList({appreciations}) {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const [apprecList, setApprecList] = useState({})
    const sessionUser = useSelector((state) => state.session);

    const toObjFunc = (arr) => {
        let newObj = {}
        arr.forEach((e) => {
            newObj[String(e)] = String(e)
        })
        return newObj
    }

    useEffect(() => {
        if(appreciations.project_ids.length > 0){
            fetch(`/api/projects/apprecRoute`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(toObjFunc(appreciations.project_ids))
            }).then(res => res.json()).then(data => setApprecList(data))
        }
    }, [appreciations])

    return (
        <div className='userApprecGrid'> {
            Object.values(apprecList).map(project => (
                <div className='apprPreview' key={project.id}>
                    <Link className='apprPreviewImgCont' to={{ pathname: `/gallery/${project.id}`, state: { background: location } }}><img className='apprPreviewImg' src={project.images[0]} /></Link>
                    <Link className='apprUserText' to={`/${project.User.username}`}>
                    {project.User.first_name} {project.User.last_name}
                    </Link>
                    <Link className='apprProjectText' to={`/gallery/${project.id}`}>
                    {project.name}
                    </Link>
                    <div className='apprAppr'>
                    <i className="apprIcon fa-solid fa-thumbs-up" />
                    <div className='apprAppr_text'>{project.appreciations}</div>
                    </div>
                </div>
            ))
        }
        </div>
    )
}
export default AppeciationsList;
