import React from 'react';
import { Alert, Grid, Row, Col, Form, FormGroup, FormControl, Button,
    ButtonGroup, Panel, ButtonToolbar } from 'react-bootstrap';

class QuizesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizes: [
                { id: 1, name: 'Quiz namn 1', description: 'Mycket bra quiz, skapad för professionella spelare. Varning: Extremt svårt, får din hjärna att koka.' },
                { id: 2, name: 'Quiz namn 2', description: 'Annu bättre quiz. Lyssna inte på vad som sägs ovan, detta är quizen för dig!' }
            ],
            search: '',
        };

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
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
