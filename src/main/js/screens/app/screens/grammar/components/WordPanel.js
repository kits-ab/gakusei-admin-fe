import React from 'react';

import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class WordPanel extends React.Component {
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
    let nuggets = this.props.nuggets;

    return (
      <Panel collapsible expanded={this.state.expanded} header={'Ord'} onClick={this.handlePanelClick} >
        <ListGroup>
          {nuggets.map(nugget => 
            <ListGroupItem key={nugget.id}> {nugget.description} </ListGroupItem>
          )}
        </ListGroup>
      </Panel>
    );
  }
}

export default WordPanel;
