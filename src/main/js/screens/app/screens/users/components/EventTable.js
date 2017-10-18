import React from 'react';
import { Glyphicon, Panel, Table } from 'react-bootstrap';

import userUtils from '../utility/userUtils';

class EventTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const header = (
      <div id='eventPanel' > 
        {this.state.expanded 
          ? 
          <Glyphicon glyph='chevron-up' /> 
          : 
          <Glyphicon glyph='chevron-down' />
        } 
        Events 
      </div>
    );

    return (
      <Panel collapsible expanded={this.state.expanded} header={header} onClick={this.handleClick} >
        <Table id='eventTable' striped bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Timestamp</th>
              <th>Gamemode</th>
              <th>Type</th>
              <th>Data</th>
              <th>nuggetID</th>
            </tr>
          </thead>
          <tbody>
            {this.props.events.sort((a, b) => b.timestamp - a.timestamp).map(event => (
              <tr key={event.id} >
                <td> {event.id} </td>
                <td> {userUtils().timestampToDate(event.timestamp)} </td>
                <td> {event.gamemode} </td>
                <td> {event.type} </td>
                <td> {event.data} </td>
                <td> {event.nuggetId} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

export default EventTable;
