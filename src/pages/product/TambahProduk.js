import React, { Component } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Modal from 'react-modal'
import { ClipLoader, SyncLoader } from 'react-spinners';

import succesSign from '../../imageAssets/checked-confirmation.svg'
import warningSign from '../../imageAssets/warning-sign.svg'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class TambahProduk extends Component {
    state = {
        gambar1: {},
        gambar2: {},
        gambar3: {},
        gambar4: {},
        gambar5: {},
        supplierData: [],
        //handle category and sub
        categories: [],
        subCategories: [],
        token: localStorage.getItem('jwt'),

        //modal
        tampilModal : false,
        suksesModal : false,
        loading : false
    }

    componentDidMount() {
        this.apiSupplier()
        this.getApiCategories()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        // // console.log(this.state)
        this.setState({
            tampilModal : true,
            popImage : warningSign,
            verifName : this.state.name
        })
        e.preventDefault()
    }
    
    handleKirim = () =>{
        this.setState({
            loading : true,
            tampilModal : false
        })
        const fd = new FormData()
        fd.append('image[0]', this.state.gambar1.file)
        if (this.state.gambar2.file) {
            fd.append('image[1]', this.state.gambar2.file)
        }
        if (this.state.gambar3.file) {
            fd.append('image[2]', this.state.gambar3.file)
        }
        if (this.state.gambar4.file) {
            fd.append('image[3]', this.state.gambar4.file)
        }
        if (this.state.gambar5.file) {
            fd.append('image[4]', this.state.gambar5.file)
        }
        // fd.append('image[1]', !this.state.gambar2.file? "" : this.state.gambar2.file)
    
        fd.append('name', this.state.name)
        fd.append('price', this.state.price)
        fd.append('satuan', this.state.satuan)
        fd.append('weight', this.state.weight)
        fd.append('width', this.state.width)
        fd.append('height', this.state.height)
        fd.append('depth', this.state.depth)
        fd.append('stock', this.state.stock)
        fd.append('category', this.state.category)
        fd.append('sub-category', this.state['sub-category'])
        fd.append('supplier', this.state.supplier)
        fd.append('status', 0)
        fd.append('description', this.state.description)
    
        const url = 'https://devmind3.net/api/product'
        const config = {
            headers: {
                "Authorization": `Bearer ${this.state.token}`,
            }
        }
    
        axios.post(url, fd, config)
            .then((res) => {
                this.setState({
                    suksesModal : true,
                    popMessage : ` telah berhasil \n ditambahkan`,
                    popImage : succesSign,
                    loading: false
                })
                setTimeout(()=> this.setState({suksesModal : false}), 2000);
                setTimeout(()=> window.location.href ='/produk', 2000);
            })
            .catch((err) => {
                // console.log('isi semua form ', err.message);
                this.setState({
                    suksesModal : true,
                    popMessage : ` telah gagal \n ditambahkan`,
                    popImage : warningSign,
                    loading: false
                })
                setTimeout(()=> this.setState({suksesModal : false}), 2000);
                // setTimeout(()=> window.location.href ='/produk', 2000);
                for (const error of err.response.data.meta.message) {
                    console.log(error);
                    alert(JSON.stringify(error))
                }
                console.log('isi semua form ', err.response.data.meta.message);
    
            })
    }

    handleChangeImage = (e) => {
        let name = e.target.id
        let file = { preview: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] }
        if (!file) {
            this.setState({
                [name]: {}
            })
        } else {
            this.setState({
                [name]: file,
            })
        }

    }

    apiSupplier = () => {
        return axios.get('https://devmind3.net/api/supplier/list', {
            headers: {
                "Authorization": `Bearer ${this.state.token}`,
            },
            params: {
                'page': '1',
                'per-page': "10"
            }
        }).then((response) => {
            this.setState({ supplierData: response.data.data.supplier })

        }).catch(err => {
            // console.log(err)
            localStorage.clear()
            alert('token expire need to login again')
            window.location.reload()
        })
    }

    listSupplier = () => {
        return this.state.supplierData.map((res, i) => {
            // // console.log(res.name);
            return (
                <option key={i} value={res.id}>
                    {res.name}
                </option>
            )
        })

    }

    handleClick = (e) => {
        // console.log(e.target.className);
        $(`.${e.target.className} i`).show()
        $(`.${e.target.className} label , .${e.target.className} small`).css('display', 'none')
        $(`.${e.target.className} img`).show()
        $(`.${e.target.className} .figure`).css('border', 'none')
    }

    hapusGambar = (e) => {
        let name = e.target.getAttribute('name')
        this.setState({ [name]: {} })
        $(`.${name} label , .${name} small`).show()
        $(`.${name} img`).hide()
        $(`.${name} input`).val("")
        $(`.${name} i`).css('display', 'none')
        $(`.${name} .figure`).css('border', 'solid 1px #c2c2c2')
    }

    //handle category and sub list
    handleTwoFunct = (e) => {
        this.handleCategory(e)
        this.handleChange(e)
    }

    getApiCategories = () => {
        axios.get('https://devmind3.net/api/categories')
            .then((response) => {
                const data = response.data.data.category
                this.setState({ categories: data })
            })
            .catch((error) => {
                // console.log(error);
                alert(error.message)
            })
    }

    handleCategory = (e) => {
        this.setState({ categoryFilter: e.target.value })
        axios.get('https://devmind3.net/api/sub-categories', {
            params: {
                category: e.target.value
            }
        })
            .then((response) => {
                let data = response.data.data["sub-category"]
                this.setState({ subCategories: data })
            })
            .catch((error) => {
                // console.log(error);
                alert(error.message)
            })
    }

    listCategories = () => {
        let mapList = this
            .state
            .categories
            .map((list, i) => {
                return (
                    <option key={i} value={list.id}>{list.name}</option>
                )
            })

        return mapList
    }

    listSubCategories = () => {
        let mapList = this
            .state
            .subCategories
            .map((list, i) => {
                // // console.log('ini list sub kat nya',list);
                return (
                    <option key={i} value={list.id}>{list.name}</option>
                )
            })

        return mapList
    }

    gambariput = () => {
        return (
            <div className='pg-tambah-prod text-left'>

                <div className='container'>
                    <div className='row '>
                        <div className='col-md-0 mr-3 gambar1 pl-0'>
                            <div className='figure text-center label-gambar1 '>
                                {!this.state.gambar2.preview ?
                                    <i onClick={this.hapusGambar} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar1'></i>
                                    : <i onClick={this.hapusGambar} style={{ 'visibility': 'hidden' }} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar1'></i>
                                }
                                <label className='gambar1' onClick={this.handleClick} htmlFor='gambar1'>+</label>
                                <br />
                                <small>Tambah Gambar</small>
                                <input
                                    name="image[0]"
                                    type="file"
                                    id='gambar1'
                                    onChange={this.handleChangeImage} />
                                <img src={this.state.gambar1.preview} className='img-nya label-gambar1' />
                            </div>
                        </div>
                        {this.state.gambar1.preview ?
                            <div className='col-md-0 mr-3 gambar2'>
                                <div className='figure text-center label-gambar1 '>
                                    {!this.state.gambar3.preview ?
                                        <i onClick={this.hapusGambar} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar2'></i>
                                        : <i onClick={this.hapusGambar} style={{ 'visibility': 'hidden' }} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar2'></i>
                                    }
                                    <label className='gambar2' onClick={this.handleClick} htmlFor='gambar2'>+</label>
                                    <br />
                                    <small>Tambah Gambar</small>
                                    <input
                                        name="image[1]"
                                        type="file"
                                        id='gambar2'
                                        onChange={this.handleChangeImage} />
                                    <img src={this.state.gambar2.preview} className='img-nya label-gambar1' />
                                </div>
                            </div>
                            : null}

                        {this.state.gambar2.preview ?
                            <div className='col-md-0 mr-3 gambar3'>
                                <div className='figure text-center '>
                                    {!this.state.gambar4.preview ?
                                        <i onClick={this.hapusGambar} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar3'></i>
                                        : <i onClick={this.hapusGambar} style={{ 'visibility': 'hidden' }} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar3'></i>
                                    }
                                    <label className='gambar3' onClick={this.handleClick} htmlFor='gambar3'>+</label>
                                    <br />
                                    <small>Tambah Gambar</small>
                                    <input
                                        name="image[2]"
                                        type="file"
                                        id='gambar3'
                                        onChange={this.handleChangeImage} />
                                    <img src={this.state.gambar3.preview} className='img-nya' />
                                </div>
                            </div>
                            : null}

                        {this.state.gambar3.preview ?
                            <div className='col-md-0 mr-3 gambar4'>
                                <div className='figure text-center '>
                                    {!this.state.gambar5.preview ?
                                        <i onClick={this.hapusGambar} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar4'></i>
                                        :
                                        <i onClick={this.hapusGambar} style={{ 'visibility': 'hidden' }} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar4'></i>
                                    }
                                    <label className='gambar4' onClick={this.handleClick} htmlFor='gambar4'>+</label>
                                    <br />
                                    <small>Tambah Gambar</small>
                                    <input
                                        type="file"
                                        id='gambar4'
                                        onChange={this.handleChangeImage} />
                                    <img src={this.state.gambar4.preview} className='img-nya' />
                                </div>
                            </div>
                            : null}

                        {this.state.gambar4.preview ?
                            <div className='col-md-0 mr-3 gambar5'>
                                <div className='figure text-center '>
                                    <i onClick={this.hapusGambar} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar5'></i>

                                    <label className='gambar5' onClick={this.handleClick} htmlFor='gambar5'>+</label>
                                    <br />
                                    <small>Tambah Gambar</small>
                                    <input
                                        type="file"
                                        id='gambar5'
                                        onChange={this.handleChangeImage} />
                                    <img src={this.state.gambar5.preview} className='img-nya' />
                                </div>
                            </div>
                            : null}

                    </div>
                    {/* <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <button onClick={this.handleConsole}>dsfsadf</button> */}
                </div>
            </div>

        )
    }

    TempSuccess = ()=>{
        return(
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

    TempVerif = ()=>{
        return(
            <div className="pop-modal">
                <center>
                <img src={this.state.popImage} alt="" />
                    <p>
                    Apakah Anda yakin untuk <br />
                    menambahkan produk {this.state.verifName}?
                    </p>
                <button type="button" className="Rectangle-373" onClick={this.handleKirim}>YA</button>
                <button type="button" className="Rectangle-374" onClick={()=>this.setState({tampilModal : false})}>BATAL</button>
                </center>
            </div>
        )
    }
    render() {
        return (
            <div className='py-5 .t-produk-page'>
                {/* modal */}
                <Modal
                isOpen={this.state.suksesModal}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.TempSuccess/>
                </Modal>
                <Modal
                isOpen={this.state.tampilModal}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.TempVerif/>
                </Modal>
                <SyncLoader
                sizeUnit={"px"}
                size={10}
                color={'#cb9656'}
                loading={this.state.loading}
                />
                <form onSubmit={this.handleSubmit}>
                    <div className='container pb-5'>
                        <h1 className='title-page'><Link to='/produk'><i className="fas fa-chevron-left" ></i></Link> TAMBAH PRODUK</h1>
                        <br />
                        Gambar
                    <div className='text-center'>
                            {this.gambariput()}
                        </div>
                        <small className=''>min 1 gambar, max 5 gambar</small>
                        <div className='row mt-5'>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Kategori</label>
                                    <select className="custom-select" onChange={this.handleTwoFunct} name='category'>
                                        <option value='' selected disabled>Pilih Kategori</option>
                                        {this.listCategories()}
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Sub Kategori </label>
                                    <select className="custom-select" name='sub-category' onChange={this.handleChange}>
                                        <option value="" selected disabled>Pilih Sub Kategori</option>
                                        {this.listSubCategories()}
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                {/* <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Sub Kategori 2</label>
                                <select className="form-control custom-select" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div> */}
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-8'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Nama Produk</label>
                                    <input type="text" className="form-control" id="" placeholder="Nama produk" name="name" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Nama Supplier</label>
                                    <select className="form-control custom-select" id="exampleFormControlSelect1" name='supplier' onChange={this.handleChange} required>
                                        <option value='' disabled selected>Pilih Supplier</option>
                                        {this.listSupplier()}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Harga Produk</label>
                                    <input type="number" min='0' className="form-control" id="" placeholder="Harga produk" name="price" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Satuan</label>
                                    <input type="text" className="form-control" id="" placeholder="Satuan produk" name="satuan" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Jumlah Stok</label>
                                    <input type="number" min='0' className="form-control" id="" placeholder="Jumlah stok produk" name='stock' onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Deskripsi</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" name='description' onChange={this.handleChange} required></textarea>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md'>

                                <label htmlFor="exampleFormControlTextarea1" style={{ color: "#707070" }}>Dimensi (in centimeters)</label>
                                <div className="form-group in-inline">
                                    <input type="number" min='0' className="form-control col-md-3 text-center " id="" placeholder="depth" name="depth" onChange={this.handleChange} /><i className="fas fa-times mx-3"></i>
                                    <input type="number" min='0' className="form-control col-md-3 text-center" id="" placeholder="width" name="width" onChange={this.handleChange} /><i className="fas fa-times mx-3"></i>
                                    <input type="number" min='0' className="form-control col-md-3 text-center" id="" placeholder="height" name="height" onChange={this.handleChange} />
                                </div>

                            </div>

                            <div className='col-md'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Berat (Kg)</label>
                                    <input type="number" className="form-control col-md-3 text-center" id="" placeholder="weight" name='weight' onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <center>
                        <button type="submit" className=" btn px-5  text-center btn-add-produk" >Tambah Produk</button>

                    </center>
                </form>
            </div>


        )

    }
}



export default TambahProduk