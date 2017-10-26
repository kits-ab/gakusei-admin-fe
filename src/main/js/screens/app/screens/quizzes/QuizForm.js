import React from 'react';
import {
  Alert, Form, FormGroup, FormControl, Panel, Col, ControlLabel
} from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';
import Utility from '../../../../shared/util/Utility';
import NuggetForm from './NuggetForm';
import QuizButtonToolbar from './QuizButtonToolbar';
import CSVForm from './CSVForm';

class QuizForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      error: '',
      idCounter: 0,
      tmpNuggetIds: [],
      questions: [],
      correctAnswers: [],
      incorrectAnswers: [],
      nuggetCount: 0,
      nuggetValidationStates: [],
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const obj = { name: this.state.name, description: this.state.description };
    quizService().create(obj).then((response) => {
      if (response.status === 201) {
        response.text().then((text) => {
          let quiz = JSON.parse(text);
          let quizNuggets = Utility.createNuggets(quiz.id, this.state.questions, this.state.correctAnswers,
            this.state.incorrectAnswers);
          quizService().createQuizNuggets(quizNuggets).then((response2) => {
            if (response2.status === 201) {
              response2.text().then((nuggetText) => {
                let nugget = JSON.parse(nuggetText);
                this.props.handleCreateQuiz(true);
              });
            } else {
              throw  new Error();
            }
          }).catch((err) => {
            throw new Error();
          });
        }).catch((err) => {
          this.setState({
            error: 'Kunde inte skapa quizfrågor',
          });
        });
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({
        error: 'Kunde inte skapa quiz',
      });
    });
  }

  renderErrorMsg = () => (
    <Alert bsStyle="danger">
      <strong>Ett fel upptäcktes!</strong>
      <p>{this.state.error}</p>
    </Alert>
  );

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onNuggetInputChange = (fieldName, value, i) => {
    let values = null;
    switch (fieldName) {
      case 'question':
        values = this.state.questions;
        break;
      case 'correctAnswer':
        values = this.state.correctAnswers;
        break;
      case 'incorrectAnswers':
        values = this.state.incorrectAnswers;
        break;
      default:
        break;
    }

    values[i] = value;
    this.setState({
      [fieldName]: values
    });
  }

  updateNuggetValidationState = (i, isValid) => {
    let nuggetValidationStates = this.state.nuggetValidationStates;
    nuggetValidationStates[i] = isValid;
    this.setState({
      nuggetValidationStates
    });
  }

  formIsValid = () => {
    let nuggetStates = this.state.nuggetValidationStates;
    let quizValid = this.state.name !== '' && this.state.description !== '';
    let nuggetFormsValid = nuggetStates.length === 0 ? false : nuggetStates.reduce((acc, nuggetValid) => acc && nuggetValid);
    return quizValid && nuggetFormsValid;
  }

  addNuggetForm = () => {
    let tmpNuggetIds = this.state.tmpNuggetIds;
    let questions = this.state.questions;
    let correctAnswers = this.state.correctAnswers;
    let incorrectAnswers = this.state.incorrectAnswers;
    let nuggetValidationStates = this.state.nuggetValidationStates;
    tmpNuggetIds.push('nugget'.concat(this.state.idCounter.toString()));
    questions.push('');
    correctAnswers.push('');
    incorrectAnswers.push('');
    nuggetValidationStates.push(false);

    this.setState({
      idCounter: this.state.idCounter + 1,
      nuggetCount: this.state.nuggetCount + 1,
      tmpNuggetIds,
      questions,
      correctAnswers,
      incorrectAnswers,
      nuggetValidationStates
    });
  }

  removeNuggetForm = (id) => {
    let tmpNuggetIds = this.state.tmpNuggetIds;
    let questions = this.state.questions;
    let correctAnswers = this.state.correctAnswers;
    let incorrectAnswers = this.state.incorrectAnswers;
    let nuggetValidationStates = this.state.nuggetValidationStates;
    let i = tmpNuggetIds.indexOf(id);
    tmpNuggetIds.splice(i, 1);
    questions.splice(i, 1);
    correctAnswers.splice(i, 1);
    incorrectAnswers.splice(i, 1);
    nuggetValidationStates.splice(i, 1);

    this.setState({
      nuggetCount: this.state.nuggetCount - 1,
      tmpNuggetIds,
      questions,
      correctAnswers,
      incorrectAnswers,
      nuggetValidationStates
    });
  }

  render() {
    return (
      <div>
        <CSVForm />
        <Panel header={<h3>Skapa ett nytt quiz</h3>} bsStyle="primary">
          <Form horizontal id="createForm" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} xs={12} md={2}>
                Namn
              </Col>
              <Col xs={12} md={10}>
                <FormControl
                  type="text"
                  name="name"
                  placeholder="Ange ett quiznamn"
                  value={this.state.name}
                  onChange={this.onInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} xs={12} md={2}>
                Beskrivning
              </Col>
              <Col xs={12} md={10}>
                <FormControl
                  type="text"
                  name="description"
                  placeholder="Ange en beskrivning"
                  value={this.state.description}
                  onChange={this.onInputChange}
                />
              </Col>
            </FormGroup>
            {this.createNuggetForms()}
            <FormGroup>
              {!this.state.error ? this.renderErrorMsg : null}
              <Col xs={12} md={12}>
                <QuizButtonToolbar addNuggetForm={this.addNuggetForm} formIsValid={this.formIsValid} handleCreateQuiz={this.props.handleCreateQuiz}/>
              </Col>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  }

  createNuggetForms() {
    let nuggets = [];
    for (let i = 0; i < this.state.nuggetCount; i++) {
      nuggets.push(
        <NuggetForm
          key={this.state.tmpNuggetIds[i]}
          id={this.state.tmpNuggetIds[i]}
          i={i}
          updateNuggetValidationState={this.updateNuggetValidationState}
          removeNuggetForm={this.removeNuggetForm}
          onNuggetInputChange={this.onNuggetInputChange}
        />
      );
    }
    return nuggets;
  }
}

export default QuizForm;
