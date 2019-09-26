import axios from '../../libs/axios';


const fetchSpot = ({ order, sort, pages }) => {
    return async dispatch => {
        dispatch({ type: 'SET_SPOT_LIST_LOADING' })
        try {
            const result = await axios({
                method: 'GET',
                headers: {
                    token: window.localStorage.getItem('token')
                },
                url: `/v1/spots?order=${order ? order : 'ASC'}&sort=${sort ? sort : 'id'}&page=${pages ? pages : 1}`
            })
            const {
                data,
                data_size,
                page,
                page_size,
            } = result.data
            dispatch({ type: 'SET_SPOT_LIST', spotList: data, count: data_size, limit: page_size, page, error: false })
        } catch (error) {
            dispatch({ type: 'SET_SPOT_LIST', error: true })
        }
    }
}

const fetchSpotById = (spotId) => {
    return async dispatch => {
        dispatch({ type: 'SET_SPOT_LIST_LOADING' })
        try {
            const result = await axios({
                method: 'GET',
                headers: {
                    token: window.localStorage.getItem('token')
                },
                url: `/v1/spots?spotId=${spotId}`
            })
          
            dispatch({ type: 'SET_SPOT_LIST', spotList: result.data.data, count: 0, limit: 0, page:1 , error: false })
        } catch (error) {
            dispatch({ type: 'SET_SPOT_LIST', error: true })
        }
    }
    
}


export {
    fetchSpot,
    fetchSpotById
}