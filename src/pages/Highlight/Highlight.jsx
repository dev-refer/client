import React, { useEffect, useState } from 'react';

import axios from '../../libs/axios'
import {
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Fab,
} from '@material-ui/core';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import swal from 'sweetalert2';

import { connect } from 'react-redux';
import { fetchCategory } from '../../redux/actions/category.action';
import HighlightCard from '../../components/Card/HighlightCard';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import Loading from '../../components/Loading/index';
import './wziwig.css'
import HighlightModal from '../../components/Modal/HighlightModal';


function Highlight(props) {
    const { history } = props
    useEffect(async () => {
        await getHighlight()
    }, [])

    const [highlight, setHighlight] = useState([])
    const [highlightCreate, sethighighlightCreate] = useState('')
    const [highlightTitleCreate, sethighlightTitleCreate] = useState('')
    const [imageCreate, setimageCreate] = useState('')
    const [loading, setLoading] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState('')

    const getHighlight = async () => {
        try {
            const result = await axios({
                method: 'GET',
                url: 'v1/highlights',
                headers: {
                    token: localStorage.getItem('token')
                },
            })
            setHighlight(result.data)
        } catch (error) {
            swal.fire({
                title: 'ERROR GET HIGHLIGHT',
                type: 'error',
                text: error.message
            })
        }
    }

    const deleteHighlight = async (id) => {
        try {
            setLoading(true)
            await axios({
                method: 'DELETE',
                url: `v1/highlights/delete/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                },
            })
            await getHighlight();
            setLoading(false)
        } catch (error) {
            setLoading(false)
            swal.fire({
                title: 'ERROR DELETE HIGHLIGHT',
                type: 'error',
                text: error.message
            })
        }
    }
    const handleChangeText = (e) => {
        sethighighlightCreate(draftToHtml(convertToRaw(e.getCurrentContent())))
    }
    const handleChangeImage = async (e) => {
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
            setimageCreate(result.data.link)
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
    const addHighlight = async () => {
        try {
            if (!highlightTitleCreate || !highlightCreate || !imageCreate) {
                return swal.fire({
                    title: 'ERROR',
                    text: 'all field is required',
                    type: 'error'
                })
            }
            setLoading(true)
            let data = {
                title: highlightTitleCreate,
                description: highlightCreate,
                image: imageCreate
            }
            await axios({
                method: 'POST',
                url: 'v1/highlights/create',
                headers: {
                    token: localStorage.getItem('token')
                },
                data
            })
            await getHighlight()
            sethighlightTitleCreate('')
            sethighighlightCreate('')
            setimageCreate('')
            setLoading(false)
            setIsAdd(false)
        } catch (error) {
            setLoading(false)
            swal.fire({
                title: 'ERROR ADD HIGHLIGHT',
                type: 'error',
                text: error.message
            })
        }
    }
    const openModal = (data) => {
        setModalData(data)
        setModal(true)
    }
    return (
        <>
            <HighlightModal
                modal={modal}
                handleClose={setModal}
                data={modalData}
            />
            {
                loading
                    ? <Loading />
                    : null
            }
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginBottom: 5 }}>
                    <h3>
                        Highlight
        </h3>
                </Grid>
                {
                    !isAdd
                        ?
                        <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', marginBottom: 50 }}>
                            <Fab onClick={() => { setIsAdd(true) }} style={{ marginLeft: 10, backgroundColor: '#fd6a02', color: '#f2efef', maxHeight: '42px' }} variant="extended" aria-label="delete">
                                Add Highlight
            </Fab>
                        </Grid>
                        : null}
                {isAdd ? <>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', marginBottom: 50, flexDirection: 'column' }}>
                        <h4>
                            Title
            </h4>
                        <TextField value={highlightTitleCreate} onChange={(e) => { sethighlightTitleCreate(e.target.value) }} variant='outlined' style={{ width: '100%' }} />
                    </Grid>
                    <h4>
                        Description
        </h4>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', marginBottom: 50 }}>
                        <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            onEditorStateChange={handleChangeText}
                        />
                    </Grid>
                    <h4>
                        image
            </h4>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', marginBottom: 50 }}>
                        <TextField onChange={handleChangeImage} type='file' />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                        <Fab onClick={addHighlight} style={{ marginLeft: 10, backgroundColor: '#fd6a02', color: '#f2efef', maxHeight: '42px' }} variant="extended" aria-label="delete">
                            Add Highlight
            </Fab>
                        <Fab onClick={() => { setIsAdd(false) }} style={{ marginLeft: 10, backgroundColor: '#fd6a02', color: '#f2efef', maxHeight: '42px' }} variant="extended" aria-label="delete">
                            cancel
            </Fab>
                    </Grid>
                </>
                    : null
                }
                {
                    !isAdd ?
                        highlight.map((value, index) => {
                            return <Grid key={index} item xs={4} md={4} sm={4} lg={4}>
                                <HighlightCard
                                    openModal={openModal}
                                    highlightData={value}
                                    deleteHighlight={deleteHighlight}
                                />
                            </Grid>
                        })
                        : null
                }
            </Grid>
        </>
    )
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
)(Highlight);
