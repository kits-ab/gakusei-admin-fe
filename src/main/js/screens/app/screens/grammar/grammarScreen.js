import React from 'react';
import { connect } from 'react-redux';
import { requestUserSession } from '../../../../shared/actions/authActions';

class grammarScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> Hello wolrd! </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.authSession,
  };
}

export default connect(mapStateToProps, null)(grammarScreen);
