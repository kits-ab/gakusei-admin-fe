import React from 'react';
import { Col, Alert, Button, Panel, ButtonToolbar, Form, FormControl, FormGroup, ControlLabel, Modal } from 'react-bootstrap';

import ProgressTable from './ProgressTable';
import EventTable from './EventTable';
import userUtils from '../utility/userUtils';
import userService from '../../../../../shared/services/userService';

class UserPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassModal: false,
            showRoleModal: false,
            showModal: false,
            confirmDelete: false,
            deleted: false,
            password: '',
            validPassword: false,
        };

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closePassModal = this.closePassModal.bind(this);
        this.openPassModal = this.openPassModal.bind(this);
        this.closeRoleModal = this.closeRoleModal.bind(this);
        this.openRoleModal = this.openRoleModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
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
                            <Button bsStyle='warning' onClick={this.openRoleModal} > Change role </Button>
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
                            <Form horizontal onSubmit={this.submitPassword}>
                                <FormGroup controlId='newPassword' >
                                    <Col componentClass={ControlLabel} sm={3} >
                                        New password
                                    </Col>
                                    <Col sm={9} >
                                        <FormControl type='text' name='password' placeholder='New password' onChange={this.handlePasswordInput} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={3} sm={9} >
                                        <Button type='submit' bsStyle='primary' disabled={!this.state.validPassword} >
                                            Submit
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closePassModal} > Close </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showRoleModal} onHide={this.closeRoleModal} >
                        <Modal.Header closeButton >
                            <Modal.Title> Change role </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p> Change me! </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeRoleModal} > Close </Button>
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
        this.setState({ showPassModal: false, password: '', validPassword: false });
    }

    openRoleModal() {
        this.setState({ showRoleModal: true });
    }

    closeRoleModal() {
        this.setState({ showRoleModal: false });
    }

    handlePasswordInput(e) {
        this.setState({ password: e.target.value, validPassword: e.target.value.length !== 0 });
    }

    submitPassword(e) {
        e.preventDefault();
        this.closePassModal();
        this.resetPassword();
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

    resetPassword() {
        let newUser = {
            username: this.props.user.username,
            password: this.state.password,
            role: this.props.user.role,
            events: this.props.user.events,
            progressTrackingList: this.props.user.progressTrackingList,
            usersLessons: this.props.user.usersLessons,
        };
        window.console.log(JSON.stringify(newUser));
        window.console.log(newUser);
        userService().resetPassword(JSON.stringify(newUser)).then((response) => {
            switch (response.status) {
                case 200:
                    break;
                default:
                    throw new Error();
            }
        }).catch((err) => {});
    }

    changeRole(newRole) {
        let oldUser = this.props.user;
        let newUser = {
            username: oldUser.username,
            password: oldUser.password,
            role: newRole,
            events: oldUser.events,
            progressTrackingList: oldUser.progressTrackingList,
            usersLessons: oldUser.usersLessons,
        };

        userService().changeRole(JSON.stringify(newUser)).then((response) => {
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
