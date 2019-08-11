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
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


export default class Product extends Component {
    state = {
        // perPage : '',
        // rangeDisplay: '5',
        totalPage: '',
        page: '',

        getDataSpot: [],
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
        successModal: false,
        deleteModal: false,
        //loading
        loading: false,
    };

    componentDidMount() {
        this.getApiProduct()
        // this.getApiCategories()
        // console.log(this.state.token);

    }




    getApiProduct = (pageNumber) => {

        this.setState({ loading: true })

        const url = ENV.BASE_URL_API + API.GET_SPOT

        axios.get(url)
            .then(res => {
                console.log(res.data.data.data[0].address, 'res api');


                this.setState({

                    loading: false,
                    getDataSpot: res.data.data.data
                    // activePage: response.data.data.activePage,
                    // perPage: response.data.data.perPage,
                    // totalPage: response.data.data.totalPage,
                })
                console.log(this.state.getDataSpot);

                // // console.log('DATA PRODUCT setet',this.state);
                // // console.log('DATA PRODUCT api',response.data.data);
            }).catch((error) => {
                console.log(error);
                // alert(error.message)
                localStorage.clear()
                // window.location.reload()
            })

    }

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
                loading: false,
                successModal: true,
                popMessage: 'telah berhasil dihapus',
                popImage: succesSign
            })
            setTimeout(() => this.setState({ successModal: false }), 1500);
            // alert(res.data.meta.message)
            this.getApiProduct(this.state.page)
        }).catch((err) => {
            this.setState({
                loading: false,
                successModal: true,
                popMessage: 'telah gagal dihapus',
                popImage: warningSign
            })
            setTimeout(() => this.setState({ successModal: false }), 2000);
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
                    loading: false,
                    successModal: true,
                    popMessage: 'telah berhasil terverifikasi',
                    popImage: succesSign
                })
                setTimeout(() => this.setState({ successModal: false }), 1500);
                console.log(response)
                this.getApiProduct(this.state.page)
                // console.log(this.state.page)
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    successModal: true,
                    popMessage: 'telah gagal verifikasi',
                    popImage: warningSign
                })
                setTimeout(() => this.setState({ successModal: false }), 2000);
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

    listSpot = () => {
        console.log();

        // return this.state.getDataSpot.map((res) => {
        //     return console.log(res.address);

        // })

        var mapList = this.state.getDataSpot.map((item, i) => {
            var { name, city, createdAt, updatedAt } = item
            // var imageHandle = item.image.length !== 0 ? `https://${item.image[0].url}` : 'nothing here'

            return (
                <tr key={i}>
                    <th scope="row">
                        {i + 1}
                    </th>
                    {/* <td><img src={imageHandle} className="img-fluid" alt="Responsive" /></td> */}
                    <td>
                        {name}
                    </td>
                    <td>
                        {city}
                    </td>
                    <td>
                        {createdAt}
                    </td>
                    <td>
                        {updatedAt}
                    </td>
                  
                   
                    <td>
                        <div className='row'>
                            <div className='col'>
                                {/* <Link to='/produk/editproduk' params={{ testvalue: "hello kkkkk" }}> */}
                                <Link to={{
                                    pathname: `/kategori/editkategori`
                                }}>
                                    <i className="far fa-eye bg-light p-2 rounded-circle text-secondary m-2"></i>
                                </Link>
                                <Link to={{
                                    pathname: `/kategori/editkategori`
                                }}>
                                    <i className="fas fa-pencil-alt bg-light p-2 rounded-circle text-warning m-2"></i>
                                </Link>
                                <i
                                    className="fas fa-trash-alt bg-light p-2 rounded-circle text-danger m-2" onClick={() => {
                                        this.setState({
                                            verifName: item.name,
                                            verifId: item.id,
                                            deleteModal: true,
                                            popImage: warningSign,
                                        })
                                    }}
                                ></i>
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

    TempSuccess = () => {
        return (
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

    TempVerif = () => {
        return (
            <div className="pop-modal">
                <center>
                    <img src={this.state.popImage} alt="" />
                    <p>
                        Apakah Anda yakin untuk <br />
                        memverifikasi {this.state.verifName}?
                    </p>
                    <button type="button" className="Rectangle-373" onClick={this.approveProduct}>YA</button>
                    <button type="button" className="Rectangle-374" onClick={() => this.setState({ confirModal: false })}>BATAL</button>
                </center>
            </div>
        )
    }

    TempVerifDelete = () => {
        return (
            <div className="pop-modal">
                <center>
                    <img src={this.state.popImage} alt="" />
                    <p>
                        Apakah Anda yakin untuk <br />
                        menghapus {this.state.verifName}?
                    </p>
                    <button type="button" className="Rectangle-373" onClick={this.handleDeleteProduct}>YA</button>
                    <button type="button" className="Rectangle-374" onClick={() => this.setState({ deleteModal: false })}>BATAL</button>
                </center>
            </div>
        )
    }


    render() {
        console.log(this.state.getDataSpot);

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
                    <this.TempSuccess />
                </Modal>

                <Modal
                    isOpen={this.state.deleteModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.TempVerifDelete />
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
                    <h1 className='title-page'>SPOT</h1>
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
                                onClick={this.getApiProduct}>Search</button>
                        </div>
                        <div className='col-md-3 '>
                            <Link to='/produk/tambahproduk'>
                                <button type="button" className="btn-g text-center tambah-produk w-100">+ Add Spot</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='container p-0 '>
                    <table className="table table-borderless">
                        <thead>
                            <tr className='border-bottom'>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">City</th>
                                <th scope="col">Created</th>
                                <th scope="col">Updated</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.listSpot()}
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