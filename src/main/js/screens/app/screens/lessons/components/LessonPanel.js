import React from 'react';
import { Button, Panel, ButtonToolbar, Alert } from 'react-bootstrap';
import lessonService from '../../../../../shared/services/lessonService';


class LessonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonDeleted: false,
      error: '',
    };
  }

  deleteLesson = (id) => {
    lessonService().delete(id).then((response) => {
      if (response.status === 200) {
        this.setState({
          lessonDeleted: true
        });
      } else {
        throw new Error();
      }
    }).catch((err) => {
      this.setState({
        error: 'Något gick fel'
      });
    });
  };

  render() {
    let lesson = this.props.lesson;
    return (
      <div>
        {this.state.lessonDeleted ? (
          <Alert bsStyle="info" id={`deleteAlert${lesson.name}`} onDismiss={() => this.props.handleDeleteLesson(lesson.id) }>
            <strong>{lesson.name}</strong> har raderats.
          </Alert>
        ) : (
          <Panel id={lesson.id}>
            <h3>{lesson.name}</h3>
            <p>{lesson.description}</p>
            <ButtonToolbar>
              <Button bsStyle="danger" id={`delete${lesson.name}`} onClick={() => this.deleteLesson(lesson.id)}>Ta bort</Button>
            </ButtonToolbar>
          </Panel>
        )}
      </div>
    );
  }
}

export default LessonPanel;
