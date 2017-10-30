import React from 'react';
import {
  Alert, Form, FormGroup, FormControl, Panel, Col, ControlLabel, HelpBlock, Button, Glyphicon
} from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';

class CSVForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      name: '',
      description: '',
      validForm: false,
      file: [],
    };
  }

  handleCSVUpload = (event) => {
    event.preventDefault();
    let input = this.state.file;
    let formData = new window.FormData();
    formData.append('file', input[0]);
    quizService().uploadCSV(formData, this.state.name, this.state.description).then((response) => {
        if (response.status === 201) {
          response.text().then((text) => {
            this.setState({ error: '' });
            this.props.handleCreateQuiz(true);
          });
        } else {
          response.text().then((text) => {
            let errorList = JSON.parse(text);
            let errorMsg = errorList.reduce((complete, error) => `${complete} Error: ${error} \n`, '');
            this.setState({ error: errorMsg });
          });
        }
    }).catch((err) => { });
  }

  onInputChange = (event) => {
    let value = event.target.name === 'file' ? event.target.files : event.target.value;
    this.setState({
      [event.target.name]: value,
    }, this.formIsValid);
  }

  formIsValid = () => {
    let fileChosen = this.state.file.length !== 0;
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
              <FormControl type='file' name='file' onChange={this.onInputChange} />
              <HelpBlock> Ladda upp quiz som CSV-fil </HelpBlock>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xsOffset={2} mdOffset={2} xs={10} md={10} >
              <Button type='submit' bsStyle='primary' disabled={!this.state.validForm}> Ladda upp </Button>
            </Col>
          </FormGroup>
        </Form>
        {this.state.error ?
          <Alert bsStyle='danger' style={{ whiteSpace: 'pre-line' }} > {this.state.error} </Alert>
        :
          null
        }
      </Panel>
    );
  }
}

export default CSVForm;
