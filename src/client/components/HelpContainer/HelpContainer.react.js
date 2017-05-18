import React, { PureComponent, PropTypes } from 'react';
import Help from '../Help';
import Modal from '../Modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as layoutActions from '../App/redux/reducer/layout';
import './HelpContainer.less';

@connect(
  state => ({
    showHelp: state.layout.showHelp
  }),
  dispatch => ({ actions: bindActionCreators(layoutActions, dispatch) })
)
export default
class HelpContainer extends PureComponent {
  handleHide() {
    this.props.actions.updateShowHelp(false);
  }

  render() {
    const {
      showHelp
    } = this.props;

    return (
      <div className="fsm--help-container">
        <Modal
          isShow={showHelp}
          onHide={this.handleHide.bind(this)}
          title="User manual"
        >
          <Help onHide={this.handleHide.bind(this)} />
        </Modal>
      </div>
    );
  }
}
