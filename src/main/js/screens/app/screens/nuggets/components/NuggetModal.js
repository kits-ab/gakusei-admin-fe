import React from 'react';
import { Alert, Modal, Panel } from 'react-bootstrap';

class NuggetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  displayNuggetDetails = nugget => (
    <div key={nugget.id.concat('modal')}>
      <Panel bsStyle="primary" header={nugget.swedish}>
        <strong>Svenska: </strong>
        {nugget.swedish}
        <br/>
        <strong>Engelska: </strong>
        {nugget.english}
        <br/>
        <strong>Kanji: </strong>
        {nugget.jpRead}
        <br/>
        <strong>Hiragana: </strong>
        {nugget.jpWrite}
        <br/>
        <strong>Bokreferenser: </strong>
        {Object.prototype.hasOwnProperty.call(nugget, 'books') ? nugget.books.map(book => book.title).join(', ') : ''}
        <br/>
        <strong>Ordklass: </strong>
        {nugget.wordType.type}
        <br/>
      </Panel>
    </div>
  );


  render() {
    let nugget = this.props.nugget;
    return (
      <Modal show={this.props.viewNugget} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><strong>{nugget.swedish}</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.error ?
            <Alert bsStyle="warning"> {this.state.error} </Alert>
            :
            <div>{this.displayNuggetDetails(nugget)}</div>
          }
        </Modal.Body>
      </Modal>
    );
  }
}

export default NuggetModal;
