import React from 'react';
import { Alert, Grid, FormControl, Button, ButtonGroup } from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';
import QuizBox from './QuizBox';
import QuizForm from './QuizForm';

class QuizzesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizes: [],
      search: '',
      offset: 0,
      showCreate: false,
    };

  }

  componentWillMount = () => {
    this.getQuizes('', 0);
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.getQuizes(event.target.value, 0);
  }

  getQuizes = (searchPattern, offset) => {
    quizService().getAll(searchPattern, offset).then((response) => {
      switch (response.status) {
        case 200:
          response.text().then((text) => {
            try {
              const data = JSON.parse(text);
              if (offset > 0) {
                let ls = this.state.quizes.slice();
                this.setState({
                  quizes: ls.concat(data),
                  offset,
                });
              } else {
                this.setState({
                  quizes: data,
                  offset,
                });
              }
            } catch (err) {
              this.setState({
                quizes: [],
                offset,
              });
            }
          });
          break;
        default:
          throw new Error();
      }
    }).catch((err) => {
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
      this.getQuizes('', 0);
    }
  }

  handleLoadMore = () => {
    const offset = this.state.offset + 1;
    this.getQuizes(this.state.search, offset);
  }

  handleDeleteQuiz = (deletedQuizId) => {
    this.setState(prevState => ({
      quizes: prevState.quizes.filter(quiz => quiz.id !== deletedQuizId)
    }));
  }

  render() {
    return (
      <Grid>
        <h2>Tillgängliga quiz-ar</h2>
        {
          this.state.showCreate
            ?
            <QuizForm callParent={this.handleCreateQuiz}/>
            :
            <p>
              <Button id="createButton" bsStyle="success" onClick={() => this.setState({ showCreate: true })}>Skapa en ny</Button><br/>
            </p>
        }
        <FormControl
          type="text"
          name="search"
          placeholder="Sök efter quiz-ar"
          value={this.state.search}
          onChange={this.onInputChange}
        />
        <br/>
        {
          this.state.quizes.length === 0
            ?
            <Alert bsStyle="warning">
              <strong>Inga quiz-ar hittades!</strong>
            </Alert>
            :
            null
        }
        {this.state.quizes.map(quiz => (
          <QuizBox key={quiz.id} quiz={quiz} handleDeleteQuiz={this.handleDeleteQuiz}/>
        ))}
        <ButtonGroup vertical block>
          <Button
            label="load"
            bsStyle="primary"
            name="load"
            disabled={
              (this.state.quizes.length - (10 * this.state.offset)) < 10
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

