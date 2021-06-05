import { CREATE_ALERT, CLOSE_ALERT } from './types';
import store from '../store';

export const createAlert = (message, type, id) => {
    store.dispatch({
        type: CREATE_ALERT,
        payload: {
            message,
            type,
            id
        }
    });
};

export const closeAlert = (id) => {
    store.dispatch({
        type: CLOSE_ALERT,
        payload: { id }
    });
};