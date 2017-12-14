import React from 'react';
import { Alert, Modal, Panel, ModalBody, Button, ButtonToolbar,
  Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import lessonService from '../../../../../shared/services/lessonService';
import nuggetService from '../../../../../shared/services/nuggetService';

class LessonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nuggets: [],
      editNuggets: [],
      editState: [],
      error: '',
      editLesson: {},
      editLessonState: false,
    };
  }

  componentWillMount = () => {
    lessonService().get(this.props.lesson.id).then((response) => {
      if (response.status === 200) {
        response.text().then(text =>
          this.setState({ 
            nuggets: JSON.parse(text).nuggets, 
            editNuggets: JSON.parse(text).nuggets,
            editState: new Array(JSON.parse(text).nuggets.length).fill(false),
            editLesson: this.props.lesson,
          })
        );
      } else {
        this.setState({ error: 'Kunde inte hämta nuggets' });
      }
    });
  };

  closeModal = () => {
    this.props.closeModal();
  };

  getSelected = options => (
    Object.keys(options).filter(key => options[key].selected).reduce((acc, key) => {
      acc.push(options[key].value);
      return acc;
    }, [])
  );

  onInputChange = (event, index) => {
    let name = event.target.name;
    let options = event.target.options;

    let value;
    if (name === 'books') {
      value = this.props.books.filter(book => this.getSelected(options).includes(book.title));
    } else if (name === 'wordType') {
      value = this.props.wordTypes.find(wt => wt.type === event.target.value);
    } else {
      value = event.target.value;
    }

    let updateEditNuggets = this.state.editNuggets;
    updateEditNuggets[index][name] = value;
    this.setState({ editNuggets: updateEditNuggets });
  }

  updateNugget = (nugget, index) => {
    nuggetService().update(nugget);
    this.setEditState(index);
    this.setNewNugget(nugget, index);
  }

  setNewNugget = (nugget, index) => {
    let newNuggets = this.state.nuggets;
    newNuggets[index] = nugget;
    this.setState({ nuggets: newNuggets });
  }

  resetEditNugget = (index) => {
    let newEditNuggets = this.state.editNuggets;
    newEditNuggets[index] = this.state.nuggets[index];
    this.setState({ editNuggets: newEditNuggets });
    this.setEditState(index);
  }

  setEditState = (index) => {
    let newEditState = this.state.editState;
    newEditState[index] = !newEditState[index];
    this.setState({ editState: newEditState });
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
          <Button bsStyle='primary' onClick={() => this.setEditState(index)} > Redigera nugget </Button>
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
          <ButtonToolbar>
            <Button bsStyle='primary' onClick={() => this.updateNugget(nugget, index)} > Spara ändringar </Button>
            <Button bsStyle='danger' onClick={() => this.resetEditNugget(index)} > Avbryt </Button>
          </ButtonToolbar>
        </Panel>
      </div>
    );
  }

  showEditButtons = () => {
    const clickFunc = () => this.setState({ editLessonState: !this.state.editLessonState });

    return (
      <div>
        { this.state.editLessonState ?
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

  editLessonDetails = () => (
      <div>
        <Form horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} md={3} >
              Namn:
            </Col>
            <Col md={9} >
              <FormControl
                name="name"
                placeholder={this.state.editLesson.name}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={3} >
              Beskrivning:
            </Col>
            <Col md={9} >
              <FormControl
                name="description"
                placeholder={this.state.editLesson.description}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
  )

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
              { this.state.editLessonState ?
                this.editLessonDetails()
              :
                <div>
                  <h4>
                    <strong>Namn: </strong>
                    {lesson.name}
                  </h4>
                  <h4>
                    <strong>Beskrivning: </strong>
                    {lesson.description}
                  </h4>
                </div>
              }
              <h4><strong>Uttryck:</strong></h4>
              {this.state.nuggets.map((nugget, index) => {
                const editing = this.state.editState[index];
                return (editing ? 
                  this.editNuggetDetails(index)
                  :
                  this.displayNuggetDetails(nugget, index)
                );
              })}
            </div>
          }
        </Modal.Body>
      </Modal>
    );
  }
}

export default LessonModal;
