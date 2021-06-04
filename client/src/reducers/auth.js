import { LOGIN_SUCCESS, LOG_OUT, UPDATE_LOADING } from '../actions/types';

const initialState = {
    loggedIn: false,
    loading: true,
    user: null,
    token: '',
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            loggedIn: true,
            loading: false,
            user: payload,
            token: payload.token,
        };
    case LOG_OUT:
        return {
            ...state,
            loggedIn: false,
            loading: false,
            user: null
        };
    case UPDATE_LOADING:
        return {
            ...state,
            loading: payload
        }
    default:
        return state;
    }
}