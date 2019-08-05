import React, { Component } from 'react'
import './utilities.css'
import Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ENV from '../../environment.js'
import API from '../../apiCaller.js'

class AdminManager extends Component {

    state = {
        token: localStorage.getItem('jwt'),
        dataAdminList: [],
        searchAdminList: [],
        selectedAdmin: 0,
        totalPage: '',
        page: '',
        name : ''
    }

    componentDidMount() {
        this.getDataAdminList()
        // // console.log(API.APPROVE_PRODUCT, 'ini env');

    }

    handlePageChange = (pageNumber) => {
        // console.log(`active page is ${pageNumber}`);
        this.setState({ page: pageNumber });
        this.getDataAdminList(pageNumber)
    }
    handleChange = (e)=>{
        this.setState({
            name : e.target.value
        })
    }

    getDataAdminList = (pageNumber) => {
        axios.get(ENV.BASE_URL_API + API.ADMIN_LIST, {
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            },
            params: {
                'perPage': '10',
                'page': pageNumber,
                'active': 1,
                'q' : this.state.name
            }
        })
            .then((res) => {
                this.setState({
                    dataAdminList: res.data.data.admin,
                    searchAdminList: res.data.data.admin,
                    activePage: res.data.data.activePage,
                    totalPage: res.data.data.totalPage
                })
                console.log(res.data.data.admin)
                // console.log(res.data.data.activePage)
                // console.log(res.data.data.totalPage)
            })
            .catch((err) => {
                // console.log(err)
                localStorage.clear()
                window.location.reload()
            })
    }

    activateAdmin = (e) => {
        axios.post(ENV.BASE_URL_API + API.ACTIVATE_USER, { user: e.target.value }, {
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            },
        })
            .then((res) => {
                alert('Admin activated')
                this.getDataAdminList(this.state.page)
            })
            .catch((err) => {
                throw err;
            });

        e.preventDefault()
    }

    deactivateAdmin = (e) => {
        axios.post(ENV.BASE_URL_API + API.DEACTIVATE_USER, { user: e.target.value }, {
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            },

        })
            .then((res) => {
                alert('Admin deactivated')
                this.getDataAdminList(this.state.page)
            })
            .catch((err) => {
                throw err;
            });
        e.preventDefault()
    }

    onBtnSearchClick = () => {
        this.getDataAdminList(this.state.page)
        // console.log(this.state.searchAdminList)
    }

    putDataAdminList = () => {
        var admin = this.state.searchAdminList.map((item, i) => {
            var { name, email, status, id } = item
            return (

                <tr key={i}>
                    <th scope="row">
                        {
                            this.state.page === '' ?
                                i + 1
                                :
                                i + 1 + (this.state.page - 1) * 10
                        }
                    </th>
                    <td>
                        {name}
                    </td>
                    <td>
                        {email}
                    </td>
                    <td>

                        {/* <div className='col'>
                                <i className="fas fa-pencil-alt bg-warning p-2 rounded-circle text-white m-2"></i>
                                <i className="fas fa-trash-alt bg-danger p-2 rounded-circle text-white m-2 "></i>
                                <i className="fas fa-key bg-primary p-2 rounded-circle text-white m-2 "></i>
                            </div> */}
                        {
                            status == '1' ?
                                <button className="verify-btn btn bg-secondary" value={id} type="" onClick={this.deactivateAdmin}>DEACTIVATE</button>
                                : status == '2' ?
                                    <button className="verify-btn btn" value={id} type="" onClick={this.activateAdmin}>ACTIVATE</button> : null

                        }
                    </td>
                </tr>


            )
        })
        return admin;
    }

    render() {


        return (
            <div className='pt-5 pb-3 admin-manager'>
                <div className='container '>
                    <div className="large-font">
                        <p>ADMIN MANAGER</p>
                    </div>
                    <br />
                    <div className='row mb-5'>
                        <div className='col-md'>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <input className="form-control" type="text" ref="searchNama" id="searchNama" placeholder="Cari nama admin..." onChange={this.handleChange} />
                                </div>
                                <div className='col-md-3 text-center'>
                                    <button type="button" className="w-100 text-center search-admin" onClick={() => { this.onBtnSearchClick() }}>Cari</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md text-right'>
                            <Link to='/adminmanager/tambahadmin'>
                                <button type="button" className="btn-g tambah-admin">+ Tambah Admin</button>
                            </Link>
                        </div>

                    </div>
                </div>

                <div className='container table-responsive mt-3'>
                    <table className="table table-borderless table ">
                        <thead>
                            <tr className='border-bottom'>
                                <th scope="col">No</th>
                                <th scope="col">Nama Admin</th>
                                <th scope="col">Email Admin</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.putDataAdminList()}
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
                                totalItemsCount={this.state.totalPage} //total page nya
                                onChange={this.handlePageChange}
                            />
                        </nav>

                    </div>
                </div>

            </div>
        )
    }
}

export default AdminManager
