import React, { Component } from 'react';
import '../../support/css/modal.css'
import WarningSign from '../../imageAssets/warning-sign.svg'

class KonfirmVerSupplier extends Component {
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
                    Modal Konfirmasi Verifikasi Supplier
                </button>
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content Banner">
                            <div className="container-fluid TopModal">
                                <img src={WarningSign} alt="" />
                            </div>
                            <div className="modal-body BannerText">
                                Apakah Anda yakin untuk <br />
                                memverifikasi *nama supplier*?
                            </div>
                            <div className="container-fluid BottomModal">
                                <button type="button" className="Rectangle-373">YA</button>
                                <button type="button" className="Rectangle-374">BATAL</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default KonfirmVerSupplier;