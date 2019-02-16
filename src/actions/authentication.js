import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('http://localhost:3001/users', user)
            .then(res => {
                console.log('REGISTER_USER_RESPONSE OK: ' + JSON.stringify(res.data));
                history.push('/login')
            })
            .catch(err => {
                console.log('REGISTER_USER_RESPONSE ERROR: ' + JSON.stringify(err.response.data));
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user, history) => dispatch => {
    axios.post('http://localhost:3001/auth/login', user)
            .then(res => {
                const { token } = res.data;
                console.log('TokenLogin: ' + token);
                console.log('LOGIN_USER_RESPONSE OK: ' + JSON.stringify(res.data));
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                history.push('/');
            })
            .catch(err => {
                console.log('LOGIN_USER_RESPONSE ERROR: ' + JSON.stringify(err.response.data));
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const registerRest = (rest, history) => dispatch => {

     let axiosConfig = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzY0ZjUwNGYyNzU2NjI3ODA4ZmE4ZDkiLCJuYW1lIjoiTWFyY28iLCJwYXRlcm5hbFN1cm5hbWUiOiJHdXRpZXJyZXoiLCJtYXRlcm5hbFN1cm5hbWUiOiJHdXRpZXJyZXoiLCJlbWFpbCI6Im1hcmNvZ2FudGVAZ21haWwuY29tIiwiaWF0IjoxNTUwMjE0MTU5LCJleHAiOjE1NTAzMDQxNTl9.0oufyP9igU-pB7lo0hw_tRxATtsPQQvmAOCV0d0xFG4',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    
    axios.post('http://localhost:3001/restaurants', rest,  axiosConfig)
            .then(res => {
                console.log('REGISTER_RESTAURANT_RESPONSE OK: ' + JSON.stringify(res.data));
                history.push('/');
            })
            .catch(err => {
                console.log('REGISTER_RESTAURANT_RESPONSE ERROR: ' + JSON.stringify(err.response.data));
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            })

}

export const getRestaurantList = () => dispatch => {

    let axiosConfig = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzY0ZjUwNGYyNzU2NjI3ODA4ZmE4ZDkiLCJuYW1lIjoiTWFyY28iLCJwYXRlcm5hbFN1cm5hbWUiOiJHdXRpZXJyZXoiLCJtYXRlcm5hbFN1cm5hbWUiOiJHdXRpZXJyZXoiLCJlbWFpbCI6Im1hcmNvZ2FudGVAZ21haWwuY29tIiwiaWF0IjoxNTUwMjE0MTU5LCJleHAiOjE1NTAzMDQxNTl9.0oufyP9igU-pB7lo0hw_tRxATtsPQQvmAOCV0d0xFG4',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    axios.get('http://localhost:3001/restaurants', axiosConfig)
        .then(res => {
            const restaurants = res.data;
            console.log(restaurants);
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