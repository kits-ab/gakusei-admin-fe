import React from 'react';
import { Alert, Button, Panel, ButtonToolbar } from 'react-bootstrap';


class LessonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let lesson = this.props.lesson;
    return (
      <Panel id={lesson.id}>
        <h3>{lesson.name}</h3>
        <p>{lesson.description}</p>
      </Panel>
    );
  }
}

export default LessonPanel;
