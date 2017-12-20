import React from 'react';
import { Panel, Button, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';

class KanjiForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCreate: false,
    };
  }

  renderShowButton = () => (
    <Button bsStyle="success" onClick={() => this.setState({ showCreate: true })} >
      Lägg till kanji
    </Button>
  )

  renderForm = () => (
    <Panel bsStyle="primary" header={'Skapa kanji'} >
      <p> Hello! </p>
    </Panel>
  )

  render() {
    return (
      <div>
        { this.state.showCreate ?
          this.renderForm()
        :
          this.renderShowButton()
        }
      </div>
    );
  }
}

export default KanjiForm;
