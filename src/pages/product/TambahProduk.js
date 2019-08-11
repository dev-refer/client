import React, { Component } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash';

import Modal from 'react-modal'
import { ClipLoader, SyncLoader } from 'react-spinners';
import ENV from '../../environment.js'
import API from '../../apiCaller.js'
import Maps from '../maps/maps.js'

import succesSign from '../../imageAssets/checked-confirmation.svg'
import warningSign from '../../imageAssets/warning-sign.svg'

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

class TambahProduk extends Component {
    state = {

        categories: [],
        times: {},
        image: [],
        Latitude: '',
        Longitude: '',

        //modal
        tampilModal: false,
        suksesModal: false,
        loading: false,


    }

    componentDidMount() {

        this.getApiCategories()
    }


    handleSubmit = (e) => {
        // // console.log(this.state)
        this.setState({
            tampilModal: true,
            popImage: warningSign,
            verifName: this.state.name
        })
        e.preventDefault()
    }

    onChangeImage = (e) => {
        console.log(e.target.files[0]);


        const url = ENV.BASE_URL_API + API.UPLOAD_ICON
        const data = new FormData()
        data.append('image', e.target.files[0])
        this.setState({
            loading: true
        })
        axios.post(url, data)
            .then(({ data }) => {

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
                alert(err.message)
                this.setState({
                    loading: false
                })
            })

    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,

        })
    }



    // handleClick = (e) => {
    //     // console.log(e.target.className);
    //     $(`.${e.target.className} i`).show()
    //     $(`.${e.target.className} label , .${e.target.className} small`).css('display', 'none')
    //     $(`.${e.target.className} img`).show()
    //     $(`.${e.target.className} .figure`).css('border', 'none')
    // }


    //handle category and sub list
    handleTwoFunct = (e) => {
        this.handleCategory(e)
        this.handleChange(e)
    }

    getApiCategories = () => {
        axios.get(ENV.BASE_URL_API + API.GET_CATEGORIES)
            .then((res) => {
                const data = res.data.data.data
                this.setState({ categories: data })
            })
            .catch((error) => {
                // console.log(error);
                alert(error.message)
            })
    }

   

    listCategories = () => {
        let mapList = this.state.categories.map((list, i) => {
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

            const url = ENV.BASE_URL_API + API.CREATE_SPOT
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

            axios.post(url, data)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        suksesModal: true,
                        loading: false
                        
                    })
                   
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

    TempSuccess = () => {
        return (
            <div className="pop-modal">
                <center>
                    <img className='pb-4' src={this.state.popImage} alt="" />
                    <p>
                        {this.state.name}{this.state.popMessage}
                    </p>
                </center>
            </div>
        )
    }

    TempVerif = () => {
        return (
            <div className="pop-modal">
                <center>
                    <img src={this.state.popImage} alt="" />
                    <p>
                        Apakah Anda yakin untuk <br />
                        menambahkan produk {this.state.verifName}?
                    </p>
                    <button type="button" className="Rectangle-373" onClick={this.handleSend}>YA</button>
                    <button type="button" className="Rectangle-374" onClick={() => this.setState({ tampilModal: false })}>BATAL</button>
                </center>
            </div>
        )
    }
    render() {
        // console.log(this.state.categories);
        let lat = Number(this.state.Latitude)
        let long = Number(this.state.Longitude)

        return (
            <div className='py-5'>
                {/* modal */}
                <Modal
                    isOpen={this.state.suksesModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.TempSuccess />
                </Modal>
                <Modal
                    isOpen={this.state.tampilModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                // contentLabel="Example Modal"
                >
                    <this.TempVerif />
                </Modal>
                <SyncLoader
                    sizeUnit={"px"}
                    size={10}
                    color={'#cb9656'}
                    loading={this.state.loading}
                />
                <form onSubmit={this.handleSubmit}>
                    <div className='container-fluid'>
                        <h1 className='title-page'><Link to='/produk'><i className="fas fa-chevron-left" ></i></Link>Add Spot</h1>
                        <br />

                        <div className=''>
                            <div className=''>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Name</label>
                                    <input type="text" className="form-control Rectangle" id="" name="name" onChange={this.handleChange} required />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Address</label>
                                    <input type="text" className="form-control Rectangle" id="" name="address" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Phone</label>
                                    <input type="text" className="form-control Rectangle" id="" name="phone" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea className="form-control Rectangle" id="exampleFormControlTextarea1" rows="4" name='description' onChange={this.handleChange} required></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Operating Time</label> <br />

                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Monday" id="Monday" name="Monday" onChange={this.changeDate} checked={this.state.times.Monday ? true : false} />
                                            <label class="custom-control-label" for="Monday">Monday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Monday" value={this.state.times.Monday ? this.state.times.Monday.Open : '--:--'} /> to <nbsp/><nbsp/>
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Monday" value={this.state.times.Monday ? this.state.times.Monday.Close : '--:--'} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Tuesday" id="Tuesday" name="Tuesday" onChange={this.changeDate} checked={this.state.times.Tuesday ? true : false} />
                                            <label class="custom-control-label" for="Tuesday">Tuesday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Tuesday" value={this.state.times.Tuesday ? this.state.times.Tuesday.Open : '--:--'} /> to <nbsp/><nbsp/>
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Tuesday" value={this.state.times.Tuesday ? this.state.times.Tuesday.Close : '--:--'} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Wednesday" id="Wednesday" name="Wednesday" onChange={this.changeDate} checked={this.state.times.Wednesday ? true : false} />
                                            <label class="custom-control-label" for="Wednesday">Wednesday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Wednesday" value={this.state.times.Wednesday ? this.state.times.Wednesday.Open : '--:--'} /> to <nbsp/><nbsp/>
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Wednesday" value={this.state.times.Wednesday ? this.state.times.Wednesday.Close : '--:--'} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Thursday" id="Thursday" name="Thursday" onChange={this.changeDate} checked={this.state.times.Thursday ? true : false} />
                                            <label class="custom-control-label" for="Thursday">Thursday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Thursday" value={this.state.times.Thursday ? this.state.times.Thursday.Open : '--:--'} /> to <nbsp/><nbsp/>
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Thursday" value={this.state.times.Thursday ? this.state.times.Thursday.Close : '--:--'} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Friday" id="Friday" name="Friday" onChange={this.changeDate} checked={this.state.times.Friday ? true : false} />
                                            <label class="custom-control-label" for="Friday">Friday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Friday" value={this.state.times.Friday ? this.state.times.Friday.Open : '--:--'} /> to <nbsp/><nbsp/>
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Friday" value={this.state.times.Friday ? this.state.times.Friday.Close : '--:--'} />
                                        </div>
                                    </div>

                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Saturday" id="Saturday" name="Saturday" onChange={this.changeDate} checked={this.state.times.Saturday ? true : false} />
                                            <label class="custom-control-label" for="Saturday">Saturday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Saturday" value={this.state.times.Saturday ? this.state.times.Saturday.Open : '--:--'} /> to <nbsp/><nbsp/>
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Saturday" value={this.state.times.Saturday ? this.state.times.Saturday.Close : '--:--'} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <div>
                                            <input type="checkbox" className="custom-control-input Sunday" id="Sunday" name="Sunday" onChange={this.changeDate} checked={this.state.times.Sunday ? true : false} />
                                            <label class="custom-control-label" for="Sunday">Sunday</label>
                                        </div>
                                        <div>
                                            <input onChange={this.changeTimesOpen} type="time" name="Open" className="Sunday" value={this.state.times.Sunday ? this.state.times.Sunday.Open : '--:--'} /> to <nbsp/><nbsp/>
                                            <input onChange={this.changeTimesClose} type="time" name="Close" className="Sunday" value={this.state.times.Sunday ? this.state.times.Sunday.Close : '--:--'} />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <br />

                        <div className="Rectangle">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1" >Category</label>
                                <select className="custom-select" name="category" onChange={this.handleChange}>
                                    <option value='' disabled selected>Pick a category</option>
                                    {this.listCategories()}
                                </select>
                            </div>
                        </div>

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

                            <div className='Rectangle'>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">City</label>
                                    <input type="text" className="form-control" id="" name="city" onChange={this.handleChange} required />
                                </div>
                            </div>

                            {/* <label>Maps</label> <br /> */}
                            {/* <Maps lat={lat} long={long} /> */}
                        </div>

                        <div className="form-group">
                            <label>Add Picture</label> <br />
                            <div className=''>
                                {this.imageInput()}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => { console.log(this.state) }}>check state</button>
                    <br />
                    <center>
                        <button type="submit" className=" btn px-5  text-center btn-add-produk" >Tambah Produk</button>
                    </center>
                </form>
            </div>


        )

    }
}



export default TambahProduk