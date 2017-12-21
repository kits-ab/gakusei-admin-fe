import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class KanjiModal extends React.Component {
  constructor(props) {
    super(props);
  }

  displayKanjiDetails = () => {
    let kanji = this.props.kanji;
    return (
      <div>
        <strong>Beskrivning: </strong> {kanji.description}
        <br />
        <strong>Svenska: </strong> {kanji.swedish}
        <br />
        <strong>Engelska: </strong> {kanji.english}
        <br />
        <strong>Kanji: </strong> {kanji.kanji}
        <br />
        <strong>Bokreferenser: </strong> {kanji.books.map(book => book.title).join(', ')}
        <br />
      </div>
    );
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal} >
        <Modal.Header closeButton>
          <Modal.Title><strong>Kanji: {this.props.kanji.description}</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.displayKanjiDetails()}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.props.closeModal} >Stäng</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default KanjiModal;
