import React from 'react';
import {
  Alert, Form, FormGroup, FormControl, Panel, Col
} from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';
import QuizButtonToolbar from './QuizButtonToolbar';

class QuizForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      error: '',
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
}

export default QuizForm;
