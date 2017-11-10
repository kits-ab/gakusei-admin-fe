/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { anchorate } from 'anchorate';
import { persistStore } from 'redux-persist';

import requireAuthentication from './shared/components/AuthenticatedComponent';

import aboutScreen from './screens/app/screens/about';
import LoginScreen from './screens/app/screens/login';
import LogoutScreen from './screens/app/screens/logout';
import GakuseiAdminNav from './screens/app/components/GakuseiAdminNav';
import AdminPanelScreen from './screens/app/screens/admin-panel';
import userScreen from './screens/app/screens/users';
import QuizzesScreen from './screens/app/screens/quizzes';
import NuggetCSV from './screens/app/screens/nuggetCsv';

function onUpdate() {
  anchorate(); // To have href's that can scroll to page sections
}

export default class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rehydrated: false,
      persistor: null
    };
  }

  componentWillMount() {
    // Redux store purging logic (aka "has project.json version changed?")
    // For now, we let security reducer determine purging decision for all reducers
    this.setState({
      persistor: persistStore(this.props.store, { blacklist: ['routing'] }, (err, state) => {
        if (state.security && state.security.purgeNeeded) {
          this.state.persistor.purge().then(this.setState({ rehydrated: true }));
        } else {
          this.setState({ rehydrated: true });
        }
      }) });
  }

  render() {
    if (this.state.rehydrated) {
      return (<Provider store={this.props.store}>
        <BrowserRouter onUpdate={onUpdate}>
          <div>
            <Route component={GakuseiAdminNav}/>
            <Route path="/about" component={aboutScreen} />
            <Route path="/login" component={requireAuthentication(LoginScreen)} />
            <Route path="/log-out" component={requireAuthentication(LogoutScreen)} />
            <Route path="/admin-panel" component={requireAuthentication(AdminPanelScreen)} />
            <Route path="/users" component={requireAuthentication(userScreen)} />
            <Route path="/quizzes" component={requireAuthentication(QuizzesScreen)} />
            <Route path="/nuggetCsv" component={requireAuthentication(NuggetCSV)} />
          </div>
        </BrowserRouter>
      </Provider>);
    }
    return null;
  }
}

AppProvider.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired
};
