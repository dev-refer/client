import axios from '../../libs/axios';


const login = ({ data, token, isLogin, error }) => {
    return async dispatch => {
        dispatch({ type: 'SET_AUTH', data: data, token: token, isLogin: isLogin, error: error })
    }
}

const logout = () => {
    return async dispatch => {
        dispatch({ type: 'SET_LOGOUT' })
    }
}


export {
    login,
    logout
}