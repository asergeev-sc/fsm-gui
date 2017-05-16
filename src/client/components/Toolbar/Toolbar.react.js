import React, { PureComponent, PropTypes } from 'react';
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
import simulateSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/all_inclusive.svg';
import helpSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/live_help.svg';

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
      label: '',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: openSVG,
      title: 'Open',
      label: '',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: saveSVG,
      title: 'Save',
      label: '',
      active: false,
      disabled: true
    },
    null,
    {
      action: () => {},
      iconSVG: backSVG,
      title: 'Back',
      label: '',
      active: false,
      disabled: true
    },
    {
      action: () => {},
      iconSVG: forwardSVG,
      title: 'Forward',
      label: '',
      active: false,
      disabled: true
    },
    {
      action: () => {},
      iconSVG: cutSVG,
      title: 'Cut',
      label: '',
      active: false,
      disabled: true
    },
    {
      action: () => {},
      iconSVG: copySVG,
      title: 'Copy',
      label: '',
      active: false,
      disabled: true
    },
    {
      action: () => {},
      iconSVG: pasteSVG,
      title: 'Paste',
      label: '',
      active: false,
      disabled: true
    },
    null,
    {
      action: () => {},
      iconSVG: selectSVG,
      title: 'Select objects',
      label: '',
      active: true,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: panSVG,
      title: 'Pan',
      label: '',
      active: false,
      disabled: false
    },
    null,
    {
      action: () => {},
      iconSVG: addSVG,
      title: 'Add State',
      label: 'State',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: addSVG,
      title: 'Add Transition',
      label: 'Transition',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: simulateSVG,
      title: 'Simulate',
      label: 'Simulate',
      active: false,
      disabled: false
    },
    null,
    {
      action: () => {},
      iconSVG: helpSVG,
      title: 'Help',
      label: '',
      active: false,
      disabled: false
    }
  ]
};

export default
class Toolbar extends PureComponent {
  render() {
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
            disabled={control.disabled}
            color="#333"
            label={control.label}
            contentPosition="before"
            isActive={control.active}
            onClick={control.action}
          />
        ))}
      </div>
    );
  }
}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;
