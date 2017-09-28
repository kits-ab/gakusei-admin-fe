import React from 'react';
import { Panel, Table } from 'react-bootstrap';

import userUtils from './userUtils';

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
                            <tr key={progress.id} >
                                <td> {progress.id} </td>
                                <td> {progress.nuggetID} </td>
                                <td> {progress.correctCount} </td>
                                <td> {progress.incorrectCount} </td>
                                <td> {userUtils().timestampToDate(progress.latestTimestamp)} </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Panel>
        );
    }
}

export default ProgressTable;
