
const initialState = {
    currentPage: '',
    drawerOptions: true
}

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const SET_DRAWER_OPTIONS = "SET_DRWAER_OPTIONS"

const currentPage = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            const {
                currentPage
            } = action
            return {
                ...state,
                currentPage
            }
        case SET_DRAWER_OPTIONS:
            const {
                drawer
            } = action
            return {
                ...state,
                drawerOptions: drawer
            }
        default:
            return {
                currentPage: '',
                drawerOptions: true
            }
    }
}

export default currentPage