import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function lessonService() {
  const baseUrl = '/api/lessons';
  const fetchProperties = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-XSRF-TOKEN': getCSRF(),
    },
  };

  return {
    create(lesson) {
      return fetch(baseUrl, Object.assign(fetchProperties, {
        method: 'POST',
        body: JSON.stringify(lesson),
      }));
    },
    get(id) {
      let url = baseUrl.concat('/', id);
      return fetch(url, Object.assign(fetchProperties, {
        method: 'GET',
      }));
    },
    getPage(offset) {
      let pageSize = '5';
      let url = baseUrl.concat('/page/', offset, '?pageSize=', pageSize);
      return fetch(url, Object.assign(fetchProperties, {
        method: 'GET',
      }));
    },
    delete(lessonId) {
      let url = baseUrl.concat('/', lessonId);
      return fetch(url, Object.assign(fetchProperties, {
        method: 'DELETE',
      }));
    },
    update(lesson) {
      return fetch(baseUrl, Object.assign(fetchProperties, {
        method: 'PUT',
        body: JSON.stringify(lesson),
      }));
    }
  };
}
