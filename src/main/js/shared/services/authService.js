import 'whatwg-fetch';

export default function authService() {
    const urlAuth = '/username';
    const urlLogIn = '/auth';
    const urlLogOut = '/logout';

    return {
        get() {
            return fetch(urlAuth, {
                credentials: 'same-origin',
            });
        },
        log_in(data) {
            return fetch(urlLogIn, {
                method: 'POST',
                body: data,
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/xhtml+xml, application/xml, text/plain, text/html, */*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                },
            });
        },
        log_out() {
            return fetch(urlLogOut, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-XSRF-TOKEN': ''
                },
            });
        },
    };
}
