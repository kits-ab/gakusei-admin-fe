import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function userService() {
    const urlUsers = 'api/users';

    return {
        get() {
            return fetch(urlUsers, {
                credentials: 'same-origin',
            });
        },

        search(searchString) {
            let url = urlUsers.concat('/', searchString);

            return fetch(url, {
                credentials: 'same-origin',
            });
        },

        delete(username) {
            let url = urlUsers.concat('/', username);

            return fetch(url, {
                method: 'DELETE',
                credentials: 'same-origin',
            });
        },

        searchWithRole(searchString, role) {
            let url = urlUsers.concat('/', searchString, '/', role);

            return fetch(url, {
                credentials: 'same-origin',
            });
        },

        resetPassword(user) {
            let url = urlUsers.concat('/', 'password');

            return fetch(url, {
                method: 'PUT',
                credentials: 'same-origin',
                body: user,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'X-XSRF-TOKEN': getCSRF(),
                },
            });
        },

    };
}
