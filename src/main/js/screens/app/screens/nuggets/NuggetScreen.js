import React from 'react';
import { Alert, Grid, FormControl, Button, Panel, ControlLabel, Form, FormGroup, Col, Glyphicon } from 'react-bootstrap';
import nuggetService from '../../../../shared/services/nuggetService';
import NuggetForm from './components/NuggetForm';
import bookService from '../../../../shared/services/bookService';
import wordTypeService from '../../../../shared/services/wordTypeService';
import Utility from '../../../../shared/util/Utility';
import NuggetPanel from './components/NuggetPanel';

class NuggetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nuggets: [],
      wordTypes: [],
      searchBooks: [],
      searchString: '',
      wordType: 'Alla ordklasser',
      books: [],
      offset: 0,
      showCreate: false,
      error: '',
      currentSearch: '',
      nuggetIsValid: false,
      loadMoreIsDisabled: false,
    };
  }

  componentWillMount = () => {
    this.getWordTypes();
    this.getBooks();
    this.setState({
      currentSearch: this.buildSearchInput(),
    }, () => this.getNuggets());
  };

  buildSearchInput = () => (
    {
      swedish: this.state.searchString,
      wordType: this.state.wordType === 'Alla ordklasser' ? null :
        this.state.wordTypes.find(wt => wt.type === this.state.wordType).id,
      bookIds: this.state.searchBooks.length === 0 ? null : this.state.books.filter(book => this.state.searchBooks.includes(book.title)).map(book => book.id),
    }
  );

  getNuggets = () => {
    nuggetService().getNuggets(this.state.currentSearch, this.state.offset).then((response) => {
      response.text().then((text) => {
        let data = JSON.parse(text);
        let nuggets = this.state.nuggets.concat(data.content);
        this.setState({ nuggets, loadMoreIsDisabled: data.last });
      });
    });
  };

  getWordTypes = () => {
    wordTypeService().getAll().then((response) => {
      if (response.status === 200) {
        response.text().then((text) => {
          this.setState({ wordTypes: JSON.parse(text).sort((a, b) => Utility.compareStringProperty(a, b, 'type')) });
        }).catch((err) => {
          this.setState({ error: 'Kunde inte hantera ordklasser' });
        });
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({ error: 'Kunde inte hämta ordklasser' });
    });
  };

  getBooks = () => {
    bookService().getAll().then((response) => {
      if (response.status === 200) {
        response.text().then((text) => {
          this.setState({ books: JSON.parse(text).sort((a, b) => Utility.compareStringProperty(a, b, 'title')) });
        }).catch((err) => {
          this.setState({ error: 'Kunde inte hantera böcker' });
        });
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({ error: 'Kunde inte hämta böcker' });
    });
  };

  handleCreateNugget = (isNew) => {
    this.setState({
      showCreate: false,
    });

    if (isNew) {
      this.setState({
        offset: 0,
        nuggets: [],
      }, () => this.getNuggets());
    }
  };

  searchNuggets = (event) => {
    event.preventDefault();
    this.setState({
      offset: 0,
      nuggets: [],
      currentSearch: this.buildSearchInput(),
    }, () => this.getNuggets());
  };

  handleLoadMore = (event) => {
    event.preventDefault();
    let offset = this.state.offset + 1;
    this.setState({ offset }, () => this.getNuggets());
  };

  handleDeleteNugget = (deletedNuggetId) => {
    this.setState(prevState => ({
      nuggets: prevState.nuggets.filter(nugget => nugget.id !== deletedNuggetId)
    }));
  };

  getSelected = options => (
    Object.keys(options).filter(key => options[key].selected).reduce((acc, key) => {
      console.log(options[key]);
      acc.push(options[key].value);
      return acc;
    }, [])
  );

  onInputChange = (event) => {
    let name = event.target.name;
    let options = event.target.options;
    let value = name === 'searchBooks' ? this.getSelected(options) : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  renderMsg = (type) => {
    switch (type) {
      case 'no nuggets':
        return (
          <Alert bsStyle="warning">
            <strong>Inga ord hittades!</strong>
          </Alert>
        );
      case 'error':
        return this.renderErrorMsg();
      default:
        return this.renderErrorMsg();
    }
  };

  renderErrorMsg = () => (
    <Alert bsStyle="danger">
      <strong>Ett fel upptäcktes!</strong>
      <p>{this.state.error}</p>
    </Alert>
  );

  render() {
    return (
      <Grid>
        <h2>Tillgängliga ord och uttryck</h2>
        <br/>
        {
          this.state.showCreate
            ?
            <NuggetForm handleCreateNugget={this.handleCreateNugget} books={this.state.books} wordTypes={this.state.wordTypes}/>
            :
            <div>
              <Button id="createButton" bsStyle="success" onClick={() => this.setState({ showCreate: true })}>Lägg till ord</Button>
            </div>
        }
        <br/>
        <Panel bsStyle="primary" header="Sök">
          <Form horizontal id="searchNuggetsForm" onSubmit={this.searchNuggets}>
            <FormGroup>
              <Col componentClass={ControlLabel} xs={12} md={2}>
                Svenskt uttryck
              </Col>
              <Col xs={12} md={4}>
                <FormControl
                  type="text"
                  name="searchString"
                  placeholder="Sök på svenskt uttryck"
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
                  {this.state.wordTypes.map((wordType, i) =>
                    <option key={wordType.type} value={wordType.type}>{wordType.type}</option>)}
                </FormControl>
              </Col>
              <Col xs={6} md={3}>
                <FormControl
                  multiple
                  componentClass="select"
                  name="searchBooks"
                  onChange={event => this.onInputChange(event)}
                >
                  {this.state.books.map(book => <option key={book.title} value={book.title}>{book.title}</option>)}
                </FormControl>
              </Col>
              <Col xs={12} md={1}>
                <Button className="pull-right" id='searchBtn' type='submit' bsStyle='primary' >
                  <Glyphicon glyph='search'/> Sök
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel>
        {this.state.nuggets.length === 0 ? this.renderMsg('no nuggets') : null}
        {this.state.error ? this.renderMsg('error') : null}
        {this.state.nuggets.map(nugget => (
            <NuggetPanel 
              key={nugget.id.concat('nuggetpanel')} 
              nugget={nugget} 
              handleDeleteNugget={this.handleDeleteNugget}
              books={this.state.books}
              wordTypes={this.state.wordTypes}
            />
          ))}
        <Button
          block
          bsStyle="primary"
          bsSize="small"
          disabled={this.state.loadMoreIsDisabled}
          onClick={this.handleLoadMore}>Ladda fler</Button>
        <br/>
      </Grid>
    );
  }
}

export default NuggetScreen;

