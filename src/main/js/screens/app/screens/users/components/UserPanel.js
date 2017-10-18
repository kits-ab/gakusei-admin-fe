import React from 'react';
import { Glyphicon, DropdownButton, MenuItem, Col, Alert, Button, 
  Panel, ButtonToolbar, Form, FormControl, FormGroup, ControlLabel, Modal } from 'react-bootstrap';

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
      newRole: this.props.user.role,
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
    this.submitRoleChange = this.submitRoleChange.bind(this);
    this.saveRoleSelect = this.saveRoleSelect.bind(this);
  }

  render() {
    return (
      <div id='userPanel'>
        {this.state.deleted ?
          <Alert bsStyle='info'>
            <strong>{this.props.user.username}</strong> was deleted.
                    </Alert>
          :
          <div>
            <Panel header={userUtils().createHeader(this.props.user)} >
              <ButtonToolbar>
                <Button id='infoBtn' bsStyle='primary' onClick={this.openModal} > 
                  <Glyphicon glyph='info-sign' /> Show info 
                </Button>
                <Button id='passBtn' bsStyle='warning' onClick={this.openPassModal} > 
                  <Glyphicon glyph='cog' /> Reset password 
                </Button>
                <Button id='roleBtn' bsStyle='warning' onClick={this.openRoleModal} > 
                  <Glyphicon glyph='cog' /> Change role 
                </Button>
                <Button id='delBtn' bsStyle='danger' onClick={this.deleteUser} > 
                  <Glyphicon glyph='alert' /> {this.state.confirmDelete ? 'Confirm' : 'Delete'} 
                </Button>
              </ButtonToolbar>
            </Panel>
            <Modal 
              show={this.state.showModal} 
              onHide={this.closeModal} 
              bsSize="large" 
              aria-labelledby="contained-modal-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title> <strong>Account:</strong> {this.props.user.username} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Panel>
                  <h4 id='infoModal' > <strong> Username: </strong> {this.props.user.username} </h4>
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
                      <FormControl 
                        type='text' 
                        name='password' 
                        placeholder='New password' 
                        onChange={this.handlePasswordInput} 
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={3} sm={9} >
                      <Button 
                        id='passwordModal' 
                        type='submit' 
                        bsStyle='primary' 
                        disabled={!this.state.validPassword} 
                      >
                        Submit
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button id='passwordModal' onClick={this.closePassModal} > Close </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.showRoleModal} onHide={this.closeRoleModal} >
              <Modal.Header closeButton >
                <Modal.Title> Change role : {this.props.user.username} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ButtonToolbar>
                  <DropdownButton title={this.state.newRole} id='roleChange' onSelect={this.saveRoleSelect} >
                    <MenuItem eventKey='ROLE_USER' > ROLE_USER </MenuItem>
                    <MenuItem eventKey='ROLE_ADMIN' > ROLE_ADMIN </MenuItem>
                  </DropdownButton>
                  <Button onClick={this.submitRoleChange} bsStyle='primary' > Set new role </Button>
                </ButtonToolbar>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeRoleModal} id='roleModal' > Close </Button>
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

  submitRoleChange() {
    this.closeRoleModal();
    this.changeRole(this.state.newRole);
  }

  saveRoleSelect(eventKey) {
    this.setState({ newRole: eventKey });
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
      }).catch((err) => { });
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

    userService().resetPassword(JSON.stringify(newUser)).then((response) => {
      switch (response.status) {
        case 200:
          break;
        default:
          throw new Error();
      }
    }).catch((err) => { });
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
    }).catch((err) => { });
  }
}

export default UserPanel;
