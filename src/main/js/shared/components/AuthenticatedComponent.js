import React from 'react';
import { connect } from 'react-redux';

export default function requireAuthentication(ReqComponent) {
    class AuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props);

            this.renderComponent = this.renderComponent.bind(this);
        }

        componentWillMount() {
            this.redirect(this.props.session.loggedIn);
        }

        componentWillReceiveProps(nextProps) {
            this.redirect(nextProps.session.loggedIn);
        }

        redirect(isAuthenticated) {
            if (this.props.location.pathname === '/login') {
                if (isAuthenticated) {
                    this.props.history.push('/admin-panel');
                } 
            } else if (!isAuthenticated) {
                this.props.history.push('/login');
            }
        }

        shouldComponentRender(isAuthenticated) {
            if (this.props.location.pathname === '/login') {
                if (isAuthenticated) {
                    return false;
                } 
            } else if (!isAuthenticated) {
                return false;
            }
            return true;
        }

        renderComponent() {
            if (this.shouldComponentRender(this.props.session.loggedIn)) {
                return (
                    <ReqComponent {...this.props} />
                );
            } 
            return null;
        }

        render() {
            return (
                <div>
                    { this.renderComponent() }
                </div>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            session: state.authSession,
        };
    }

    return connect(mapStateToProps, null)(AuthenticatedComponent);
}
