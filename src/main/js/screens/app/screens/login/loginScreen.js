import React from 'react';
import {
  Alert, Grid, Row, Col, Form, FormGroup, FormControl, Button,
  ButtonGroup
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { setSession, tryUserLogin, clearSession } from '../../../../shared/actions/authActions';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearSession();
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(data) {
    data.preventDefault();
    this.props.tryUserLogin(data, this.props.history);
  }

  renderErrorMsg() {
    if (this.props.session.error != null) {
      let err = this.props.session.error;
      return (
        <Alert bsStyle="danger">
          <strong>Ett fel upptäcktes!</strong>
          <p>{err}</p>
        </Alert>
      );
    }
    return '';
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col mdOffset={4} md={4}>
            <h2>Logga in</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormControl
                  type="text"
                  name="username"
                  placeholder="Ange ditt användarnamn"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Ange ditt lösenord"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
              </FormGroup>
              <FormGroup>
                {this.renderErrorMsg()}
                <ButtonGroup vertical block>
                  <Button
                    type="submit"
                    label="login"
                    bsStyle="primary"
                    name="login"
                    disabled={!this.state.username || !this.state.password
                    || this.props.session.waiting}
                  >
                    {this.props.session.waiting ? 'Väntar på svar...' : 'Logga in'}
                  </Button>
                </ButtonGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.authSession,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tryUserLogin: (data, history) => {
      dispatch(tryUserLogin(data, history));
    },
    setSession: (session) => {
      dispatch(setSession(session));
    },
    clearSession: () => {
      dispatch(clearSession());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
