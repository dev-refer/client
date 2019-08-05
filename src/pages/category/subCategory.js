import React, { Component } from 'react'
import './subCategory.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ENV from '../../environment'
import API from '../../apiCaller'

class SubCategory extends Component {

    state = {
        dataSubCategoryList: [],
        searchSubCategories: [],
        token: localStorage.getItem('jwt')
    }

    componentDidMount() {
        this.getDataSubCategoryList()
    }

    onBtnSearchClick = () => {
        var nama = this.refs.searchNama.value;
        var arrSearch = this.state.dataSubCategoryList.filter((item) => {
            return item.name.includes(nama.toLowerCase());
        })
        this.setState({ searchSubCategories: arrSearch })
        console.log(this.state.searchSubCategories)
    }

    getDataCategories = () => {
        axios.get('https://devmind3.net/api/categories')
          .then(res => {
            this.setState({
              categoriesData: res.data.data.category
            })
            console.log(res)
          }).catch(err => console.log(err))
      }

    getDataSubCategoryList = () => {
        axios.get(ENV.BASE_URL_API + API.SUB_CATEGORY_LIST, {
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            },
            params: {
                'active': 2
            }
        })
            .then((res) => {
                this.setState({
                    dataSubCategoryList: res.data.data['sub-category'],
                    searchSubCategories: res.data.data['sub-category']
                })
                console.log(res.data.data['sub-category'])
            })
            .catch((err) => {
                // console.log(err)
                // localStorage.clear()
                // window.location.reload()
            })
    }

    putDataSubCategoryList = () => {
        var subcategory = this.state.searchSubCategories.map((item, i) => {
            var { name } = item
            return (

                <tr>
                    <th scope='row'>
                        {i + 1}
                    </th>
                    <td>
                        {name}
                    </td>
                    <td>
                        <div className='row'>
                            <div className='col'>
                                <Link to={{
                                    pathname: '/kidz/editsubkategori'
                                }}>
                                    <i className="fas fa-pencil-alt bg-warning p-2 rounded-circle text-white m-2"></i>
                                </Link>

                                <i
                                    className="fas fa-trash-alt bg-danger p-2 rounded-circle text-white m-2"
                                    onClick={((e) => this.handleDeleteSubCategory(e))}></i>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
        return subcategory;
    }

    render() {
        return (
            <div className='py-5 subcategory'>
                <div className='container pb-5'>
                    <h1 className='subcat-h1'>Kidz</h1>
                    <br />
                    <div className='subkat-page row'>
                        <div className='col-md-5'>
                            <input className="form-control carisubkat" type="text" placeholder="Cari sub kategori..." />
                        </div>
                        <div className='col-md-2' style={{ paddingLeft: "35px", marginLeft: "40px" }}>
                            <button className="search-button subcat" type="button" onClick={() => { this.onBtnSearchClick() }}>Cari</button>
                        </div>
                        <div className='col-md-3' style={{ paddingLeft: "188px" }}>
                            <Link to='/kidz/tambahsubkategori'>
                                <button className="add-subcategory-button" type="button">+Tambah Sub-Kategori</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='container table-responsive'>
                    <table className="parent-tabsubkat table table-borderless">
                        <thead className='thead-subcat'>
                            <tr className='border-bottom'>
                                <th scope="col">No</th>
                                <th scope="col">Nama Sub Kategori</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.putDataSubCategoryList()}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default SubCategory