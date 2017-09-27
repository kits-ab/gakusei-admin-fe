import React from 'react';
import {
  Alert, Grid, Row, Col, Form, FormGroup, FormControl, Button,
  ButtonGroup, Panel, ButtonToolbar
} from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';

class QuizesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizes: [],
      search: '',
      offset: 0,
      showCreate: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleCreateQuiz = this.handleCreateQuiz.bind(this);
  }

  componentWillMount() {
    this.getQuizes('', 0);
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.getQuizes(event.target.value, 0);
  }

  getQuizes(searchPattern, offset) {
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

  handleCreateQuiz(ifnew) {
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

  handeLoadMore() {
    const offset = this.state.offset + 1;
    this.getQuizes(this.state.search, offset);
  }

  render() {
    return (
      <Grid>
        <h2>Tillgängliga quiz-ar</h2>
        {
          this.state.showCreate
            ?
            <CreateQuiz callParent={this.handleCreateQuiz}/>
            :
            <p>
              <Button bsStyle="success" onClick={() => this.setState({ showCreate: true })}>Skapa en ny</Button><br/>
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
          <QuizBox key={quiz.id} quiz={quiz}/>
        ))}
        <ButtonGroup vertical block>
          <Button
            label="load"
            bsStyle="primary"
            name="load"
            disabled={
              (this.state.quizes.length - (10 * this.state.offset)) < 10
            }
            onClick={() => this.handeLoadMore()}
          >
            Ladda in fler
          </Button>
        </ButtonGroup>
      </Grid>
    );
  }
}

export default QuizesScreen;

class QuizBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false,
    };

    this.mouseEnter = this.mouseEnter.bind(this);
  }

  mouseEnter() {
    this.setState({ showButtons: true });
  }

  mouseExit = () => {
    this.setState({ showButtons: false });
  }

  render() {
    let quiz = this.props.quiz;
    return (
      <Panel
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseExit}>
        <h3>{quiz.name}</h3>
        <p>{quiz.description}</p>
        {this.state.showButtons ?
          <ButtonToolbar>
            <Button bsStyle="primary">Visa</Button>
            <Button bsStyle="danger">Ta bort</Button>
          </ButtonToolbar>
          :
          null
        }
      </Panel>
    );
  }
}

class CreateQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      error: null,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const obj = { name: this.state.name, description: this.state.description };
    quizService().create(obj).then((response) => {
      if (response.status === 201) {
        this.props.callParent(true);
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({
        error: 'Något fick fel',
      });
    });
  }

  renderErrorMsg() {
    if (this.state.error != null) {
      return (
        <Alert bsStyle="danger">
          <strong>Ett fel upptäcktes!</strong>
          <p>{this.state.error}</p>
        </Alert>
      );
    }
    return '';
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <Panel>
        <h3>Skapa en ny quiz</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              type="text"
              name="name"
              placeholder="Ange ett quiznamn"
              value={this.state.name}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="text"
              name="description"
              placeholder="Ange en beskrivning"
              value={this.state.description}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup>
            {this.renderErrorMsg()}
            <ButtonGroup vertical block>
              <Button
                type="submit"
                label="create"
                bsStyle="primary"
                name="create"
                disabled={!this.state.name || !this.state.description}
              >
                Skapa
              </Button>
              <Button
                label="cancel"
                bsStyle="default"
                name="cancel"
                onClick={() => this.props.callParent(false)}
              >
                Ångra
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

