import React from 'react';
import { Button, Panel, ButtonToolbar, Modal } from 'react-bootstrap';

import ProgressTable from './ProgressTable';
import EventTable from './EventTable';

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
                        <ProgressTable progressList={this.props.user.progressTrackingList} />
                        <EventTable events={this.props.user.events} />
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
