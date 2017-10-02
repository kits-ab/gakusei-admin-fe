module.exports = {
  url: function() {
    return this.api.launchUrl + '/login';
  },
  elements: {
    nameInput: 'input[name=username]',
    pwdInput: 'input[name=password]',
    loginButton: 'button[name=login]',
  }
};
