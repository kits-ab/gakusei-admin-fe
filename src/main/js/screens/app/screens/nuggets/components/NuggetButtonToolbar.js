import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

class NuggetButtonToolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ButtonToolbar className="pull-right">
        <Button
          type="submit"
          label="create"
          bsStyle="primary"
          name="create"
          disabled={!this.props.formIsValid()}
        >
          Skapa ord
        </Button>
        <Button
          label="cancel"
          bsStyle="danger"
          name="cancel"
          onClick={() => this.props.handleCreateNugget(false)}
        >
          Avbryt
        </Button>
      </ButtonToolbar>
    );
  }
}

export default NuggetButtonToolbar;
