/* global frontend_global_data */

import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

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

