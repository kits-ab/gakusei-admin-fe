import React from 'react';
import { Panel, Grid, Form, FormControl, FormGroup, 
  ControlLabel, HelpBlock, Col, Button, Glyphicon, Alert } from 'react-bootstrap';

import nuggetCsvService from '../../../../shared/services/nuggetCsvService';

class nuggetCsv extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: [],
      response: '',
      error: false,
    };
  }

  handleCSVUpload = (event) => {
    event.preventDefault();
    let formData = new window.FormData();
    formData.append('file', this.state.file[0]);
    nuggetCsvService().uploadCsv(formData).then((response) => {
      response.text().then((text) => {
        if (response.status === 201) {
          this.setState({ response: text, error: false });
        } else {
          this.setState({ response: text, error: true });
        }
      });
    });
  }

  handleFileChosen = (event) => {
    this.setState({ file: event.target.files });
  }

  render() {
    return (
      <Grid>
        <Panel bsStyle='primary' header={'Ladda upp CSV-fil'} >
          <Form id='CSVForm' horizontal encType='multipart/form-data' onSubmit={this.handleCSVUpload} >
            <FormGroup>
              <Col componentClass={ControlLabel} xs={2} >
                CSV-fil
              </Col>
              <Col xs={10} >
                <FormControl type='file' name='file' onChange={this.handleFileChosen} />
                <HelpBlock> Ladda upp nuggets via CSV-fil </HelpBlock>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col xsOffset={2} >
                <Button type='submit' bsStyle='primary' > <Glyphicon glyph='cloud-upload' /> Ladda upp </Button>
              </Col>
            </FormGroup>
          </Form>
          {
            this.state.response !== '' ?
              <Alert bsStyle={ this.state.error ? 'danger' : 'info'} >
                { this.state.error ? <Glyphicon glyph='alert' /> : <Glyphicon glyph='info-sign' /> }
                {this.state.response}
              </Alert>
            :
              null
          }
        </Panel>
      </Grid>
    );
  }
}

export default nuggetCsv;
