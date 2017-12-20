import React from 'react';
import { Grid } from 'react-bootstrap';

import bookService from '../../../../shared/services/bookService';
import kanjiService from '../../../../shared/services/kanjiService';
import Utility from '../../../../shared/util/Utility';

import KanjiSearch from './components/KanjiSearch';
import KanjiPanel from './components/KanjiPanel';
import KanjiForm from './components/KanjiForm';

class kanjiScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      kanjis: [],
      offset: 0,
    };
  }

  componentWillMount = () => {
    this.getBooks();
  }

  extractBookIds = bookNames => (
    this.state.books.filter(book => bookNames.includes(book.title)).map(book => book.id)
  )

  searchKanjis = (swedish, books) => {
    this.setState({ kanjis: [], offset: 0 }, this.getKanjis(swedish, books));
  }

  getKanjis = (swedish, books) => {
    kanjiService().getKanji(swedish, this.extractBookIds(books), this.state.offset).then((response) => {
      response.text().then((text) => {
        let data = JSON.parse(text);
        let kanjis = this.state.kanjis.concat(data.content);
        window.console.log(kanjis);
        this.setState({ kanjis });
      });
    });
  }

  deleteKanji = (kanji) => {
    window.console.log(kanji.swedish);
  }

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

  render() {
    return (
      <Grid>
        <h2> Tillgängliga kanjis </h2>
        <br />
        <KanjiForm />
        <br />
        <KanjiSearch books={this.state.books} search={this.searchKanjis} />
        <hr />
        { this.state.kanjis.map(kanji => (
          <KanjiPanel key={kanji.id} kanji={kanji} delete={this.deleteKanji} />
        ))}
      </Grid>
    );
  }
}

export default kanjiScreen;
