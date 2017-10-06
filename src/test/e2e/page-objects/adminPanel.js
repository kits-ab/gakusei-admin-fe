module.exports = {
  url: function() {
    return this.api.launchUrl + '/admin-panel';
  },
  elements: {
    quizzesLink: 'a[href="/quizzes"]'
  }
};
