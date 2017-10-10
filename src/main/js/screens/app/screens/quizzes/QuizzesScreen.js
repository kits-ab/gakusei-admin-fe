import React from 'react';
import { Alert, Grid, FormControl, Button, ButtonGroup, Panel } from 'react-bootstrap';
import quizService from '../../../../shared/services/quizService';
import QuizBox from './QuizBox';
import QuizForm from './QuizForm';

class QuizzesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      search: '',
      offset: 0,
      showCreate: false,
      error: '',
    };
  }

  componentWillMount = () => {
    this.getQuizzes('', 0);
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.getQuizzes(event.target.value, 0);
  }

  getQuizzes = (searchPattern, offset) => {
    quizService().getAll(searchPattern, offset).then((response) => {
      if (response.status === 200) {
        response.text().then((text) => {
          try {
            const data = JSON.parse(text);
            if (offset > 0) {
              let ls = this.state.quizzes.slice();
              this.setState({
                quizzes: ls.concat(data),
                offset,
              });
            } else {
              this.setState({
                quizzes: data,
                offset,
              });
            }
          } catch (err) {
            this.setState({
              quizzes: [],
              offset,
            });
          }
        });
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({ error: 'Kunde inte hämta quiz' });
    });
  }

  handleCreateQuiz = (ifnew) => {
    this.setState({
      showCreate: false,
    });

    if (ifnew) {
      this.setState({
        search: '',
      });
      this.getQuizzes('', 0);
    }
  }

  handleLoadMore = () => {
    const offset = this.state.offset + 1;
    this.getQuizzes(this.state.search, offset);
  }

  handleDeleteQuiz = (deletedQuizId) => {
    this.setState(prevState => ({
      quizzes: prevState.quizzes.filter(quiz => quiz.id !== deletedQuizId)
    }));
  }

  renderMsg = (type) => {
    switch (type) {
      case 'no quizzes':
        return (
          <Alert bsStyle="warning">
            <strong>Inga quiz-ar hittades!</strong>
          </Alert>
        );
      case 'error':
        return this.renderErrorMsg();
      default:
        return this.renderErrorMsg();
    }
  }


  renderErrorMsg = () => (
    <Alert bsStyle="danger">
      <strong>Ett fel upptäcktes!</strong>
      <p>{this.state.error}</p>
    </Alert>
  )

  render() {
    return (
      <Grid>
        <h2>Tillgängliga quiz</h2>
        <br/>
        {
          this.state.showCreate
            ?
              <QuizForm handleCreateQuiz={this.handleCreateQuiz}/>
            :
              <div>
                <Button id="createButton" bsStyle="success" onClick={() => this.setState({ showCreate: true })}>Skapa nytt quiz</Button>
              </div>
        }
        <br/>
        <Panel bsStyle="primary" header="Sök">
          <FormControl
            type="text"
            name="search"
            placeholder="Sök efter quiz"
            value={this.state.search}
            onChange={this.onInputChange}
          />
        </Panel>
        {this.state.quizzes.length === 0 ? this.renderMsg('no quizzes') : null}
        {this.state.error ? this.renderMsg('error') : null}
        {this.state.quizzes.map(quiz => (
          <QuizBox key={quiz.id} quiz={quiz} handleDeleteQuiz={this.handleDeleteQuiz}/>
        ))}
        <ButtonGroup vertical block>
          <Button
            label="load"
            bsStyle="primary"
            name="load"
            disabled={
              (this.state.quizzes.length - (10 * this.state.offset)) < 10
            }
            onClick={() => this.handleLoadMore}
          >
            Ladda in fler
          </Button>
        </ButtonGroup>
      </Grid>
    );
  }
}

export default QuizzesScreen;

