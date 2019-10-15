

const initialState = {
    spotList: [],
    page: 1,
    limit: 10,
    count: 0,
    loading: false,
    error: false
}
export const SET_SPOT_LIST_LOADING = "SET_SPOT_LIST_LOADING"
export const SET_SPOT_LIST = "SET_SPOT_LIST";
export const CLEAR_SPOT_LIST = "CLEAR_SPOT_LIST";

const spot = (state = initialState, action) => {
    switch (action.type) {
        case SET_SPOT_LIST:
            const {
                spotList,
                count,
                page,
                limit,
                error
            } = action
            return {
                ...state,
                spotList,
                count,
                page,
                limit,
                error,
                loading: false
            }
        case SET_SPOT_LIST_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_SPOT_LIST:
            return {
                spotList: [],
                count: 0,
                page: 1,
                limit: 10,
                loading: false,
                error: false
            }
        default:
            return state
    }
}

export default spot