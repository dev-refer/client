

const setCurrentPage = (currentPage) => {
    return async dispatch => {
        dispatch({ type: 'SET_CURRENT_PAGE' }, currentPage)
    }
}

const setDrawerOptions = (options) => {
    return dispatch => {
        dispatch({ type: 'SET_DRWAER_OPTIONS', drawer: options })
    }
}

export {
    setCurrentPage,
    setDrawerOptions
}