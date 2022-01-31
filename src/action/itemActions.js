// Place from where all the actions will be dispatched to the itemReducer
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './constants';
import axios from 'axios';
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction';


//dispatch is the only method using which react components can access the redux store
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    //get the data
    axios.get('https://secure-sierra-02938.herokuapp.com/api/items').then(res => 
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    })
}


export const addItem = (item) => (dispatch, getState) => {
    axios.post('https://secure-sierra-02938.herokuapp.com/api/items', item, tokenConfig(getState)).then(res => 
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
    )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    })
}


export const deleteItem = (id) => (dispatch, getState) => {
    // dispatch(setItemsLoading());
    axios.delete(`https://secure-sierra-02938.herokuapp.com/api/items/${id}`, tokenConfig(getState)).then(res => 
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    })
}


export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}