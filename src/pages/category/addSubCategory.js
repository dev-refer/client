import React, { Component } from 'react'
import "./addSubCategory.css"
import '../../support/css/modal.css'
import WarningSign from '../../imageAssets/warning-sign.svg'
import { Link } from 'react-router-dom'

class AddSubCategory extends Component {

    state = {
        iconSubCat: {}
    }

    handleSubmit = (e) => {
        let form = {
            'image[0]' : this.state.iconSubCat.file || ''
        }
        console.log(form);
    }

    render() {
        return (
            <div className='pg-tambah-subCat'>
            <div className="container">
                <div className="adjust2">
                    <div className="add-sub-category">
                        <p><Link to='/hotelroom'><i style={{ fontSize: "25px", color: "#2e2771" }} class="fas fa-chevron-left"></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;TAMBAH SUB KATEGORI</p>
                    </div>
                    <form>
                        <div className="adjust3">
                            <p className="sub-category-name">Nama Sub Kategori</p>
                            <input type="text" className="form-control Rectangle-1335" id="exampleFormControlInput1" />
                        </div>
                    </form>
                </div>
                <div className="text-center">
                    <p>
                        <button type="submit" className="add-button subcat">Tambah</button>
                    </p>
                    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content Banner">
                                <div className="container-fluid TopModal">
                                    <img src={WarningSign} alt="" />
                                </div>
                                <div className="modal-body BannerText">
                                    Apakah Anda yakin untuk <br />
                                    menambahkan sub-kategori?
                            </div>
                                <div className="container-fluid BottomModal">
                                    <button type="button" className="Rectangle-373">YA</button>
                                    <button type="button" className="Rectangle-374" data-dismiss="modal">BATAL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default AddSubCategory;