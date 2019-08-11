import React, { Component } from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const coords = {
    lat: 51.5258541,
    lng: -0.08040660000006028
};
const params = { v: '3.exp', key: 'AIzaSyDBv5l8mhIZi7RH3FxiJd133E7RGOxv4yw' };

class Maps extends Component {
    componentDidMount() {
      
    }
    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onDragEnd(e) {
        console.log('onDragEnd', e);
        console.log(e.latLng.lat())
    }

    onCloseClick() {
        console.log('onCloseClick');
    }

    onClick(e) {
        console.log('onClick', e);
    }
    render() {
        let {lat,long} = this.props
        // console.log(lat)
        // console.log(long)
        return (<Gmaps
            width={'100%'}
            height={'400px'}
            lat={lat?lat:coords.lat}
            lng={long?long:coords.lng}
            zoom={12}
            loadingMessage={'Be happy'}
            params={params}
            onMapCreated={this.onMapCreated}>
            <Marker
                lat={lat?lat:coords.lat}
                lng={long?long:coords.lng}
                draggable={true}
                onDragEnd={this.onDragEnd} />
            <InfoWindow
                lat={lat?lat:coords.lat}
                lng={long?long:coords.lng}
                content={'Hello, React :)'}
                onCloseClick={this.onCloseClick} />
            <Circle
                lat={lat?lat:coords.lat}
                lng={long?long:coords.lng}
                radius={500}
                onClick={this.onClick} />
        </Gmaps>);
    }
}

export default Maps;