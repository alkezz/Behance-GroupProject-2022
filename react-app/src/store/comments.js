
const ADD_COMMENT = 'comment/addComment'
const GET_COMMENTS = 'comment/getComments'
const DELETE_COMMENT = 'comment/delComment'

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const delComment = (comment) => {
    return {
        type: ADD_SONG,
        comment
    }
}
// const editSong = (song, user) => {
//     return {
//         type: EDIT_SONG,
//         song,
//         user
//     }
// }

// const delSong = (song, id) => {
//     return {
//         type: DELETE_SONG,
//         song,
//         id
//     }
// }

// const userTracks = (songs) => {
//     return {
//         type: GET_USERTRACKS,
//         songs
//     }
// }

export const addCommentToProject = (comData) => async (dispatch) => {
    const {comment, user_id, project_id} = comData
    const response = await fetch(`/api/comments/new`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            comment,
            user_id,
            project_id
        })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addComment(data))
        return data;
    }
}

export const getProjectComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}/comments`)
    const data = await response.json()
    // console.log(data)
    dispatch(getComments(data))
    return data;
};

export const delCommentFromProj = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}/delete`)
    const data = await response.json()
    // console.log(data)
    dispatch(delComment(data))
    return data;
};

// export const songSingleGrab = (id) => async (dispatch) => {
//     const response = await csrfFetch(`/api/songs/${id}`)
//     const data = await response.json()
//     dispatch(getSong(data))
//     return data;
// };

// export const searchQuery = (songTitle) => async (dispatch) => {
//     const response = await csrfFetch(`/api/songs?title=${songTitle}`, {
//         method: 'GET'
//     })
//     const data = await response.json()
//     dispatch(getSongs(data))
//     return data;
// };

// export const editingSong = (song) => async (dispatch) => {
//     const {
//         title,
//         description,
//         url,
//         imageUrl,
//         albumId,
//         id
//     } = song

//     const response = await csrfFetch(`/api/songs/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             title,
//             description,
//             url,
//             imageUrl,
//             albumId
//         })
//     })
//     const response2 = await csrfFetch('/api/session')
//     const data2 = await response2.json()
//     let { username } = data2
//     let userInfo = { id, username}

//     const data = await response.json()
//     dispatch(editSong(data, userInfo))
//     return data;
// }

// export const deleteSong = (id) => async (dispatch) => {
//     const response = await csrfFetch(`/api/songs/${id}`, {
//         method: 'DELETE'
//     })
//     const data = await response.json()
//     dispatch(delSong(data, id))
//     return data;
// };

// export const createSong = (song) => async (dispatch) => {
//     const {
//         userId,
//         albumId,
//         title,
//         description,
//         url,
//         imageUrl } = song
//     const response = await csrfFetch('/api/songs', {
//         method: 'POST',
//         body: JSON.stringify({
//             userId,
//             albumId,
//             title,
//             description,
//             url,
//             imageUrl
//         })
//     })
//     const response2 = await csrfFetch('/api/session')
//     const data2 = await response2.json()
//     let { username } = data2
//     let userInfo = { 'id':userId, username}
//     const data = await response.json()
//     dispatch(addSong(data, userInfo))
//     return data;
// };

const initialState = []

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_COMMENT:
            return [...state, {...action.comment}]
        case GET_COMMENTS:
            return [
                ...state, ...action.comments.comments
            ]
        case DELETE_COMMENT:
            rem_list = state.filter(e => e.id != action.comment.id)
            return [
                ...rem_list
            ]
        // case GET_USERTRACKS:
        //     let res = {}
        //     action.songs.Songs.forEach(e => {
        //         res[e.id] = e
        //     })
        //     return {
        //         ...state,
        //         userTracks: {...res}
        //     }
        // case ADD_SONG:
        //     console.log(action.user)
        //     return { ...state, Songs: [...state.Songs, action.song], userTracks: {...state.userTracks, [action.song.id]: {...action.song, "User":action.user}}}
        // case EDIT_SONG:
        //     console.log(action.user)
        //     let newArr = state.Songs.map(e => {
        //         if(e.id === action.song.id){
        //             return {...e, ...action.song}
        //         }
        //         return e
        //     })
        //     return {...state, Songs: [...newArr], userTracks: {...state.userTracks, [action.song.id]: {...action.song, "User":action.user}}}
        // case DELETE_SONG:
        //     const rem = {...state}
        //     delete rem.userTracks[action.id]
        //     return { ...rem,Songs: state.Songs.filter(
        //         (e) => e.id !== action.id
        //       )}
        default:
            return state
    }
};

export default commentReducer;