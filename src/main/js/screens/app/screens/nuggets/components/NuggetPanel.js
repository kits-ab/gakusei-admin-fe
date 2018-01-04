import React from 'react';
import { Button, Panel, ButtonToolbar, Alert, Col } from 'react-bootstrap';
import nuggetService from '../../../../../shared/services/nuggetService';
import NuggetModal from './NuggetModal';


class NuggetPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewNugget: false,
      nuggetDeleted: false,
      error: '',
    };
  }

  openModal = () => {
    this.setState({ viewNugget: true });
  };

  closeModal = () => {
    this.setState({ viewNugget: false });
  };

  deleteNugget = (id) => {
    nuggetService().delete(id).then((response) => {
      if (response.status === 200) {
        this.setState({
          nuggetDeleted: true
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
    let nugget = this.props.nugget;
    // wordtype and a lot of other keys are null for kanji-nuggets, remove temporary check when kanji gets its own db table
    if (nugget.wordType === null) {
      return (<div/>);
    }
    return (
      <div>
        {this.state.nuggetDeleted ? (
          <Alert bsStyle="info" id={`deleteAlert${nugget.id}`} onDismiss={() => this.props.handleDeleteNugget(nugget.id) }>
            Ordet <strong>"{nugget.swedish}"</strong> ({nugget.english}, {nugget.jpRead}, {nugget.jpWrite}) har raderats.
          </Alert>
        ) : (
          <div>
            <Panel>
              <Col md={3}>{nugget.swedish}</Col>
              <Col md={3}>{nugget.english}</Col>
              <Col md={2}>{nugget.jpWrite}</Col>
              <Col md={2}>{nugget.jpRead}</Col>
              <Col xs={12} md={2}>
                <ButtonToolbar className="pull-right">
                  <Button bsStyle="primary" bsSize="small" id={`show${nugget.id}`} onClick={this.openModal}>Visa</Button>
                  <Button bsStyle="danger" bsSize="small" id={`delete${nugget.id}`} onClick={() => this.deleteNugget(nugget.id)}>Ta bort</Button>
                </ButtonToolbar>
              </Col>
            </Panel>
            <NuggetModal 
              nugget={nugget} 
              closeModal={this.closeModal} 
              viewNugget={this.state.viewNugget}
              books={this.props.books}
            />
          </div>
        )}
      </div>
    );
  }
}

export default NuggetPanel;
