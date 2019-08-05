import React, { Component } from 'react'
import './product.css'
import Pagination from "react-js-pagination"
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'
import ReactAutocomplete from 'react-autocomplete'
import ENV from '../../environment.js'
import API from '../../apiCaller.js'
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


export default class Product extends Component {
    state = {
        // perPage : '',
        // rangeDisplay: '5',
        totalPage: '',
        page: '',

        getDataProducts: [],
        categories: [],
        subCategories: [],
        categoryFilter: '',
        subCategoryFilter: '',
        nameFilter: '',
        token: localStorage.getItem('jwt'),
        autoData: [],
        filtering: '',

        //modal
        confirModal: false,
        successModal : false,
        deleteModal : false,
        //loading
        loading : false,
    };

    componentDidMount() {
        // this.getApiProduct()
        // this.getApiCategories()
        // console.log(this.state.token);
        
    }

    handlePageChange = (pageNumber) => {
        // console.log(`active page is ${pageNumber}`);
        this.setState({ page: pageNumber });
        this.getApiProduct(pageNumber)
    }

    // getApiCategories = () => {
    //     axios.get(ENV.BASE_URL_API + API.CATEGORY_LIST).then((response) => {
    //         const data = response.data.data.category
    //         this.setState({
    //             categories: data,
    //         })
    //     })
    //         .catch((error) => {
    //             // console.log(error);
    //             alert(error.message)
    //         }) 
    // }


    // getApiProduct = (pageNumber) => {
    //     return axios.get('https://devmind3.net/api/product/list', {
    //         headers: {
    //             "Authorization": `Bearer ${this.state.token}`
    //         },
    //         params: {
    //             'sub-category': this.state.subCategoryFilter,
    //             'category': this.state.categoryFilter,
    //             'name': this.state.nameFilter,

    //             'per-page': '10',
    //             'page': pageNumber,
    //             'active': 1,
    //         }
    //     },

    //     ).then((response) => {
    //         const data = response.data.data.product
    //         this.setState({
    //             getDataProducts: data,
    //             activePage: response.data.data.activePage,
    //             // perPage: response.data.data.perPage,
    //             totalPage: response.data.data.totalPage,
    //         })
    //         // console.log('DATA PRODUCT setet',this.state);
    //         // console.log('DATA PRODUCT api',response.data.data);
    //     }).catch((error) => {
    //         // console.log(error);
    //         // alert(error.message)
    //         localStorage.clear()
    //         window.location.reload()
    //     })

    // }

    handleNameFilter = (e) => {
        this.setState({ nameFilter: e.target.value })
    }


    handleCategory = (e) => {
        // console.log('target VAL CAREGORY', e.target.value);
        this.setState({
            categoryFilter: e.target.value
        })
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

    handleSubCategory = (e) => {
        // console.log('target value subcategory', e.target.value);
        this.setState({ subCategoryFilter: e.target.value })
        // console.log(this.state.s);
    }


    handleDeleteProduct = () => {
        this.setState({
            deleteModal: false,
            loading: true
        })
        axios.delete(`https://devmind3.net/api/product/${this.state.verifId}`, {
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            }
        }).then((res) => {
            this.setState({
                loading : false,
                successModal : true,
                popMessage : 'telah berhasil dihapus',
                popImage : succesSign
            })
            setTimeout(()=> this.setState({successModal : false}), 1500);
            // alert(res.data.meta.message)
            this.getApiProduct(this.state.page)
        }).catch((err) => {
            this.setState({
                loading : false,
                successModal : true,
                popMessage : 'telah gagal dihapus',
                popImage : warningSign
            })
            setTimeout(()=> this.setState({successModal : false}), 2000);
        })
    }

