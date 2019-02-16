import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerRestaurant } from '../actions/authentication';
import { GoogleApiWrapper } from 'google-maps-react';
import { withRouter } from 'react-router-dom';

import axios from 'axios';

import CurrentLocation from './Map';


class Home extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            isActive: '',
            lat: '',
            lng: '',

//             zoom: 13,
//   maptype: 'roadmap',
//   place_formatted: '',
//   place_id: '',
//   place_location: '',
//             latLngList: [],
            
            // showingInfoWindow: false,
            // activeMarker: {},
            // selectedPlace: {},

            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        //El campo isActive es requerido","El campo phone es requerido","El campo email es requerido","El campo lng es requerido","El campo lat es requerido","El campo name es requerido"
        const restaurant = {
            name: this.state.name,
            lat: this.state.lat,
            lng: this.state.lng,
            email: this.state.email,
            phone: this.state.phone,
            isActive: this.state.isActive,
        }
        this.props.registerRestaurant(restaurant, this.props.history);
        console.log('Register Restaurant Submit' + JSON.stringify(restaurant));
    }

    // onMarkerClick = (props, marker, e) =>
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true,
    // });

    // onClose = props => {
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null
    //         });
    //     }
    // };

    componentWillReceiveProps(nextProps) {
        if(!nextProps.auth.isAuthenticated) {
            this.props.history.push('/login')
        } 
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
           this.props.history.push('/login');
        }

        // let axiosConfig = {
        //     headers: {
        //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzY0ZjUwNGYyNzU2NjI3ODA4ZmE4ZDkiLCJuYW1lIjoiTWFyY28iLCJwYXRlcm5hbFN1cm5hbWUiOiJHdXRpZXJyZXoiLCJtYXRlcm5hbFN1cm5hbWUiOiJHdXRpZXJyZXoiLCJlbWFpbCI6Im1hcmNvZ2FudGVAZ21haWwuY29tIiwiaWF0IjoxNTUwMjE0MTU5LCJleHAiOjE1NTAzMDQxNTl9.0oufyP9igU-pB7lo0hw_tRxATtsPQQvmAOCV0d0xFG4',
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // };

        // axios.get('http://localhost:3001/restaurants', axiosConfig)
        //     .then(res => {

        //         const restaurants = res.data;
        //         console('Restaurants: ' + restaurants);
        //         this.state({ latLngList: restaurants})
        //     });


        //     const data = this.state.latLngList.Data;
        //     Object.keys(data).map((key) => (
        //         {key}

        //     ))
            
        //     const value = data[key].;
                // const lat = res.data.restaurants[0].lat;
                // const lng = res.data.restaurants[0].lng;
                // // console.log('WE '+ lat + ' ' + lng);

                // let map = new window.google.maps.Map(document.getElementById('map'), {
                //     center: {lat: lat, lng: lng},
                //     zoom: 13,
                //     mapTypeId: 'roadmap',
                // });
        
                // map.addListener('zoom_changed', () => {
                //     this.setState({
                //         zoom: map.getZoom(),
                //     });
                // });
                
                // map.addListener('maptypeid_changed', () => {
                //     this.setState({
                //         maptype: map.getMapTypeId(),
                //     });
                // });
        
                // let marker = new window.google.maps.Marker({
                //     map: map,
                //     position: {lat: 19.4338506, lng: -99.14054220000003},
                // });
                
                // // initialize the autocomplete functionality using the #pac-input input box
                // let inputNode = document.getElementById('pac-input');
                // map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
                // let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
                
                // autoComplete.addListener('place_changed', () => {
                //     let place = autoComplete.getPlace();
                //     let location = place.geometry.location;
                    
                //     this.setState({
                //         place_formatted: place.formatted_address,
                //         place_id: place.place_id,
                //         place_location: location.toString(),
                //     });
                    
                //     // bring the selected place in view on the map
                //     map.fitBounds(place.geometry.viewport);
                //     map.setCenter(location);
                    
                //     marker.setPlace({
                //         placeId: place.place_id,
                //         location: location,
                //     });
                // });


        //     })
        //     .catch(err => {
        //         console.log('ERROR: ' + err);
        // })

        
    }

    render() {
        //const { errors } = this.state;
        //style={{ marginTop: '50px', width: '700px' }}>
        const {isAuthenticated} = this.props.auth;
        const authHome = (
            <div className="row col-md-12"> 
                <div className="col-md-5">
                    <h2 style={{marginBottom: '40px'}}>Register a new restaurant</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Name" name="name" className="form-control" onChange={this.handleInputChange} value={this.state.name} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Latitude" name="lat" className="form-control" onChange={this.handleInputChange} value={this.state.lat} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Longitude" className="form-control" name="lng" onChange={this.handleInputChange} value={this.state.lng} />                        
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" name="email" className="form-control" onChange={this.handleInputChange} value={this.state.email} />  
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Phone" name="phone" className="form-control" onChange={this.handleInputChange} value={this.state.phone} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Active/Inactive" name="isActive" className="form-control" onChange={this.handleInputChange} value={this.state.isActive} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register Restaurant
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-7" style={{ marginTop: '50px'}}>
                <div id='state' style={{width: '200px', float: 'left'}}>
                    <h1>State</h1>
                    <p>
                        Zoom level: {this.state.zoom}<br />
                        Map type: {this.state.maptype}
                    </p>
                    <p>Place: {this.state.place_formatted}</p>
                    <p>Place ID: {this.state.place_id}</p>
                    <p>Location: {this.state.place_location}</p>
                </div>
                <div id='pac-container'>
                    <input id='pac-input' type='text' placeholder='Enter a location' />
                </div>
                <div id='map' style={{marginleft: '200px', height: '100%'}} />

                {/* <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
                    <Marker onClick={this.onMarkerClick} name={'current location'} position={{lat: 19.434093, lng: -99.140510}} />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                    </InfoWindow>
                </CurrentLocation> */}
                </div>
            </div>
        )

        const guestHome = (
            <div className="container" style={{ marginTop: '50px', width: '700px'}}>
                Welcome! Sign in or Sign Up to start.
            </div>
        )
        return(
            <div className="row col-md-12">
                {isAuthenticated ? authHome : guestHome}
            </div>
        )
    }
}

Home.propTypes = {
    registerRestaurant: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerRestaurant })(GoogleApiWrapper({
    apiKey: 'AIzaSyDLgg2_Vp9GB8VQLmGbXP_gjM1UuEMoL2o'
  })(withRouter(Home)));