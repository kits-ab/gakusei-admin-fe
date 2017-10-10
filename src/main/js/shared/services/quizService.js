import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function quizService() {
  const baseQuizUrl = '/api/quizes';

  return {
    getAll(searchPattern, offset) {
      let url = baseQuizUrl.concat('/', offset);
      if (searchPattern.length > 0) {
        url = url.concat('/', searchPattern);
      }
      return fetch(url, {
        method: 'GET',
        credentials: 'same-origin'
      });
    },
    create(data) {
      return fetch(baseQuizUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
    delete(id) {
      let url = baseQuizUrl.concat('/', id);
      return fetch(url, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    }
    getQuizNuggets(id) {
      let url = baseQuizUrl.concat('/nuggets/', id);
      return fetch(url, {
        method: 'GET',
        credentials: 'same-origin'
      });
    },
  };
}
