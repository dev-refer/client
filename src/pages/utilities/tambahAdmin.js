import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../pages/utilities/tambahAdmin.css'
import '../../support/css/modal.css'
import $ from 'jquery';
import Axios from 'axios';
import Modal from 'react-modal'
import ENV from '../../environment.js'
import API from '../../apiCaller.js'
import { SyncLoader } from 'react-spinners';

import WarningSign from '../../imageAssets/warning-sign.svg'
import Checked from '../../imageAssets/checked-confirmation.svg'

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


class TambahAdmin extends Component {

    state = {
        modal: false,
        token: localStorage.getItem('jwt'),
        suksesModal: false,
        tampilModal: false,
        loading: false

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }


    componentDidMount() {
        $("#checkAll").click(function () {
            $(".check").prop('checked', $(this).prop('checked'));
        });

    }

    handleChange = (e) => {
        console.log(e.target.value);
        return this.setState({
            [e.target.name]: e.target.value,
        })

    }

    handleSubmit = (e) => {
        this.setState({
            tampilModal : true,
            image : WarningSign
        })
        e.preventDefault()
    }

    alertBerhasil = () => {
        return (
            <div className="pop-modal">
                <center>
                    <img className='pb-4' src={Checked} alt="" />
                    <p>
                        Admin telah berhasil<br />
                        ditambahkan
                </p>
                </center>
            </div>
        )
    }

    alertKonfirm = () => {
        return (
           
                    <div className="pop-modal">
                        <center>
                            <img src={WarningSign} alt="" />
                        <p>
                            Apakah Anda yakin untuk <br />
                            menambahkan admin?
                        </p>
                        <div className="container-fluid BottomModal">
                            <button type="submit" className="Rectangle-373" data-dismiss="modal" onClick={this.onBtnAddClick}>YA</button>
                            <button type="button" className="Rectangle-374" data-dismiss="modal">BATAL</button>
                        </div>
                        </center>
                    </div>
               
        )
    }


    onBtnAddClick = (e) => {

        this.setState({ loading: true })

        const fd = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            // password: 'secret',
            // password_confirmation: 'secret',
        }

        console.log(fd);


        const url = ENV.BASE_URL_API + API.CREATE_ADMIN_LIST
        const config = {
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            }
        }

        return Axios.post(url, fd, config)
            .then((res) => {
                this.setState({ loading: false, suksesModal: true })
                setTimeout(() => this.setState({ suksesModal: false }), 2000);
                setTimeout(() => window.location.href = '/adminmanager', 2000);
                console.log(res)
                console.log(res.data)
                // $('.bd-example-modal-sm').modal('show')

                // alert("Admin successfully uploaded!")

            })
            .catch((err) => {
                this.setState({ loading: false, suksesModal: true })
                setTimeout(() => this.setState({ suksesModal: false }), 1500);
                console.log(err.response);
                // alert("Input failure")
                e.preventDefault()
                // localStorage.clear()
                // window.location.reload()
            })



    }


    render() {

        return (

            <div className="container mt-4 ml-4">
                <Modal
                    isOpen={this.state.suksesModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.alertBerhasil />
                </Modal>
                <Modal
                    isOpen={this.state.tampilModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.alertKonfirm />
                </Modal>
                <SyncLoader
                    // css={customStyles}
                    sizeUnit={"px"}
                    size={10}
                    color={'#cb9656'}
                    loading={this.state.loading}
                />
                <form onSubmit={this.handleSubmit}>
                    <div className="TAMBAH-ADMIN">
                        <p><Link to="/adminmanager"><i style={{ fontSize: "25px", color: "#2e2771" }} class="fas fa-chevron-left"></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;TAMBAH ADMIN</p>
                    </div>
                    {/* <button onClick={this.alertBerhasil}>test</button> */}


                    <br />

                    <div className="container-fluid adjust1 p-0" >
                        <p className="Nama-Admin">Nama Admin</p>
                        <input type="text" ref="addNamaAdmin" className="form-control Rectangle-1140" id="exampleFormControlInput1" name='name' onChange={this.handleChange} required />
                    </div>
                    <br />
                    <div className="container-fluid adjust1 p-0" ref="formAll">
                        <p className="Nama-Admin">Username</p>
                        <input type="text" ref="addUserAdmin" className="form-control Rectangle-1140" id="exampleFormControlInput1" name='username' onChange={this.handleChange} required />
                    </div>
                    <br />
                    <div className="container-fluid adjust1 p-0" ref="formAll">
                        <p className="Nama-Admin">Email Admin</p>
                        <input type="email" ref="addEmailAdmin" className="form-control Rectangle-1140" id="exampleFormControlInput1" name='email' onChange={this.handleChange} required />
                    </div>

                    <br />
                    <br />

                    <div className="text-center">
                        <p>
                            <button type="submit" className="Rectangle-1427 Tambah text-center" data-toggle="modal" data-target="#exampleModal">Tambah</button>
                        </p>

                        <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-sm">
                                <div class="modal-content">
                                    ...
                            </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>


        )
    }
}


export default TambahAdmin;

