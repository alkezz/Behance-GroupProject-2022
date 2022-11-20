const GET_APPRECIATIONS = 'appreciate/getAppreciations'
const ADD_APPRECIATIONS = 'appreciate/addAppreciations'
const REM_APPRECIATIONS = 'appreciations/remAppreciations'
const CLEAR_APPRECIATIONS = 'appreciations/clearAppreciations'

const getAppreciationsAction = (data) => {
    return {
        type: GET_APPRECIATIONS,
        data
    }
}

const addAppreciationsAction = (data) => {
    return {
        type: ADD_APPRECIATIONS,
        data
    }
}

const remAppreciationsAction = (data) => {
    return {
        type: REM_APPRECIATIONS,
        data
    }
}

const clearAppreciationsAction = () => {
    return {
        type: CLEAR_APPRECIATIONS,
    }
}

export const getAppreciations = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`)
    console.log(response)
    if (response.ok) {
        const data = await response.json()
        console.log("RES OK2")
        dispatch(getAppreciationsAction(data))
        return data.appreciations
    }
    return response
}

export const addAppreciations = (postId, userId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${userId}/appreciates/${postId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    })
    if (response.ok) {
        const data = await response.json()
        console.log("DATA IN ADDAPPRECITE THUNK", data)
        dispatch(addAppreciationsAction(data))
        return data
    }
    return response
}

export const removeAppreciations = (postId, userId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${userId}/appreciates/${postId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        console.log("DATA IN REMOVE APP THUNj", data)
        dispatch(remAppreciationsAction(data))
        return data
    }
    return response
}

export const  clearUserAppr = () => async (dispatch) => {
    dispatch(clearAppreciationsAction())
    return {message: "User cleared"};
};

const initialState = { "current_project_appreciations": [] }

const appreciateReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_APPRECIATIONS:
            return { ...state, ...action.data }
        case ADD_APPRECIATIONS:
            return { ...state, current_project_appreciations: [...state.current_project_appreciations, action.data] }
        case REM_APPRECIATIONS:
            return { ...state, current_project_appreciations: state.current_project_appreciations.filter((e) => e !== action.data) }
        case CLEAR_APPRECIATIONS:
            return {...initialState}
        default:
            return state
    }
}

export default appreciateReducer
