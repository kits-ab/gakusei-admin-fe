import React from 'react';
import { Panel, Form, FormControl, FormGroup, ControlLabel, Col, Button, Glyphicon } from 'react-bootstrap';

class KanjiSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      swedish: '',
      books: [],
    };
  }

  onInputChange = (event) => {
    let name = event.target.name;
    let options = event.target.options;
    let value = name === 'books' ? this.getSelected(options) : event.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.search(this.state.swedish, this.state.books);
  }

  getSelected = options => (
    Object.keys(options).filter(key => options[key].selected).reduce((acc, key) => {
      acc.push(options[key].value);
      return acc;
    }, [])
  );

  render() {
    return (
      <Panel bsStyle="primary" header="Sök kanji" >
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Svenskt uttryck
            </Col>
            <Col md={10}>
              <FormControl
                type="text"
                name="swedish"
                placeholder="Sök på svenskt uttryck"
                value={this.state.swedish}
                onChange={event => this.onInputChange(event)}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >
              Böcker
            </Col>
            <Col md={10} >
              <FormControl
                multiple
                componentClass="select"
                name="books"
                onChange={event => this.onInputChange(event)}
              >
                {this.props.books.map(book => <option key={book.title} value={book.title}>{book.title}</option>)}
              </FormControl>
            </Col>
          </FormGroup>
          <Button type="submit" className="pull-right" bsStyle="primary">
            <Glyphicon glyph="search" /> {' '} Sök
          </Button>
        </Form>
      </Panel>
    );
  }
}

export default KanjiSearch;
