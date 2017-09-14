import React from 'react';
import { connect } from 'react-redux';
import { tryUserLogout } from '../../../../shared/actions/authActions';

class LogoutScreen extends React.Component {
    constructor(props) { super(props); }

    componentWillMount() {
        this.props.tryUserLogout();
    }
    
    render() {
        return null;
    }
} 

function mapStateToProps(state) {
    return {
        session: state.authSession,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        tryUserLogout: () => {
            dispatch(tryUserLogout());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
