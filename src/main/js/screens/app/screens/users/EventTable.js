import React from 'react';
import { Button, Panel, ButtonToolbar, Modal, Table } from 'react-bootstrap';

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
                                <td> {this.timestampToDate(event.timestamp)} </td>
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

    timestampToDate(timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString('sv');
    }
}

export default EventTable;
