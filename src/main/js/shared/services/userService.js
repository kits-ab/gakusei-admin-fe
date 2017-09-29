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
        }

    };
}