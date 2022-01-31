import axios from 'axios';
import { returnErrors } from './errorAction';
import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS, 
    LOGOUT_SUCCESS
} from './constants';

//check token and load user each time we hit get request http:localhost:5000/api/auth/user
export const loadUser = () => (dispatch, getState) => {
    //User Loading
    dispatch({ type: USER_LOADING});

    axios.get('https://secure-sierra-02938.herokuapp.com/api/auth/user', tokenConfig(getState))
    .then(res => 
        dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
}



export const register = ({name, email, password}) => dispatch =>{
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({name, email, password});

    axios.post('https://secure-sierra-02938.herokuapp.com/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}


// Login User
export const login = ({email, password}) => dispatch =>{
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({email, password});

    axios.post('https://secure-sierra-02938.herokuapp.com/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        });
}


//logout
export const logout = () => {
    return {
        type:LOGOUT_SUCCESS
    };
};

//setup config/headers and token
export const tokenConfig = getState => {
    //get token from localstorage
    const token = getState().auth.token;

    //headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    //if token, add to header
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}