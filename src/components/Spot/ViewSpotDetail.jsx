import React, { Component } from 'react'

import axios from '../../libs/axios'

class ViewSpot extends Component {

    state = {
        getDataSpot: [],
        spotDetail: []
    }

    componentDidMount() {
        axios({
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            },
            url: '/v1/spots'
        })
            .then((res) => {
                this.setState({
                    getDataSpot: res.data.data
                })
            })
            .catch((err) => {
                console.log(err.response);

            })
        this.getSpotDetail(this.props.match.params.id)
        console.log(this.props);
        this.getOperating()

    }

    test = (e) => {
        console.log(this.props.match.params.id, 'ini params id');
        console.log(e.target.id, 'ini  target id');
        e.preventDefault()
        this.getSpotDetail(e.target.id)
    }

    getSpotDetail = (val) => {
        axios({
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            },
            url: `/v1/spots/?id=${val}`
        })
            .then((res) => {
                this.setState({
                    spotDetail: res.data.data
                })
                console.log(this.state.spotDetail);

            })
            .catch((err) => {
                console.log(err.response);

            })
    }

    getOperating = () => {
        this.state.spotDetail.map(res => {
            console.log(res);

        })
    }

    putSpotdetail = () => {
        var list = this.state.spotDetail.map((item, i) => {
            var { id, name, categoryNames, phone, description, operatingTimes, city, address, latitude, longitude, images } = item
            return (
                <div>
                    <div>
                        <h3>{name}</h3>
                    </div>
                    <br />
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{name}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{
                                    // [0].name
                                    categoryNames.map((res) => {
                                        console.log(res);
                                        return (
                                            <div>
                                                {res.name}
                                            </div>
                                        )
                                    })
                                }</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{description}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{phone}</td>
                            </tr>
                            <tr>
                                <td>Operating Time</td>
                                <td>
                                    <p>
                                        Monday : {operatingTimes[0] ? operatingTimes[0].Monday.Open : null} - {operatingTimes[0] ? operatingTimes[0].Monday.Close : null} <br />
                                    </p>
                                    <p>
                                        Tuesday : {operatingTimes[1] ? operatingTimes[1].Tuesday.Open : null} - {operatingTimes[1] ? operatingTimes[1].Tuesday.Close : null} <br />
                                    </p>
                                    <p>
                                        Wednesday : {operatingTimes[2] ? operatingTimes[2].Wednesday.Open : null} - {operatingTimes[2] ? operatingTimes[2].Wednesday.Close : null} <br />
                                    </p>
                                    <p>
                                        Thursday : {operatingTimes[3] ? operatingTimes[3].Thursday.Open : null} - {operatingTimes[3] ? operatingTimes[3].Thursday.Close : null} <br />
                                    </p>
                                    <p>
                                        Friday : {operatingTimes[4] ? operatingTimes[4].Friday.Open : null} - {operatingTimes[4] ? operatingTimes[4].Friday.Close : null} <br />
                                    </p>
                                    <p>
                                        Saturday : {operatingTimes[5] ? operatingTimes[5].Saturday.Open : null} - {operatingTimes[5] ? operatingTimes[5].Saturday.Close : null} <br />
                                    </p>
                                    <p>
                                        Sunday : {operatingTimes[6] ? operatingTimes[6].Sunday.Open : null} - {operatingTimes[5] ? operatingTimes[6].Sunday.Close : null} <br />
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>{city}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{address}</td>
                            </tr>
                            <tr>
                                <td>Latitude</td>
                                <td>{latitude}</td>
                            </tr>
                            <tr>
                                <td>Longitude</td>
                                <td>{longitude}</td>
                            </tr>
                            <tr>
                                <td>Picture</td>
                                <td>{
                                    <div className="row">
                                        <div className="col-md">
                                            <img className="img" src={images[0] ? images[0].link : null} />
                                        </div>
                                        <div className="col-md">
                                            <img className="img" src={images[1] ? images[1].link : null} />              
                                        </div>
                                        <div className="col-md">
                                            <img className="img" src={images[2] ? images[2].link : null} />
                                        </div>

                                    </div>

                                }</td>
                            </tr>
                        </tbody>

                    </table>
                </div >
            )
        })
        return list
    }

    render() {
        return (
            <div className='container-fluid'>

                {this.putSpotdetail()}

            </div>
        )
    }
}
export default ViewSpot