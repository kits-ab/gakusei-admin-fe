import React from 'react';
import { Alert, Modal, Panel, Form, ControlLabel, FormControl, FormGroup, Col } from 'react-bootstrap';

class NuggetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      editNugget: JSON.parse(JSON.stringify(this.props.nugget)),
    };
  }

  displayNuggetDetails = nugget => (
    <div key={nugget.id.concat('modal')}>
      <strong>Beskrivning: </strong>
      {nugget.description}
      <br/>
      <strong>Svenska: </strong>
      {nugget.swedish}
      <br/>
      <strong>Engelska: </strong>
      {nugget.english}
      <br/>
      <strong>Kanji: </strong>
      {nugget.jpRead}
      <br/>
      <strong>Hiragana: </strong>
      {nugget.jpWrite}
      <br/>
      <strong>Bokreferenser: </strong>
      {Object.prototype.hasOwnProperty.call(nugget, 'books') ? nugget.books.map(book => book.title).join(', ') : ''}
      <br/>
      <strong>Ordklass: </strong>
      {nugget.wordType.type}
      <br/>
    </div>
  );

  editNuggetDetails = () => {
    let nugget = this.props.nugget;
    let editNugget = this.state.editNugget;
    return (
      <div>
        <Form horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Beskrivning:
            </Col>
            <Col md={10}>
              <FormControl
                onChange={event => this.onInputChange(event)}
                type="text"
                name="description"
                value={editNugget.description}
                placeholder={nugget.description}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Svenska:
            </Col>
            <Col md={10}>
              <FormControl
                onChange={event => this.onInputChange(event)}
                type="text"
                name="swedish"
                value={editNugget.swedish}
                placeholder={nugget.swedish}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Engelska:
            </Col>
            <Col md={10}>
              <FormControl
                onChange={event => this.onInputChange(event)}
                type="text"
                name="english"
                value={editNugget.english}
                placeholder={nugget.english}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Kanji:
            </Col>
            <Col md={10}>
              <FormControl
                onChange={event => this.onInputChange(event)}
                type="text"
                name="jpRead"
                value={editNugget.jpRead}
                placeholder={nugget.jpRead}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Hiragana:
            </Col>
            <Col md={10}>
              <FormControl
                onChange={event => this.onInputChange(event)}
                type="text"
                name="jpWrite"
                value={editNugget.jpWrite}
                placeholder={nugget.jpWrite}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Bokreferenser:
            </Col>
            <Col md={10}>
              <FormControl
                onChange={event => this.onInputChange(event)}
                multiple
                componentClass="select"
                name="books"
                value={nugget.books.map(book => book.title)}
              >
                {this.props.books.map(book => <option key={book.title} value={book.title} > {book.title} </option>)}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Ordklass:
            </Col>
            <Col md={10}>
              <FormControl
                onChange={event => this.onInputChange(event)}
                componentClass="select"
                name="description"
                value={nugget.wordType.type}
              >
                {this.props.wordTypes.map(type => <option key={type.type} value={type.type} > {type.type} </option>)}
              </FormControl>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
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
    let value = name === 'books' 
                          ? this.props.books.filter(book => this.getSelected(options).includes(book.title)) 
                          : event.target.value;
    let editNugget = this.state.editNugget;
    editNugget[name] = value;
    this.setState({ editNugget });
  }

  render() {
    let nugget = this.props.nugget;
    return (
      <Modal show={this.props.viewNugget} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Uttryck: {nugget.swedish}</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.error ?
            <Alert bsStyle="warning"> {this.state.error} </Alert>
            :
            <div>{this.displayNuggetDetails(nugget)}{this.editNuggetDetails()}</div>
          }
        </Modal.Body>
      </Modal>
    );
  }
}

export default NuggetModal;
