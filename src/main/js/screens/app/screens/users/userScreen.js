import React from 'react';
import { Grid, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Button, Col, SplitButton, MenuItem, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { requestUserSession } from '../../../../shared/actions/authActions';

import userService from '../../../../shared/services/userService';
import UserPanel from './UserPanel';

class userScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            searchString: '',
            selectedRoleKey: 0,
            selectedRole: 'All users',
        };

        this.getUsers();

        this.onSearchStringChange = this.onSearchStringChange.bind(this);
        this.saveEventKey = this.saveEventKey.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }
        
    render() {
        return (
            <Grid>
                <Panel header='Search' bsStyle='primary' >
                <Form horizontal onSubmit={this.performSearch} >
                    <FormGroup controlId='formSearchName' >
                        <Col componentClass={ControlLabel} sm={2} >
                            Username
                        </Col>
                        <Col sm={10} >
                            <FormControl type='text' name='search' placeholder='Username' onChange={this.onSearchStringChange} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2} >
                            Role
                        </Col>
                        <Col sm={10} >
                            <SplitButton title={this.state.selectedRole} id='roleSelect' onSelect={this.saveEventKey} >
                                <MenuItem eventKey='0'> All roles </MenuItem>
                                <MenuItem eventKey='1'> Users </MenuItem>
                                <MenuItem eventKey='2'> Administrators </MenuItem>
                            </SplitButton>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10} >
                            <Button type='submit' >
                                Search
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                </Panel>
                <hr />
                {this.state.users.map(user => (
                        <UserPanel key={user.username} user={user} />
                ))}
            </Grid>
        );
    }

    saveEventKey(eventKey) {
        this.setState({ selectedRoleKey: eventKey, selectedRole: this.eventKeyToString(eventKey) });
    }

    eventKeyToString(key) {
        switch (key) {
            case '1':
                return 'Users';
            case '2':
                return 'Administrators';
            default:
                return 'All users';
        }
    }

    performSearch(e) {
        e.preventDefault();
        this.search(this.state.searchString);
    }

    onSearchStringChange(event) {
        this.setState({ searchString: event.target.value });
    }

    search(searchString) {
        userService().search(searchString).then((response) => {
            switch (response.status) {
                case 200:
                    response.text().then((text) => {
                        try {
                            const data = JSON.parse(text);
                            this.setState({ users: data });
                        } catch (err) {
                            window.console.log(err);
                        }
                    });
                    break;
                default:
                    throw new Error();
            }
        }).catch((err) => {});
    }

    getUsers() {
        userService().get().then((response) => {
            switch (response.status) {
                case 200:
                    response.text().then((text) => {
                        try {
                            const data = JSON.parse(text);
                            this.setState({
                                users: data,
                            });
                        } catch (err) {
                            this.setState({
                                users: [],
                            });
                        }
                    });
                    break;
                default:
                    throw new Error();
            }
        }).catch((err) => {});
    }
}

function mapStateToProps(state) {
    return {
        session: state.authSession,
    };
}

export default connect(mapStateToProps, null)(userScreen);
