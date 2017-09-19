import React from 'react';
import { Alert, Grid, Row, Col, Form, FormGroup, FormControl, Button,
    ButtonGroup, Panel, ButtonToolbar } from 'react-bootstrap';

import quizService from '../../../../shared/services/quizService';

class QuizesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizes: [],
            search: '',
            offset: 0,
        };

        this.onInputChange = this.onInputChange.bind(this);
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
        quizService().get_all(searchPattern, offset).then((response) => {
            switch (response.status) {
                case 200:
                    response.text().then((text) => {
                        try {
                            const data = JSON.parse(text);
                            this.setState({
                                quizes: data,
                            });
                        } catch (err) { 
                            this.setState({
                                quizes: [],
                            });
                        }
                    });
                    break;
                default:
                    throw new Error();
            }
        }).catch((err) => {});
    }

    render() {
        return (
            <Grid>
                <h2>Tillgängliga quiz-ar</h2>
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
                    <Alert bsStyle="warning" >
                        <strong>Inga quiz-ar hittades!</strong>
                    </Alert>
                    :
                    null
                }
                {this.state.quizes.map(quiz => (
                    <QuizBox key={quiz.id} quiz={quiz} />
                ))}
                <ButtonGroup vertical block>
                    <Button
                        label="load"
                        bsStyle="primary"
                        name="load"
                        disabled={this.state.quizes.length < 10}
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
                { this.state.showButtons ? 
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
