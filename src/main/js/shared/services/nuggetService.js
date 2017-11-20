import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function nuggetService() {
  const baseUrl = '/api/nuggets';
  const fetchProperties = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-XSRF-TOKEN': getCSRF(),
    },
  };

  return {
    create(nugget) {
      return fetch(baseUrl, Object.assign(fetchProperties, {
        method: 'POST',
        body: JSON.stringify(nugget),
      }));
    },
    getNuggets(searchInput, offset) {
      let pageSize = '10';
      let wordTypeId = searchInput.wordType;
      let bookIds = searchInput.bookIds;
      let url = baseUrl.concat('/', offset, '?pageSize=', pageSize);
      if (!(wordTypeId === null && bookIds === null && searchInput.swedish === '')) {
        url = baseUrl.concat(
          '/', offset, '/search?pageSize=', pageSize
        ).concat(
          '&swedish=', searchInput.swedish
        ).concat(
          wordTypeId !== null ? '&wordTypeId='.concat(wordTypeId) : ''
        ).concat(
          bookIds !== null ? '&bookIds='.concat(bookIds) : ''
        );
      }
      console.log(url);
      return fetch(url, Object.assign(fetchProperties, {
        method: 'GET',
      }));
    },
    delete(id) {
      let url = baseUrl.concat('/', id);
      return fetch(url, Object.assign(fetchProperties, {
        method: 'DELETE',
      }));
    }
  };
}
