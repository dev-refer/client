import React, { Component } from 'react';
import './base.css'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'

// images

import kategori from '../imageAssets/list-alt-regular.svg'
import spot from '../imageAssets/map-pin-solid.svg'


import utilities from '../imageAssets/cogs-solid.svg'
import logout from '../imageAssets/sign-out-alt-solid.svg'




import GantiPassword from '../pages/utilities/gantiPassword'
import TambahAdmin from '../pages/utilities/tambahAdmin'






// pages

import Product from '../pages/product/ProductList.js'
import TambahProduk from '../pages/product/TambahProduk.js'
import EditProduk from '../pages/product/EditProduct.js'


import Category from '../pages/category/category';
import EditKategori from '../pages/category/EditKategori';
import AddCategory from '../pages/category/addCategory';
import SubCategory from '../pages/category/subCategory';
// import AddSubCategory from '../pages/category/addSubCategory';
import AdminManager from '../pages/utilities/AdminManager';

class Base extends Component {

  state = {
    categoriesData : [],
    token : this.props.token
  }

  componentDidMount() {
    this.getCategories()

    // $(".dot").hide();
    // $(".sub-kategori,.sub-hotel").hide();
    // $(".sub-atribut,.sub-banner").hide();
    // $(".sub-user").hide();
    // $(".sub-util, .sub-admin-manager").hide();

    // $(".kategori").click(function () {
    //   $(".kategori>i").toggleClass("fa-chevron-up fa-chevron-down");
    //   $(".sub-kategori").toggle('fast');
    // })
    // $(".hotel").click(function () {
    //   $(".hotel>i").toggleClass("fa-chevron-up fa-chevron-down");
    //   $(".sub-hotel").toggle('fast');
    // })

    // $(".atribut").click(function () {
    //   $(".atribut>i").toggleClass("fa-chevron-up fa-chevron-down");
    //   $(".sub-atribut").toggle('fast');
    // })

    // $(".phri-user").click(function () {
    //   $(".phri-user>i").toggleClass("fa-chevron-up fa-chevron-down");
    //   $(".sub-user").toggle('fast');
    // })

    $(".util").click(function () {
      $(".util>i").toggleClass("fa-chevron-up fa-chevron-down");
      $(".sub-util").toggle('fast');
    })
    $(".admin-manager").click(function () {
      $(".admin-manager>i").toggleClass("fa-chevron-up fa-chevron-down");
      $(".sub-admin-manager").toggle('fast');
    })

  }

  getCategories = () =>{
    axios.get('https://devmind3.net/api/categories')
    .then(res=>{
      this.setState({
        categoriesData : res.data.data.category
      })
      console.log(res)
    }).catch(err => console.log(err))
  }

  render() {
    // console.log(this.categoryList())

    return (
      <Router>
        <div className="container-fluid header">
          <div className='row'>
            <div className='col-md-2 border-left border-top border-right border-bottom p-0 accordion'>
              <div className="logo py-4 text-center ">
                <h1>dash<span>board</span>
                </h1>
              </div>

              <div className=' border-top '>
                <NavLink to='/kategori' activeClassName="activelink" className='normal' exact>
                  <div className="kategori w-100 py-3 px-4 ">
                    {/* <i className="fas fa-circle mx-3 text-warning dot"></i> */}
                    <img src={kategori} width='15px'></img>
                    <span className=''>
                      Categories
                                    </span>
                    {/* <i className="fas fa-chevron-down float-right"></i> */}
                  </div>
                </NavLink>

                  {/* {
                    this.state.categoriesData.map(res => {
                      return(
                        <NavLink to={`/kategori/${res.name}`} activeClassName="activelink" className='normal' exact>
                          <div className=" cir  sub-kategori w-100 py-2  ">
                            <i className="fas fa-circle mr-3 text-warning dot"></i>
                            <span className=''>
                            {res.name}
                            </span>
                          </div>
                        </NavLink>
                      )                  
                    })

                  } */}

              </div>

              <NavLink to='/produk' activeClassName="activelink" className='normal' >
                <div className=' cir  border-top'>
                  <div className=" w-100 produk py-3 px-4  ">
                    <i className="fas fa-circle mx-3 text-warning dot"></i>
                    <img src={spot} width='15px'></img>
                    <span className=''>
                      Spots
                                    </span>
                    {/* <i className="fas fa-chevron-down float-right"></i>           */}
                  </div>
                </div>
              </NavLink>
        

              <div className='  border-top'>
                <div className=" util w-100  py-3 px-4  ">
                  <img src={utilities} width='15px'></img>
                  <span className=''>
                    Setting
                                    </span>
                  <i className="fas fa-chevron-down float-right"></i>
                </div>
                <NavLink to='/adminmanager' activeClassName="activelink" className='normal' exact>
                  <div className=" cir  sub-util w-100 py-2  ">
                    <i className="fas fa-circle mr-3 text-warning dot"></i>
                    <span className=''>
                      Admin Manager
                                    </span>
                    {/* <i className="fas fa-chevron-down float-right"></i>           */}
                  </div>
                </NavLink>
                <NavLink to='/gantipassword' activeClassName="activelink" className='normal' exact>
                  <div className="cir sub-util w-100 pt-2 pb-3  ">
                    <i className="fas fa-circle mr-3 text-warning dot"></i>
                    <span className=''>
                      Change Password
                                    </span>
                    {/* <i className="fas fa-chevron-down float-right"></i>           */}
                  </div>
                </NavLink>
              </div>

              <a href='/'>
                <div className=' cir border-top border-bottom' onClick={() => { localStorage.clear(); window.location.replace('/'); }}>
                  <div className=" w-100 py-3 px-4  ">
                    <i className="fas fa-circle mx-3 text-warning dot"></i>
                    <img src={logout} width='15px'></img>
                    <span className=''>
                      Log Out
                                    </span>
                  </div>
                </div>
              </a>
            </div>

            <div className='border-bottom '>
              <div className="col-md py-2 admin ">
                <div className="container text-right">
                  <i className="fas fa-user mr-3 "></i>
                  Hello, {localStorage.getItem('username')} &nbsp;
                </div>
              </div>

              {/* here */}
              <div className='base-sub'>
                <Switch>
             
                  <Route path='/produk' exact component={Product} />
                  <Route path='/produk/tambahproduk' exact component={TambahProduk} />
                  <Route path='/produk/editproduk' exact component={EditProduk} />

                 

                 
                 
                  <Route path='/gantipassword' component={GantiPassword} />
                  <Route path='/adminmanager' exact component={AdminManager} />
                  <Route path='/adminmanager/tambahadmin' component={TambahAdmin} />
                 
                 
                  
                  <Route path='/kategori' exact component={Category} />
                  <Route path='/kategori/tambahkategori' component={AddCategory} />
                  <Route path='/kategori/editkategori' exact component={EditKategori} />

                  {this.state.categoriesData.map((res) => {
                    return (
                      <Route path={`/kategori/${res.name}`} exact component={SubCategory} />
                    )
                  })}


                  {/* <Route path={`/kategori/${this.state.categoriesData.map(res)=> res.name}`} exact component={SubCategory} /> */}
                  {/* <Route path='/hotelroom/tambahsubkategori' component={AddSubCategory} /> */}
                  <Route exact component={notDefined} />
                </Switch>

              </div>

            </div>

          </div>
        </div>
      </Router>
    )
  }
}

export default Base;

const notDefined = () => {
  return <div className='p-5'>404 halaman tidak ada!</div>
}
