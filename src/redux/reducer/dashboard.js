export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA"
export const SET_DASHBOARD_LOADING = "SET_DASHBOARD_LOADING";
export const CLEAR_DASHBOARD = "CLEAR_DASHBOARD";

const initialState = {
    dashboardData: {},
    loading: false
}

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case SET_DASHBOARD_DATA:
            const {
                dashboardData
            } = action
            return {
                ...state,
                dashboardData
            }
        case SET_DASHBOARD_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case CLEAR_DASHBOARD:
            return {
                dashboardData: {},
                loading: false
            }
        default:
            return state
    }
}

export default dashboard