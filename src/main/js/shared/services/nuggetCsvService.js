import 'whatwg-fetch';

import getCSRF from '../util/CSRFToken';

export default function nuggetCsvService() {
  const baseUrl = '/api/nuggets/csv';

  return {
    uploadCsv(file) {
      return fetch(baseUrl, {
        method: 'POST',
        credentials: 'same-origin',
        body: file,
        headers: {
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
  };
}
