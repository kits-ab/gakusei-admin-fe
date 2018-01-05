import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../../../resources/static/img/logo/temp_gakusei_logo3.png';

export const Reducers = [];

let navPages = [{
    name: 'Adminpanelen',
    link: '/admin-panel',
  }, {
    name: 'Användare',
    link: '/users',
  }, {
    name: 'Quiz',
    link: '/quizzes',
  }, {
    name: 'Lektioner',
    link: '/lessons',
  }, {
    name: 'Ord',
    link: '/nuggets',
  }, {
    name: 'CSV Ord',
    link: '/nuggetCsv',
  }, {
    name: 'Grammatik',
    link: '/grammar',
  }, {
    name: 'Kanji',
    link: '/kanji',
  }
];

export class GakuseiAdminNav extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <span>
                <img height="100%" src={logo} alt="Gakusei logo"/>
                Gakusei Admin 
              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          { this.props.session.loggedIn ?
            <div>
              {navPages.map(page => this.navItem(page))}
              <Nav pullRight>
                <LinkContainer to="/log-out">
                  <NavItem>Logga ut</NavItem>
                </LinkContainer>
              </Nav>
            </div>
            :
            <div>
              <Nav>
                <LinkContainer to="/about">
                  <NavItem>Om Gakusei</NavItem>
                </LinkContainer>
              </Nav>
              <Nav pullRight>
                <LinkContainer to="/login">
                  <NavItem>Logga in </NavItem>
                </LinkContainer>
              </Nav>
            </div>
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }

  navItem = navPage => (
    <Nav key={navPage.link}>
      <LinkContainer to={navPage.link}>
        <NavItem>{navPage.name}</NavItem>
      </LinkContainer>
    </Nav>
  );
}


function mapStateToProps(state) {
  return {
    session: state.authSession,
  };
}

export default connect(mapStateToProps, null)(GakuseiAdminNav);
