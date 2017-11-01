import React from 'react';
import { Button, Alert, Grid } from 'react-bootstrap';

import LessonForm from './components/LessonForm';
import lessonService from '../../../../shared/services/lessonService';
import LessonPanel from './components/LessonPanel';

class LessonsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      showCreate: false,
      error: '',
    };
  }

  componentWillMount = () => {
    this.getLessons();
  };

  getLessons = () => {
    lessonService().getAll().then((response) => {
      if (response.status === 200) {
        response.text().then(text =>
          this.setState({ lessons: JSON.parse(text) })
        ).catch((err) => {
          this.setState({ error: 'Kunde inte hantera lektioner' });
        });
      } else {
        throw new Error();
      }
    }).catch((err) => {
      console.log(err);
      this.setState({ error: 'Kunde inte hämta lektioner' });
    });
  };

  handleCreateLesson = () => {
    this.setState({
      showCreate: false,
    });
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
            <LessonForm handleCreateLesson={this.handleCreateLesson}/>
            :
            <div>
              <Button id="createLessonButton" bsStyle="success" onClick={() => this.setState({ showCreate: true })}>Skapa ny lektion</Button>
            </div>
        }
        <br/>
        {this.state.lessons.length === 0 ? this.renderMsg('no lessons') : null}
        {this.state.error ? this.renderMsg('error') : null}
        {this.state.lessons.map(lesson => <LessonPanel key={lesson.id} lesson={lesson} handleDeleteLesson={this.handleDeleteLesson}/>)}
      </Grid>
    );
  }
}

export default LessonsScreen;
