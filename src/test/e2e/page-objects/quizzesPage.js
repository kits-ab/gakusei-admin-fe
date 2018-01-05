module.exports = {
  url: function() {
    return this.api.launchUrl + '/quizzes';
  },
  elements: {
    createButton: 'button[id=createButton]',
    createForm: 'form[id=createForm]',
    nameInput: 'input[name=name]',
    descInput: 'input[name=description]',
    newNuggetButton: 'button[name=newQuestion]',
    submitQuiz: 'button[name=create]',
    cancelButton: 'button[name=cancel]',
    quizModal: '.modal-body',
    closeModalButton: 'button.close',
    editButton: 'button[id=editButton]',
    editNameForm: 'form[id=editNameForm]',
  },
  commands: [
    {
      quizElement(name) { return `.${name}`; },
      quizBox(name) { return `#${name}`; },
      deleteButton(name) { return `#delete${name}`; },
      showButton(name) { return `#show${name}`; },
      nuggetForm(i) { return `.panel#nugget${i}`; },
      questionInput(i) { return `#nugget${i}Question`; },
      correctAnswerInput(i) { return `#nugget${i}Correct`; },
      incorrectAnswersInput (i) { return `#nugget${i}Incorrect`; },
      deleteNuggetFormButton (i) { return `#nugget${i}deleteInput`; },
      alert(name) { return `#deleteAlert${name}`; },
      alertCloseButton(name) { return  this.alert(name).concat(' .close'); },

    }
  ]

};
