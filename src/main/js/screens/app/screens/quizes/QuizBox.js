import React from 'react';
import { Alert, Button, Panel, ButtonToolbar } from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';


class QuizBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false,
      quizDeleted: false,
      deleteAlertVisible: true
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  mouseEnter() {
    this.setState({ showButtons: true });
  }

  mouseExit = () => {
    this.setState({ showButtons: false });
  }

  handleDeleteQuiz(id) {
    this.props.handleDeleteQuiz(id);
  }

  deleteQuiz(id) {
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

  render() {
    let quiz = this.props.quiz;
    return (
      <div>
        {this.state.quizDeleted ? (
          <Alert bsStyle="info" onDismiss={() => this.handleDeleteQuiz(quiz.id) }>
            <strong>{quiz.name}</strong> har raderats.
          </Alert>
        ) : (
          <Panel
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseExit}>
            <h3>{quiz.name}</h3>
            <p>{quiz.description}</p>
            {this.state.showButtons ?
              <ButtonToolbar>
                <Button bsStyle="primary">Visa</Button>
                <Button bsStyle="danger" onClick={() => this.deleteQuiz(quiz.id)}>Ta bort</Button>
              </ButtonToolbar>
              :
              null
            }
          </Panel>
        )}
      </div>
    );
  }
}

export default QuizBox;
