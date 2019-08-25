import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        offset: 0,
        filter: '',
        categoryId: '',
        showEdit: true,
        showDelete: true,
        showDetail: true,
        showAddSpot: true,
        showSearch: true,
        showTitle: true,
    }

    componentDidMount() {
        this.setState({
            ...this.props
        }, () => {
            this.getSpotList({})
        })
    }

    getSpotList = (data) => {
        const page = data.page ? data.page : 1
        const { categoryId } = this.state
        this.setState({ loading: true })
        axios({
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            },
            url: `/v1/spots?page=${page}&categoryId=${categoryId}`
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

    listSpot = (edit, detail, showDelete) => {
        var list = this.state.getDataSpot.map((item, i) => {
            var { name, city, number, id } = item
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
                                {detail ?<Link to={{
                                    pathname: `/dashboard/view-spot/${id}`,
                                    state:{ id: id, data: this.state.getDataSpot }
                                }}>
                                    <i className="far fa-eye bg-light p-2 rounded-circle border text-secondary m-2"></i>
                                </Link> : null }
                               {edit ? <Link to={{
                                    pathname: `/dashboard/edit-spot/${id}`,
                                    state:{ id: id, data: this.state.getDataSpot }
                                }}>
                                    <i className="fas fa-pencil-alt bg-light p-2 rounded-circle border text-warning m-2"></i>
                                </Link> : null}
                                {showDelete ? <i
                                    className="fas fa-trash-alt bg-light p-2 rounded-circle border text-danger m-2" onClick={() => {

                                        this.setState({
                                            verifName: item.name,
                                            verifId: item.id,                 
                                        });
                                        this.deleteModal()
                                    }}
                                ></i> : null}
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
                this.handleDeleteSpot()
            }else if(result.dismiss == swal.DismissReason.cancel){
                swal.fire(
                  'Cancelled',
                )}
        })
    }

    handleDeleteSpot = () => {
        axios({
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token')
            },
            url: `/v1/spots/${this.state.verifId}`
        })
        .then((res) => {
            console.log(res);       
            swal.fire({
                type: 'success',
                title: 'Delete spot succeed',
                timer: 2500     
            })
            setTimeout(() => window.location.reload(), 2500)
        })
        .catch((err) => {
            console.log(err.response);
            swal.fire({
                type: 'error',
                title: err.response,
                timer: 2500     
            })           
        })
    }

    handleFilter = (e)=>{
        this.setState({
            filter : e.target.value
        })
        if (e.target.value.length === 0) {
            // console.log('nulll');
            this.getSpotList()
        }
    }

    handleClick(e, offset) {
        this.setState({ offset });
        let page = (offset + 10) / 10
        this.getSpotList({
            page
        })
    }

    render() {
        const { dataCount, showAddSpot, showDelete, showDetail, showEdit, showSearch, showTitle } = this.state
        return (
            <div>
                {showTitle ? < h2 > Spot</h2> : null}
                <br />
                <div className="container-fluid p-0">
                    <div className="row">                            
                        {showSearch ? <div className="col-md-6">
                        <form className="form-inline" onSubmit={this.handleSubmitFil}>
                                <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Search" />
                                <button type="submit" className="btn btn-primary mb-2">Search</button>

                            </form>
                        </div> : null}
                        <div className="col-md text-right">
                            {showAddSpot ? <Link to='/dashboard/create-spot'>
                                <button type="button" className="btn btn-secondary mb-2">+ Add Spot</button>
                            </Link> : null}
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
                                this.state.loading ? <Loading /> : this.listSpot(showEdit, showDetail, showDelete)
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