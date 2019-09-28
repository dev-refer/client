const initialState = {
    spotDetail: {}
}

export const SET_SPOT_DATA = "SET_SPOT_DATA"

const spotData = ( state = initialState, action ) => {
    switch (action.type) {
        case SET_SPOT_DATA:
            const {
                data
            } = action
            return {
                ...state,
                data
            }
        default:
            return state 
    }
}

export default spotData