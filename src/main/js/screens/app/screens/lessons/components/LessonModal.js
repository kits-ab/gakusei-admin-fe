import React from 'react';
import { Alert, Modal, Panel, ModalBody, Button, ButtonToolbar,
  Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import lessonService from '../../../../../shared/services/lessonService';

class LessonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nuggets: [],
      editNuggets: [],
      error: '',
      editLesson: false,
    };
  }

  componentWillMount = () => {
    lessonService().get(this.props.lesson.id).then((response) => {
      if (response.status === 200) {
        response.text().then(text => this.setState({ nuggets: JSON.parse(text).nuggets, editNuggets: JSON.parse(text).nuggets }));
      } else {
        this.setState({ error: 'Kunde inte hämta nuggets' });
      }
    });
  };

  closeModal = () => {
    this.props.closeModal();
  };

  onInputChange = (event, index) => {
    let updateEditNuggets = this.state.editNuggets;
    updateEditNuggets[index][event.target.name] = event.target.value;
    this.setState({ editNuggets: updateEditNuggets });
  }

  displayNuggetDetails = (nugget, index) => {
    // kanji-nuggets har inte någon wordtype, ta bort när kanji flyttas till egen tabell
    let wordType = 'kanji-nugget';
    if (nugget.wordType !== null) {
      wordType = nugget.wordType.type;
    }
    return (
      <div key={this.props.lesson.name.concat(nugget.id)}>
        <Panel bsStyle="primary" header={nugget.swedish}>
          <strong>Svenska: </strong>
          {nugget.swedish}
          <br/>
          <strong>Engelska: </strong>
          {nugget.english}
          <br/>
          <strong>Lästecken: </strong>
          {nugget.jpRead}
          <br/>
          <strong>Skrivtecken: </strong>
          {nugget.jpWrite}
          <br/>
          <strong>Bokreferenser: </strong>
          {Object.prototype.hasOwnProperty.call(nugget, 'books') ? nugget.books.map(book => book.title).join(', ') : ''}
          <br/>
          <strong>Ordklass: </strong>
          {wordType}
          <br/>
        </Panel>
      </div>
    );
  };

  editNuggetDetails = (index) => {
    let nugget = this.state.editNuggets[index]; 
    return (
      <div key={this.props.lesson.name.concat(nugget.id)}>
        <Panel bsStyle="primary" header={nugget.swedish}>
          <Form horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} md={2} >
                Svenska: 
              </Col>
              <Col md={10}>
                <FormControl
                  type="text"
                  name="swedish"
                  placeholder={nugget.swedish}
                  onChange={event => this.onInputChange(event, index)}
                  value={nugget.swedish}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} md={2} >
                Engelska: 
              </Col>
              <Col md={10} >
                <FormControl
                  type="text"
                  name="english"
                  placeholder={nugget.english}
                  onChange={event => this.onInputChange(event, index)}                  
                  value={nugget.english}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} md={2} >
                Lästecken: 
              </Col>
              <Col md={10} >
                <FormControl
                  type="text"
                  name="jpRead"
                  placeholder={nugget.jpRead}
                  onChange={event => this.onInputChange(event, index)} 
                  value={nugget.jpRead}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} md={2} >
                Skrivtecken: 
              </Col>
              <Col md={10} >
                <FormControl
                  type="text"
                  name="jpWrite"
                  placeholder={nugget.jpWrite}
                  onChange={event => this.onInputChange(event, index)} 
                  value={nugget.jpWrite}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} md={2} >
                Bokreferens:  
              </Col>
              <Col md={10} >
                <FormControl
                  multiple
                  componentClass="select"
                  onChange={event => this.onInputChange(event, index)} 
                  name="books"
                >
                  {this.props.books.map(book => <option key={book.title} value={book.title}>{book.title}</option>)}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} md={2} >
                Ordklass:   
              </Col>
              <Col md={10} >
                <FormControl
                  componentClass="select"
                  onChange={event => this.onInputChange(event, index)} 
                  name="wordType"
                >
                  <option>Alla ordklasser</option>
                  {this.props.wordTypes.map((wordType, i) =>
                    <option key={wordType.type} value={wordType.type}>{wordType.type}</option>)}
                </FormControl>
              </Col>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  }

  showEditButtons = () => {
    let floatStyle = {
      float: 'right'
    };

    const clickFunc = () => this.setState({ editLesson: !this.state.editLesson });

    return (
      <div style={ floatStyle } >
        { this.state.editLesson ?
          <ButtonToolbar>
            <Button bsStyle='primary' onClick={clickFunc} > Spara ändringar </Button>
            <Button bsStyle='danger' onClick={clickFunc} > Avbryt </Button>
          </ButtonToolbar>
        :
          <Button bsStyle='primary' onClick={clickFunc} > Redigera lektion </Button>
        }
      </div>
    );
  }

  render() {
    let lesson = this.props.lesson;
    return (
      <Modal show={this.props.viewLesson} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Lesson: </strong> {lesson.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.error ?
            <Alert bsStyle="warning"> {this.state.error} </Alert>
            :
            <div>
              {this.showEditButtons()}
              <h4>
                <strong>Namn: </strong>
                {lesson.name}
              </h4>
              <h4>
                <strong>Beskrivning: </strong>
                {lesson.description}
              </h4>
              <h4><strong>Uttryck:</strong></h4>
              {this.state.nuggets.map((nugget, index) => {
                return (this.state.editLesson ? 
                  this.editNuggetDetails(index)
                  :
                  this.displayNuggetDetails(nugget, index)
                );
              })}
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          {this.showEditButtons()}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default LessonModal;
