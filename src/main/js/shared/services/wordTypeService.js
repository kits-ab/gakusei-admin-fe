import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function wordTypeService() {
  const baseUrl = '/api/wordtypes';
  const fetchProperties = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-XSRF-TOKEN': getCSRF(),
    },
  };

  return {
    getAll() {
      return fetch(baseUrl, Object.assign(fetchProperties, {
        method: 'GET',
      }));
    },
  };
}
