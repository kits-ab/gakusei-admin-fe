import React from 'react';

import { Col, Panel, Button, ButtonToolbar, Modal, Badge, Form, FormGroup, FormControl, ControlLabel, Glyphicon } from 'react-bootstrap';

import WordPanel from './WordPanel';
import InflectionPanel from './InflectionPanel';

class GrammarPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewLesson: false,
      viewInflection: false,
      selectUnusedInflections: [],
      selectUsedInflections: [],
    };
  }

  openModal = () => {
    this.setState({ viewLesson: true });
  }

  closeModal = () => {
    this.setState({ viewLesson: false });
  }

  openInflectionModal = () => {
    this.setState({ viewInflection: true });
  }

  closeInflectionModal = () => {
    this.setState({ viewInflection: false });
  }

  handleSelectUsed = (event) => {
    let selected = [];
    let options = event.target.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }

    this.setState({ [event.target.name]: selected });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    event.target.reset();

    let currentUsedInflections = this.props.grammarList.inflections.used;
    let currentUnusedInflections = this.props.grammarList.inflections.unused;

    let filteredUsedInflections = currentUsedInflections.filter(element => this.state.selectUsedInflections.indexOf(element) === -1);
    let filteredUnusedInflections = currentUnusedInflections.filter(element => this.state.selectUnusedInflections.indexOf(element) === -1);

    let updatedUsedInflections = filteredUsedInflections.concat(this.state.selectUnusedInflections);
    let updatedUnusedInflections = filteredUnusedInflections.concat(this.state.selectUsedInflections);

    this.setState({ selectUnusedInflections: [], selectUsedInflections: [] });

    let oldGrammarList = this.props.grammarList;

    this.props.updateGrammarList(oldGrammarList, 'inflections', { used: updatedUsedInflections, unused: updatedUnusedInflections });
    // TODO : Send updated list to server
  }

  render() {
    let grammarList = this.props.grammarList;
    return (
      <div>
        <Panel header={grammarList.lesson} >
          <p> Antal böjningar: <Badge> {grammarList.inflections.used.length} </Badge> </p>
          <p> Antal ord: <Badge> {grammarList.nuggets.length} </Badge></p>
          <ButtonToolbar>
            <Button bsStyle='primary' onClick={this.openModal} > Visa ord och böjningar </Button>
            <Button onClick={this.openInflectionModal} > Ändra använda böjningar </Button>
          </ButtonToolbar>
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
        <Modal bsSize='lg' show={this.state.viewInflection} onHide={this.closeInflectionModal} >
          <Modal.Header closeButton >
            <Modal.Title> <strong> Böjningar : {grammarList.lesson} </strong> </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleFormSubmit} >
              <FormGroup>
                <Col sm={6}>
                  <ControlLabel> Oanvända böjningar </ControlLabel>
                </Col>
                <Col sm={6}>
                  <ControlLabel> Använda böjningar </ControlLabel>
                </Col> 
              </FormGroup>
              <FormGroup>
                <Col sm={6} >
                  <FormControl name="selectUnusedInflections" style={{ height: '500px' }} componentClass='select' multiple onChange={this.handleSelectUsed} >
                    {grammarList.inflections.unused.map(inflection => (
                      <option key={inflection} value={inflection}> {inflection} </option>
                    ))}
                  </FormControl>
                </Col>
                <Col sm={6} >
                  <FormControl name="selectUsedInflections" style={{ height: '500px' }} componentClass='select' multiple onChange={this.handleSelectUsed} >
                    {grammarList.inflections.used.map(inflection => (
                      <option key={inflection} value={inflection} > {inflection} </option>
                    ))}
                  </FormControl>
                </Col>
                <Button bsStyle='primary' type='submit' > Flytta markerade böjningar </Button>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default GrammarPanel;
