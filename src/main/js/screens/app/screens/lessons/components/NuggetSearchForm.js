import React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon } from 'react-bootstrap';
import nuggetService from '../../../../../shared/services/nuggetService';

class NuggetSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      wordType: 'Alla ordklasser',
      books: [],
      offset: 0,
      currentSearch: null,
      loadMoreIsDisabled: false,
    };
  }

  buildSearchInput = () => (
    {
      swedish: this.state.searchString,
      wordType: this.state.wordType === 'Alla ordklasser' ? null :
        this.props.wordTypes.find(wt => wt.type === this.state.wordType).id,
      bookIds: this.state.books.length === 0 ? null : this.props.books.filter(book => this.state.books.includes(book.title)).map(book => book.id),
    }
  );

  getNuggets = () => {
    nuggetService().getNuggets(this.state.currentSearch, this.state.offset).then((response) => {
      response.text().then((text) => {
        let oldNuggets = this.props.nuggets;
        let data = JSON.parse(text);
        let allNuggets = this.state.offset === 0 ? data.content : oldNuggets.concat(data.content);
        this.setState({ loadMoreIsDisabled: data.last });
        this.props.updateNuggets(allNuggets, this.state.isNewSearch);
      });
    });
  };

  searchNuggets = (event) => {
    event.preventDefault();
    this.setState({
      isNewSearch: true,
      offset: 0,
      currentSearch: this.buildSearchInput(),
    }, () => this.getNuggets());
  };

  handleLoadMore = (event) => {
    event.preventDefault();
    let offset = this.state.offset + 1;
    this.setState({
      isNewSearch: false,
      offset
    }, () => this.getNuggets());
  };

  getSelected = options => (
    Object.keys(options).filter(key => options[key].selected).reduce((acc, key) => {
      acc.push(options[key].value);
      return acc;
    }, [])
  );

  onInputChange = (event) => {
    let name = event.target.name;
    let options = event.target.options;
    let value = name === 'books' ? this.getSelected(options) : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <Form horizontal id="searchNuggetsForm" onSubmit={this.searchNuggets}>
          <FormGroup>
            <Col componentClass={ControlLabel} xs={12} md={2}>
              Sök efter ord
            </Col>
            <Col xs={12} md={4}>
              <FormControl
                type="text"
                name="searchString"
                placeholder="Svenskt ord"
                value={this.state.searchString}
                onChange={event => this.onInputChange(event)}
              />
            </Col>
            <Col xs={6} md={2}>
              <FormControl
                componentClass="select"
                name="wordType"
                onChange={event => this.onInputChange(event)}
              >
                <option>Alla ordklasser</option>
                {this.props.wordTypes.map((wordType, i) =>
                  <option key={wordType.type} value={wordType.type}>{wordType.type}</option>)}
              </FormControl>
            </Col>
            <Col xs={6} md={3}>
              <FormControl
                multiple
                componentClass="select"
                name="books"
                onChange={event => this.onInputChange(event)}
              >
                {this.props.books.map(book => <option key={book.title} value={book.title}>{book.title}</option>)}
              </FormControl>
            </Col>
            <Col xs={12} md={1}>
              <Button className="pull-right" id='searchBtn' type='submit' bsStyle='primary' >
                <Glyphicon glyph='search'/> Sök
              </Button>
            </Col>
          </FormGroup>
        </Form>
        <Button
          block
          bsStyle="primary"
          bsSize="small"
          onClick={this.handleLoadMore}
          disabled={this.state.loadMoreIsDisabled}>Ladda fler</Button>
      </div>
    );
  }
}

export default NuggetSearchForm;
