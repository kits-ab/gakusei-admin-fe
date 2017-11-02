import React from 'react';

import { Panel, Button, Modal, Badge } from 'react-bootstrap';

class GrammarPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewLesson: false,
    };
  }

  openModal = () => {
    this.setState({ viewLesson: true });
  }

  closeModal = () => {
    this.setState({ viewLesson: false });
  }

  render() {
    return (
      <div>
        <Panel header={this.props.grammarList.lesson} >
          <p> Antal böjningar: <Badge> {this.props.grammarList.inflections} </Badge> </p>
          <p> Antal ord: <Badge> {this.props.grammarList.nuggets.length} </Badge></p>
          <Button bsStyle='primary' onClick={this.openModal} > Visa ord och böjningar </Button>
        </Panel>
        <Modal show={this.state.viewLesson} onHide={this.closeModal} >
          <Modal.Header closeButton >
            <Modal.Title> <strong>Lektion :</strong> {this.props.grammarList.lesson} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.grammarList.nuggets.map(nugget =>
              <p>{nugget.description}</p>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default GrammarPanel;
