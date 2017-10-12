import * as users from '../../../secrets.json';

module.exports = {
  getAdminUser: function () {
    let admin = {'username': users.username, 'password': users.password};
    return admin;
  }
};
