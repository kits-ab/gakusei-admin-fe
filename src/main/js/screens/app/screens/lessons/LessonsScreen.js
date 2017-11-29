import React from 'react';
import { Button, Alert, Grid, ButtonGroup } from 'react-bootstrap';

import LessonForm from './components/LessonForm';
import lessonService from '../../../../shared/services/lessonService';
import wordTypeService from '../../../../shared/services/wordTypeService';
import bookService from '../../../../shared/services/bookService';
import LessonPanel from './components/LessonPanel';
import Utility from '../../../../shared/util/Utility';

class LessonsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      showCreate: false,
      error: '',
      wordTypes: [],
      books: [],
      offset: 0,
      loadMoreIsDisabled: true,
    };
  }

  componentWillMount = () => {
    this.getLessons();
    this.getWordTypes();
    this.getBooks();
  };

  getLessons = () => {
    lessonService().getPage(this.state.offset).then((response) => {
      if (response.status === 200) {
        response.text().then((text) => {
          let data = JSON.parse(text);
          this.setState({
            lessons: this.state.lessons.concat(data.content),
            loadMoreIsDisabled: data.last,
          });
        }).catch((err) => {
          this.setState({ error: 'Kunde inte hantera lektioner' });
        });
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({ error: 'Kunde inte hämta lektioner' });
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

  loadMore = () => {
    this.setState({ offset: this.state.offset + 1 }, () => this.getLessons());
  };

  handleCreateLesson = (created) => {
    this.setState({ showCreate: false });
    if (created) {
      this.setState({ offset: 0, lessons: [] }, () => this.getLessons());
    }
  };

  handleDeleteLesson = (deletedLessonId) => {
    this.setState(prevState => ({
      lessons: prevState.lessons.filter(lesson => lesson.id !== deletedLessonId)
    }));
  };

  renderMsg = (type) => {
    switch (type) {
      case 'no lessons':
        return (
          <Alert bsStyle="warning">
            <strong>Inga lektioner hittades!</strong>
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
        <h2>Tillgängliga lektioner</h2>
        <br/>
        {
          this.state.showCreate
            ?
            <LessonForm
              handleCreateLesson={this.handleCreateLesson}
              wordTypes={this.state.wordTypes}
              books={this.state.books}
            />
            :
            <div>
              <Button id="createLessonButton" bsStyle="success" onClick={() => this.setState({ showCreate: true })}>
                Skapa ny lektion
              </Button>
            </div>
        }
        <br/>
        {this.state.lessons.length === 0 ? this.renderMsg('no lessons') : null}
        {this.state.error ? this.renderMsg('error') : null}
        {this.state.lessons.map(lesson =>
          <LessonPanel key={lesson.id} lesson={lesson} handleDeleteLesson={this.handleDeleteLesson}/>)}
        <ButtonGroup vertical block>
          <Button
            label="load"
            bsStyle="primary"
            name="load"
            disabled={this.state.loadMoreIsDisabled}
            onClick={() => this.loadMore()}
          >
            Ladda fler
          </Button>
        </ButtonGroup>
      </Grid>
    );
  }
}

export default LessonsScreen;
