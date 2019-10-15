import axios from '../../libs/axios';


const fetchCategory = ({ order, sort, pages }) => {
    return async dispatch => {
        dispatch({ type: 'SET_CATEGORY_LIST_LOADING' })
        try {
            
            const result = await axios({
                method: 'GET',
                headers: {
                    token: window.localStorage.getItem('token')
                },
                url: `/v1/categories?order=${order ? order : 'ASC'}&sort=${sort ? sort : 'id'}&page=${pages ? pages : 1}`
            })
            const {
                data,
                data_size,
                page,
                page_size,
            } = result.data
            dispatch({ type: 'SET_CATEGORY_LIST', categoryList: data, count: data_size, limit: page_size, page, error: false })
        } catch (error) {
            dispatch({ type: 'SET_CATEGORY_LIST', error: true })
        }
    }
}

const fetchCategoryById = (categoryId) => {
    return async dispatch => {
        dispatch({ type: 'SET_CATEGORY_LIST_LOADING' })
        try {
            const result = await axios({
                method: 'GET',
                headers: {
                    token: window.localStorage.getItem('token')
                },
                url: `/v1/categories/${categoryId}`
            })
            dispatch({ type: 'SET_CATEGORY_LIST', categoryList: result.data, error: false })
        } catch (error) {
            dispatch({ type: 'SET_CATEGORY_LIST', error: true })
        }
    }
}

export {
    fetchCategory,
    fetchCategoryById,
}