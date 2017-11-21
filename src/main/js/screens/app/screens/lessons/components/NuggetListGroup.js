import React from 'react';
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';

class NuggetListGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleSelect = (nugget) => {
    let selected = this.props.selected;
    let notSelected = this.props.notSelected;
    if (this.isSelected(nugget)) {
      selected.splice(selected.indexOf(nugget), 1);
      notSelected.push(nugget);
    } else {
      notSelected.splice(notSelected.indexOf(nugget), 1);
      selected.push(nugget);
    }
    this.props.updateSelected(selected, notSelected);
  };

  isSelected = nugget => (
    this.props.selected.includes(nugget)
  );

  render() {
    let nuggets = this.props.notSelected;
    return (
      <ListGroup>
        {nuggets.map(nugget =>
          <ListGroupItem
            key={nugget.id}
            onClick={() => this.toggleSelect(nugget)}
          >
            <Col md={4}>{nugget.swedish}</Col>
            <Col md={4}>{nugget.english}</Col>
            <Col md={4}>{nugget.jpWrite}</Col>
          </ListGroupItem>)}
      </ListGroup>
    );
  }
}

export default NuggetListGroup;
