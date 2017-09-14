import authService from '../services/authService';
import Utility from '../../shared/util/Utility';

export const SET_AUTH_SESSION = 'SET_AUTH_SESSION';
export const CLEAR_AUTH_SESSION = 'CLEAR_AUTH_SESSION';
export const REJECT_AUTH_REQUEST = 'REJECT_AUTH_REQUEST';


class AuthError extends Error {
    constructor(msg) { 
        super(msg);
        this.name = 'AuthError';
    }
}

export function setSession(session) {
    return {
        type: SET_AUTH_SESSION,
        session,
    };
}

export function clearSession() {
    return {
        type: CLEAR_AUTH_SESSION,
    };
}

export function rejectAuthRequest(reason) {
    return {
        type: REJECT_AUTH_REQUEST,
        reason,
    };
}

export function validAuthentication(session) {
    let ret = false;
    session.authorities.forEach((element) => {
        if (element.authority === 'ROLE_ADMIN') {
            ret = true;
        }
    });
    return ret;
}

export function requestUserSession() {
    return function (dispatch) {
        authService().get().then((response) => {
            switch (response.status) {
                case 200:
                    response.text().then((text) => {
                        const data = JSON.parse(text);
                        if (validAuthentication(data)) {
                            dispatch(setSession(data));
                        } else {
                            dispatch(rejectAuthRequest('Fel användarnamn, lösenord eller behörighet.'));
                        }
                    });
                    break;
                default:
                    throw new Error();
            }
        }).catch((err) => {
            dispatch(clearSession());
            dispatch(rejectAuthRequest('Kunde inte autentisera'));
        });
    };
}

export function tryUserLogin(data, history) {
    return function (dispatch) {
        const formBody = (typeof data === 'string' ? data : Utility.getFormData(data).join('&'));
        authService().log_in(formBody).then((response) => {
            switch (response.status) {
                case 200:
                    dispatch(requestUserSession());
                    break;
                case 403:
                    throw new AuthError('Fel användarnamn, lösenord eller behörighet.');
                case 504:
                    throw new AuthError('Kunde inte kontakta servern.');
                default:
                    throw new Error();
            }
        }).catch((err) => {
            let errorMessage = 'Något gick fel, vänligen försök igen om en liten stund.';
            if (err.name === 'AuthError') {
                errorMessage = err.message;
            }
            dispatch(rejectAuthRequest(errorMessage));
        });
    };
}

export function tryUserLogout() {
    return function (dispatch) {
        authService().log_out().then((response) => {
            dispatch(clearSession());
        }).catch((err) => { });
    };
}
