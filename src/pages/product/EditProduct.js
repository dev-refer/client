import React, { Component } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ENV from '../../environment.js'
import API from '../../apiCaller.js'

import Modal from 'react-modal'
import { ClipLoader, SyncLoader } from 'react-spinners';

import succesSign from '../../imageAssets/checked-confirmation.svg'
import warningSign from '../../imageAssets/warning-sign.svg'

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

class EditProduct extends Component {
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

        // 'image-delete[0]' : []
        //modal
        tampilModal: false,
        suksesModal: false,
        loading: false
    }

    componentDidMount() {
        console.log(this.props.location.id);
        if (!this.props.location.id) {
            console.log('none');
            window.location.replace('/produk');
        } else {
            console.log('adaaaaaaa');
        }
        //
        axios.get(ENV.BASE_URL_API + API.UPDATE_PRODUCT + `/${this.props.location.id}`, {
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            }
        }).then(res => {
            var { name, description, price, satuan, status, weight, width, height, depth, stock, category, subCategory, supplier, image } = res.data.data.product
            this.setState({
                name: name,
                description: description,
                price: price,
                satuan: satuan,
                weight: weight,
                width: width,
                height: height,
                depth: depth,
                stock: stock,
                category: category,
                subCategory: subCategory,
                supplier: supplier,
                status: status

            })
            for (let i = 0; i < 5; i++) {
                if (image[i].url) {
                    var numState = i + 1
                    this.setState({
                        [`gambar${numState}`]: { preview: 'https://' + image[i].url, id: image[i].id },
                    })
                }
            }
            console.log(res);

        }).catch(err => {
            if (err.message == 'Request failed with status code 404') {
                alert(`data can't edit`)
                window.history.back();
            }
            console.log(err.message);

        })
        this.apiSupplier()
        this.getApiCategories()

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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

    handleSend = () => {
        this.setState({
            tampilModal: false,
            loading: true,
        })
        const fd = new FormData()
        for (let i = 0; i < 5; i++) {
            var gamList = i + 1
            //add
            if (this.state[`gambar${gamList}`].file) {
                fd.append(`image[${i}]`, this.state[`gambar${gamList}`].file)
            }
        }

        fd.append('name', this.state.name)
        fd.append('price', this.state.price)
        fd.append('satuan', this.state.satuan)
        fd.append('weight', this.state.weight)
        fd.append('width', this.state.width)
        fd.append('height', this.state.height)
        fd.append('depth', this.state.depth)
        fd.append('stock', this.state.stock)
        fd.append('category', this.state.category.id)
        fd.append('sub-category', this.state.subCategory.id)
        fd.append('supplier', this.state.supplier.id)
        fd.append('status', this.state.status)
        fd.append('description', this.state.description)

        const url = ENV.BASE_URL_API + API.UPDATE_PRODUCT + `/${this.props.location.id}`
        const config = {
            headers: {
                "Authorization": `Bearer ${this.state.token}`,
            }
        }

        axios.post(url, fd, config)
            .then((res) => {
                this.setState({
                    suksesModal: true,
                    popMessage: ` telah berhasil \n di edit`,
                    popImage: succesSign,
                    loading: false
                })
                setTimeout(() => this.setState({ suksesModal: false }), 2000);
                setTimeout(() => window.location.href = '/produk', 2000);
            })
            .catch((err) => {
                this.setState({
                    suksesModal: true,
                    popMessage: ` telah gagal \n di edit`,
                    popImage: warningSign,
                    loading: false
                })
                setTimeout(() => this.setState({ suksesModal: false }), 2000);
            })
        console.log(this.state);
        // e.preventDefault()
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
            // console.log('resssss suppp', response.data.data.supplier);
            this.setState({ supplierData: response.data.data.supplier })
        }).catch(err => console.log(err))
    }

    listSupplier = () => {
        return this.state.supplierData.map((res, i) => {
            // console.log(res.name);
            return (
                <option key={i} value={res.id}>
                    {res.name}
                </option>
            )
        })

    }

    handleClick = (e) => {
        console.log(e.target.className);
        $(`.${e.target.className} i`).show()
        $(`.${e.target.className} label , .${e.target.className} small`).css('display', 'none')
        $(`.${e.target.className} img`).show()
        $(`.${e.target.className} .figure`).css('border', 'none')
    }

    hapusGambar = (e) => {
        let name = e.target.getAttribute('name')
        if (this.state[`${name}`].id) {
            let fd = new FormData()
            fd.append('name', this.state.name)
            fd.append('price', this.state.price)
            fd.append('satuan', this.state.satuan)
            fd.append('weight', this.state.weight)
            fd.append('width', this.state.width)
            fd.append('height', this.state.height)
            fd.append('depth', this.state.depth)
            fd.append('stock', this.state.stock)
            fd.append('category', this.state.category.id)
            fd.append('sub-category', this.state.subCategory.id)
            fd.append('supplier', this.state.supplier.id)
            fd.append('status', this.state.status)
            fd.append('description', this.state.description)
            fd.append('image-delete[]', this.state[`${name}`].id)
            const url = ENV.BASE_URL_API + API.UPDATE_PRODUCT + `/${this.props.location.id}`
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
            this.setState({ [name]: {} })
        }

        // this.setState({ [name]: {} })
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
                console.log(error);
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
                console.log(error);
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
                // console.log('ini list sub kat nya',list);
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
                                {/* {!this.state.gambar2.preview? */}
                                <i onClick={this.hapusGambar} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar1'></i>
                                {/* : <i onClick={this.hapusGambar} style={{'visibility' : 'hidden'}} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar1'></i>
                               } */}
                                <label className='gambar1' onClick={this.handleClick} htmlFor='gambar1'>+</label>
                                <br />
                                <small>tambah gambar</small>
                                <input
                                    name="image[0]"
                                    type="file"
                                    id='gambar1'
                                    onChange={this.handleChangeImage} />
                                <img src={this.state.gambar1.preview} className='img-nya label-gambar1' />
                            </div>
                        </div>
                        {/* {this.state.gambar1.preview?  */}
                        <div className='col-md-0 mr-3 gambar2'>
                            <div className='figure text-center label-gambar1 '>
                                {/* {!this.state.gambar3.preview? */}
                                <i onClick={this.hapusGambar} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar2'></i>
                                {/* :<i onClick={this.hapusGambar} style={{'visibility' : 'hidden'}} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar2'></i> */}
                                {/* } */}
                                <label className='gambar2' onClick={this.handleClick} htmlFor='gambar2'>+</label>
                                <br />
                                <small>tambah gambar</small>
                                <input
                                    name="image[1]"
                                    type="file"
                                    id='gambar2'
                                    onChange={this.handleChangeImage} />
                                <img src={this.state.gambar2.preview} className='img-nya label-gambar1' />
                            </div>
                        </div>
                        {/* : null } */}

                        {/* {this.state.gambar2.preview?  */}
                        <div className='col-md-0 mr-3 gambar3'>
                            <div className='figure text-center '>
                                {/* {!this.state.gambar4.preview? */}
                                <i onClick={this.hapusGambar} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar3'></i>
                                {/* :<i onClick={this.hapusGambar} style={{'visibility' : 'hidden'}} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar3'></i>
                                } */}
                                <label className='gambar3' onClick={this.handleClick} htmlFor='gambar3'>+</label>
                                <br />
                                <small>tambah gambar</small>
                                <input
                                    name="image[2]"
                                    type="file"
                                    id='gambar3'
                                    onChange={this.handleChangeImage} />
                                <img src={this.state.gambar3.preview} className='img-nya' />
                            </div>
                        </div>
                        {/* : null } */}

                        {/* {this.state.gambar3.preview?  */}
                        <div className='col-md-0 mr-3 gambar4'>
                            <div className='figure text-center '>
                                {/* {!this.state.gambar5.preview? */}
                                <i onClick={this.hapusGambar} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar4'></i>
                                {/* : 
                                <i onClick={this.hapusGambar} style={{'visibility' : 'hidden'}} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar4'></i>
                            } */}
                                <label className='gambar4' onClick={this.handleClick} htmlFor='gambar4'>+</label>
                                <br />
                                <small>tambah gambar</small>
                                <input
                                    type="file"
                                    id='gambar4'
                                    onChange={this.handleChangeImage} />
                                <img src={this.state.gambar4.preview} className='img-nya' />
                            </div>
                        </div>
                        {/* : null } */}

                        {/* {this.state.gambar4.preview?  */}
                        <div className='col-md-0 mr-3 gambar5'>
                            <div className='figure text-center '>
                                <i onClick={this.hapusGambar} className="fas fa-trash-alt hapus-gambar bg-warning p-2 rounded-circle text-white m-2 float-right" name='gambar5'></i>

                                <label className='gambar5' onClick={this.handleClick} htmlFor='gambar5'>+</label>
                                <br />
                                <small>tambah gambar</small>
                                <input
                                    type="file"
                                    id='gambar5'
                                    onChange={this.handleChangeImage} />
                                <img src={this.state.gambar5.preview} className='img-nya' />
                            </div>
                        </div>
                        {/* : null } */}

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
                        edit produk {this.state.verifName}?
                    </p>
                    <button type="button" className="Rectangle-373" onClick={this.handleSend}>YA</button>
                    <button type="button" className="Rectangle-374" onClick={() => this.setState({ tampilModal: false })}>BATAL</button>
                </center>
            </div>
        )
    }

    render() {
        console.log('THISSTATE', this.state);

        console.log(this.state[`gambar${1}`]);
        for (let i = 1; i < 6; i++) {
            if (!this.state[`gambar${i}`].preview) {
                console.log('no');
            } else {
                console.log('yes');
                var gam = `.gambar${i}`
                $(` ${gam} i`).show()
                $(` ${gam} label , ${gam} small`).css('display', 'none')
                $(` ${gam} img`).show()
                $(` ${gam} .figure`).css('border', 'none')
            }


        }
        return (

            <div className='py-5 .t-produk-page'>
                <Modal
                    isOpen={this.state.suksesModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.TempSuccess />
                </Modal>
                <Modal
                    isOpen={this.state.tampilModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.TempVerif />
                </Modal>
                <SyncLoader
                    sizeUnit={"px"}
                    size={10}
                    color={'#cb9656'}
                    loading={this.state.loading}
                />
                <form onSubmit={this.handleSubmit}>


                    <div className='container pb-5'>
                        <h1 className='title-page'><Link to='/produk'><i className="fas fa-chevron-left" ></i></Link>EDIT PRODUK</h1>
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
                                        {!this.state.category ?
                                            <option value='' selected disabled>Pilih Kategori</option>
                                            :
                                            <option value={this.state.category.id} selected disabled>{this.state.category.name}</option>
                                        }
                                        {this.listCategories()}
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Sub Kategori </label>
                                    <select className="custom-select" name='sub-category' onChange={this.handleChange}>
                                        {!this.state.category ?
                                            <option value="" selected disabled>Pilih Sub Kategori</option>
                                            :
                                            <option value={this.state.subCategory.id} selected disabled>{this.state.subCategory.name}</option>
                                        }
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
                                    <input type="text" className="form-control" id="" placeholder="Nama Produk" value={this.state.name} name="name" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Nama Supplier</label>
                                    <select className="form-control custom-select" id="exampleFormControlSelect1" name='supplier' onChange={this.handleChange} required>
                                        {!this.state.supplier ? null :
                                            <option value={this.state.supplier.id} disabled selected>{this.state.supplier.name}</option>
                                        }
                                        {this.listSupplier()}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Harga Produk</label>
                                    <input type="number" className="form-control" id="" placeholder="Harga produk" value={this.state.price} name="price" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Satuan</label>
                                    <input type="text" className="form-control" id="" placeholder="Satuan produk" name="satuan" value={this.state.satuan} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Jumlah Stok</label>
                                    <input type="number" className="form-control" id="" placeholder="Jumlah stok produk" value={this.state.stock} name='stock' onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Deskripsi</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" value={this.state.description} name='description' onChange={this.handleChange} required></textarea>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-md'>

                                <label htmlFor="exampleFormControlTextarea1" style={{ color: "#707070" }}>Dimensi (in centimeters)</label>
                                <div className="form-group in-inline">
                                    <input type="number" className="form-control col-md-3 text-center " id="" placeholder="depth" value={this.state.depth} name="depth" onChange={this.handleChange} /><i className="fas fa-times mx-3"></i>
                                    <input type="number" className="form-control col-md-3 text-center" id="" placeholder="width" value={this.state.width} name="width" onChange={this.handleChange} /><i className="fas fa-times mx-3"></i>
                                    <input type="number" className="form-control col-md-3 text-center" id="" placeholder="height" value={this.state.height} name="height" onChange={this.handleChange} />
                                </div>

                            </div>

                            <div className='col-md'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Berat (Kg)</label>
                                    <input type="number" className="form-control col-md-3 text-center" id="" placeholder="weight" value={this.state.weight} name='weight' onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <center>
                        <button type="submit" className=" btn px-5  text-center btn-add-produk" >Edit Produk</button>

                    </center>
                </form>
            </div>


        )

    }
}

export default EditProduct