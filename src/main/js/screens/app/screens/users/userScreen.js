import React from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { requestUserSession } from '../../../../shared/actions/authActions';

import userService from '../../../../shared/services/userService';
import UserPanel from './UserPanel';

class userScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };

        this.getUsers();
    }
        
    render() {
        return (
            <Grid>
                {this.state.users.map(user => (
                        <UserPanel key={user.username} user={user} />
                ))}
            </Grid>
        );
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
