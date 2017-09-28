import React from 'react';
import { Button, Panel, ButtonToolbar, Modal, Table } from 'react-bootstrap';

class ProgressTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel collapsible header='Progress'>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>nuggetID</th>
                            <th>Correct answers</th>
                            <th>Incorrect answers</th>
                            <th>Latest timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.progressList.map(progress => (
                            <tr>
                                <td> {progress.id} </td>
                                <td> {progress.nuggetID} </td>
                                <td> {progress.correctCount} </td>
                                <td> {progress.incorrectCount} </td>
                                <td> {this.timestampToDate(progress.latestTimestamp)} </td>
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

export default ProgressTable;
