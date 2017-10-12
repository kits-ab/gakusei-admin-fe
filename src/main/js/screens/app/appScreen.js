/* global frontend_global_data */

import React from 'react';

import GakuseiAdminNav from './components/GakuseiAdminNav';

import Utility from '../../shared/util/Utility';

export const Reducers = [];

export class appScreen extends React.Component {
  render() {
    return (
      <div>
        <GakuseiAdminNav/>
        {this.props.children}
      </div>
    );
  }
}

export default Utility.superConnect(this, Reducers)(appScreen);

