import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authHome = (
            <div className="container row">
                <h1 className="col-md-12">Welcome {user.name}! Add a new restaurant.</h1>
            </div>
        )
        const guestHome = (
            <div className="container row">
                <h1 className="col-md-12">Welcome! Sign in or Sign Up to start.</h1>
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
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Home));