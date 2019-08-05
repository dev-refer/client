import React, { Component } from 'react'
import "./addCategory.css"
// import '../../support/css/modal.css'
// import WarningSign from '../../imageAssets/warning-sign.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { SyncLoader } from 'react-spinners'
import Modal from 'react-modal'
import '../../support/css/modal.css';
import succesSign from '../../imageAssets/checked-confirmation.svg'
import warningSign from '../../imageAssets/warning-sign.svg'

import ENV from '../../environment.js'
import API from '../../apiCaller.js'

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

class AddCategory extends Component {

    state = {
        //modal
        tampilModal: false,
        suksesModal: false,
        loading: false,

        //other
        token: localStorage.getItem('jwt'),
        error: [],

        icon: '',
        name: ''
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeIcon = (e) => {
        console.log(e.target.files);


        const url = ENV.BASE_URL_API + API.UPLOAD_ICON
        const data = new FormData()
        data.append('image', e.target.files[0])
        this.setState({
            loading: true
        })
        axios.post(url, data)
            .then(({ data }) => {
                this.setState({
                    icon: data.data.link,
                    loading: false
                }, () => {
                    console.log(this.state.icon);
                })
            })
            .catch(err => {
                alert(err.message)
                this.setState({
                    loading: false
                })
            })

    }

    handleSubmit = (e) => {
        this.setState({
            tampilModal: true,
            popImage: warningSign,
            verifName: this.state.name
        })
        e.preventDefault()
    }

    handleSend = (e) => {
        e.preventDefault()

        this.setState({
            loading: true,
            tampilModal: false
        })


        const url = ENV.BASE_URL_API + API.CREATE_CATEGORY
        const data = {
            Name: this.state.name,
            Icon: this.state.icon
        }
        console.log(data)
        // const config = {
        //     headers: {
        //         "Authorization": `Bearer ${this.state.token}`,
        //     }
        // }

        axios.post(url, data)
            .then((res) => {
                this.setState({
                    suksesModal: true,
                    popMessage: `berhasil \n ditambahkan!`,
                    popImage: succesSign,
                    loading: false
                })
                setTimeout(() => this.setState({ suksesModal: false }), 2000);
                setTimeout(() => window.location.href = '/kategori', 2000);
                console.log(res);
            })
            .catch((err) => {
                this.setState({
                    suksesModal: true,
                    popMessage: `Gagal menambahkan! ${this.state.error.replace(/[\{[\]}']+/g, " ")}`,
                    popImage: warningSign,
                    loading: false
                })
                setTimeout(() => this.setState({ suksesModal: false }), 4000);
                var errorMessage = err.response.data.meta.message.map(res => {
                    this.setState({
                        error: JSON.stringify(res)
                    })
                })
                console.log(this.state.error);
            })

        //Display the values
        // for (var val of data.values()) {
        //     if (val != undefined) {
        //         console.log(val);
        //     }
        // }
    }

    TempSuccess = () => {
        return (
            <div className="pop-modal">
                <center>
                    <img className='pb-4' src={this.state.popImage} alt="" />
                    <p>
                        {this.state.name}{this.state.popMessage}
                    </p>
                </center>
            </div>
        )
    }

    TempVerif = () => {
        return (
            <div className="pop-modal">
                <center>
                    <img src={this.state.popImage} alt="" />
                    <p>
                        Apakah Anda yakin untuk <br />
                        menambahkan kategori {this.state.verifName}?
                    </p>
                    <button type="button" className="Rectangle-373" onClick={this.handleSend}>YA</button>
                    <button type="button" className="Rectangle-374" onClick={() => this.setState({ tampilModal: false })}>BATAL</button>
                </center>
            </div>
        )
    }

    render() {

        return (
            <div className=''>
                <Modal
                    isOpen={this.state.suksesModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <this.TempSuccess />
                </Modal>
                <Modal
                    isOpen={this.state.tampilModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <this.TempVerif />
                </Modal>
                <SyncLoader
                    sizeUnit={'px'}
                    size={10}
                    color={'#cb9656'}
                    loading={this.state.loading}
                />

                <div className="">
                    <div className="">
                        <div className="add-category">
                            <p><Link to='/kategori'><i style={{ fontSize: "25px", color: "#2e2771" }} className="fas fa-chevron-left"></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;ADD CATEGORY</p>
                        </div>
                        <div className="">
                            <p className="category-name">Category Name</p>
                            <input type="text" className="form-control Rectangle-1335" name="name" id="exampleFormControlInput1" onChange={this.handleChange} required />
                        </div>
                      
                    </div>
                    <div className="text-center">

                        <p>
                            <button onClick={this.handleSend} className="add-button cat">Add</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCategory;