import React from 'react';
import { Alert, Modal, Panel } from 'react-bootstrap';
import lessonService from '../../../../../shared/services/lessonService';

class LessonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nuggets: [],
      error: '',
    };
  }

  componentWillMount = () => {
    lessonService().get(this.props.lesson.id).then((response) => {
      if (response.status === 200) {
        response.text().then(text => this.setState({ nuggets: JSON.parse(text).nuggets }));
      } else {
        this.setState({ error: 'Kunde inte hämta nuggets' });
      }
    });
  };

  closeModal = () => {
    this.props.closeModal();
  };

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
              <h4>
                <strong>Namn: </strong>
                {lesson.name}
              </h4>
              <h4>
                <strong>Beskrivning: </strong>
                {lesson.description}
              </h4>
              <h4><strong>Uttryck:</strong></h4>
              {this.state.nuggets.map((nugget, index) => (
                this.displayNuggetDetails(nugget, index)
              ))}
            </div>
          }
        </Modal.Body>
      </Modal>
    );
  }
}

export default LessonModal;
