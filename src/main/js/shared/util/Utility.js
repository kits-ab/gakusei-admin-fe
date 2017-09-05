import React from 'react';
import { connect } from 'react-redux';

export default class Utility {
// ----------------
// REDUX RELATED - Helps return various redux objects

    static generateReducerNamesFromReducer(reducers) {
    const result = [];
    reducers.forEach(reducer =>
      Object.keys(reducer.reducers).forEach((x) => {
        result.push(x);
      })
  );
    return result;
  }

  static generateActionCreatorsFromReducer(reducers) {
    const result = [];
    reducers.forEach(reducer =>
      result.push(reducer.actionCreators)
  );
    return result;
  }


  static superConnect(sender, reducerNames) {
    return connect(
      // Selects which state properties are merged into the component's props
      state => (
        Object.assign({},
          ...Utility.generateReducerNamesFromReducer(reducerNames)
            .map(reducerStateName => state[reducerStateName])
        )
      ),
      // Selects which action creators are merged into the component's props
      (Object.assign({}, ...Utility.generateActionCreatorsFromReducer(reducerNames))),
    );
  }
}
