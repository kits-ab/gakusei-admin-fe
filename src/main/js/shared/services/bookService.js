import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function bookService() {
  const baseUrl = '/api/books';
  return {
    getAll() {
      return fetch(baseUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
  };
}
