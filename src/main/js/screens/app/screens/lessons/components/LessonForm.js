import React from 'react';
import { Button, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';
import lessonService from '../../../../../shared/services/lessonService';

class LessonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      error: '',
    };
  }

  handleSubmitLesson = (event) => {
    event.preventDefault();
    const lesson = { name: this.state.name, description: this.state.description };
    lessonService().create(lesson).then((response) => {
      if (response.status === 201) {
        this.props.handleCreateLesson();
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({ error: 'Kunde inte skapa ny lektion' });
    });
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Panel header="Skapa en ny lektion" bsStyle ="primary">
        <Form horizontal id="createLessonForm" onSubmit={this.handleSubmitLesson}>
          <FormGroup>
            <FormControl
              type="text"
              name="name"
              placeholder="Ange ett lektionsnamn"
              value={this.state.name}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="text"
              name="description"
              placeholder="Ange ett lektionsnamn"
              value={this.state.description}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Button
              type="submit"
              bsStyle="primary"
            >
              Skapa lektion
            </Button>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default LessonForm;
