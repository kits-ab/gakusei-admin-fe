import React from 'react';
import { Grid, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Button, Col } from 'react-bootstrap';
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
        };

        this.getUsers();

        this.onSearchStringChange = this.onSearchStringChange.bind(this);
    }
        
    render() {
        return (
            <Grid>
                <Form horizontal>
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
                            <FormControl type='text' name='roleSearch' placeholder='Role' />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10} >
                            <Button>
                                Search
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                {this.state.users.map(user => (
                        <UserPanel key={user.username} user={user} />
                ))}
            </Grid>
        );
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
                            window.console.log(data);
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
