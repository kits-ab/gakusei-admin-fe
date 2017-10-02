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

        resetPassword(user) {
            return fetch(urlUsers, {
                credentials: 'same-origin',
                body: user,
            });
        },

    };
}
