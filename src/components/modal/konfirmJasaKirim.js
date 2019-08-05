// import React, { Component } from 'react';
// import '../../support/css/modal.css'
// import WarningSign from '../../imageAssets/warning-sign.svg'

// class TambahJasaKirim extends Component {
//     state = {
//         modal: false
//     }

//     toggle = () => {
//         this.setState({
//             modal: !this.state.modal
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
//                     Modal Jasa Kirim
//                 </button>
//                 {/* Modal */}
//                 <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                     <div className="modal-dialog" role="document">
//                         <div className="modal-content Banner">
//                             <div className="container-fluid TopModal">
//                                 <img src={WarningSign} alt="" />
//                             </div>
//                             <div className="modal-body BannerText">
//                                 Apakah Anda yakin untuk <br />
//                                 menambahkan jasa pengiriman?
//                             </div>
//                             <div className="container-fluid BottomModal">
//                                 <button type="submit" className="btn Rectangle-373">YA</button>
//                                 <button type="submit" className="Rectangle-374">BATAL</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default TambahJasaKirim;

import React, { Component } from 'react'
import './product.css'
import bed from '../../imageAssets/base@2x.png'
import Pagination from "react-js-pagination"
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Product extends Component {
    state = {
        activePage: 5,
        getDataProducts : [],
        token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZGV2bWluZDMubmV0L2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNTU5MDI0NjU1LCJleHAiOjE1NTkwMjgyNTUsIm5iZiI6MTU1OTAyNDY1NSwianRpIjoiNWozTWNLcVBFS3RTYzNYMSIsInN1YiI6MTMsInBydiI6IjJlNjg2YzliY2QwNGNjMzFhOTZmNzYwM2IwMGFhOGNkNjM4YzMxMmIifQ.ASHLvl4YcwLqsXQ7sXx5o_6HDAWrQEI1J82aonPJ9Qw"
    };
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }
    
    componentDidMount(){
        this.getApiProduct()
    }

    getApiProduct = () => {
        axios.get('https://devmind3.net/api/product/list',{ headers: {"Authorization" : `Bearer ${this.state.token}`} }).then((response)=>{
            const data = response.data.data.product
                this.setState({
                    getDataProducts : data
                })
            // console.log(data);
        }).catch((error)=> {
            console.log(error);
            alert(error.message)
        })

    }

    handleDeleteProduct = (e,data) =>{
        alert('lanjut delete id =',data)
        axios.delete(`https://devmind3.net/api/product/${data}`, { headers: {"Authorization" : `Bearer ${this.state.token}`} }).then((res)=>{
            console.log('PESAN DELETE',res)
            alert(res.data.meta.message)
        }).catch((err)=> console.log(err))
        e.preventDefault()
    }

    listProduct = () =>{
           var mapList = this.state.getDataProducts.map((listData, i)=>{
            console.log(listData.name);
            console.log('ini id nya:::',listData.id);
            console.log(listData.category.name);
            console.log(listData.subCategory.name);
            console.log(listData.supplier.picture);
            // console.log(listData.supplier.name);
            console.log(listData.stock);
            console.log(listData.satuan);
            var imageHandle = listData.image.length !== 0  ? `https://${listData.image[0].url}` : 'nothing here' 
            console.log('test image', imageHandle);
            
           return (
                <tr key={i}>
                    <th scope="row">
                        1
                    </th>
                    <td><img src={imageHandle} className="img-fluid" alt="Responsive" /></td>
                    <td>
                        {listData.name}
                    </td>
                    <td>
                        {listData.category.name}
                    </td>
                    <td>
                        {listData.subCategory.name}
                    </td>
                    <td>
                        {listData.stock}
                    </td>
                    <td>
                        {listData.satuan}
                    </td>
                    <td>
                        <div className='row'>
                            <div className='col'>
                                <i className="fas fa-pencil-alt bg-warning p-2 rounded-circle text-white m-2"></i>

                                <i className="fas fa-trash-alt bg-danger p-2 rounded-circle text-white m-2" onClick={((e) => this.handleDeleteProduct(e, listData.id))}></i>
                            </div>
                        </div>
                    </td>
                </tr>
            )
            
        })
        return mapList
    }
    render() {
        console.log(this.state.getDataProducts);

        return (
            <div className='py-5 produk'>
                <div className='container pb-5'>
                    <h1 className='title-page'>PRODUK</h1>
                    <br />
                    <div className='row'>
                        <div className='col-md-3'>
                            <input className="form-control" type="text" placeholder="Search" />
                        </div>
                        <div className='col-md-2'>

                            <select className="custom-select">
                                <option selected>Hotel Room</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>

                        </div>
                        <div className='col-md-2'>
                            <select className="custom-select">
                                <option selected>Spring bed</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className='col-md-2'>
                            <button type="button" className="w-100 text-center search-produk">Cari</button>
                        </div>
                        <div className='col-md-3 '>
                            <Link to='/produk/tambahproduk'>
                                <button type="button" className="btn-g text-center tambah-produk w-100">+ Tambah Produk</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='container table-responsive'>
                    <table className="table table-borderless">
                        <thead>
                            <tr className='border-bottom'>
                                <th scope="col">No</th>
                                <th scope="col">Gambar Produk</th>
                                <th scope="col">Nama Produk</th>
                                <th scope="col">Kategori</th>
                                <th scope="col">Sub-Kategori</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Satuan</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.listProduct()}
                            {/* {this.test()} */}
                        </tbody>
                    </table>
                    <hr />
                    <div className='float-right'>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">2</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">3</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={450}
                            pageRangeDisplayed={5}
                        onChange={this.handlePageChange}/> */}

                    </div>
                </div>

            </div>
        )
    }
}