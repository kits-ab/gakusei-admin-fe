import React from 'react';
import { Glyphicon, Panel, Table } from 'react-bootstrap';

import userUtils from '../utility/userUtils';

class ProgressTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            progress: 'Progress'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const header = (
            <div>{this.state.expanded ? <Glyphicon glyph='chevron-up' /> : <Glyphicon glyph='chevron-down' />} <span> Progress </span></div>
        );

        return (
            <Panel collapsible expanded={this.state.expanded} header={header} onClick={this.handleClick}>
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
