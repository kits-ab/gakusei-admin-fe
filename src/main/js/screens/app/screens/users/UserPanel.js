import React from 'react';
import { Alert, Grid, Row, Col, Form, FormGroup, FormControl, Button,
    ButtonGroup, Panel, ButtonToolbar, Modal, Table } from 'react-bootstrap';

class UserPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    render() {
        return (
                <div>
                <Panel header={this.createHeader(this.props.user)} >
                    <ButtonToolbar>
                        <Button bsStyle='primary' onClick={this.openModal} > Show info </Button>
                        <Button bsStyle='warning'> Reset password </Button>
                        <Button bsStyle='danger'> Delete </Button>
                    </ButtonToolbar>
                </Panel>
                <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title> {this.props.user.username} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p> Username: {this.props.user.username} </p>
                        <p> Role: {this.stringifyRole(this.props.user.role)} </p>
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
                                    {this.props.user.progressTrackingList.map(progress => (
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
                                    {this.props.user.events.map(event => (
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal} > Close </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    timestampToDate(timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString('sv');
    }

    createHeader(user) {
        return `${this.stringifyRole(user.role)} : ${user.username}`;
    }

    stringifyRole(role) {
        switch (role) {
            case 'ROLE_USER':
                return 'User';
            case 'ROLE_ADMIN':
                return 'Admin';
            default:
                return 'Null';
        }
    }

    openModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }
}

export default UserPanel;
