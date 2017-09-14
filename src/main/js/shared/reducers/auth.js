import { SET_AUTH_SESSION, CLEAR_AUTH_SESSION, 
    REJECT_AUTH_REQUEST } from '../actions/authActions';

const defaultState = {
    loggedIn: false,
    username: null,
    error: null,
};

export default function authSession(state = defaultState, action) {
    switch (action.type) {
        case SET_AUTH_SESSION:
            return ({
                ...state,
                loggedIn: action.session.loggedIn,
                username: action.session.username,
                error: null,
            });
        case CLEAR_AUTH_SESSION:
            return ({
                ...state,
                loggedIn: false,
                username: null,
                error: null,
            });
        case REJECT_AUTH_REQUEST:
            return ({
                ...state,
                error: action.reason
            });
        default:
            return state;
    }
}
