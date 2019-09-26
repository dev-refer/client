import React, { Component } from 'react';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div style={{backgroundColor:'black', position:'absolute', minHeight:'100vh', minWidth:'100vw', zIndex:100}}>
            Not Found Page
        </div> );
    }
}
 
export default NotFound;