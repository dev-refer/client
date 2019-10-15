import React, { useEffect, useState } from 'react';

import axios from '../../libs/axios'
import {
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Fab
} from '@material-ui/core';
import {
    Search
} from '@material-ui/icons';
import swal from 'sweetalert2';

import CardCategory from '../../components/Card/CategoryCard';
import { connect } from 'react-redux';
import { fetchCategory } from '../../redux/actions/category.action';

import Loading from '../../components/Loading';
import Modal from '../../components/Modal/CategoryModal';
import CategoryBulk from '../../components/Modal/BulkInsertCategory'



function Category(props) {
    const { history } = props
    useEffect(() => {
        props.getCategory()
    }, [])

    const [modalState, setModalState] = useState(false)
    const [modalName, setModalName] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentModal, setCurrentModal] = useState('')

    const [categoryName, setCategoryName] = useState('');
    const [categoryIcon, setCategoryIcon] = useState('');
    const [categoryDesc, setCategoryDesc] = useState('');
    const [categoryId, setCategoryId] = useState('')

    const [categoryIdBulk, setCategoryIdBulk] = useState('')


    const [bulkModal, setBulkModal] = useState(false)

    const deleteCategory = async (id) => {
        const confirm = await swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        if (confirm.value) {
            const options = {
                url: '/v1/categories/' + id,
                headers: {
                    token: localStorage.getItem('token')
                },
                method: 'DELETE'
            }
            try {
                setLoading(true)
                await axios(options)
                await props.getCategory()
                setLoading(false)
                swal.fire(
                    'Delete',
                    'Success Delete Category',
                    'success'
                )
            } catch (error) {
                setLoading(false)
                swal.fire(
                    'Error',
                    'error while deleting category, please try again later',
                    'error'
                )
            }
        }
    }
    const openAddModal = () => {
        setModalName('Add Category')
        setCurrentModal('Add')
        setModalState(true)
    }

    const openBulkModal = (id, name) => {
        setCategoryId(id)
        setBulkModal(true)
        setCategoryName(name)
    }

    const openEditModal = (name, icon, desc, id) => {
        setCategoryIcon(icon)
        setCategoryName(name)
        setCategoryDesc(desc)
        setCategoryId(id)
        setModalName('Edit Category')
        setCurrentModal('Edit')
        setModalState(true)
    }

    const closeModal = () => {
        setModalState(false);
        setBulkModal(false)
        setCategoryIcon('')
        setCategoryName('')
        setCategoryDesc('')
        setCategoryId('')
    }


    const categoryList = props.categories.categoryList.map((val, index) => {
        return <Grid key={index} item xs={4} md={4} sm={4} lg={4}>
            <CardCategory
                history={history}
                openEditModal={openEditModal}
                deleteCategory={deleteCategory}
                categoryData={val}
                key={index}
                openBulkModal={openBulkModal}
            />
        </Grid>
    })

    console.log(props, 'props di category');
    

    return <Grid container>
        <CategoryBulk
            categoryName={categoryName}
            open={bulkModal}
            closeModal={closeModal}
            scroll='paper'
            categoryId={categoryId}
        />
        <Modal
            name={categoryName}
            icon={categoryIcon}
            description={categoryDesc}
            categoryId={categoryId}
            currentModal={currentModal}
            getCategory={props.getCategory}
            closeModal={closeModal}
            open={modalState}
            modalName={modalName}
        />

        <Grid item xs={12} sm={12} md={12} lg={12}>
            <h3>
                Category
        </h3>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                style={{
                    marginTop: 5,
                }}
                InputLabelProps={{
                    styles: {
                        transform: "translate(14px, 14px) scale(1)"
                    }
                }}
                id="outlined-adornment-password"
                variant="outlined"
                type='text'
                label="Password"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" >
                            <IconButton
                                edge="end"
                                aria-label="toggle password visibility"
                            >
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Fab onClick={openAddModal} style={{ marginLeft: 10, backgroundColor: '#fd6a02', color: '#f2efef', maxHeight: '42px' }} variant="extended" aria-label="delete">
                Add Category +
            </Fab>
        </Grid>

        {
            props.categories.loading || loading
                ? <Loading />
                : props.categories.categoryList.length !== 0
                    ? categoryList
                    : null
        }
    </Grid>
}

const mapStateToProps = state => ({
    categories: state.category

});

const mapDispatchToProps = dispatch => {
    return {
        getCategory: () => dispatch(fetchCategory({}))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);
