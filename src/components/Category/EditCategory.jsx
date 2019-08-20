import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../libs/axios'

import Modal from 'react-modal'
import Loading from '../../components/Loading'
import successSign from '../../iconAssets/warning-sign.svg'
import warningSign from '../../iconAssets/checked-confirmation.svg'

import '../Category/category.css'

class EditCategory extends Component {
    render() {
        return(
            <div>
                <h3>Edit Category</h3>
            </div>
        )
    }
}
export default EditCategory