const GET_LOCATION = 'loc/getLocation'

const getLocation = (data) => {
    return {
        type: GET_LOCATION,
        data
    }
}

export const prevLocation = (data) => async (dispatch) => {
    if(!data.pathname.includes('gallery')){
        dispatch(getLocation(data))
        return data;
    }
};

const initialState = {prev: ''}

const locationReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_LOCATION:
            return { prev: action.data }
        default:
            return state
    }
};

export default locationReducer;
