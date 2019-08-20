import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../Spot/spotlist.css'
import '../Category/category.css'

import swal from 'sweetalert2'
import axios from '../../libs/axios'
import Loading from '../../components/Loading'
import Modal from 'react-modal'
import successSign from '../../iconAssets/warning-sign.svg'
import warningSign from '../../iconAssets/checked-confirmation.svg'

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

class CategoryList extends Component {

    state = {
        loading: false,
        getDataCategory: [],

        //modal

        confirmModal: false,
        successModal: false,
        deleteModal: false,
    }

    componentDidMount() {
        this.getCategoryList()
    }

    getCategoryList = () => {

        this.setState({ loading : true })

        axios({
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            },
            url: '/v1/categories'
        })
            .then(res => {
                
                this.setState({
                    loading : false,
                    getDataCategory: res.data.data
                })
                console.log(this.state.getDataCategory);
                // swal.fire({
                //     type: 'success',
                //     text: 'success create category',
                //     timer: 1500
                // })
            })
            .catch(err => {
                // setLoading(false)
                swal.fire({
                    type: 'error',
                    title: 'error get spot data',
                    text: err.message
                })
            })
    }

    putCategoryList = () => {
        var list = this.state.getDataCategory.map((item, i) => {
            var { id, name, icon } = item
            return (
                <tr>
                    <th scope="row">
                        {i + 1}
                    </th>
                    <td>
                        <img src={icon} className="icon" />
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
                                    pathname: `/dashboard/edit-category/${id}/${name}`
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
        return list
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
                    <button type="button" className="Rectangle-373" onClick={this.handleDeleteCategory}>Yes</button>
                    <button type="button" className="Rectangle-374" onClick={() => this.setState({ deleteModal: false })}>Cancel</button>
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

    handleDeleteCategory = () => {
        this.setState({
            deleteModal: false,
            loading: true
        })
        axios({
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token')
            },
            url: '/v1/categories/' + `${this.state.verifId}`
        })
        .then((res) => {
            this.setState({
                loading: false,
                successModal: true,
                popMessage: 'is successfully deleted!',
                popImage: successSign
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

    render() {


        return (
            <div>
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
                <h2>Category</h2>
                <br />
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-md-6">
                            <form className="form-inline">
                                <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Search" />
                                <button type="submit" class="btn btn-primary mb-2">Search</button>

                            </form>
                        </div>
                        <div className="col-md text-right">
                            <Link to='/dashboard/create-category'>
                                <button type="button" class="btn btn-secondary mb-2">+ Add Category</button>
                            </Link>
                        </div>
                    </div>

                </div>
                <br />
                <div className="tab-border">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Icon</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.loading ? <Loading/> : this.putCategoryList()
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CategoryList;