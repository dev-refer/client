
export const SET_CATEGORY_LIST_LOADING = "SET_CATEGORY_LIST_LOADING"
export const SET_CATEGORY_LIST = "SET_CATEGORY_LIST";
export const CLEAR_CATEGORY_LIST = "CLEAR_CATEGORY_LIST";

const initialState = {
    categoryList: [],
    count: 0,
    page: 1,
    limit: 10,
    loading: false,
}

const category = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY_LIST:
            const {
                categoryList,
                count,
                page,
                limit
            } = action
            return {
                ...state,
                categoryList,
                count,
                page,
                limit,
                loading: false
            }
        case SET_CATEGORY_LIST_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_CATEGORY_LIST:
            return {
                categoryList: [],
                count: 0,
                page: 1,
                limit: 10,
                loading: false,
            }
        default:
            return state
    }
}

export default category