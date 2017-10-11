import React from 'react';
import { Button, Col, ControlLabel, FormControl, FormGroup, Panel } from 'react-bootstrap';

class NuggetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      correctAnswer: '',
      incorrectAnswer: '',
      validationStates: {
        question: null,
        correctAnswer: null,
        incorrectAnswers: null,
      },
      nuggetIsValid: null,
    };
  }

  removeNuggetForm = (id) => {
    this.props.removeNuggetForm(id);
  }

  handleValidationStates = (i) => {
    this.props.updateNuggetValidationState(i, this.state.nuggetIsValid);
  }

  validateInput(fieldName, value, i) {
    let validationStates = this.state.validationStates;
    let questionValid = this.state.validationStates.question;
    let correctAnswerValid = this.state.validationStates.correctAnswer;
    let incorrectAnswersValid = this.state.validationStates.incorrectAnswers;

    switch (fieldName) {
      case 'question':
        questionValid = value.trim() !== '';
        validationStates.question = questionValid ? 'success' : 'error';
        break;
      case 'correctAnswer':
        correctAnswerValid = value.trim() !== '';
        validationStates.correctAnswer = correctAnswerValid ? 'success' : 'error';
        break;
      case 'incorrectAnswers': {
        // wrap case clause in block to ensure that lexical declarations
        // only applies to current clause
        let answers = value.split(',').map(answer => answer.trim()).filter(answer => answer !== '');
        incorrectAnswersValid = answers.length >= 3;
        validationStates.incorrectAnswers = incorrectAnswersValid ? 'success' : 'error';
        break;
      }
      default:
        break;
    }

    this.setState({
      validationStates,
      nuggetIsValid: questionValid && correctAnswerValid && incorrectAnswersValid
    });

    this.handleValidationStates(i);
  }

  onInputChange = (i, event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    }, () => { this.validateInput(name, value, i); });

    this.props.onNuggetInputChange(name, value, i);
  }

  render() {
    let i = this.props.i;
    let id = this.props.id;
    return (
      <Panel id={id} header={<h5>Fråga {i + 1} </h5>}>
        <FormGroup bsSize="small" validationState={this.state.validationStates.question}>
          <Col componentClass={ControlLabel} xs={12} md={1}>
            Fråga
          </Col>
          <Col xs={12} md={10}>
            <FormControl
              id={`${id}Question`}
              type="text"
              name="question"
              placeholder="Ange en ny fråga"
              value={this.state.question}
              onChange={event => this.onInputChange(i, event)}
            />
            <FormControl.Feedback/>
          </Col>
        </FormGroup>
        <FormGroup bsSize="small" validationState={this.state.validationStates.correctAnswer}>
          <Col componentClass={ControlLabel} xs={12} md={1}>
            Rätt svar
          </Col>
          <Col xs={12} md={10}>
            <FormControl
              id={`${id}Correct`}
              type="text"
              name="correctAnswer"
              placeholder="Ange rätt svar"
              value={this.state.correctAnswer}
              onChange={event => this.onInputChange(i, event)}
            />
            <FormControl.Feedback/>
          </Col>
        </FormGroup>
        <FormGroup bsSize="small" validationState={this.state.validationStates.incorrectAnswers}>
          <Col componentClass={ControlLabel} xs={12} md={1}>
            Felaktiga svar
          </Col>
          <Col xs={12} md={10}>
            <FormControl
              id={`${id}Incorrect`}
              type="text"
              name="incorrectAnswers"
              placeholder="Ange minst tre kommaseparerade felaktiga svar"
              value={this.state.incorrectAnswers}
              onChange={event => this.onInputChange(i, event)}
            />
            <FormControl.Feedback/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col xs={12} md={12}>
            <Button
              id={`${id}deleteInput`}
              className="pull-right"
              bsSize="small"
              bsStyle="danger"
              onClick={() => this.removeNuggetForm(id)}
            >
              Ta bort
            </Button>
          </Col>
        </FormGroup>
      </Panel>
    );
  }
}

export default NuggetForm;
