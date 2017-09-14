import React from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { requestUserSession } from '../../../../shared/actions/authActions';

class AdminPanelScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <h2>Welcome to the Admin Panel, {this.props.session.username}</h2>
            </Grid>
        );
    }
} 

function mapStateToProps(state) {
    return {
        session: state.authSession,
    };
}

export default connect(mapStateToProps, null)(AdminPanelScreen);
