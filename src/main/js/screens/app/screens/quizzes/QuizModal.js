import React from 'react';
import { Alert, Modal, Panel } from 'react-bootstrap';
import quizService from '../../../../shared/services/quizService';

class QuizModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nuggets: [],
      error: '',
    };
  }

  componentWillMount = () => {
    this.getQuizNuggets(this.props.quiz.id);
  }

  getQuizNuggets = (id) => {
    quizService().getQuizNuggets(id).then((response) => {
      if (response.status === 200) {
        response.text().then((text) => {
          this.setState({ nuggets: JSON.parse(text) });
        }).catch((err) => {
          this.setState({
            error: 'Kunde inte hantera nuggets'
          });
        });
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({
        error: 'Kunde inte hämta nuggets'
      });
    });
  }

  closeModal = () => {
    this.props.closeModal();
  }

  displayNuggetDetails = (nugget) => {
    let incorrectAnswers = nugget.incorrectAnswers.map(answerObject => answerObject.incorrectAnswer).join(', ');
    return (
      <Panel key={nugget.id} bsStyle="primary" header={nugget.question}>
        <strong>Rätt svar: </strong> {nugget.correctAnswer}
        <br/>
        <strong>Felaktiga svar: </strong> {incorrectAnswers}
      </Panel>
    );
  }

  render() {
    let quiz = this.props.quiz;
    return (
      <Modal show={this.props.viewQuiz} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Quiz: </strong> {quiz.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.error ?
            <Alert bsStyle="warning"> {this.state.error} </Alert>
            :
            <div>
              <h4><strong>Namn: </strong> {quiz.name}</h4>
              <h4><strong>Beskrivning: </strong> {quiz.description}</h4>
              <h4><strong>Frågor:</strong></h4>
              {this.state.nuggets.map(nugget => (
                this.displayNuggetDetails(nugget)
              ))}
            </div>
          }
        </Modal.Body>
      </Modal>
    );
  }
}


export default QuizModal;
