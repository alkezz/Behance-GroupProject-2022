import React, {useState, useEffect} from 'react';
import {
    useParams,
    Redirect,
    NavLink,
    Link,
    useHistory,
    useLocation
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import avatar from '../../assets/behance-profile-image.png'
import "./Project.css";

function MiniGallery({ user, setUpdate, update, projectOwner, handleFollow, handleUnFollow, followedList, sessionUser }) {
    const history = useHistory()
    const [prof, setProf] = useState({ username: null, projects: [] });
    const [index, setIndex] = useState(0)

    const rescrollTop = () => {
        let hit = document.getElementsByClassName('one')
        return hit[0].scrollTop = 0
    }


    const updateIndex = (newIndex) => {
        if(newIndex <= 0) {
            newIndex = 0
        }
        else if (newIndex * 4 >= prof.projects.length) {
            newIndex = Math.ceil((prof.projects.length - 4)/4)
        }
        setIndex(newIndex)
    }


    useEffect(() => {
        if (user.username !== "gallery") {
          (async () => {
            const response = await fetch(`/api/users/username/${user.username}`);
            let data
            if (response) {
              data = await response.json();
              setProf(data);
            }
          })();
        }
    },[])

    console.log(user, projectOwner,'MINIGALLERY')
    let miniFollowBut
    if (sessionUser !== null) {
        if (projectOwner) {
          if (followedList.includes(projectOwner.id)) {
            miniFollowBut = (
              <button onClick={(e) => { handleUnFollow(e); setUpdate(!update) }} className='userOtherunFollowBut' hidden={sessionUser.id === projectOwner.id}>
              </button>
            )
          } else {
            miniFollowBut = (
              <button onClick={(e) => { handleFollow(e); setUpdate(!update) }} className='userOtherFollowBut' hidden={sessionUser.id === projectOwner.id}>
                Follow
              </button>
            )
          }
        }
    } else {
        miniFollowBut = (
            <button onClick={() => history.push('/login')} className='userOtherFollowBut'>
            Follow
            </button>

        )
    }


    return (

        <div className='userOtherWorks'>
            <div className='userOtherInfoCont' >
                <div className='userOtherInfo'>
                    <Link className='projUsername'
                        to={
                            `/${
                                user.username
                            }`
                    }>
                        <img className='projUserIcon'
                            src={avatar}
                            alt="profile-avatar"
                            height="50"
                            width="50"/>
                    </Link>
                    <div className='userOtherTextCont'>
                        <div className='userOtherText'>
                            {user.first_name} {user.last_name}
                        </div>
                        {
                            miniFollowBut
                        }
                    </div>
                </div>
            </div>
            <div className='userOtherWorksCarousel'>
                <div className='userOtherWorksCarouselInner' style={{"transform": `translateX(-${index * 100}%)`}}>
                    <div className='userOtherWorksCarouselList' >
                        {prof.projects.map((each) => (
                            // <Link style={{"borderRadius": "4px"}} to={`/gallery/${each.id}`}>
                            //     <img className='userOtherWorksImg' src={each.images[0]} onClick={history.replace({pathname: `/gallery/${each.id}`})}/>
                            // </Link>
                                <img className='userOtherWorksImg' src={each.images[0]} onClick={() => {history.replace({pathname: `/gallery/${each.id}`});rescrollTop();setUpdate(!update)}}/>

                        ))}
                    </div>
                </div>
            </div>
                <i class="moveCarouselLeft fa-solid fa-circle-arrow-left" onClick={() => { updateIndex( index - 1 )}}/>   
                <i class="moveCarouselRight fa-solid fa-circle-arrow-right" onClick={() => { updateIndex( index + 1 )}}/>
        </div>

    );
}
export default MiniGallery;
