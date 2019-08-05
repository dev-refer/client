import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ENV from '../../environment'
import API from '../../apiCaller'
import $ from 'jquery'

import Modal from 'react-modal'
import { SyncLoader } from 'react-spinners';

import "./addCategory.css"
import '../../support/css/modal.css'

import Checked from '../../imageAssets/checked-confirmation.svg'
import WarningSign from '../../imageAssets/warning-sign.svg'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class EditKategori extends Component {
    state = {
        tampilModal: false,
        suksesModal: false,
        loading: false,
        token: localStorage.getItem('jwt')
    }

    componentDidMount() {
        console.log(this.props.location.id, 'ada id');
        this.setState({
            loading: true
        })
        // if (!this.props.location.id) {
        //     console.log('none');
        //     // window.location.replace('/kategori');
        // } else {
        //     console.log('adaaaaaaa');
        // }
        //
        axios.get(ENV.BASE_URL_API + API.CATEGORY_LIST + `/${this.props.location.id}`, {
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            }
        })
            .then(res => {
                var { name } = res.data.data.category
                this.setState({
                    category: name,
                    loading: false
                })
                console.log(res.data.data.category);

            }).catch(err => {
                if (err.message == 'Request failed with status code 404') {
                    // alert(`data can't edit`)
                    window.history.back();
                }
                console.log(err.message);
            })
    }

    handleChange = (e) => {
        this.setState({
            category: e.target.value
        })
    }

    popupModal = (e) => {
        this.setState({
            tampilModal : true
        })
        e.preventDefault()
    }

    handleSubmit = (e) => {
        this.setState({
            tampilModal: false
        })
        
        const fd = {
            category: this.state.category
        }

        const url = ENV.BASE_URL_API + API.UPDATE_CATEGORY + `/${this.props.location.id}`
        const config = {
            headers: {
                "Authorization": `Bearer ${this.state.token}`,
            }
        }

        axios.post(url, fd, config)
            .then((res) => {
                this.setState({
                    suksesModal: true
                })
                setTimeout(() => this.setState({ suksesModal: false }), 2000);
                setTimeout(() => window.location.href = '/kategori', 2000);
                // window.location.reload();
                console.log(res.data);
            })
            .catch((err) => {
                console.log('silahkan edit!', err.message);
                alert('silahkan edit!', err.message);
            })
        console.log(this.state);
        e.preventDefault()
    }

    hapus = (e) => {
        let category = e.target.getAttribute('category')
        if (this.state[`${category}`].id) {
            let fd = new FormData()
            fd.append('category', this.state.category)
            const url = ENV.BASE_URL_API + API.UPDATE_CATEGORY + `/${this.props.location.id}`
            const config = {
                headers: {
                    "Authorization": `Bearer ${this.state.token}`,
                }
            }
            axios.post(url, fd, config).then(res => {
                console.log('sukses hapus');
                console.log(res);
            })
        } else {
            this.setState({ [category]: {} })
        }

        // this.setState({ [name]: {} })
        // $(`.${name} label , .${name} small`).show()
        // $(`.${name} img`).hide()
        // $(`.${name} input`).val("")
        // $(`.${name} i`).css('display', 'none')
        // $(`.${name} .figure`).css('border', 'solid 1px #c2c2c2')
    }

    alertKonfirm = () => {
        return (

            <div className="pop-modal">
                <center>
                    <img src={WarningSign} alt="" />
                    <p>
                        Apakah Anda yakin untuk <br />
                        edit nama kategori?
                        </p>
                    <div className="container-fluid BottomModal">
                        <button type="submit" className="Rectangle-373" data-dismiss="modal" onClick={this.handleSubmit}>YA</button>
                        <button type="button" className="Rectangle-374" data-dismiss="modal" onClick={() => this.setState({ tampilModal: false })}>BATAL</button>
                    </div>
                </center>
            </div>

        )
    }

    alertBerhasil = () => {
        return (
            <div className="pop-modal">
                <center>
                    <img className='pb-4' src={Checked} alt="" />
                    <p>
                        Nama kategori telah berhasil<br />
                        diedit
                </p>
                </center>
            </div>
        )
    }

    render() {
        return (
            <div className='pg-tambah-cat'>
                <Modal
                    isOpen={this.state.tampilModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.alertKonfirm />
                </Modal>
                <Modal
                    isOpen={this.state.suksesModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.alertBerhasil />
                </Modal>
                <SyncLoader
                    sizeUnit={"px"}
                    size={10}
                    color={'#cb9656'}
                    loading={this.state.loading}
                />

                <form onSubmit={this.popupModal}>
                    <div className="container">
                        <div className="adjust2">
                            <div className="add-category">
                                <p><Link to='/kategori'><i style={{ fontSize: "25px", color: "#2e2771" }} class="fas fa-chevron-left"></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;EDIT KATEGORI</p>
                            </div>
                            <form>
                                <div className="adjust3">
                                    <p className="category-name">Nama Kategori</p>
                                    <input type="text" className="form-control Rectangle-1335" id="exampleFormControlInput1" value={this.state.category} name='category' onChange={this.handleChange} required />
                                </div>
                            </form>
                        </div>
                        <div className="text-center">
                            <p>
                                <button type="submit" className="add-button cat" >Tambah</button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditKategori;