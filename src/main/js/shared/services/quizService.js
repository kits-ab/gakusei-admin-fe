import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function quizService() {
  const urlQuizes = '/api/quizes/';
  const urlCreateQuiz = '/api/quiz/create/';

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
    create(data) {
      return fetch(urlCreateQuiz, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
  };
}
