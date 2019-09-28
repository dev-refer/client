const setSpotDetail = ( data ) => {
    return dispatch => {
        dispatch({ type: 'SET_SPOT_DATA', data: data })
    }
} 

export {
    setSpotDetail
}

