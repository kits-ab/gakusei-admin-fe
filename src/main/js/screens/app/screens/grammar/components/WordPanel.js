import React from 'react';

import { Panel, Table } from 'react-bootstrap';

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
        <Table striped bordered >
          <thead>
            <tr>
              <th> Beskrivning </th>
              <th> Svenska </th>
              <th> Engelska </th>
              <th> Japanska: Läs </th>
              <th> Japanska: Skrift </th>
            </tr>
          </thead>
          <tbody>
          {nuggets.sort((a, b) => a.description.toUpperCase().localeCompare(b.description.toUpperCase())).map(nugget => 
            <tr key={nugget.id}> 
              <td> {nugget.description} </td> 
              <td> {nugget.swedish} </td>
              <td> {nugget.english} </td>
              <td> {nugget.jp_read} </td>
              <td> {nugget.jp_write} </td>
            </tr>
          )}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

export default WordPanel;
