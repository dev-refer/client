import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert2'
import axios from '../../libs/axios'
import _ from 'lodash';
import Loading from '../../components/Loading'
import Maps from '../Maps/Maps'


class CreateSpot extends Component {

    state = {
        loading: false,
        times: {},
        getDataCategory: [],
        Latitude: '',
        Longitude: '',
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
            .then(res => {

                this.setState({
                    loading: false,
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

    listCategories = () => {
        let mapList = this.state.getDataCategory.map((list, i) => {
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

    handleSend = () => {
        const operatingTimes = this.validateTimes()
        if (operatingTimes) {
            // axios post bikin karna udah di validasi

            this.setState({
                loading: true,
                tampilModal: false
            })

            // const url = ENV.BASE_URL_API + API.CREATE_SPOT
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

            axios.post(/*url*/ data)
                .then((res) => {
                    console.log(res);
                    this.setState({

                        popMessage: ` berhasil \n ditambahkan!`,

                        loading: false
                    })
                    setTimeout(() => this.setState({ suksesModal: false }), 2000);
                    setTimeout(() => window.location.href = '/produk', 2000);

                })
                .catch((err) => {
                    console.log(err);

                })
        } else {
            // alest tentang waktu masih ada yang kosong
            alert('masih ada yang kosong')
        }
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



    render() {
        console.log(this.state.getDataCategory);
        let lat = Number(this.state.Latitude)
        let long = Number(this.state.Longitude)

        return (
            <div className='p-1'>

                <form onSubmit={this.handleSubmit}>
                    <div className='container-fluid'>
                        <h2 className='title-page'><Link to='/dashboard/spot'><i className="fas fa-chevron-left" ></i></Link> Add Spot</h2>
                        <br />

                        <div className=''>
                            <div className=''>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Name</label>
                                    <input type="text" className="form-control Rectangle" id="" name="name" onChange={this.handleChange} required />

                                </div>
                                <div className="Rectangle">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1" >Category</label>
                                        <select className="custom-select" name="category" onChange={this.handleChangeCategory}>
                                            <option value='' disabled selected>Pick a category</option>
                                            {this.listCategories()}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea className="form-control Rectangle" id="exampleFormControlTextarea1" rows="4" name='description' onChange={this.handleChange} required></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Phone</label>
                                    <input type="text" className="form-control Rectangle" id="" name="phone" onChange={this.handleChange} required />
                                </div>

                                <div className="form-group">
                                    <label>Operating Time</label> <br />

                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Monday" id="Monday" name="Monday" onChange={this.changeDate} checked={this.state.times.Monday ? true : false} />
                                            <label class="custom-control-label" for="Monday">Monday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Monday" value={this.state.times.Monday ? this.state.times.Monday.Open : '--:--'} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Monday" value={this.state.times.Monday ? this.state.times.Monday.Close : '--:--'} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Tuesday" id="Tuesday" name="Tuesday" onChange={this.changeDate} checked={this.state.times.Tuesday ? true : false} />
                                            <label class="custom-control-label" for="Tuesday">Tuesday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Tuesday" value={this.state.times.Tuesday ? this.state.times.Tuesday.Open : '--:--'} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Tuesday" value={this.state.times.Tuesday ? this.state.times.Tuesday.Close : '--:--'} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Wednesday" id="Wednesday" name="Wednesday" onChange={this.changeDate} checked={this.state.times.Wednesday ? true : false} />
                                            <label class="custom-control-label" for="Wednesday">Wednesday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Wednesday" value={this.state.times.Wednesday ? this.state.times.Wednesday.Open : '--:--'} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Wednesday" value={this.state.times.Wednesday ? this.state.times.Wednesday.Close : '--:--'} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Thursday" id="Thursday" name="Thursday" onChange={this.changeDate} checked={this.state.times.Thursday ? true : false} />
                                            <label class="custom-control-label" for="Thursday">Thursday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Thursday" value={this.state.times.Thursday ? this.state.times.Thursday.Open : '--:--'} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Thursday" value={this.state.times.Thursday ? this.state.times.Thursday.Close : '--:--'} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Friday" id="Friday" name="Friday" onChange={this.changeDate} checked={this.state.times.Friday ? true : false} />
                                            <label class="custom-control-label" for="Friday">Friday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Friday" value={this.state.times.Friday ? this.state.times.Friday.Open : '--:--'} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Friday" value={this.state.times.Friday ? this.state.times.Friday.Close : '--:--'} />
                                        </div>
                                    </div>

                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Saturday" id="Saturday" name="Saturday" onChange={this.changeDate} checked={this.state.times.Saturday ? true : false} />
                                            <label class="custom-control-label" for="Saturday">Saturday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Saturday" value={this.state.times.Saturday ? this.state.times.Saturday.Open : '--:--'} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Saturday" value={this.state.times.Saturday ? this.state.times.Saturday.Close : '--:--'} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Sunday" id="Sunday" name="Sunday" onChange={this.changeDate} checked={this.state.times.Sunday ? true : false} />
                                            <label class="custom-control-label" for="Sunday">Sunday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Sunday" value={this.state.times.Sunday ? this.state.times.Sunday.Open : '--:--'} /> to <nbsp /><nbsp />
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Sunday" value={this.state.times.Sunday ? this.state.times.Sunday.Close : '--:--'} />
                                        </div>
                                    </div>
                                </div>
                                <div className='Rectangle'>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">City</label>
                                        <input type="text" className="form-control" id="" name="city" onChange={this.handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Address</label>
                                    <input type="text" className="form-control Rectangle" id="" name="address" onChange={this.handleChange} required />
                                </div>


                            </div>
                        </div>

                        <br />



                        <div className=''>
                            <div className='Rectangle'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Latitude</label>
                                    <input type="text" className="form-control" id="" name="latitude" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className='Rectangle'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Longitude</label>
                                    <input type="text" className="form-control" id="" name="longitude" onChange={this.handleChange} required />
                                </div>
                            </div>



                            <label>Maps</label> <br />
                            <Maps lat={lat} long={long} />
                        </div>
                        <br/>
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
                        <button type="submit" className=" btn px-5  text-center btn-add-produk" >Add Spot</button>
                    </center>
                </form>
            </div>
        )
    }
}

export default CreateSpot;