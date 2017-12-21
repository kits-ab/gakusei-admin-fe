import React from 'react';
import { Grid } from 'react-bootstrap';

import bookService from '../../../../shared/services/bookService';
import kanjiService from '../../../../shared/services/kanjiService';
import Utility from '../../../../shared/util/Utility';

import KanjiSearch from './components/KanjiSearch';
import KanjiPanel from './components/KanjiPanel';
import KanjiForm from './components/KanjiForm';
import KanjiLoadMore from './components/KanjiLoadMore';

class kanjiScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      kanjis: [],
      searchSwedish: '',
      searchBooks: '',
      offset: 0,
      loadMoreIsDisabled: false,
    };
  }

  componentWillMount = () => {
    this.getBooks();
    this.getKanjis();
  }

  extractBookIds = bookNames => (
    this.state.books.filter(book => bookNames.includes(book.title)).map(book => book.id)
  )

  searchKanjis = (swedish, books) => {
    this.setState({ 
      kanjis: [], 
      offset: 0, 
      searchSwedish: swedish, 
      searchBooks: books }, this.getKanjis);
  }

  loadMore = () => {
    let offset = this.state.offset + 1;
    this.setState({ offset }, this.getKanjis);
  }

  getKanjis = () => {
    kanjiService().getKanji(this.state.searchSwedish, this.extractBookIds(this.state.searchBooks), this.state.offset).then((response) => {
      response.text().then((text) => {
        let data = JSON.parse(text);
        let kanjis = this.state.kanjis.concat(data.content);
        window.console.log(kanjis);
        this.setState({ kanjis, loadMoreIsDisabled: data.last });
      });
    });
  }

  deleteKanji = (kanji) => {
    kanjiService().deleteKanji(kanji).then((response) => {
      if (response.ok) {
        let kanjis = this.state.kanjis.filter(k => k.id !== kanji.id);
      }
    });
  }

  createKanji = (kanji) => {
    kanjiService().createKanji(kanji).then((response) => {
      if (response.ok) {
        this.setState({ kanjis: [], offset: 0 }, this.getKanjis('', []));
      }
    });
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
        <KanjiForm 
          books={this.state.books} 
          create={this.createKanji} 
        />
        <br />
        <KanjiSearch 
          books={this.state.books} 
          search={this.searchKanjis} 
        />
        <hr />
        { this.state.kanjis.map(kanji => (
          <KanjiPanel 
            key={kanji.id} 
            kanji={kanji} 
            delete={this.deleteKanji} 
          />
        ))}
        <KanjiLoadMore 
          loadMoreIsDisabled={this.state.loadMoreIsDisabled}
          loadMore={this.loadMore}
        />
      </Grid>
    );
  }
}

export default kanjiScreen;
