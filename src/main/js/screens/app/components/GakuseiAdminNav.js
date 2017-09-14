import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Utility from '../../../shared/util/Utility';
// import logo from '../../../../resources/static/img/logo/temp_gakusei_logo3.png';

export const Reducers = [];

export class GakuseiAdminNav extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <span>
                <img height="100%" src="" alt="Gakusei logo" />
                Gakusei Admin
              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/about">
              <NavItem>Om Gakusei</NavItem>
            </LinkContainer>
          </Nav>
         <Nav pullRight>
           <LinkContainer to="/login">
             <NavItem>Logga in </NavItem>
           </LinkContainer>
           <LinkContainer to="/admin-panel">
             <NavItem>Admin panel</NavItem>
           </LinkContainer>
           <LinkContainer to="/log-out">
             <NavItem>Logga ut</NavItem>
           </LinkContainer>
         </Nav>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Utility.superConnect(this, Reducers)(withRouter(GakuseiAdminNav));

