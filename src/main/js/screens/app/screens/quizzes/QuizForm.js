import React from 'react';
import {
  Alert, Form, FormGroup, FormControl, Panel, Col
} from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';
import NuggetForm from './NuggetForm';
import QuizButtonToolbar from './QuizButtonToolbar';

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
        this.props.callParent(true);
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
      <Panel>
        <h3>Skapa en ny quiz</h3>
        <Form id="createForm" onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              type="text"
              name="name"
              placeholder="Ange ett quiznamn"
              value={this.state.name}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="text"
              name="description"
              placeholder="Ange en beskrivning"
              value={this.state.description}
              onChange={this.onInputChange}
            />
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
          removeNuggetForm={this.removeNuggetForm}
          onNuggetInputChange={this.onNuggetInputChange}
        />
      );
    }
    return nuggets;
  }
}

export default QuizForm;
