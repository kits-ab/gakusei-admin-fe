import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function grammarService() {
  const baseUrl = '/api/grammar';

  return {
    getLessons() {
      return fetch('/api/lessons?lessonType=vocabulary', {
        method: 'GET',
        credentials: 'same-origin',
      });
    },
    getGrammarList(lessonId) {
      let grammarListUrl = baseUrl.concat('/', lessonId);

      return fetch(grammarListUrl, {
        method: 'GET',
        credentials: 'same-origin',
      });
    },
    createInflection(inflection) {
      let inflectionUrl = baseUrl.concat('/inflection');

      return fetch(inflectionUrl, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify(inflection),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
    deleteInflection(inflection) {
      let inflectionUrl = baseUrl.concat('/inflection');

      return fetch(inflectionUrl, {
        method: 'DELETE',
        credentials: 'same-origin',
        body: JSON.stringify(inflection),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
  };
}
