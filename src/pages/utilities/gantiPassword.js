import React, { Component } from 'react'
import '../utilities/gantiPassword.css'
import WarningSign from '../../imageAssets/warning-sign.svg'
import '../../support/css/modal.css'
import Axios from 'axios';
import ENV from '../../environment.js'
import API from '../../apiCaller.js'

class GantiPassword extends Component {

    state = {
        modal: false,
        token: localStorage.getItem('jwt'),
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        if (this.state.password == this.state.password_confirmation) {
            this.setState({ button: false })
            Axios.post(ENV.BASE_URL_API + API.UPDATE_PASSWORD_ADMIN, {
                'old-password': this.state['old-password'],
                'password': this.state.password,
                'password_confirmation': this.state.password_confirmation
            }, {
                    headers: {
                        "Authorization": `Bearer ${this.state.token}`
                    },
                })
                .then((res) => {
                    console.log(res);
                    alert('Ganti password sukses!')
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err.response);
                    alert('Ganti password gagal')
                })
        } else {
            alert('pass tidak sama')
        }

        console.log(this.state.password_confirmation);
        console.log(this.state.password);
        console.log(this.state['old-password']);

    }


    render() {

        return (
            <div className="container mt-4 ml-4">
                <div className="">
                    <div className="GANTI-PASSWORD">
                        <p>GANTI PASSWORD</p>
                    </div>
                    <br />
                    <form>
                        <div className="container-fluid adjust1 p-0">
                            <p className="Email">Email</p>
                            <input type="email" className="form-control Rectangle-1428" value={localStorage.getItem('changePass')} id="exampleFormControlInput1" disabled />
                        </div>
                        <br />
                        <div className="container-fluid adjust1 p-0">
                            <p className="Email">Password Lama</p>
                            <input type="password" name="old-password" onChange={this.handleChange} className="form-control Rectangle-1429" id="exampleFormControlInput1" />
                        </div>
                        <br />
                        <div className="container-fluid adjust1 p-0">
                            <p className="Email">Password Baru</p>
                            <input type="password" name="password" onChange={this.handleChange} className="form-control Rectangle-1429" id="exampleFormControlInput1" />
                        </div>
                        <br />
                        <div className="container-fluid adjust1 p-0">
                            <p className="Email">Konfirmasi Password Baru</p>
                            <input type="password" name="password_confirmation" onChange={this.handleChange} className="form-control Rectangle-1429" id="exampleFormControlInput1" />
                        </div>
                    </form>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="text-center">
                    <p>
                        <button type="submit" className="Rectangle-1427 Ganti-Password text-center" data-toggle="modal" data-target="#exampleModal" >Ganti Password</button>
                    </p>
                    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content Banner">
                                <div className="container-fluid TopModal">
                                    <img src={WarningSign} alt="" />
                                </div>
                                <div className="modal-body BannerText">
                                    Apakah Anda yakin untuk <br />
                                    mengganti password?
                            </div>
                                <div className="container-fluid BottomModal">
                                    <button type="button" className="Rectangle-373" onClick={this.handleSubmit} data-dismiss="modal" >YA</button>
                                    <button type="button" className="Rectangle-374" data-dismiss="modal">BATAL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GantiPassword;

