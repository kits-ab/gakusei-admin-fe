import React from 'react';
import { Alert, Button, Panel, ButtonToolbar } from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';
import QuizModal from './QuizModal';


class QuizBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizDeleted: false,
      deleteAlertVisible: true,
      viewQuiz: false,
    };
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
        error: 'Något gick fel'
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
          <Alert bsStyle="info" id={`deleteAlert${quiz.name}`} onDismiss={() => this.handleDeleteQuiz(quiz.id) }>
            <strong>{quiz.name}</strong> har raderats.
          </Alert>
        ) : (
          <div>
            <Panel
              id={quiz.name}>
              <h3>{quiz.name}</h3>
              <p>{quiz.description}</p>
              <ButtonToolbar>
                <Button bsStyle="primary" id={`show${quiz.name}`} onClick={this.openModal}>Visa</Button>
                <Button bsStyle="danger" id={`delete${quiz.name}`} onClick={() => this.deleteQuiz(quiz.id)}>Ta bort</Button>
              </ButtonToolbar>
            </Panel>
            <QuizModal quiz={quiz} closeModal={this.closeModal} viewQuiz={this.state.viewQuiz}/>
          </div>
        )}
      </div>
    );
  }
}

export default QuizBox;
