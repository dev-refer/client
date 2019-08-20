import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../libs/axios'
import swal from 'sweetalert2';
import Button from '@material-ui/core/Button';

// import Modal from 'react-modal'
// import Loading from '../../components/Loading'
// import successSign from '../../iconAssets/warning-sign.svg'
// import warningSign from '../../iconAssets/checked-confirmation.svg'

import '../Category/category.css'

class EditCategory extends Component {

    state={
        loading: false,
        icon: '',
        name: '',
        showModal: false,

    }

    componentDidMount() {
        this.setState({ name: this.props.match.params.name })
        console.log(this.props);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    popupModal = (e) => {
        this.setState({
            showModal: true
        })
        e.preventDefault()
    }

    changeIcon = (e) => {
        
        this.setState({ loading: true })

        let data = new FormData()
        data.append('image', e.target.files[0])
        axios({
            method: 'POST',
            url: '/image/single',
            data
        })
            .then(data => {
                this.setState({
                    loading: false,
                    icon: data.data.link
                })
               
            })
            .catch(err => {
               this.setState({
                   loading: false
               })
                swal.fire({
                    type: 'error',
                    text: 'Error while upload Icon'
                })
            })
    }

    handleSubmit = (e) => {
        console.log();
        
        this.setState({
            tampilModal: false
        })

        const fd = {
            name: this.state.name,
            icon: this.state.icon
        }

        // const url = ENV.BASE_URL_API + API.EDIT_CATEGORY + `/${this.props.match.params.id}`
        // const config = {
        //     headers: {
        //         "Authorization": `Bearer ${this.state.token}`,
        //     }
        // }

        axios({
            method: 'PUT',
            url: '/v1/categories'+`/${this.props.match.params.id}`,
            fd
        })
            .then((res) => {
                this.setState({
                    suksesModal: true
                })
                setTimeout(() => this.setState({ suksesModal: false }), 2000);
                setTimeout(() => window.location.href = '/dashboard/category', 2000);
                // window.location.reload();
                console.log(res.data);
            })
            .catch((err) => {
                console.log('silahkan edit!', err.message);
                alert('silahkan edit!', err.message);
            })
        console.log(this.state);
        e.preventDefault()
    }

    render() {
        return(
            <div>
                <h2><Link to='/dashboard/category'><i className="fas fa-chevron-left" ></i></Link>   Edit Category</h2>
                <br/>
                <br/>
                <form onSubmit={this.popupModal}>
                    <div className="container">
                        <div className="adjust2">
                            <form>
                                <div className="adjust3">
                                    <p className="category-name">Category Name</p>
                                    <input type="text" className="form-control Rectangle-1335" id="exampleFormControlInput1" value={this.state.name} name='name' onChange={this.handleChange} required />
                                </div>
                                <br/>
                                <div>
                                    <p className="category-name">Category Icon</p>
                                    <input type="file" name='image' id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={this.onChangeIcon}/>
                                </div>
    
                            </form>
                        </div>
                            {/* <div className="text-center">
                                <p>
                                    <button type="submit" className="add-button cat" >Tambah</button>
                                </p>
                            </div> */}
                            <br/>
                            <br/>
                              <center>
                                <button type="submit" className=" btn px-5  btn-primary text-center btn-add-produk" >Edit Category</button>
                            </center>
                        </div>
                </form>
            </div>
        )
    }
}
export default EditCategory