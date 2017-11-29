import React from 'react';
import {
  Button, Col, ControlLabel, Form, FormControl, FormGroup, ListGroup, ListGroupItem,
  Panel
} from 'react-bootstrap';
import LessonButtonToolbar from './LessonButtonToolbar';
import lessonService from '../../../../../shared/services/lessonService';
import NuggetSearchForm from './NuggetSearchForm';
import NuggetListGroup from './NuggetListGroup';
import nuggetService from '../../../../../shared/services/nuggetService';

class LessonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      error: '',
      nuggets: [],
      notSelected: [],
      selected: [],
      formIsValid: false,
      loadMoreIsDisabled: true,
      offset: 0,
      currentSearch: null,
    };
  }

  getNuggets = (currentSearch, offset) => {
    nuggetService().getNuggets(currentSearch, offset).then((response) => {
      response.text().then((text) => {
        let oldNuggets = this.state.nuggets;
        let data = JSON.parse(text);
        let allNuggets = offset === 0 ? data.content : oldNuggets.concat(data.content);
        this.setState({ offset, loadMoreIsDisabled: data.last });
        this.updateNuggets(allNuggets);
      });
    });
  };

  handleLoadMore = (event) => {
    event.preventDefault();
    let offset = this.state.offset + 1;
    this.getNuggets(this.state.currentSearch, offset);
  };

  updateCurrentSearch = (currentSearch) => {
    this.setState({ currentSearch });
  };

  handleSubmitLesson = (event) => {
    event.preventDefault();
    const lesson = { name: this.state.name, description: this.state.description, nuggets: this.state.selected };
    lessonService().create(lesson).then((response) => {
      if (response.status === 201) {
        response.text().then(text => this.props.handleCreateLesson(true));
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

  formIsValid = () => {
    let name = this.state.name;
    let description = this.state.description;
    return name.trim() !== '' && description.trim() !== '';
  };

  updateNuggets = (nuggets) => {
    let notSelected = nuggets.filter(nugget => (this.state.selected.find(n => n.id === nugget.id) === undefined));
    this.setState({ nuggets, notSelected });
  };

  updateSelected = (selected, notSelected) => {
    this.setState({ selected, notSelected });
  };

  deselect = (event) => {
    let selected = this.state.selected;
    let notSelected = this.state.notSelected;
    let nugget = selected.find(n => n.id === event.target.value);
    selected.splice(selected.indexOf(nugget), 1);
    notSelected.push(nugget);
    this.setState({ selected, notSelected });
  };

  render() {
    return (
      <Panel header="Skapa en ny lektion" bsStyle ="primary">
        <Form horizontal id="createLessonForm" onSubmit={this.handleSubmitLesson}>
          <FormGroup>
            <Col componentClass={ControlLabel} xs={12} md={2}>
              Namn
            </Col>
            <Col xs={12} md={10}>
              <FormControl
                type="text"
                name="name"
                placeholder="Ange ett lektionsnamn"
                value={this.state.name}
                onChange={this.onInputChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} xs={12} md={2}>
              Beskrivning
            </Col>
            <Col xs={12} md={10}>
              <FormControl
                type="text"
                name="description"
                placeholder="Ange en beskrivning"
                value={this.state.description}
                onChange={this.onInputChange}
              />
            </Col>
          </FormGroup>
          <ListGroup>
            {this.state.selected.map(nugget =>
              <ListGroupItem key={nugget.id} value={nugget.id} onClick={this.deselect}>
                {nugget.swedish}
              </ListGroupItem>
            )}
          </ListGroup>
          <FormGroup>
            {!this.state.error ? this.renderErrorMsg : null}
            <Col xs={12} md={12}>
              <LessonButtonToolbar formIsValid={this.formIsValid} handleCreateLesson={this.props.handleCreateLesson}/>
            </Col>
          </FormGroup>
        </Form>
        <NuggetSearchForm
          updateNuggets={this.updateNuggets}
          nuggets={this.state.nuggets}
          wordTypes={this.props.wordTypes}
          books={this.props.books}
          onInputChange={this.onInputChange}
          searchNuggets={this.searchNuggets}
          getNuggets={this.getNuggets}
          updateCurrentSearch={this.updateCurrentSearch}
        />
        <br/>
        <NuggetListGroup
          selected={this.state.selected}
          notSelected={this.state.notSelected}
          updateSelected={this.updateSelected}
        />
        <Button
          block
          bsStyle="primary"
          bsSize="small"
          onClick={this.handleLoadMore}
          disabled={this.state.loadMoreIsDisabled}>Ladda fler</Button>
      </Panel>
    );
  }
}

export default LessonForm;
