


const GET_PROFILE = 'profile/getProfile'
const GET_USER_PROJECTS = 'profile/projects'
const EDIT_PROF_IMAGE = 'profile/editImg'
// const ADD_SONG = 'songs/addSong'
// const DELETE_SONG = 'songs/deleteSong'
// const EDIT_SONG = 'songs/editSong'
// const GET_USERTRACKS = 'songs/userSongs'
// const FIND_SONG = 'songs/findSong'

const getProfile = (user) => {
    return {
        type: GET_PROFILE,
        user
    }
}

const userProjects = (user) => {
    return {
        type: GET_USER_PROJECTS,
        user
    }
}
const editProfileImage = (user) => {
    return {
        type: EDIT_PROF_IMAGE,
        user
    }
}

// const addSong = (song, user) => {
//     return {
//         type: ADD_SONG,
//         song,
//         user
//     }
// }
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

export const userProfile = () => async (dispatch) => {
    const response = await fetch(`/api/users/username/${username}`)
    const data = await response.json()
    dispatch(getProfile(data))
    return data;
};

export const getUserProjects = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/projects/`)
    const data = await response.json()
    dispatch(userProjects(data))
    return data
}

export const update = (data, id) => async (dispatch) => {
    const {
            profile_image
          } = data
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        profile_image
      ),
    });
    if (response.ok) {
      console.log(response, "RES")
      const data = await response.json();
      console.log(data, "DATA")
      dispatch(editProfileImage(data))
    } else if (response.status < 500) {
      const data = await response.json();
      if (data) {
        return data;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
  }

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

const initialState = {}

const profileReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PROFILE:
            return { ...state, ...newState }
        case GET_USER_PROJECTS: {
            const newState = {};
            action.userforEach((project) => (getUserProjects[user.id] = project))
            return newState;
        }
        case GET_SONG:
            return {
                ...state,
                singleSong: {
                    [action.single_song.id]: action.single_song
                }
            }
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

export default profileReducer;
