import React from 'react';
import {
  Alert, Form, FormGroup, FormControl, Button,
  ButtonGroup, Panel
} from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';

class QuizForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      error: null,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
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
        error: 'Något fick fel',
      });
    });
  }

  renderErrorMsg() {
    if (this.state.error != null) {
      return (
        <Alert bsStyle="danger">
          <strong>Ett fel upptäcktes!</strong>
          <p>{this.state.error}</p>
        </Alert>
      );
    }
    return '';
  }

  onInputChange(event) {
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
            {this.renderErrorMsg()}
            <ButtonGroup vertical block>
              <Button
                type="submit"
                label="create"
                bsStyle="primary"
                name="create"
                disabled={!this.state.name || !this.state.description}
              >
                Skapa
              </Button>
              <Button
                label="cancel"
                bsStyle="default"
                name="cancel"
                onClick={() => this.props.callParent(false)}
              >
                Ångra
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default QuizForm;
