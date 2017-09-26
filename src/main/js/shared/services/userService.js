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
    };
}
