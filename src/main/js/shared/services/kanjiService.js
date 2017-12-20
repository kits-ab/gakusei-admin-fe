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
  };
}
