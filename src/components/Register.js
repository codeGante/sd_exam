import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser, registerRest } from '../actions/authentication';
import classnames from 'classnames';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            paternalSurname: '',
            maternalSurname: '',
            email: '',
            password: '',
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
        const user = {
            name: this.state.name,
            paternalSurname: this.state.paternalSurname,
            maternalSurname: this.state.paternalSurname,
            email: this.state.email,
            password: this.state.password
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
            <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-6 container">
            <h2>Registration</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.name
                                })}
                                onChange={this.handleInputChange} value={this.state.name}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="PaternalSurname" name="paternalSurname"
                                className={classnames('form-control form-control-lg', {'is-invalid': errors.paternalSurname})}
                                onChange={this.handleInputChange} value={this.state.paternalSurname} />
                        {errors.paternalSurname && (<div className="invalid-feedback">{errors.paternalSurname}</div>)}
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="MaternalSurname" name="maternalSurname"
                                className={classnames('form-control form-control-lg', {'is-invalid': errors.maternalSurname})}
                                onChange={this.handleInputChange} value={this.state.maternalSurname} />
                        {errors.maternalSurname && (<div className="invalid-feedback">{errors.maternalSurname}</div>)}
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email" name="email"
                                className={classnames('form-control form-control-lg', {'is-invalid': errors.email})}
                                onChange={this.handleInputChange} value={this.state.email} />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" name="password"
                                className={classnames('form-control form-control-lg', {'is-invalid': errors.password})}
                                onChange={this.handleInputChange} value={this.state.password} />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <button className="btn" type="submit">Register User></button>
                    </div>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    registerRest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser, registerRest })(withRouter(Register))