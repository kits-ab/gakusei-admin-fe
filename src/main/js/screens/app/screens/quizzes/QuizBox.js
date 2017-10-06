import React from 'react';
import { Alert, Button, Panel, ButtonToolbar, Modal } from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';


class QuizBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false,
      quizDeleted: false,
      deleteAlertVisible: true,
      viewQuiz: false,
    };
  }

  mouseEnter = () => {
    this.setState({ showButtons: true });
  }

  mouseExit = () => {
    this.setState({ showButtons: false });
  }

  handleDeleteQuiz = (id) => {
    this.props.handleDeleteQuiz(id);
  }

  deleteQuiz = (id) => {
    quizService().delete(id).then((response) => {
      if (response.status === 200) {
        this.setState({
          quizDeleted: true
        });
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({
        error: 'Något fick fel'
      });
    });
  }

  openModal = () => {
    this.setState({ viewQuiz: true });
  }

  closeModal = () => {
    this.setState({ viewQuiz: false });
  }

  render() {
    let quiz = this.props.quiz;
    return (
      <div>
        {this.state.quizDeleted ? (
          <Alert bsStyle="info" onDismiss={() => this.handleDeleteQuiz(quiz.id) }>
            <strong>{quiz.name}</strong> har raderats.
          </Alert>
        ) : (
          <div>
            <Panel
              id={quiz.name}
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseExit}>
              <h3>{quiz.name}</h3>
              <p>{quiz.description}</p>
              {this.state.showButtons ?
                <ButtonToolbar>
                  <Button bsStyle="primary" onClick={this.openModal}>Visa</Button>
                  <Button bsStyle="danger" name="delete" onClick={() => this.deleteQuiz(quiz.id)}>Ta bort</Button>
                </ButtonToolbar>
                :
                null
              }
            </Panel>
            <Modal show={this.state.viewQuiz} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title><strong>Quiz: </strong> {quiz.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <h4><strong>Namn: </strong> {quiz.name}</h4>
                  <h4><strong>Beskrivning: </strong> {quiz.description}</h4>
              </Modal.Body>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default QuizBox;
