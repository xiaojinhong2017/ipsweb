import React, {Component} from 'react';
import ReactPropTypes from 'prop-types';
import { CompactPicker } from 'react-color';
import style            from './../../../../../style/RenderControl.css';

class ColorPicker extends Component{

  constructor() {
    super();
    this.state = {
      visible: false,
      color: '#fff',
    };
    this.colorChange = this.colorChange.bind(this);
  }

  colorChange(type, e) {
    this.props.colorChange(type, e);
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    const popover = { position: 'absolute', zIndex: '2', top: this.props.top, left: '200px' };
    return (
      <div style={popover} className={style.popover} >
        <CompactPicker
          color={this.props.color || this.state.color}
          onChange={(e) => { this.colorChange(this.props.label, e); }}
        />
      </div>
    );
  }
}

ColorPicker.propTypes = {
  top: ReactPropTypes.string,
  visible: ReactPropTypes.bool,
  color: ReactPropTypes.string,
  label: ReactPropTypes.string,
  colorChange: ReactPropTypes.func,
};

export default ColorPicker;
