import { SET_AUTH_SESSION, CLEAR_AUTH_SESSION, 
    REJECT_AUTH_REQUEST, WAITING_ON_RESPONSE } from '../actions/authActions';

const defaultState = {
    loggedIn: false,
    username: null,
    error: null,
    waiting: false,
};

export default function authSession(state = defaultState, action) {
    switch (action.type) {
        case SET_AUTH_SESSION:
            return ({
                ...state,
                loggedIn: action.session.loggedIn,
                username: action.session.username,
                error: null,
                waiting: false,
            });
        case CLEAR_AUTH_SESSION:
            return ({
                ...state,
                loggedIn: false,
                username: null,
                error: null,
                waiting: false,
            });
        case REJECT_AUTH_REQUEST:
            return ({
                ...state,
                error: action.reason,
                waiting: false,
            });
        case WAITING_ON_RESPONSE:
            return ({
                ...state,
                error: null,
                waiting: true,
            });
        default:
            return state;
    }
}
