import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function grammarService() {
  const baseUrl = '/api/grammar';

  return {
    getAll() {
      return fetch(baseUrl, {
        method: 'GET',
        credentials: 'same-origin',
      });
    },
  };
}