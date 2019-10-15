import React, { Component } from 'react';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';

const coords = {
    lat: 51.5258541,
    lng: -0.08040660000006028
};
const params = { v: '3.exp', key: 'AIzaSyC1exe2H9Pr6auQkuzsr0iBlbPt_667DS8' };

class Maps extends Component {
    componentDidMount() {

    }
    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onDragEnd(e, setLat, setLong) {
        setLat(e.latLng.lat());
        setLong(e.latLng.lng())
    }
    render() {
        let { lat, long, setLat, setLong } = this.props
        return (<Gmaps
            width={'100%'}
            height={'400px'}
            lat={lat ? lat : coords.lat}
            lng={long ? long : coords.lng}
            zoom={12}
            loadingMessage={'Be happy'}
            params={params}
            onMapCreated={this.onMapCreated}>
            <Marker
                lat={lat ? lat : coords.lat}
                lng={long ? long : coords.lng}
                draggable={true}
                onDragEnd={(e) => { this.onDragEnd(e, setLat, setLong) }} />
        </Gmaps>);
    }
}

export default Maps;