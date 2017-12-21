import React from 'react';
import { Modal, Button, Form, FormGroup, FormControl, ControlLabel, Col, ButtonToolbar } from 'react-bootstrap';

class KanjiModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editState: false,
      editKanji: JSON.parse(JSON.stringify(this.props.kanji)),
    };
  }

  displayKanjiDetails = () => {
    let kanji = this.props.kanji;
    return (
      <div>
        <strong>Beskrivning: </strong> {kanji.description}
        <br />
        <strong>Svenska: </strong> {kanji.swedish}
        <br />
        <strong>Engelska: </strong> {kanji.english}
        <br />
        <strong>Kanji: </strong> {kanji.kanji}
        <br />
        <strong>Bokreferenser: </strong> {kanji.books.map(book => book.title).join(', ')}
        <br />
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
    let editKanji = this.state.editKanji;
    editKanji[name] = value;
    this.setState({ editKanji });
  }

  updateKanji = () => {
    this.props.update(this.state.editKanji);
    this.resetEditKanji();
  }

  resetEditKanji = () => {
    this.setState({ editKanji: JSON.parse(JSON.stringify(this.props.kanji)), editState: false });
  }

  editKanjiDetails = () => {
    let kanji = this.props.kanji;
    let editKanji = this.state.editKanji;
    return (
      <div>
        <Form horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Beskrivning:
            </Col>
            <Col md={10} >
              <FormControl 
                onChange={event => this.onInputChange(event)}
                type="text"
                name="description"
                value={editKanji.description}
                placeholder={kanji.description}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Svenska:
            </Col>
            <Col md={10} >
              <FormControl 
                onChange={event => this.onInputChange(event)}
                type="text"
                name="swedish"
                value={editKanji.swedish}
                placeholder={kanji.swedish}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Engelska:
            </Col>
            <Col md={10} >
              <FormControl 
                onChange={event => this.onInputChange(event)}
                type="text"
                name="english"
                value={editKanji.english}
                placeholder={kanji.english}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Kanji:
            </Col>
            <Col md={10} >
              <FormControl 
                onChange={event => this.onInputChange(event)}
                type="text"
                name="kanji"
                value={editKanji.kanji}
                placeholder={kanji.kanji}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Bokreferenser:
            </Col>
            <Col md={10} >
              <FormControl 
                onChange={event => this.onInputChange(event)}
                multiple
                componentClass="select"
                name="books"
                value={kanji.books.map(book => book.title)}
              >
                {this.props.books.map(book => <option key={book.title} value={book.title}>{book.title}</option>)}
              </FormControl>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal} >
        <Modal.Header closeButton>
          <Modal.Title><strong>Kanji: {this.props.kanji.description}</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.state.editState ?
            this.editKanjiDetails()
          :
            this.displayKanjiDetails()}
        </Modal.Body>
        <Modal.Footer>
          {this.state.editState ? 
            <ButtonToolbar className="pull-right" >
              <Button bsStyle="primary" onClick={this.updateKanji} > Spara ändringar </Button>
              <Button bsStyle="danger" onClick={this.resetEditKanji} > Avbryt </Button>
            </ButtonToolbar>
          :
            <Button 
              bsStyle="primary" 
              onClick={() => this.setState({ editState: true })} >
                Redigera kanji
              </Button>
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

export default KanjiModal;
