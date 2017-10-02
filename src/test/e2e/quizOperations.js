/* Test login */

import { getAdminUser } from '../e2e-helpers/users';
import '../../main/js/shared/services/quizService';

let quizName = 'e2etestquiz';

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
  'Test cancel create new quiz': function(client) {
    let quizzesPage = client.page.quizzesPage();
    quizzesPage.navigate();
    quizzesPage
      .waitForElementVisible('body')
      .assert.visible('@createButton')
      .click('@createButton')
      .click('@cancelButton')
      .assert.visible('@createButton');

  }
  /* The test below works, but since we do not have a working delete test (and h2 is not currently working as it should)
   we have to manually delete the quiz created in the test. */
  /* ,
  'Test create new quiz': function(client) {
    let quizzesPage = client.page.quizzesPage();
    quizzesPage.navigate();
    quizzesPage
      .waitForElementVisible('@createButton')
      .click('@createButton')
      .assert.visible('@createForm')
      .setValue('@nameInput', quizName)
      .setValue('@descInput', 'e2etestbeskrivning')
      .click('@submitQuiz')
      .waitForElementVisible('@createButton')

  } */
};