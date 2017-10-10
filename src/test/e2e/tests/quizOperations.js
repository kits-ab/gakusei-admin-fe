import { getAdminUser } from '../../e2e-helpers/users';
import * as quiz from '../../testdata/quizdata.json';

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
    }, 8000); //make sure we wait long enough, sometimes startup is slow
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

  },
  'Test create new quiz': function(client) {
    let qp = client.page.quizzesPage();

    qp
      .waitForElementVisible('@createButton')
      .click('@createButton')
      .assert.visible('@createForm')
      .setValue('@nameInput', quiz.name)
      .setValue('@descInput', quiz.description)
      .click('@newNuggetButton')
      .assert.visible(qp.nuggetForm(0))
      .setValue(qp.questionInput(0), quiz.nugget.question)
      .setValue(qp.correctAnswerInput(0), quiz.nugget.correctAnswer)
      .setValue(qp.incorrectAnswersInput(0), quiz.nugget.incorrectAnswers)
      .click('@submitQuiz')
      .waitForElementVisible(qp.quizBox(quiz.name))

};
