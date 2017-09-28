import React from 'react';
import { Panel, Table } from 'react-bootstrap';

import userUtils from './userUtils';

class EventTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel collapsible header='Events'>
                <Table striped bordered>
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
                        {this.props.events.map(event => (
                            <tr>
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
