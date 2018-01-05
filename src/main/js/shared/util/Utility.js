import React from 'react';
import { connect } from 'react-redux';

export default class Utility {
// ----------------
// REDUX RELATED - Helps return various redux objects

  static generateReducerNamesFromReducer(reducers) {
    const result = [];
    reducers.forEach(reducer =>
      Object.keys(reducer.reducers).forEach((x) => {
        result.push(x);
      })
    );
    return result;
  }

  static generateActionCreatorsFromReducer(reducers) {
    const result = [];
    reducers.forEach(reducer =>
      result.push(reducer.actionCreators)
    );
    return result;
  }


  static superConnect(sender, reducerNames) {
    return connect(
      // Selects which state properties are merged into the component's props
      state => (
        Object.assign({},
          ...Utility.generateReducerNamesFromReducer(reducerNames)
            .map(reducerStateName => state[reducerStateName])
        )
      ),
      // Selects which action creators are merged into the component's props
      (Object.assign({}, ...Utility.generateActionCreatorsFromReducer(reducerNames))),
    );
  }

  // ----------------
  // FORM-RELATED

  static getFormData(form) {
    return Object.keys(form.target).map(key => (
      form.target[key].value ?
        `${encodeURIComponent(form.target[key].name)}=${encodeURIComponent(form.target[key].value)}`
        : null
    )).filter(val => val);
  }

  // ----------------
  // QUIZ-RELATED

  static createIncorrectAnswer = answer => (
    { incorrectAnswer: answer }
  )

  static createNuggets = (quizId, questions, correctAnswers, incorrectAnswers) => {
    let nuggets = [];
    let i;
    for (i = 0; i < questions.length; i++) {
      let incAnswers = incorrectAnswers[i].split(',').map(answer => answer.trim()).filter(answer => answer !== '').map(Utility.createIncorrectAnswer); // .map(this.createIncorrectAnswer);

      let nugget = {
        question: questions[i],
        correctAnswer: correctAnswers[i],
        quizRef: quizId,
        incorrectAnswers: incAnswers,
      };
      nuggets.push(nugget);
    }
    return nuggets;
  }

  static compareStringProperty(first, second, prop) {
    let a = first[prop].toLowerCase();
    let b = second[prop].toLowerCase();
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }
}
