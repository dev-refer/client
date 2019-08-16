import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import '../components/base.css'

import Categories from '../pages/categories/Categories.jsx'
import Spots from '../pages/spots/Spots.jsx'


class Base extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 p-0">
                            <div className="logo">
                                <h2><a href="/">Dashboard</a></h2>
                            </div>
                            <div className="sidebar bg-light">
                                <nav className="nav flex-column side-navbar">
                                    <NavLink to='/categories' activeClassName="activelink" className='normal' exact>
                                        <div className="nav-link">
                                            <i className="fas fa-list m-2"></i>
                                            <span>Categories</span>
                                        </div>
                                    </NavLink>
                                    <NavLink to='/spots' activeClassName="activelink" className='normal' exact>
                                        <div className="nav-link">
                                            <i className="fas fa-map-pin m-2"></i>
                                            <span>Spots</span>
                                        </div>
                                    </NavLink>
                                    <NavLink to='/settings' activeClassName="activelink" className='normal' exact>
                                        <div className="nav-link">
                                            <i className="fas fa-cog m-2"></i>
                                            <span>Settings</span>
                                        </div>
                                    </NavLink>
                                    <NavLink to='/' activeClassName="activelink" className='normal' exact>
                                        <div className="nav-link">
                                            <i className="fas fa-sign-out-alt m-2"></i>
                                            <span>Log Out</span>
                                        </div>
                                    </NavLink>
                                </nav>
                            </div>
                        </div>
                        {/* <div className=""> */}
                        <div className="col-md p-0">
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <form className="form-inline my-2 my-lg-0">
                                        <div className="">
                                            <input className="form-control mr-sm-2 tes" type="search" placeholder="Search" aria-label="Search" />
                                        </div>
                                        <div>
                                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                        </div>
                                    </form>
                                    <div className="col-md w-100 py-2 admin">
                                        <div className="container text-right">
                                            <i className="fas fa-user mr-3 "></i>
                                            Hello,&nbsp;
                                            </div>
                                    </div>
                                </div>
                            </nav>
                            <div>

                            </div>
                            <div className="base-sub">
                                <Switch>
                                    <Route path='/categories' exact component={Categories} />
                                    <Route path='/spots' exact component={Spots} />
                                </Switch>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>


            </Router>
        )
    }
}
export default Base;