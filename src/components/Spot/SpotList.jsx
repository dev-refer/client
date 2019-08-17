import React, { Component } from 'react'
// import Container from '@material-ui/core/Container'

import '../Spot/spotlist.css'

import swal from 'sweetalert2'
import axios from '../../libs/axios'
import Loading from '../../components/Loading'

class SpotList extends Component {

    state = {
        loading: false
    }

    onSubmitCategory = () => {


        axios({
            method: 'POST',
            data: {
                // icon,
                // name
            },
            headers: {
                token: localStorage.getItem('token')
            },
            url: '/v1/categories'
        })
            .then(data => {
                // setLoading(false)
                swal.fire({
                    type: 'success',
                    text: 'success create category',
                    timer: 1500
                })
            })
            .catch(err => {
                // setLoading(false)
                swal.fire({
                    type: 'error',
                    title: 'error while create category',
                    text: err.message
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Spot</h1>
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
                            <button type="submit" class="btn btn-secondary mb-2">+ Add Spot</button>
                        </div>
                    </div>

                </div>
                <br />
                <div className="tab-border">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default SpotList;