import React from 'react';
import { Alert, Modal, Panel, FormControl, Button } from 'react-bootstrap';
import quizService from '../../../../shared/services/quizService';

class QuizModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nuggets: [],
      error: '',
      editing: false,
      editName: this.props.quiz.name,
      editDescription: this.props.quiz.description,
      editAnswers: [],
      editIncorrectAnswers: [],
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

  handleNameChange = (e) => {
    this.setState({ editName: e.target.value });
  }

  handleDescriptionChange = (e) => {
    this.setState({ editDescription: e.target.value });
  }

  handleAnswerChange = (event, i) => {
    let value = this.state.editAnswers;
    value[i] = event.target.value;
    this.setState({ editAnswers: value });
  }

  handleIncorrectAnswerChange = (event, i) => {
    let value = this.state.editIncorrectAnswers;
    value[i] = event.target.value;
    this.setState({ editIncorrectAnswers: value });
  }

  editQuiz = () => {
    this.setState({ editing: !this.state.editing });
  }

  saveNewQuiz = () => {
    window.console.log(this.state.editIncorrectAnswers);
  }

  displayNuggetDetails = (nugget, index) => {
    let incorrectAnswers = nugget.incorrectAnswers.map(answerObject => answerObject.incorrectAnswer).join(', ');
    return (
      <Panel key={nugget.id} bsStyle="primary" header={nugget.question}>
        <strong>Rätt svar: </strong> 
        {this.state.editing 
        ? 
          <FormControl 
            type="text" 
            placeholder={nugget.correctAnswer} 
            onChange={event => this.handleAnswerChange(event, index)} 
          /> 
        : 
          nugget.correctAnswer
        }
        <br/>
        <strong>Felaktiga svar: </strong> 
        {this.state.editing 
        ? 
          <FormControl 
            type="text" 
            placeholder={incorrectAnswers} 
            onChange={event => this.handleIncorrectAnswerChange(event, index)}
          /> 
        : 
          incorrectAnswers
        }
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
              <h4>
                <strong>Namn: </strong> 
                {this.state.editing 
                ? 
                  <FormControl 
                    type="text" 
                    placeholder={quiz.name} 
                    value={this.state.editName} 
                    onChange={this.handleNameChange} 
                  /> 
                : 
                  quiz.name
                }
              </h4>
              <h4>
                <strong>Beskrivning: </strong> 
                {this.state.editing 
                ? 
                  <FormControl 
                    type="text" 
                    placeholder={quiz.description} 
                    value={this.state.editDescription} 
                    onChange={this.handleDescriptionChange} 
                  /> 
                : 
                  quiz.description
                }
              </h4>
              <h4><strong>Frågor:</strong></h4>
              {this.state.nuggets.map((nugget, index) => (
                this.displayNuggetDetails(nugget, index)
              ))}
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          {this.state.editing
          ? 
            <div>
              <Button bsStyle='primary' onClick={this.saveNewQuiz} > Spara ändringar </Button>
              <Button bsStyle='danger' onClick={this.editQuiz} > Avbryt </Button>
            </div>
          :
            <Button bsStyle='primary' onClick={this.editQuiz} > Redigera quiz </Button>
          }
        </Modal.Footer>
      </Modal>
    );
  }
}


export default QuizModal;
