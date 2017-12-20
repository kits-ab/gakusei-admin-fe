import React from 'react';
import { Panel, Col, Button, ButtonToolbar, Alert } from 'react-bootstrap';

class KanjiPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleted: false,
    };
  }

  handleDelete = () => {
    this.setState({ deleted: true }, this.props.delete(this.props.kanji));
  }

  panelContent = () => {
    let kanji = this.props.kanji;
    return (
      <Panel>
        <Col md={3}> {kanji.swedish} </Col>
        <Col md={3}> {kanji.english} </Col>
        <Col md={3}> {kanji.kanji} </Col>
        <Col md={3} >
          <ButtonToolbar className="pull-right" >
            <Button bsStyle="primary" bsSize="small" > Visa </Button>
            <Button bsStyle="danger" bsSize="small" onClick={this.handleDelete} > Ta bort </Button>
          </ButtonToolbar>
        </Col>
      </Panel>
    );
  }

  errorMessage = () => (
      <Alert bsStyle="info" >
        Kanji <strong>"{this.props.kanji.swedish}"</strong> har raderats.
      </Alert>
    )

  render() {
    return (
      <div>
        { this.state.deleted ? 
          this.errorMessage()
        :
          this.panelContent()
        }
      </div>
    );
  }
}

export default KanjiPanel;
