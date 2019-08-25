import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert2'
import axios from '../../libs/axios'
import _ from 'lodash';
import Loading from '../../components/Loading'
import Maps from '../Maps/Maps'


class EditSpot extends Component {

    state = {
        loading: false,
        times: {},
        getCategory: [],
        latitude: '',
        longitude: '',
        image: [],
        name: '',
        description: '',
        operatingTimes: [],
        categoryNames: []
    }

    componentDidMount() {
        this.getCategoryList()

        this.getSpotDetail(this.props.match.params.name)
        console.log(this.props);

    }


    changeIcon = (e) => {
        // setLoading(true)
        let data = new FormData()
        data.append('image', e.target.files[0])
        axios({
            method: 'POST',
            url: '/image/single',
            data
        })
            .then(data => {
                // setLoading(false)
                // setIcon(data.data.link)
                this.setState({
                    image: [...this.state.image, data.data.link],
                    // previewIcon: e.target.files[0],
                    loading: false
                }, () => {
                    console.log(this.state.image);
                    // console.log(this.state.previewIcon);

                })
            })
            .catch(err => {
                // setLoading(false)
                swal.fire({
                    type: 'error',
                    text: 'Error while upload Icon'
                })
            })
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,

        })

    }

    handleChangeCategory = (e) => {
        console.log(e.target.value);

        let a = parseInt(e.target.value)
        console.log(typeof a);

        this.setState({
            [e.target.name]: [a]
        })
    }

    getCategoryList = () => {

        // this.setState({ loading: true })

        axios({
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            },
            url: '/v1/categories'
        })
            .then((res) => {

                this.setState({
                    loading: false,
                    getCategory: res.data.data

                })
                console.log(res.data.data);



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

    listCategories = () => {
        let mapList = this.state.getCategory.map((list, i) => {
            return (
                <option key={i} value={list.id}>{list.name}</option>
            )
        })
        return mapList
    }

    changeTimesOpen = (e) => {
        let obj = e.target.className
        const result = _.get(this.state.times, obj, "")
        let Close = ""
        if (result) {
            Close = _.get(result, 'Close', "")
        }
        this.setState({
            times: {
                ...this.state.times,
                [e.target.className]: {
                    Open: e.target.value,
                    Close
                }
            }
        })
    }

    changeTimesClose = (e) => {
        let obj = e.target.className
        const result = _.get(this.state.times, obj, "")
        let Open = ""
        if (result) {
            Open = _.get(result, 'Open', "")
        }
        this.setState({
            times: {
                ...this.state.times,
                [e.target.className]: {
                    Close: e.target.value,
                    Open
                }
            }
        })
    }

    changeDate = (e) => {
        if (e.target.checked) {
            this.setState({
                times: {
                    ...this.state.times,
                    [e.target.name]: { Open: "", Close: "" }
                }
            })
        } else if (!e.target.checked) {
            this.setState({
                times: {
                    ...this.state.times,
                    [e.target.name]: ""
                }
            })
        }
    }

    validateTimes = () => {
        let arr = Object.entries(this.state.times)
        let data = []
        if (arr.length === 0) {
            return false
        }
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i][1] !== 'string') {
                if (!arr[i][1].Open || !arr[i][1].Close) {
                    return false
                }
                data.push(arr[i])
            }
        }
        return data
    }

    onChangeImage = (e) => {
        console.log(e.target.files[0]);

        const data = new FormData()
        data.append('image', e.target.files[0])
        this.setState({
            loading: true
        })
        axios({
            method: 'POST',
            headers: {
                token: localStorage.getItem('token')
            },
            url: '/image/single',
            data
        })
            .then(({ data }) => {

                this.setState({
                    image: [...this.state.image, data.link],
                    // previewIcon: e.target.files[0],
                    loading: false
                }, () => {
                    console.log(this.state.image);


                    // console.log(this.state.previewIcon);

                })
            })
            .catch(err => {
                alert(err.message)
                this.setState({
                    loading: false
                })
            })
    }

    handleSend = (e) => {
        const operatingTimes = this.validateTimes()
        if (operatingTimes) {
            // axios post bikin karna udah di validasi


            const data = {
                name: this.state.name,
                address: this.state.address,
                phone: this.state.phone,
                description: this.state.description,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                city: this.state.city,
                categoryId: this.state.category,
                operatingTimes,
                image: this.state.image
            }
            swal.fire({
                title: 'Are you sure want to add spot?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            })
                .then((result) => {

                    if (result.value) {
                        axios({
                            method: 'POST',
                            headers: {
                                token: localStorage.getItem('token')
                            },
                            url: '/v1/spots',
                            data
                        })
                            .then((res) => {
                                console.log(res);
                                console.log(e.value);

                                swal.fire(
                                    'Added!',
                                    'New spot has been added',
                                    'success'
                                )
                                setTimeout(() => window.location.href = '/dashboard/spot', 2500);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    } else if (result.dismiss == swal.DismissReason.cancel) {
                        swal.fire(
                            'Cancelled',
                        )
                    }
                })
        }
        else {
            // alest tentang waktu masih ada yang kosong
            alert('masih ada yang kosong')
        }
        e.preventDefault()
    }

    imageInput = () => {
        return (
            <div>
                <div>
                    <input name="image" type="file" id='gambar1' onChange={this.onChangeImage} />
                </div>
                <div>
                    <input name="image" type="file" id='gambar1' onChange={this.onChangeImage} />
                </div>
                <div>
                    <input name="image" type="file" id='gambar1' onChange={this.onChangeImage} />
                </div>
            </div>

        )
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
                res.data.data.map(res => {
                    this.setState({
                        // spotDetail: res.data.data,
                        name: res.name,
                        categoryNames: res.categoryNames,
                        description: res.description,
                        phone: res.phone,
                        operatingTimes: res.operatingTimes,
                        city: res.city,
                        address: res.address,
                        latitude: res.latitude,
                        longitude: res.longitude
                    })
                })
            })
            .catch((err) => {
                console.log(err.response);

            })
    }


    render() {
        console.log(this.state.categoryNames);

        console.log(this.state);
        let lat = Number(this.state.Latitude)
        let long = Number(this.state.Longitude)

        return (
            <div className='p-1'>

                <form onSubmit={this.handleSend}>
                    <div className='container-fluid'>
                        <h2 className='title-page'><Link to='/dashboard/spot'><i className="fas fa-chevron-left" ></i></Link> Edit Spot</h2>
                        <br />

                        <div className=''>
                            <div className=''>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Name</label>
                                    <input type="text" className="form-control Rectangle" id="" value={this.state.name} name="name" onChange={this.handleChange} required />

                                </div>
                                <div className="Rectangle">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1" >Category</label>
                                        <select className="custom-select" name="category" onChange={this.handleChangeCategory}>
                                            {/* {this.state.categoryNames[0].name} */}
                                            {
                                                this.state.categoryNames.map(res => {
                                                    console.log(res.name, 'hasil');
                                                    return <option>{res.name}</option>

                                                    // res.category
                                                })
                                            }
                                            {this.listCategories()}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea className="form-control Rectangle" id="exampleFormControlTextarea1" rows="4" value={this.state.description} name='description' onChange={this.handleChange} required></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Phone</label>
                                    <input type="text" className="form-control Rectangle" id="" name="phone" value={this.state.phone} onChange={this.handleChange} required />
                                </div>

                                <div className="form-group">
                                    <label>Operating Time</label> <br />

                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Monday" id="Monday" name="Monday" onChange={this.changeDate} checked={this.state.times.Monday ? true : false} />
                                            <label className="custom-control-label" for="Monday">Monday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Monday" value={this.state.operatingTimes[0] ? this.state.operatingTimes[0].Monday.Open : null} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Monday" value={this.state.operatingTimes[0] ? this.state.operatingTimes[0].Monday.Close : null} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Tuesday" id="Tuesday" name="Tuesday" onChange={this.changeDate} checked={this.state.times.Tuesday ? true : false} />
                                            <label className="custom-control-label" for="Tuesday">Tuesday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Tuesday" value={this.state.operatingTimes[1] ? this.state.operatingTimes[1].Tuesday.Open : null} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Tuesday" value={this.state.operatingTimes[1] ? this.state.operatingTimes[1].Tuesday.Close : null} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Wednesday" id="Wednesday" name="Wednesday" onChange={this.changeDate} checked={this.state.times.Wednesday ? true : false} />
                                            <label className="custom-control-label" for="Wednesday">Wednesday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Wednesday" value={this.state.operatingTimes[2] ? this.state.operatingTimes[2].Wednesday.Open : null} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Wednesday" value={this.state.operatingTimes[2] ? this.state.operatingTimes[2].Wednesday.Close : null} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Thursday" id="Thursday" name="Thursday" onChange={this.changeDate} checked={this.state.times.Thursday ? true : false} />
                                            <label className="custom-control-label" for="Thursday">Thursday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Thursday" value={this.state.operatingTimes[3] ? this.state.operatingTimes[3].Thursday.Open : null} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Thursday" value={this.state.operatingTimes[3] ? this.state.operatingTimes[3].Thursday.Close : null} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Friday" id="Friday" name="Friday" onChange={this.changeDate} checked={this.state.times.Friday ? true : false} />
                                            <label className="custom-control-label" for="Friday">Friday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Friday" value={this.state.operatingTimes[4] ? this.state.operatingTimes[4].Friday.Open : null} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Friday" value={this.state.operatingTimes[4] ? this.state.operatingTimes[4].Friday.Close : null} />
                                        </div>
                                    </div>

                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Saturday" id="Saturday" name="Saturday" onChange={this.changeDate} checked={this.state.times.Saturday ? true : false} />
                                            <label className="custom-control-label" for="Saturday">Saturday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Saturday" value={this.state.operatingTimes[5] ? this.state.operatingTimes[5].Saturday.Open : null} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Saturday" value={this.state.operatingTimes[5] ? this.state.operatingTimes[5].Saturday.Close : null} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Sunday" id="Sunday" name="Sunday" onChange={this.changeDate} checked={this.state.times.Sunday ? true : false} />
                                            <label className="custom-control-label" for="Sunday">Sunday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Sunday" value={this.state.operatingTimes[6] ? this.state.operatingTimes[6].Sunday.Open : null} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Sunday" value={this.state.operatingTimes[6] ? this.state.operatingTimes[6].Sunday.Close : null} />
                                        </div>
                                    </div>
                                </div>
                                <div className='Rectangle'>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">City</label>
                                        <input type="text" className="form-control" id="" name="city" value={this.state.city} onChange={this.handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Address</label>
                                    <input type="text" className="form-control Rectangle" id="" name="address" value={this.state.address} onChange={this.handleChange} required />
                                </div>


                            </div>
                        </div>

                        <br />



                        <div className=''>
                            <div className='Rectangle'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Latitude</label>
                                    <input type="text" className="form-control" id="" name="latitude" value={this.state.latitude} onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className='Rectangle'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Longitude</label>
                                    <input type="text" className="form-control" id="" name="longitude" value={this.state.longitude} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <label>Maps</label> <br />
                            <Maps lat={lat} long={long} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Add Picture</label> <br />
                            <div className=''>
                                {this.imageInput()}
                            </div>
                        </div>
                    </div>
                    {/* <button onClick={() => { console.log(this.state) }}>check state</button> */}
                    <br />
                    <center>
                        <button type="submit" className=" btn px-5  btn-primary text-center btn-add-produk" >Add Spot</button>
                    </center>
                </form>
            </div>
        )
    }
}

export default EditSpot;