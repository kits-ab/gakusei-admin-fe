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
    },
    getQuizNuggets(id) {
      let url = baseQuizUrl.concat('/', id, '/nuggets');
      return fetch(url, {
        method: 'GET',
        credentials: 'same-origin'
      });
    },
    createQuizNuggets(data) {
      let url = baseQuizUrl.concat('/nuggets/list');
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
    updateQuiz(data) {
      return fetch(baseQuizUrl, {
        method: 'PUT',
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
    updateQuizNuggets(data) {
      let url = baseQuizUrl.concat('/nuggets');
      return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
    deleteQuizNugget(id) {
      let url = baseQuizUrl.concat('/nuggets/', id);
      return fetch(url, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
    createIncorrectAnswer(incorrectAnswer) {
      let url = baseQuizUrl.concat('/nuggets/incorrectAnswers');
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(incorrectAnswer),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
    deleteIncorrectAnswer(id) {
      let url = baseQuizUrl.concat('/nuggets/incorrectAnswers/', id);
      return fetch(url, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          'X-XSRF-TOKEN': getCSRF(),
        },
      });
    },
    uploadCSV(file, quizName, quizDescription) {
      let url = baseQuizUrl.concat('/csv?quizName=', quizName, '&quizDescription=', quizDescription);

      return fetch(url, {
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
