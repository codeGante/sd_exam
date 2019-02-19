import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

const baseURL = 'http://34.215.170.251';
const AUTH_TOKEN = localStorage.getItem('jwtToken');

export const registerUser = (user, history) => dispatch => {
    axios.post(`${baseURL}/users`, user)
            .then(res => {
                history.push('/login')
            })
            .catch(err => {
                if (err.response.status === 500) {
                    logoutUser();
                    history.push('/error');
                } else if(err.response.status === 401) {
                    logoutUser();
                    history.push('/login');
                }
                if (err.response && err.response.data) {
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    });
                }  
            });
}

export const loginUser = (user, history) => dispatch => {
    axios.post(`${baseURL}/auth/login`, user)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                history.push('/');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    logoutUser();
                    history.push('/error');
                } else if(err.response.status === 401) {
                    logoutUser();
                    history.push('/login');
                }
                if (err.response && err.response.data) {
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    });
                }  
            });
}

export const registerRest = (rest, history) => dispatch => {

    axios.post(`${baseURL}/restaurants`, rest,
            { 
                headers: {'Authorization' : `Bearer ${AUTH_TOKEN}`, 'Content-type' : 'application/json'} 
            })
            .then(res => {
                res.send(res.data);
                history.push('/restaurant');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    logoutUser();
                    history.push('/error');
                } else if(err.response.status === 401) {
                    logoutUser();
                    history.push('/login');
                }
                if (err.response && err.response.data) {
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    });
                }  
            })
}

export const getRestaurantList = () => dispatch => {

    axios.get(`${baseURL}/restaurants`,
    { 
        headers: {'Authorization' : `Bearer ${AUTH_TOKEN}`, 'Content-type' : 'application/json'} 
    })
        .then(res => {
            const restaurants = res.data;
            this.setState({ restaurants });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}