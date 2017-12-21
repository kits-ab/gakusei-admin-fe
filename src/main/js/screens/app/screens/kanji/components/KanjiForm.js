import React from 'react';
import { Panel, Button, Form, FormControl, FormGroup, Col, ControlLabel, Glyphicon } from 'react-bootstrap';

class KanjiForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCreate: false,
      swedish: '',
      english: '',
      description: '',
      kanji: '',
      books: [],
    };
  }

  getSelected = options => (
    Object.keys(options).filter(key => options[key].selected).reduce((acc, key) => {
      acc.push(options[key].value);
      return acc;
    }, [])
  );

  extractBooks = () => (
    this.props.books.filter(book => this.state.books.includes(book.title))
  )

  onInputChange = (event) => {
    let name = event.target.name;
    let options = event.target.options;
    let value = name === 'books' ? this.getSelected(options) : event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.create({
      description: this.state.description,
      swedish: this.state.swedish,
      english: this.state.english,
      kanji: this.state.kanji,
      books: this.extractBooks(),
    });
    this.setState({ showCreate: false });
  }

  renderShowButton = () => (
    <Button bsStyle="success" onClick={() => this.setState({ showCreate: true })} >
      Lägg till kanji
    </Button>
  )

  renderForm = () => (
    <Panel bsStyle="primary" header={'Skapa kanji'} >
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup>
          <Col componentClass={ControlLabel} md={2}>
            Beskrivning
          </Col>
          <Col md={10} >
            <FormControl
              onChange={event => this.onInputChange(event)}
              type="text"
              name="description"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} md={2}>
            Svenska
          </Col>
          <Col md={10} >
            <FormControl
              onChange={event => this.onInputChange(event)}
              type="text"
              name="swedish"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} md={2}>
            Engelska
          </Col>
          <Col md={10} >
            <FormControl
              onChange={event => this.onInputChange(event)}
              type="text"
              name="english"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} md={2}>
            Kanji
          </Col>
          <Col md={10} >
            <FormControl
              onChange={event => this.onInputChange(event)}
              type="text"
              name="kanji"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} md={2}>
            Böcker
          </Col>
          <Col md={10} >
            <FormControl 
              multiple
              componentClass="select"
              name="books"
              onChange={event => this.onInputChange(event)}
            >
              {this.props.books.map((ref, index) => <option key={index} value={ref.title}>{ref.title}</option>)}
            </FormControl>
          </Col>
        </FormGroup>
        <Button bsStyle="primary" type="submit" className="pull-right" >
          <Glyphicon glyph="search" /> Skapa kanji
        </Button>
      </Form>
    </Panel>
  )

  render() {
    return (
      <div>
        { this.state.showCreate ?
          this.renderForm()
        :
          this.renderShowButton()
        }
      </div>
    );
  }
}

export default KanjiForm;
