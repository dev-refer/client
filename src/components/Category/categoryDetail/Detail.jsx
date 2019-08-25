import React, { Component } from 'react';
import Spotlist from '../../Spot/SpotList';
import axios from '../../../libs/axios';
import Loading from '../../Loading/index';
import swal from 'sweetalert2'

//NANTI REFACTOR TABLE

class DetailCategory extends Component {
    state = {
        loading: false,
        name: '',
        icon: ''
    }
    async componentDidMount() {
        const id = this.props.match.params.id
        try {
            this.setState({
                loading: true
            })
            const result = await axios({
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                },
                url: `/v1/categories/${id}`
            })
            this.setState({
                loading: false,
                name: result.data.name,
                icon: result.data.icon
            })
        } catch (error) {
            swal.fire({
                title: 'ERROR',
                type: 'error',
                text: error.message
            })
        }
    }
    render() {
        const { icon, name } = this.state
        return (
            <div className='container'>
                <div className="row ">

                    <div className="col-md-12 text-center">
                        {icon ? <img src={icon} className="icon" /> : null}
                        {name ? <h4 className='mt-4'>{name}</h4> : null}
                    </div>

                    <div className="col-md-12">
                        <Spotlist categoryId={this.props.match.params.id} showAddSpot={false} showEdit={false} showDelete={false} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailCategory;