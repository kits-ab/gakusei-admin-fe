module.exports = {
  url: function() {
    return this.api.launchUrl + '/quizes';
  },
  elements: {
    createButton: 'button[id=createButton]',
    createForm: 'form[id=createForm]',
    nameInput: 'input[name=name]',
    descInput: 'input[name=description]',
    submitQuiz: 'button[name=create]',
    cancelButton: 'button[name=cancel]',
    deleteButton: 'button[name=delete]'
  },
  commands: [
    {
      getQuizElement(name) {
        return `.${name}`;
      }
    }
  ]

};
