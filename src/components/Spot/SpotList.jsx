import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'

import '../Spot/spotlist.css'

import swal from 'sweetalert2'
import axios from '../../libs/axios'
import Loading from '../../components/Loading'

class SpotList extends Component {

    state = {
        loading: false,
        getDataSpot: [],
        deleteModal: false,
        totalPage: '',
        page: "",
    }

    componentDidMount() {
        this.getSpotList()
    }

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({ page: pageNumber });
        this.getSpotList(pageNumber)
    }

    getSpotList = () => {

        this.setState({ loading: true })

        axios({
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            },
            url: '/v1/spots'
        })
            .then((res) => {

                this.setState({
                    loading: false,
                    getDataSpot: res.data.data,
                    page: res.data.data.page
                })
                console.log(this.state.getDataSpot);
                console.log(res.data);
                
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
                console.log(err.response);

            })
    }

    listSpot = () => {
        var list = this.state.getDataSpot.map((item, i) => {
            var { name, city } = item
            return (
                <tr key={i}>
                    <th scope="row">
                        {i + 1}
                    </th>
                    <td>
                        {name}
                    </td>
                    <td>
                        {city}
                    </td>
                    <td>
                        <div className='row'>
                            <div className='col'>

                                <Link to={{
                                    pathname: `/dashboard/view-spot`
                                }}>
                                    <i className="far fa-eye bg-light p-2 rounded-circle border text-secondary m-2"></i>
                                </Link>
                                <Link to={{
                                    pathname: `/dashboard/edit-spot`
                                }}>
                                    <i className="fas fa-pencil-alt bg-light p-2 rounded-circle border text-warning m-2"></i>
                                </Link>
                                <i
                                    className="fas fa-trash-alt bg-light p-2 rounded-circle border text-danger m-2" onClick={() => {
                                        this.setState({
                                            verifName: item.name,
                                            verifId: item.id,
                                        })
                                    }}
                                ></i>
                            </div>
                        </div>
                    </td>
                </tr>
            )

        })
        return list
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
              swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }

    render() {
        console.log(this.state);


        return (
            <div>
                <h2>Spot</h2>
                <br />
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-md-6">
                            <form className="form-inline">
                                <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Search" />
                                <button type="submit" className="btn btn-primary mb-2">Search</button>

                            </form>
                        </div>
                        <div className="col-md text-right">
                            <Link to='/dashboard/create-spot'>
                                <button type="button" className="btn btn-secondary mb-2">+ Add Spot</button>
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
                                <th scope="col">Name</th>
                                <th scope="col">City</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.loading ? <Loading /> : this.listSpot()
                            }
                        </tbody>
                    </table>
                </div>
                <div className='float-right'>
                    <nav aria-label="Page navigation example">
                        <Pagination
                            // hideNavigation
                            pageRangeDisplayed={12} //range number yg di tampilkan
                            activePage={this.state.page === "" ? 5 : this.state.page} //class active
                            itemsCountPerPage={5} //satu page di hitung 1 number di kotak pagination
                            totalItemsCount={this.state.totalPage} //total page nyanya 
                            onChange={this.handlePageChange}
                        />
                    </nav>
                </div>
            </div>
        )
    }
}

export default SpotList;