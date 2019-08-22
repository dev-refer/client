import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Pagination from 'react-js-pagination'
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import '../Spot/spotlist.css'

import swal from 'sweetalert2'
import axios from '../../libs/axios'
import Loading from '../../components/Loading'

const theme = createMuiTheme();
class SpotList extends Component {

    state = {
        loading: false,
        getDataSpot: [],
        deleteModal: false,
        page: "",
        dataCount: 0,
        offset: 0
    }

    componentDidMount() {
        this.getSpotList()
    }

    getSpotList = (e) => {
        const page = e ? e : 1
        this.setState({ loading: true })
        axios({
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            },
            url: `/v1/spots?page=${page}`
        })
            .then((res) => {
                this.setState({
                    loading: false,
                    getDataSpot: res.data.data,
                    page: res.data.data.page,
                    dataCount: res.data.data_size
                })
            })
            .catch(err => {
                this.setState({ loading: false })
                swal.fire({
                    type: 'error',
                    title: 'error get spot data',
                    text: err.message
                })
            })
    }

    listSpot = () => {
        var list = this.state.getDataSpot.map((item, i) => {
            var { name, city, number } = item
            return (
                <tr key={i}>
                    <th scope="row">
                        {number}
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
                                    pathname: `/dashboard/edit-spot/${id}/${name}`
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

    handleClick(e, offset) {
        this.setState({ offset });
        this.getSpotList((offset + 10) / 10)
    }

    render() {
        const { dataCount } = this.state
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

export default SpotList;