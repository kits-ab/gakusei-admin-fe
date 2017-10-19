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
      editQuestions: [],
    };
  }

  componentWillMount = () => {
    this.getQuizNuggets(this.props.quiz.id);
  }

  setEditState = () => {
    for (let index = 0; index < this.state.nuggets.length; index++) {
      let nugget = this.state.nuggets[index];
      window.console.log(nugget);
      let incorrectAnswers = nugget.incorrectAnswers.map(answerObject => answerObject.incorrectAnswer).join(', ');
      let oldIncorrectAnswers = this.state.editIncorrectAnswers;
      let oldCorrectAnswers = this.state.editAnswers;
      let oldQuestions = this.state.editQuestions;

      oldCorrectAnswers[index] = nugget.correctAnswer;
      oldIncorrectAnswers[index] = incorrectAnswers;
      oldQuestions[index] = nugget.question;

      this.setState({ editAnswers: oldCorrectAnswers, editIncorrectAnswers: oldIncorrectAnswers, editQuestions: oldQuestions });
    }
  }

  getQuizNuggets = (id) => {
    quizService().getQuizNuggets(id).then((response) => {
      if (response.status === 200) {
        response.text().then((text) => {
          this.setState({ nuggets: JSON.parse(text) });
          this.setEditState();
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
    this.setState({ editing: false });
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

  handleQuestionChange = (event, i) => {
    let value = this.state.editQuestions;
    value[i] = event.target.value;
    this.setState({ editQuestions: value });
  }

  editQuiz = () => {
    this.setState({ editing: !this.state.editing });
  }

  saveNewQuiz = () => {
    let newQuiz = {
      id: this.props.quiz.id,
      name: this.state.editName,
      description: this.state.editDescription,
    };
    
    quizService().updateQuiz(newQuiz);
  }

  questionHeader = (question, index) => {
    const style = this.state.editing ? { color: 'black' } : {};
    return (
      this.state.editing 
      ?
        <FormControl 
          style={style}
          type="text"
          value={this.state.editQuestions[index]}
          placeholder={question}
          onChange={event => this.handleQuestionChange(event, index)}
        />
      :
        question
    );
  }

  displayNuggetDetails = (nugget, index) => {
    let incorrectAnswers = nugget.incorrectAnswers.map(answerObject => answerObject.incorrectAnswer).join(', ');
    return (
      <Panel key={nugget.id} bsStyle="primary" header={this.questionHeader(nugget.question, index)}>
        <strong>Rätt svar: </strong> 
        {this.state.editing 
        ? 
          <FormControl 
            type="text" 
            placeholder={nugget.correctAnswer} 
            value={this.state.editAnswers[index]}
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
            value={this.state.editIncorrectAnswers[index]}
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
