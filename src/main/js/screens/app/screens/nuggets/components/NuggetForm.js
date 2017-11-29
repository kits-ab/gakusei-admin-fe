import React from 'react';
import { Col, ControlLabel, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';
import NuggetButtonToolbar from './NuggetButtonToolbar';
import nuggetService from '../../../../../shared/services/nuggetService';

class NuggetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      swedish: '',
      english: '',
      jpRead: '',
      jpWrite: '',
      wordType: '',
      books: [],
      validationStates: {
        description: null,
        swedish: null,
        english: null,
        jpRead: null,
        jpWrite: null,
        books: null,
        wordType: null,
      },
      formIsValid: false,
    };
  }

  getSelected = options => (
    Object.keys(options).filter(key => options[key].selected).reduce((acc, key) => {
      acc.push(options[key].value);
      return acc;
    }, [])
  );

  onInputChange = (event) => {
    let name = event.target.name;
    let options = event.target.options;
    let value = name === 'books' ? this.getSelected(options) : event.target.value;
    this.setState({
      [name]: value,
    }, () => this.validateInput(name, value));
  };


  validateInput = (fieldName, value) => {
    let validationStates = this.state.validationStates;
    let fieldValid = validationStates[fieldName];
    if (fieldName === 'wordType') {
      fieldValid = value !== 'Ordklass';
    } else {
      fieldValid = fieldName === 'books' ? value.length !== 0 : value.trim() !== '';
    }
    validationStates[fieldName] = fieldValid ? 'success' : 'error';

    this.setState({
      validationStates,
      formIsValid: Object.keys(validationStates).reduce((acc, key) => acc && (validationStates[key] === 'success'))
    });
  };

  formIsValid = () => (
    this.state.formIsValid
  );

  handleSubmitNugget = (event) => {
    event.preventDefault();
    let nugget = {
      description: this.state.description,
      swedish: this.state.swedish,
      english: this.state.english,
      jpRead: this.state.jpRead,
      jpWrite: this.state.jpWrite,
      books: this.props.books.filter(book => this.state.books.includes(book.title)),
      wordType: this.props.wordTypes.find(wt => wt.type === this.state.wordType),
      type: this.state.wordType
    };
    nuggetService().create(nugget).then((response) => {
      if (response.status === 201) {
        response.text().then((text) => {
          this.props.handleCreateNugget(true);
        });
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({ error: 'Kunde inte skapa nytt ord' });
    });
  };

  render() {
    return (
      <Panel header="Lägg till nytt ord" bsStyle="primary">
        <Form horizontal onSubmit={this.handleSubmitNugget}>
          <FormGroup bsSize="small" validationState={this.state.validationStates.description}>
            <Col componentClass={ControlLabel} xs={12} md={2}>
              Beskrivning
            </Col>
            <Col xs={12} md={10}>
              <FormControl
                type="text"
                name="description"
                placeholder="Beskrivning"
                value={this.state.description}
                onChange={event => this.onInputChange(event)}
              />
              <FormControl.Feedback/>
            </Col>
          </FormGroup>
          <FormGroup bsSize="small" validationState={this.state.validationStates.swedish}>
            <Col componentClass={ControlLabel} xs={12} md={2}>
              Svenska
            </Col>
            <Col xs={12} md={10}>
              <FormControl
                type="text"
                name="swedish"
                placeholder="Svenskt uttryck"
                value={this.state.swedish}
                onChange={event => this.onInputChange(event)}
              />
              <FormControl.Feedback/>
            </Col>
          </FormGroup>
          <FormGroup bsSize="small" validationState={this.state.validationStates.english}>
            <Col componentClass={ControlLabel} xs={12} md={2}>
              Engelska
            </Col>
            <Col xs={12} md={10}>
              <FormControl
                type="text"
                name="english"
                placeholder="Engelskt uttryck"
                value={this.state.english}
                onChange={event => this.onInputChange(event)}
              />
              <FormControl.Feedback/>
            </Col>
          </FormGroup>
          <FormGroup bsSize="small" validationState={this.state.validationStates.jpRead}>
            <Col componentClass={ControlLabel} xs={12} md={2}>
              Lästecken
            </Col>
            <Col xs={12} md={10}>
              <FormControl
                type="text"
                name="jpRead"
                placeholder="Lästecken"
                value={this.state.jpRead}
                onChange={event => this.onInputChange(event)}
              />
              <FormControl.Feedback/>
            </Col>
          </FormGroup>
          <FormGroup bsSize="small" validationState={this.state.validationStates.jpWrite}>
            <Col componentClass={ControlLabel} xs={12} md={2}>
              Skrivtecken
            </Col>
            <Col xs={12} md={10}>
              <FormControl
                type="text"
                name="jpWrite"
                placeholder="Skrivtecken"
                value={this.state.jpWrite}
                onChange={event => this.onInputChange(event)}
              />
              <FormControl.Feedback/>
            </Col>
          </FormGroup>
          <FormGroup bsSize="small" validationState={this.state.validationStates.wordType}>
            <Col componentClass={ControlLabel} xs={12} md={2}>
              Ordklass
            </Col>
            <Col xs={12} md={10}>
              <FormControl
                componentClass="select"
                name="wordType"
                defaultValue="Ordklass"
                onChange={event => this.onInputChange(event)}
              >
                <option value="Ordklass">Ordklass</option>
                {this.props.wordTypes.map((type, index) => <option key={index} value={type.type}>{type.type}</option>)}
              </FormControl>
              <FormControl.Feedback/>
            </Col>
          </FormGroup>
          <FormGroup bsSize="small" validationState={this.state.validationStates.books}>
            <Col componentClass={ControlLabel} xs={12} md={2}>
              Bokreferenser
            </Col>
            <Col xs={12} md={10}>
              <FormControl multiple
                componentClass="select"
                name="books"
                onChange={event => this.onInputChange(event)}
              >
                {this.props.books.map((ref, index) => <option key={index} value={ref.title}>{ref.title}</option>)}
              </FormControl>
              <FormControl.Feedback/>
            </Col>
          </FormGroup>
          <FormGroup>
            {!this.state.error ? this.renderErrorMsg : null}
            <Col xs={12} md={12}>
              <NuggetButtonToolbar formIsValid={this.formIsValid} handleCreateNugget={this.props.handleCreateNugget}/>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default NuggetForm;
