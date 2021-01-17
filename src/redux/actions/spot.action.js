import axios from '../../libs/axios';


const fetchSpot = ({ order, sort, pages, spotName }) => {
    return async dispatch => {
        dispatch({ type: 'SET_SPOT_LIST_LOADING' })
        try {
            let url = `/v1/spots?order=${order ? order : 'ASC'}&sort=${sort ? sort : 'id'}&page=${pages ? pages : 1}`;
            if (spotName) {
                url = `/v1/spots?order=${order ? order : 'ASC'}&sort=${sort ? sort : 'id'}&page=${pages ? pages : 1}&spotName=${spotName}`
            }
            const result = await axios({
                method: 'GET',
                headers: {
                    token: window.localStorage.getItem('token')
                },
                url
            })
            const {
                data,
                data_size,
                page,
                page_size,
            } = result.data
            console.log(result, ' ini result')
            dispatch({ type: 'SET_SPOT_LIST', spotList: data, count: data_size, limit: page_size, page, error: false })
        } catch (error) {
            console.log(error, 'ini error')
            dispatch({ type: 'SET_SPOT_LIST', error: true })
        }
    }
}

const fetchSpotById = (spotId) => {
    return async dispatch => {
        try {
            const result = await axios({
                method: 'GET',
                headers: {
                    token: window.localStorage.getItem('token')
                },
                url: `/v1/spots?spotId=${spotId}`
            })
            dispatch({ type: 'SET_SPOT_DATA', data: result.data.data, error: false })
        } catch (error) {
            dispatch({ type: 'SET_SPOT_DATA', error: true })
        }
    }

}


export {
    fetchSpot,
    fetchSpotById
}