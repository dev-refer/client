import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button, Tooltip, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons'

import Loading from '../Loading';
import swal from 'sweetalert2';
import axios from '../../libs/axios';

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid white',
        borderRadius: '25px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CategoryModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const {
        open,
        modalName,
        closeModal,
        getCategory,
        name,
        description,
        icon,
        categoryId,
        currentModal
    } = props
    const [categoryName, setCategoryName] = useState(name || '')
    const [categoryDescription, setCategoryDescription] = useState(description || '')
    const [categoryIcon, setCategoryIcon] = useState(icon || '')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setCategoryName(name)
        setCategoryIcon(icon)
        setCategoryDescription(description)
    }, [name, icon, description])

    const changeIcon = async (e) => {
        const data = new FormData()
        data.append('image', e.target.files[0])
        try {
            setLoading(true)
            const result = await axios({
                method: 'POST',
                url: '/image/single',
                data,
                header: {
                    token: localStorage.getItem('token')
                }
            })
            setCategoryIcon(result.data.link)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            swal.fire({
                title: 'error while upload file',
                text: 'Please Try Again Later, Or call CS on 082242747182',
                type: 'error'
            })

        }
    }

    const submitCategory = async () => {
        try {
            if (!categoryName || !categoryDescription || !categoryIcon) {
                return swal.fire({
                    text: 'Please fill all field',
                    type: 'warning'
                })
            }
            setLoading(true)
            const options = {
                url: '/v1/categories',
                method: 'POST',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    name: categoryName,
                    description: categoryDescription,
                    icon: categoryIcon
                }
            }
            await axios(options);
            setLoading(false)
            close()
            getCategory()
            swal.fire({
                text: 'Category Created',
                type: 'success'
            })
        } catch (error) {
            setLoading(false)
            swal.fire({
                text: 'Error while create category, please try again later',
                type: 'error'
            })

        }
    }

    const saveEdit = async () => {
        try {
            if (!categoryName || !categoryDescription || !categoryIcon) {
                return swal.fire({
                    text: 'Please fill all field',
                    type: 'warning'
                })
            }
            setLoading(true)
            const options = {
                url: '/v1/categories/' + categoryId,
                method: 'PUT',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    name: categoryName,
                    description: categoryDescription,
                    icon: categoryIcon
                }
            }
            await axios(options);
            setLoading(false)
            close()
            getCategory()
            swal.fire({
                text: 'Category Updated',
                type: 'success'
            })
        } catch (error) {
            setLoading(false)
            swal.fire({
                text: 'Error while create category, please try again later',
                type: 'error'
            })

        }
    }

    const close = () => {
        closeModal();
        setCategoryName('')
        setCategoryIcon('')
        setCategoryDescription('')
    }

    console.log(props, 'props di catmodal');


    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
        >
            <div style={modalStyle} className={classes.paper}>
                {
                    loading
                        ? <Loading />
                        : null
                }
                <h2 id="simple-modal-title">{modalName}</h2>

                <TextField
                    id="standard-name"
                    label="Name"
                    value={categoryName}
                    margin="normal"
                    multiline
                    onChange={(e) => { setCategoryName(e.target.value) }}
                />
                <TextField
                    label="Description"
                    value={categoryDescription}
                    margin="normal"
                    onChange={e => { setCategoryDescription(e.target.value) }}
                    multiline
                />
                <br />
                <p style={{ marginTop: 5, fontWeight: 'bold' }}>
                    Add Icon
                </p>
                {
                    categoryIcon
                        ? <Tooltip placement='top' title='Delete'>
                            <Button onClick={() => { setCategoryIcon('') }}>
                                <img style={{ maxHeight: '100px', maxWidth: '100px' }} src={categoryIcon} alt="" />
                            </Button>
                        </Tooltip>
                        : null
                }
                {
                    !categoryIcon
                        ? <label htmlFor="outlined-button-file">
                            <Button style={{ height: '100px', width: '100px' }} variant="outlined" component="span" className={classes.button}>
                                <Add />
                            </Button>
                        </label>
                        : null
                }
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="outlined-button-file"
                    value=''
                    type="file"
                    onChange={(e) => { changeIcon(e) }}
                />
                <br />
                <Fab onClick={close} style={{ backgroundColor: '#e3e2de', color: 'black', marginTop: 20, minWidth: '100px' }} variant="extended" aria-label="delete">
                    Discard
                </Fab>
                {
                    currentModal === 'Add'
                        ? <Fab onClick={() => { submitCategory() }} style={{ backgroundColor: '#fd6a02', color: '#f2efef', marginTop: 20, minWidth: '100px', marginLeft: 20 }} variant="extended" aria-label="delete">
                            Submit
                            </Fab>
                        : currentModal === 'Edit'
                            ? <Fab onClick={() => { saveEdit() }} style={{ backgroundColor: '#fd6a02', color: '#f2efef', marginTop: 20, minWidth: '100px', marginLeft: 20 }} variant="extended" aria-label="delete">
                                Save
                                 </Fab>
                            : null
                }

            </div>
        </Modal>
    )
}