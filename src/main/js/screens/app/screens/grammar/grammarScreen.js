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
    grammarService().getLessons().then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          data.forEach((lesson) => {
            grammarService().getGrammarList(lesson.id).then((grammarResponse) => {
              grammarResponse.json().then((grammarList) => {
                let newGrammarList = this.state.grammarLists;
                newGrammarList.push(grammarList);
                this.setState({ grammarLists: newGrammarList });
              });
            });
          });
        });
      } else {
        throw new Error();
      }
    });
  }

  updateGrammarList = (grammarList, property, newValue) => {
    let oldGrammarLists = this.state.grammarLists;

    let updatedGrammarList = grammarList;
    updatedGrammarList[property] = newValue;

    let newGrammarLists = oldGrammarLists.map(element => (grammarList.lesson === element.lesson ? updatedGrammarList : element));

    this.setState({ grammarLists: newGrammarLists });
  }

  render() {
    return (
      <Grid>
        {this.state.grammarLists.sort((a, b) => a.lesson.name.toUpperCase().localeCompare(b.lesson.name.toUpperCase())).map(grammarList => 
          <GrammarPanel updateGrammarList={this.updateGrammarList} key={grammarList.lesson.name} grammarList={grammarList} />   
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
