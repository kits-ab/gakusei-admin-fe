/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router';
import { anchorate } from 'anchorate';
import { persistStore } from 'redux-persist';

// import { requireAuthentication } from './shared/components/AuthenticatedComponent';

import appScreen from './screens/app';
import aboutScreen from './screens/app/screens/about';

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
        <Router onUpdate={onUpdate} history={this.props.history}>
          <Switch>
            <Route exact path="/" component={appScreen} />
            <Route path="/about" component={aboutScreen} />
          </Switch>
        </Router>
      </Provider>);
    }
    return null;
  }
}

AppProvider.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired
};
