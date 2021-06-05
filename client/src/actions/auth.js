import { LOGIN_SUCCESS, LOG_OUT, UPDATE_LOADING } from './types';
import store from '../store';

export const loginSuccesful = (user) => {
    store.dispatch({
        type: LOGIN_SUCCESS,
        payload: user
    })
}

export const logout = () => {
    localStorage.removeItem('zutanUser');
    store.dispatch({
        type: LOG_OUT
    })
}

export const updateLoading = (state) => {
    store.dispatch({
        type: UPDATE_LOADING,
        payload: state
    })
}