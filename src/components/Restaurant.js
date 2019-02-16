import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerRest } from '../actions/authentication';

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
            phone: this.state.phone
        }
        this.props.registerRest(rest, this.props.history);
        console.log('Register Rest Submit' + JSON.stringify(rest));
    }

    render() {
        return(
            <div className="row col-md-12"> 
                <div className="col-md-5">
                    <h2 style={{marginBottom: '40px'}}>Register a new restaurant</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Name" name="name" 
                                className="form-control" onChange={this.handleInputChange} value={this.state.name} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Latitude" name="lat" 
                                className="form-control" onChange={this.handleInputChange} value={this.state.lat} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Longitude" className="form-control" name="lng" 
                                onChange={this.handleInputChange} value={this.state.lng} />                        
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" name="email" 
                                className="form-control" onChange={this.handleInputChange} value={this.state.email} />  
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Phone" name="phone" 
                                className="form-control" onChange={this.handleInputChange} value={this.state.phone} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Active/Inactive" 
                                name="isActive" className="form-control" onChange={this.handleInputChange} value={this.state.isActive} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerRest })(withRouter(Restaurant))