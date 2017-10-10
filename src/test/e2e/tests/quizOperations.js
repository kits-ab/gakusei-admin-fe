import { getAdminUser } from '../../e2e-helpers/users';
let quizName = 'e2etestquiz';

module.exports = {

  before: function(client, done) {
    let loginPage = client.page.loginPage();
    let qp = client.page.quizzesPage();
    let admin = getAdminUser();
    loginPage.navigate();
    loginPage
      .waitForElementVisible('body')
      .setValue('@nameInput', admin.username)
      .setValue('@pwdInput', admin.password)
      .click('@loginButton')
      .click('@loginButton');

    setTimeout(function(){
      qp.navigate();
      done();
    }, 5000);
  },
  after: function(client) {
    client.end(); //close browser after test suite
  },
  'Test cancel create new quiz': function(client) {
    let quizzesPage = client.page.quizzesPage();
    quizzesPage
      .waitForElementVisible('body')
      .assert.visible('@createButton')
      .click('@createButton')
      .click('@cancelButton')
      .assert.visible('@createButton');

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

};
