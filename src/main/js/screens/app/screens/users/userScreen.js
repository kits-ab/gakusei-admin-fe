import React from 'react';
import { Glyphicon, Row, Grid, Form, FormControl, FormGroup, ControlLabel, 
  HelpBlock, Button, Col, DropdownButton, MenuItem, Panel, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { requestUserSession } from '../../../../shared/actions/authActions';

import userService from '../../../../shared/services/userService';
import UserPanel from './components/UserPanel';

class userScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      searchString: '',
      selectedRoleKey: 0,
      selectedRole: 'All users',
      showSearchAlert: false,
    };
  }

  render() {
    return (
      <Grid>
        <Panel header='Search' bsStyle='primary' >
          <Form id='searchForm' horizontal onSubmit={this.performSearch} >
            <FormGroup controlId='formSearchName' >
              <Col componentClass={ControlLabel} sm={2} >
                Username
              </Col>
              <Col sm={10} >
                <FormControl 
                  type='text' 
                  name='search' 
                  placeholder='Username' 
                  onChange={this.onSearchStringChange} 
                />
                <FormControl.Feedback />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2} >
                Role
              </Col>
              <Col sm={10} >
                <DropdownButton title={this.state.selectedRole} id='roleSelect' onSelect={this.saveEventKey} >
                  <MenuItem eventKey='0'> All roles </MenuItem>
                  <MenuItem eventKey='1'> Users </MenuItem>
                  <MenuItem eventKey='2'> Administrators </MenuItem>
                </DropdownButton>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10} >
                <Button id='searchBtn' type='submit' bsStyle='primary' >
                  <Glyphicon glyph='search' /> Search
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel>
        <hr />
        {this.state.showSearchAlert
          ?
          <Alert bsStyle='info' >
            <Glyphicon glyph='info-sign' /> No users found
          </Alert>
          :
          null
        }

        {
          this.state.users
          .sort((a, b) => 
            a.username.toUpperCase().localeCompare(b.username.toUpperCase()))
          .map((user, index) => (
            <UserPanel key={user.username} user={user} />
        ))}
      </Grid>
    );
  }

  saveEventKey = (eventKey) => {
    this.setState({ selectedRoleKey: eventKey, selectedRole: this.eventKeyToString(eventKey) });
  }

  eventKeyToString = (key) => {
    switch (key) {
      case '1':
        return 'Users';
      case '2':
        return 'Administrators';
      default:
        return 'All users';
    }
  }

  performSearch = (e) => {
    e.preventDefault();

    const key = this.state.selectedRoleKey;
    let role = '';
    if (key === '1') {
      role = 'ROLE_USER';
    } else if (key === '2') {
      role = 'ROLE_ADMIN';
    }

    let processedSearch = this.state.searchString;

    this.search(processedSearch, role);
  }

  onSearchStringChange = (event) => {
    this.setState({ searchString: event.target.value });
  }

  search = (searchString, role) => {
    userService().searchWithRole(searchString, role).then((response) => {
      switch (response.status) {
        case 200:
          response.text().then((text) => {
            try {
              const data = JSON.parse(text);
              this.setState({ users: data, showSearchAlert: (data.length === 0) });
            } catch (err) {
              this.setState({ users: [], showSearchAlert: true });
            }
          });
          break;
        default:
          throw new Error();
      }
    }).catch((err) => { });
  }
}

function mapStateToProps(state) {
  return {
    session: state.authSession,
  };
}

export default connect(mapStateToProps, null)(userScreen);
