import React from 'react';
import { Button } from 'react-bootstrap';

class KanjiLoadMore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button
          block
          bsStyle="primary"
          disabled={this.props.loadMoreIsDisabled}
          onClick={this.props.loadMore}
        >
          Ladda fler
        </Button>
      </div>
    );
  }
}

export default KanjiLoadMore;
