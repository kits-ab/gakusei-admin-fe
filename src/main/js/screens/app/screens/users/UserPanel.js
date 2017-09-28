import React from 'react';
import { Button, Panel, ButtonToolbar, Modal } from 'react-bootstrap';

import ProgressTable from './ProgressTable';
import EventTable from './EventTable';
import userUtils from './userUtils';

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
                <Panel header={userUtils().createHeader(this.props.user)} >
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
                        <Panel>
                            <h4> <strong> Username: </strong> {this.props.user.username} </h4>
                            <h4> <strong> Role: </strong> {userUtils().stringifyRole(this.props.user.role)} </h4>
                        </Panel>
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

    openModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    deleteUser() {

    }
}

export default UserPanel;
