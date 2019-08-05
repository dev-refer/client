import React, { Component } from 'react';
import '../../support/css/alert.css'
import Checked from '../../imageAssets/checked-confirmation.svg'

class JasaKirimBerhasil extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Alert Notifikasi Jasa Kirim Berhasil
                </button>
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content Rectangle">
                            <div className="container-fluid TopModal">
                                <img src={Checked} alt="" />
                            </div>
                            <div className="modal-body Text-Notification">
                                Jasa pengiriman telah <br />
                                berhasil ditambahkan
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JasaKirimBerhasil;