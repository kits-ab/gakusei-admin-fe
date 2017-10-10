import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

class QuizButtonToolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ButtonToolbar className="pull-right">
        <Button
          name="newQuestion"
          bsStyle="success"
          onClick={() => this.props.addNuggetForm()}
        >
          Ny fråga
        </Button>
        <Button
          type="submit"
          label="create"
          bsStyle="primary"
          name="create"
          disabled={!this.props.formIsValid()}
        >
          Skapa quiz
        </Button>
        <Button
          label="cancel"
          bsStyle="danger"
          name="cancel"
          onClick={() => this.props.handleCreateQuiz(false)}
        >
          Avbryt
        </Button>
      </ButtonToolbar>
    );
  }
}

export default QuizButtonToolbar;
