import React from 'react';
import {
  Form, FormGroup, FormControl, Panel, Col, ControlLabel, HelpBlock, Button
} from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';

class CSVForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      validForm: false,
    };
  }

  handleCSVUpload = (event) => {
    event.preventDefault();
    let input = document.querySelector('input[type="file"]');
    let formData = new window.FormData();
    formData.append('file', input.files[0]);
    quizService().uploadCSV(formData, this.state.name, this.state.description).then((response) => {
        if (response.status === 201) {
          this.props.handleCreateQuiz(true);
        } else {
          throw new Error();
        }
    }).catch((err) => { });
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    this.formIsValid();
  }

  formIsValid = () => {
    let fileChosen = document.querySelector('input[type="file"]').files.length !== 0;
    let nameAndDescriptionAdded = this.state.name !== '' && this.state.description !== '';
    this.setState({ validForm: nameAndDescriptionAdded && fileChosen });
  }

  render() {
    return (
      <Panel header={<h3> Ladda upp CSV-fil </h3>} bsStyle='primary' >
        <Form id='CSVForm' horizontal encType='multipart/form-data' onSubmit={this.handleCSVUpload} >
          <FormGroup>
            <Col componentClass={ControlLabel} xs={2} md={2} >
              Namn
            </Col>
            <Col xs={12} md={10} >
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
            <Col componentClass={ControlLabel} xs={2} md={2} >
              Beskrivning
            </Col>
            <Col xs={12} md={10} >
              <FormControl
                type="text"
                name="description"
                placeholder="Ange en beskrivning"
                value={this.state.description}
                onChange={this.onInputChange}
              />
            </Col>
          </FormGroup>
          <FormGroup id='uploadCsv' >
            <Col xsOffset={2} mdOffset={2} xs={10} md={10} >
              <FormControl type='file' name='file' onChange={this.formIsValid} />
              <HelpBlock> Ladda upp quiz som CSV-fil </HelpBlock>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xsOffset={2} mdOffset={2} xs={10} md={10} >
              <Button type='submit' bsStyle='primary' disabled={!this.state.validForm}> Ladda upp </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default CSVForm;
