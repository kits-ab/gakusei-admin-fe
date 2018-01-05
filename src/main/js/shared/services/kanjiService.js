import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function nuggetService() {
  const baseUrl = '/api/kanjis';

  return {
    getKanji(swedish, bookIds, offset) {
      let pageSize = '10';
      let url = baseUrl.concat('?offset=', offset, '&pageSize=', pageSize, '&swedish=', swedish);
      if (bookIds.length !== 0) {
        url = url.concat('&bookIds=', bookIds);
      }

      return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
      });
    },
    deleteKanji(kanji) {
      let url = baseUrl.concat('/', kanji.id);

      return fetch(url, {
          method: 'DELETE',
          credentials: 'same-origin',
          headers: {
            'X-XSRF-TOKEN': getCSRF(),
          },
      });
    },
    createKanji(kanji) {
      return fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(kanji),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
    updateKanji(kanji) {
      return fetch(baseUrl, {
        method: 'PUT',
        body: JSON.stringify(kanji),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
  };
}
