import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import '../Spot/spotlist.css'
import '../Category/category.css'

import swal from 'sweetalert2'
import axios from '../../libs/axios'
import Loading from '../../components/Loading'
import Modal from 'react-modal'

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

const theme = createMuiTheme();

class CategoryList extends Component {

    state = {
        loading: false,
        getDataCategory: [],
        dataCount: 0,
        offset: 0,
        page: "",

        //modal

        confirmModal: false,
        successModal: false,
        deleteModal: false,
    }

    componentDidMount() {
        this.getCategoryList()
    }

    getCategoryList = (e) => {
        const page = e ? e : 1
        this.setState({ loading : true })

        axios({
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            },
            url: `/v1/categories?page=${page}`
        })
            .then(res => {
                
                this.setState({
                    loading : false,
                    getDataCategory: res.data.data,
                    page: res.data.data.page,
                    dataCount: res.data.data_size
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
                    <td>
                        <div className='row'>
                            <div className='col'>
                                <Link to ={`/dashboard/category-detail/${id}`}>
                                <i class="fas fa-list-ul bg-light p-2 rounded-circle border text-secondary m-2"></i>
                                </Link>
                                <Link to={{
                                    pathname: `/dashboard/edit-category/${id}/${name}`
                                }}>
                                    <i className="fas fa-pencil-alt bg-light p-2 rounded-circle border text-warning m-2"></i>
                                </Link>
                                <i
                                    className="fas fa-trash-alt bg-light p-2 rounded-circle border text-danger m-2" onClick={() => {
                                        this.setState({
                                            verifName: item.name,
                                            verifId: item.id,
                                        });
                                        this.deleteModal()
                                    }}
                                ></i>
                                <Link to={{ pathname: `/dashboard/category-bulk-insert/${id}` }}>
                                    <i class="btn btn-outline-light p-1 img-thumbnail border text-secondary m-3"> + Spot </i>
                                </Link>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
        return list
    }

    handleClick(e, offset) {
        this.setState({ offset });
        this.getCategoryList((offset + 10) / 10)
    }

    deleteModal = () => {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.handleDeleteCategory()
            }else if(result.dismiss == swal.DismissReason.cancel){
                swal.fire(
                  'Cancelled',
                )}
        })
    }


    handleDeleteCategory = () => {
        // this.setState({
        //     deleteModal: false,
        //     loading: true
        // })
        axios({
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token')
            },
            url: `/v1/categories/${this.state.verifId}`
        })
        .then((res) => {
            // this.setState({
            //     loading: false,
            //     successModal: true,
            //     popMessage: 'is successfully deleted!',
            //     popImage: successSign
            // })
            swal.fire({
                type: 'success',
                title: 'Delete spot succeed',
                timer: 2500     
            })
            setTimeout(() =>  window.location.reload(), 2500);
           
           
        })
        .catch((err) => {
            // this.setState({
            //     loading: false,
            //     successModal: true,
            //     popMessage: 'Gagal dihapus!',
            //     popImage: warningSign
            // })
            console.log(err.response);
            swal.fire({
                type: 'error',
                title: err.response,
                timer: 2500     
            })
        })
    }

    render() {
        const { dataCount } = this.state

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
                <div>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline />
                        <Pagination
                            limit={10}
                            offset={this.state.offset}
                            total={dataCount ? dataCount : 10}
                            onClick={(e, offset) => this.handleClick(e, offset)}
                        />
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

export default CategoryList;