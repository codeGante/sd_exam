import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerRest } from '../actions/authentication';
import classnames from 'classnames';
class Restaurant extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            lat: '',
            lng: '',
            email: '',
            phone: '',
            isActive: false,
            zoom: 13,
            maptype: 'roadmap',
            place_formatted: '',
            place_id: '',
            place_location: '',
            latLngList: [],
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
        const rest = {
            name: this.state.name,
            lat: this.state.lat,
            lng: this.state.lng,
            email: this.state.email,
            phone: this.state.phone,
            isActive: this.state.isActive,
            errors: this.setState.errors,
        }
        this.props.registerRest(rest, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        return(
            <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-6 container"> 
                <div className="col-md-5">
                    <h2>Register a new restaurant</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Name" name="name" 
                                className={classnames('form-control', {
                                    'is-invalid': errors.name
                                })}
                                onChange={this.handleInputChange} value={this.state.name} />
                            {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Latitude" name="lat" 
                                className={classnames('form-control', {
                                    'is-invalid': errors.lat
                                })}
                                onChange={this.handleInputChange} value={this.state.lat} />
                            {errors.lat && (<div className="invalid-feedback">{errors.lat}</div>)}
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Longitude" name="lng" 
                                className={classnames('form-control', {
                                    'is-invalid': errors.lng
                                })}
                                onChange={this.handleInputChange} value={this.state.lng} />  
                            {errors.lng && (<div className="invalid-feedback">{errors.lng}</div>)}
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" name="email" 
                                className={classnames('form-control', {
                                    'is-invalid': errors.email
                                })}
                                onChange={this.handleInputChange} value={this.state.email} /> 
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Phone" name="phone" 
                                className={classnames('form-control', {
                                    'is-invalid': errors.phone
                                })}
                                onChange={this.handleInputChange} value={this.state.phone} />
                            {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Active/Inactive" name="isActive" 
                                className={classnames('form-control', {
                                    'is-invalid': errors.isActive
                                })}
                                onChange={this.handleInputChange} value={this.state.isActive} />
                            {errors.isActive && (<div className="invalid-feedback">{errors.isActive}</div>)}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-7" style={{ marginTop: '50px'}}> 
                {/* MAP */}
                </div>
            </div>
        )
    }

}

Restaurant.propTypes = {
    registerRest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerRest } )(withRouter(Restaurant))