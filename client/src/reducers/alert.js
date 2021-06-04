import { CREATE_ALERT, CLOSE_ALERT } from '../actions/types';

const initialState = {
    alerts: [],
    count: 0,
};

const alertReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ALERT:
            const newAlert = {
                message: payload.message,
                type: payload.type,
                id: payload.id
            };
            return {
                alerts: [...state.alerts, newAlert],
                count: state.count + 1
            }
        case CLOSE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter((alert) => alert.id !== payload.id)
            }
        default:
            return state;
    }
}

export default alertReducer;