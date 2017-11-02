import React from 'react';
import { Grid } from 'react-bootstrap';

import { connect } from 'react-redux';
import { requestUserSession } from '../../../../shared/actions/authActions';
import grammarService from '../../../../shared/services/grammarService';

import GrammarPanel from './components/GrammarPanel';

class grammarScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grammarLists: [],
    };
  }

  componentWillMount = () => {
    this.getGrammarLists();
  }

  getGrammarLists = () => {
    grammarService().getAll().then((response) => {
      if (response.status === 200) {
        response.text().then((text) => {
          this.setState({ grammarLists: JSON.parse(text) });
        });
      } else {
        throw new Error();
      }
    });
  }

  render() {
    return (
      <Grid>
        {this.state.grammarLists.map(grammarList => 
          <GrammarPanel key={grammarList.lesson} grammarList={grammarList} />   
        )}
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.authSession,
  };
}

export default connect(mapStateToProps, null)(grammarScreen);
