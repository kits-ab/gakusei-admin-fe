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
    return (
      <div>
        {this.state.nuggetDeleted ? (
          <Alert bsStyle="info" id={`deleteAlert${nugget.id}`} onDismiss={() => this.props.handleDeleteNugget(nugget.id) }>
            Ordet "<strong>{nugget.swedish}"</strong> med id "<strong>{nugget.id}</strong>" har raderats.
          </Alert>
        ) : (
          <div>
            <Panel>
              <Col xs={12} md={6}>
                <p>{nugget.swedish}</p>
              </Col>
              <Col xs={12} md={6}>
                <ButtonToolbar className="pull-right">
                  <Button bsStyle="primary" bsSize="small" id={`show${nugget.id}`} onClick={this.openModal}>Visa</Button>
                  <Button bsStyle="danger" bsSize="small" id={`delete${nugget.id}`} onClick={() => this.deleteNugget(nugget.id)}>Ta bort</Button>
                </ButtonToolbar>
              </Col>
            </Panel>
            <NuggetModal nugget={nugget} closeModal={this.closeModal} viewNugget={this.state.viewNugget}/>
          </div>
        )}
      </div>
    );
  }
}

export default NuggetPanel;
