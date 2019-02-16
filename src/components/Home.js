import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    render() {
        const {isAuthenticated} = this.props.auth;
        const authHome = (
            <div className="container" style={{ marginTop: '50px', width: '700px'}}>
                <h2 className="col-md-">Welcome! Add a new restaurant.</h2>
            </div>
        )
        const guestHome = (
            <div className="container" style={{ marginTop: '50px', width: '700px'}}>
                <h2>Welcome! Sign in or Sign Up to start.</h2>
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