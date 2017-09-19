import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function quizService() {
    const urlQuizes = '/api/quizes/';

    return {
        get_all(searchPattern, offset) {
            let url = urlQuizes.concat(offset, '/');
            if (searchPattern.length > 0) {
                url = url.concat(searchPattern, '/');
            }
            return fetch(url, {
                credentials: 'same-origin',
            });
        },
    };
}
