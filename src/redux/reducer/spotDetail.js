const initialState = {
    spotDetail: {},
    error: false
}

export const SET_SPOT_DATA = "SET_SPOT_DATA"

const spotData = ( state = initialState, action ) => {
    switch (action.type) {
        case SET_SPOT_DATA:
            const {
                data,
                error
            } = action
            return {
                ...state,
                spotDetail: data,
                error
            }
        default:
            return state 
    }
}

export default spotData