    approveProduct = (e) => {
        this.setState({
            confirModal: false,
            loading: true
        })
        const URL = `https://devmind3.net/api/product/${this.state.verifId}/approve`;
        return axios(URL, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            },
        })
            .then(response => {
                this.setState({
                    loading:false,
                    successModal : true,
                    popMessage : 'telah berhasil terverifikasi',
                    popImage : succesSign
                })
                setTimeout(()=> this.setState({successModal : false}), 1500);
                console.log(response)
                this.getApiProduct(this.state.page)
                // console.log(this.state.page)
            })
            .catch(error => {
                this.setState({
                    loading : false,
                    successModal : true,
                    popMessage : 'telah gagal verifikasi',
                    popImage : warningSign
                })
                setTimeout(()=> this.setState({successModal : false}), 2000);
            });
        e.preventDefault()
    }

    listCategories = () => {
        let mapList = this
            .state
            .categories
            .map((list, i) => {
                return (
                    <option value={list.id}>{list.name}</option>
                )
            })

        return mapList
    }
    listSubCategories = () => {
        let mapList = this.state.subCategories.map((list, i) => {
            return (
                <option value={list.id}>{list.name}</option>
            )
        })

        return mapList
    }

    listProduct = () => {
        var mapList = this.state.getDataProducts.map((listData, i) => {
            var imageHandle = listData.image.length !== 0 ? `https://${listData.image[0].url}` : 'nothing here'
            return (
                <tr key={i}>
                    <th scope="row">
                        {listData.id}
                    </th>
                    <td><img src={imageHandle} className="img-fluid" alt="Responsive" /></td>
                    <td>
                        {listData.name}
                    </td>
                    <td>
                        {listData.category.name}
                    </td>
                    <td>
                        {listData.subCategory.name}
                    </td>
                    <td>
                        {listData.stock}
                    </td>
                    <td>
                        {listData.satuan}
                    </td>
                    <td>
                        {/* {listData.status} */}
                        {
                            listData.status == '0' ?
                                <button class="w-100 py-2 verify-btn btn"  type="" onClick={()=>{
                                    this.setState({
                                        verifId : listData.id,
                                        confirModal : true,
                                        verifName : listData.name,
                                        popImage : warningSign
                                    })
                                }}>VERIFY</button>
                                : listData.status == '1' ?
                                    <button class="w-100 py-2 verify-btn btn  bg-secondary" disabled type=""  >VERIFIED</button>
                                    : listData.status == '2' ?
                                        <button class="w-100 py-2 verify-btn  bg-danger btn" disabled='true' value={listData.id} type="" >DELETED</button> : null
                        }
                    </td>
                    <td>
                        <div className='row'>
                            <div className='col'>
                                {/* <Link to='/produk/editproduk' params={{ testvalue: "hello kkkkk" }}> */}
                                {listData.status == '2'?
                                    <i className="fas fa-pencil-alt bg-secondary p-2 rounded-circle text-white m-2" ></i>
                                :
                                    <Link to={{
                                        pathname :'/produk/editproduk', 
                                        id : listData.id, 
                                    }}>
                                        <i className="fas fa-pencil-alt bg-warning p-2 rounded-circle text-white m-2"></i>
                                    </Link>
                                }
                                {listData.status == '2'? 
                                <i className="fas fa-trash-alt bg-secondary p-2 rounded-circle text-white m-2">
                                </i>
                                :
                                <i className="fas fa-trash-alt bg-danger p-2 rounded-circle text-white m-2" onClick={()=>{
                                    this.setState({
                                        verifName : listData.name,
                                        verifId : listData.id,
                                        deleteModal : true,
                                        popImage : warningSign
                                    })
                                }}>
                                </i>
                                }
                            </div>
                        </div>
                    </td>
                </tr>
            )

        })
        return mapList
    }

    handleAutoComplete = (e) => {
        this.handleNameFilter(e)
        this.setState({ value: e.target.value })
        $('.komplit div div div').addClass('text-danger')
        if (e.target.value.length > 3) {

            axios.get('https://devmind3.net/api/product/autocomplete', {
                headers: {
                    "Authorization": `Bearer ${this.state.token}`
                },
                params: {
                    q: e.target.value
                }
            })
                .then((response) => {
                    let nameList = response.data.data.product
                    this.setState({ autoData: nameList })
                })
                .catch((error) => {
                    // console.log(error);
                    alert(error.message)
                })
        } else {
            this.setState({ autoData: [] })

        }
    }

    TempSuccess = ()=>{
        return(
            <div className="pop-modal">
                <center>
                <img className='pb-4' src={this.state.popImage} alt="" />
                    <p>
                     {this.state.verifName} {this.state.popMessage}
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
                    memverifikasi {this.state.verifName}?
                    </p>
                <button type="button" className="Rectangle-373" onClick={this.approveProduct}>YA</button>
                <button type="button" className="Rectangle-374" onClick={()=>this.setState({confirModal : false})}>BATAL</button>
                </center>
            </div>
        )
    }

    TempVerifDelete = ()=>{
        return(
            <div className="pop-modal">
                <center>
                <img src={this.state.popImage} alt="" />
                    <p>
                    Apakah Anda yakin untuk <br />
                    menghapus {this.state.verifName}?
                    </p>
                <button type="button" className="Rectangle-373" onClick={this.handleDeleteProduct}>YA</button>
                <button type="button" className="Rectangle-374" onClick={()=>this.setState({deleteModal : false})}>BATAL</button>
                </center>
            </div>
        )
    }
    

    render() {

        return (
            <div className='py-5 produk'>
                {/* modal */}
                <Modal
                isOpen={this.state.successModal}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                // contentLabel="Example Modal"
                >
                <this.TempSuccess/>
                </Modal>

                <Modal
                isOpen={this.state.deleteModal}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                // contentLabel="Example Modal"
                >
                <this.TempVerifDelete/>
                </Modal>

                <Modal
                isOpen={this.state.confirModal}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.TempVerif />
                </Modal>

                {/* loading */}
                <SyncLoader
                sizeUnit={"px"}
                size={10}
                color={'#cb9656'}
                loading={this.state.loading}
                />
                <div className='container  pb-5'>
                    <h1 className='title-page'>PRODUK</h1>
                    <br />
                    <div className='row'>
                        <div className='komplit col-md-3'>
                            <ReactAutocomplete
                                items={this.state.autoData}
                                shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                getItemValue={item => item.name} //disini get valuenya
                                inputProps={{ className: 'form-control w-100', placeholder: 'Search' }}
                                wrapperProps={{ className: 'w-100' }}
                                renderItem={(item, highlighted) =>
                                    <div
                                        key={item.id}
                                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                        className=' pl-2'
                                    >
                                        {item.name}
                                    </div>
                                }
                                value={this.state.value}
                                onChange={this.handleAutoComplete}
                                onSelect={value => this.setState({ value })}
                            />

                        </div>

                        <div className='col-md-2'>
                            <select className="custom-select" onChange={this.handleCategory}>
                                <option value=''>Kategori</option>
                                {this.listCategories()}
                            </select>

                        </div>
                        <div className='col-md-2'>
                            <select className="custom-select" onChange={this.handleSubCategory}>
                                <option selected value="">Sub Kategori</option>
                                {this.listSubCategories()}
                            </select>
                        </div>
                        <div className='col-md-2'>
                            <button
                                type="button"
                                className="w-100 text-center search-produk"
                                onClick={this.getApiProduct}>Cari</button>
                        </div>
                        <div className='col-md-3 '>
                            <Link to='/produk/tambahproduk'>
                                <button type="button" className="btn-g text-center tambah-produk w-100">+ Tambah Produk</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='container p-0 '>
                    <table className="table table-borderless">
                        <thead>
                            <tr className='border-bottom'>
                                <th scope="col">No</th>
                                <th scope="col">Gambar Produk</th>
                                <th scope="col">Nama Produk</th>
                                <th scope="col">Kategori</th>
                                <th scope="col">Sub-Kategori</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Satuan</th>
                                <th scope="col">Verify</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.listProduct()}
                        </tbody>
                    </table>
                    <hr />
                    <div className='float-right'>
                        <nav aria-label="Page navigation example">
                            <Pagination
                                hideNavigation
                                pageRangeDisplayed={5} //range number yg di tampilkan
                                activePage={this.state.page == "" ? 1 : this.state.page} //class active
                                itemsCountPerPage={1} //satu page di hitung 1 number di kotak pagination
                                totalItemsCount={this.state.totalPage} //total page nyanya 
                                onChange={this.handlePageChange}
                            />
                        </nav>


                    </div>
                </div>

            </div>
        )
    }
}