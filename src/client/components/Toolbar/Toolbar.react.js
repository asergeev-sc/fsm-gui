import React, { Component, PropTypes } from 'react';
import './Toolbar.less';
import TitledButton from 'opuscapita-react-ui-buttons/lib/TitledButton';

// TODO remove it
import addSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/add.svg';
import openSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/folder_open.svg';
import saveSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/check.svg';
import backSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/arrow_back.svg';
import forwardSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/arrow_forward.svg';
import cutSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/content_cut.svg';
import copySVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/content_copy.svg';
import pasteSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/content_paste.svg';
import panSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/open_with.svg';
import selectSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/touch_app.svg';

const propTypes = {
  controls: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func,
    iconSVG: PropTypes.string,
    title: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool
  }))
};
const defaultProps = {
  controls: [
    {
      action: () => {},
      iconSVG: addSVG,
      title: 'New',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: openSVG,
      title: 'Open',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: saveSVG,
      title: 'Save',
      active: false,
      disabled: false
    },
    null,
    {
      action: () => {},
      iconSVG: backSVG,
      title: 'Back',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: forwardSVG,
      title: 'Forward',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: cutSVG,
      title: 'Cut',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: copySVG,
      title: 'Copy',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: pasteSVG,
      title: 'Paste',
      active: false,
      disabled: false
    },
    null,
    {
      action: () => {},
      iconSVG: selectSVG,
      title: 'Select objects',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: panSVG,
      title: 'Pan',
      active: false,
      disabled: false
    }
  ]
};

export default
class Toolbar extends Component {
  render() {
    console.log(backSVG);
    const {
      controls
    } = this.props;

    return (
      <div className="fsm--toolbar">
        {controls.map((control, i) => control === null ? (
          <div key={i} className="fsm--toolbar__divider"></div>
        ) : (
          <TitledButton
            key={i}
            svg={control.iconSVG}
            title={control.title}
            disabled={control.active}
            isActive={control.selected}
            onClick={control.action}
          />
        ))}
      </div>
    );
  }
}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;
