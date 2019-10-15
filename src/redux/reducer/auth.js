export const SET_LOGIN_LOADING = "SET_AUTH_LOADING"
export const SET_LOGIN = "SET_AUTH";
export const SET_LOGOUT = "SET_LOGOUT";

const initialState = {
    loading: false,
    isLogin: false,
    data: null,
    token: '',
    error: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            const {
                data,
                isLogin,
                token,
                error
            } = action
            return {
                ...state,
                data,
                isLogin,
                token,
                error,
                loading: false
            }
        case SET_LOGIN_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_LOGOUT:
            return {
                loading: false,
                isLogin: false,
                data: null,
                token: '',
                error: false
            }
        default:
            return state
    }
}

export default user