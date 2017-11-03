import React from 'react';

import { Panel, Button, Modal, Badge } from 'react-bootstrap';

import WordPanel from './WordPanel';
import InflectionPanel from './InflectionPanel';

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
    let grammarList = this.props.grammarList;
    return (
      <div>
        <Panel header={grammarList.lesson} >
          <p> Antal böjningar: <Badge> {grammarList.inflections} </Badge> </p>
          <p> Antal ord: <Badge> {grammarList.nuggets.length} </Badge></p>
          <Button bsStyle='primary' onClick={this.openModal} > Visa ord och böjningar </Button>
        </Panel>
        <Modal show={this.state.viewLesson} onHide={this.closeModal} >
          <Modal.Header closeButton >
            <Modal.Title> <strong>Lektion :</strong> {grammarList.lesson} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InflectionPanel inflections={grammarList.inflections} />
            <WordPanel nuggets={grammarList.nuggets} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default GrammarPanel;
