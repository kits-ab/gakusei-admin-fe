import React from 'react';

import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class InflectionPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  handlePanelClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <Panel collapsible header={'Böjningar'} expanded={this.state.expanded} onClick={this.handlePanelClick} >
        <ListGroup>
          {this.props.inflections.used.map(inflection => 
            <ListGroupItem key={inflection.inflectionMethod} > {inflection.inflectionMethod} </ListGroupItem>
          )}
        </ListGroup>
      </Panel>
    );
  }
}

export default InflectionPanel;
