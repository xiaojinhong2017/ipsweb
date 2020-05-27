import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../../style/ToggleIcons.css';


class RangeBar extends Component {

  constructor() {
    super();
    this.state = {
        value: 1,
    };

  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.changeValue(e.target.value);
  }

  render() {
    return (
      <form id='rangerBarContent'>
        <input
          type="range"
          name="range"
          id="range"
          step="1"
          min={1}
          max={20}
          defaultValue={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
RangeBar.propTypes = {
  className: ReactPropTypes.string,
  changeValue: ReactPropTypes.func,
};
export default RangeBar;
