const GET_FOLLOWS = 'follow/getFollows'
const ADD_FOLLOWS = 'follow/addFollow'
const REM_FOLLOWS = 'follow/remFollow'

const getFollows = (data) => {
    return {
        type: GET_FOLLOWS,
        data
    }
}

const addFollows = (user) => {
    return {
        type: ADD_FOLLOWS,
        user
    }
}

const remFollows = (user) => {
    return {
        type: REM_FOLLOWS,
        user
    }
}

export const userFollows = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/follows`)
    const data = await response.json()
    dispatch(getFollows(data))
    return data;
};

export const followUser = (curr, userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${curr}/follow_/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    })
    const data = await response.json()
    dispatch(addFollows(userId))
    return data;
};

export const unfollowUser = (curr, userId) => async (dispatch) => {
    console.log("IN UNFOLLOW THUNK")
    const response = await fetch(`/api/users/${curr}/follow_/${userId}`, {
        method: 'DELETE'
    })
    console.log("UNFOLLOW THUNK RESPONSE", response)
    const data = await response.json()
    console.log("UNFOLLOW THUNK data", data)
    dispatch(remFollows(userId))
    return data;
};

const initialState = { "current_followed_user_ids": [], "followed_by_user_ids": [] }

const followsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_FOLLOWS:
            return { ...state, ...action.data }
        case ADD_FOLLOWS: {
            return { ...state, current_followed_user_ids: [...state.current_followed_user_ids, action.user] };
        }
        case REM_FOLLOWS: {
            return { ...state, current_followed_user_ids: state.current_followed_user_ids.filter((e) => e !== action.user) };
        }
        default:
            return state
    }
};

export default followsReducer;
