import React, { Component } from 'react'
import './category.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ENV from '../../environment'
import API from '../../apiCaller'
// import config from '../../config.js'

import Modal from 'react-modal'
import { SyncLoader } from 'react-spinners';

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

class Category extends Component {
    state = {
        dataCategories: [],
        dataSubCategories: [],
        idCategory: '32',
        // categoryFilter: '',
        // subCategoryFilter: '',
        searchCategories: [],
        token: localStorage.getItem('jwt'),

        //modal
        confirmModal: false,
        successModal: false,
        deleteModal: false,
        loading: false
    }

    componentDidMount() {
        this.getDataCategories()
        this.getDataSubCategories()
    }

    onBtnSearchClick = () => {
        this.getDataCategories(this.state.category)
    }


    getDataCategories = () => {
        
        this.setState({ loading: true })

        axios.get(ENV.BASE_URL_API + API.GET_CATEGORIES)
            .then(res => {
                console.log(res.data.data);
                
                this.setState({
                    loading: false,
                    dataCategories: res.data.data.data,
                    searchCategories: res.data.data.data       

                })
                
                console.log(this.state.searchCategories);


            })
            .catch(err => console.log(err))
    }

    getDataSubCategories = (e) => {
        axios.get('https://devmind3.net/api/sub-categories', { params: { category: this.state.idCategory } })
            .then(res => {
                // console.log(res.data.data['sub-category'][0].name, "ada sub");
            })
            .catch(err =>
                console.log(err))
    }

    handleDeleteCategory = () => {
        this.setState({
            deleteModal: false,
            loading: true
        })
        // console.log(e.target.id);
        axios.delete(ENV.BASE_URL_API + API.DELETE_CATEGORY + `${this.state.verifId}`, 
        // {
        //     headers: {
        //         "Authorization": `Bearer ${this.state.token}`
        //     }
        // }
        )
            .then((res) => {
                this.setState({
                    loading: false,
                    successModal: true,
                    popMessage: 'is successfully deleted!',
                    popImage: succesSign
                })
                setTimeout(() => this.setState({ successModal: false }), 2500);
                // this.getDataCategories(this.state)
                window.location.reload()
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    successModal: true,
                    popMessage: 'Gagal dihapus!',
                    popImage: warningSign
                })
                setTimeout(() => this.setState({ successModal: false }), 2500);
            })
    }

    TempVerifDelete = () => {
        return (
            <div className="pop-modal">
                <center>
                    <img src={this.state.popImage} alt="" />
                    <p>
                        Are you sure want to <br />
                        delete "{this.state.verifName}" category?
                    </p>
                    <button type="button" className="Rectangle-373" onClick={this.handleDeleteCategory}>YA</button>
                    <button type="button" className="Rectangle-374" onClick={() => this.setState({ deleteModal: false })}>BATAL</button>
                </center>
            </div>
        )
    }

    TempSuccess = (e) => {
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

    putCategoryList = () => {
        var mapList = this.state.searchCategories.map((item, i) => {
            var { name, id, icon } = item
            return (

                <tr>
                    <th scope="row">
                        {i + 1}
                    </th>
                    <td>
                        <img src={icon} className="icon"/>
                    </td>
                    <td>
                        {name}
                    </td>
                    {/* <td>
                        {()=>{

                            return axios.get('https://devmind3.net/api/sub-categories', {params: {category : id}})
                            .then(res=>{
                                // console.log(res.data.data['sub-category'][0].name, "ada sub");
                                return (
                                    // <div>{res.data.data['sub-category'][0].name}</div>
                                    <div>123545tes</div>
                                )
                            })
                            .catch(err=>
                                console.log(err))
                        }
                        }
                    </td> */}
                    <td>
                        <div className='row'>
                            <div className='col'>
                                <i class="fas fa-list-ul bg-light p-2 rounded-circle text-secondary m-2"></i>
                                <Link to={{
                                    pathname: '/kategori/editkategori',
                                    id: id
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
                                <i class="btn btn-outline-light p-1 img-thumbnail text-secondary m-3"> + Spot </i>

                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
        return mapList
    }

    render() {
        return (
            <div className='py-5 category'>
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

                {/* loading */}
                <SyncLoader
                    sizeUnit={"px"}
                    size={10}
                    color={'#cb9656'}
                    loading={this.state.loading}
                />


                <div className='py-5 category'>
                    <div className='container pb-5'>
                        <h1 className="kategori-h1">CATEGORIES</h1>
                        <br />
                        <div className='kategori-page row'>
                            <div className='col-md-5'>
                                <input className="form-control carikat" type="text" placeholder="Search.." />
                            </div>
                            <div className='col-md-2' style={{ paddingLeft: "35px", marginLeft: "40px" }}>
                                <button className="search-button category" type="button" onClick={() => { this.onBtnSearchClick() }}>Search</button>
                            </div>
                            <div className='col-md-3' style={{ paddingLeft: "188px" }}>
                                <Link to='/kategori/tambahkategori'>
                                    <button className="add-category-button" type="button">+ Add Category</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='container table-responsive kat'>
                        <table className="parent-tabkat table table-borderless">
                            <thead className="thead-category">
                                <tr className='border-bottom'>
                                    <th scope="col">No</th>
                                    <th scope="col">Icon</th>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.putCategoryList()}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
    }
}

export default Category