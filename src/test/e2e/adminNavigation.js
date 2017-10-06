/* Test navigation where auth is required */

import { getAdminUser } from '../e2e-helpers/users';

module.exports = {
  before: function(client, done) {
    let loginPage = client.page.loginPage();
    let admin = getAdminUser();

    loginPage.navigate();

    loginPage
      .waitForElementVisible('body')
      .setValue('@nameInput', admin.username)
      .setValue('@pwdInput', admin.password)
      .click('@loginButton')
      .click('@loginButton');

    setTimeout(function(){
      done();
    }, 5000);
  },
 'Test navigation from Adminpanel to Quizzes page': function(client) {
   let adminPanel = client.page.adminPanel();
   let quizzes = client.page.quizzesPage();

   adminPanel.navigate()
     .assert.visible('@quizzesLink')
     .click('@quizzesLink');

   quizzes.expect.element('body').to.be.visible;

   client.end();
 }
};