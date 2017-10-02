import React from 'react';
import { Alert, Button, Panel, ButtonToolbar, Modal } from 'react-bootstrap';

import ProgressTable from './ProgressTable';
import EventTable from './EventTable';
import userUtils from '../utility/userUtils';
import userService from '../../../../../shared/services/userService';

class UserPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassModal: false,
            showModal: false,
            confirmDelete: false,
            deleted: false,
        };

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closePassModal = this.closePassModal.bind(this);
        this.openPassModal = this.openPassModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    render() {
        return (
            <div>
                {this.state.deleted ? 
                    <Alert bsStyle='info'>
                        <strong>{this.props.user.username}</strong> was deleted.
                    </Alert>
                :
                <div>
                    <Panel header={userUtils().createHeader(this.props.user)} >
                        <ButtonToolbar>
                            <Button bsStyle='primary' onClick={this.openModal} > Show info </Button>
                            <Button bsStyle='warning' onClick={this.openPassModal} > Reset password </Button>
                            <Button bsStyle='danger' onClick={this.deleteUser} > {this.state.confirmDelete ? 'Confirm' : 'Delete'} </Button>
                        </ButtonToolbar>
                    </Panel>
                    <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                        <Modal.Header closeButton>
                            <Modal.Title> <strong>Account:</strong> {this.props.user.username} </Modal.Title>
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
                    <Modal show={this.state.showPassModal} onHide={this.closePassModal} >
                        <Modal.Header closeButton >
                            <Modal.Title> Reset password </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p> Works! </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closePassModal} > Close </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                }
            </div>
        );
    }

    openModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openPassModal() {
        this.setState({ showPassModal: true });
    }

    closePassModal() {
        this.setState({ showPassModal: false });
    }

    deleteUser() {
        if (!this.state.confirmDelete) {
            this.setState({ confirmDelete: true });
        } else {
            userService().delete(this.props.user.username).then((response) => {
                switch (response.status) {
                    case 200:
                        this.setState({ deleted: true });
                        break;
                    default:
                        throw new Error();
                }
            }).catch((err) => {});
        }
    }

    resetPassword(user) {
        userService().resetPassword(user).then((response) => {
            switch (response.status) {
                case 200:
                    break;
                default:
                    throw new Error();
            }
        }).catch((err) => {});
    }
}

export default UserPanel;
