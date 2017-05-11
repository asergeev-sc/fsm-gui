import React, { Component, PropTypes } from 'react';
import './StatusLine.less';

export default
class StatusLine extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="status-line">
      </div>
    );
  }
}

StatusLine.propTypes = {
};
StatusLine.defaultProps = {
};
