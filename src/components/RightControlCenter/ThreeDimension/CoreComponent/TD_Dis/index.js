import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/ToggleIcons.css';

class TDDis extends Component {
  constructor() {
    super();
    this.state = {
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: 10,
      moveInY: 90,
    };
  }

  componentWillReceiveProps() {
    this.setState({
      moveInX: 10,
      moveInY: 90,
    });
  }

  handleMouseDown(e) {
    if (e.target.children.length !== 0) {
      const ATop = parseInt(this.wrapper.style.top, 10);
      const ALeft = parseInt(this.wrapper.style.left, 10);
      this.setState({
        relativeX: e.pageX - ALeft,
        relativeY: e.pageY - ATop,
        isDragging: true });
    }
  }

  handleMouseMove(e) {
    e.preventDefault();
    if (this.state.isDragging === true) {
      const moveX = e.pageX - this.state.relativeX;
      const moveY = e.pageY - this.state.relativeY;
      this.setState({ moveInX: moveX, moveInY: moveY });
    }
  }

  handleMouseUp(e) {
    e.preventDefault();
    this.setState({
      isDragging: false,
    });
  }

  handleMouseLeave() {
    this.setState({
      isDragging: false,
    });
  }

  render() {
    return (
      <div
        className={this.props.bool ? 'functionWrapperClose' : 'functionWrapperOn functionWrapperOnAngle'}
        ref={c => (this.wrapper = c)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        style={{ left: `${this.state.moveInX}px`, top: `${this.state.moveInY}px` }}
      >
        <ul>
          <li className='highLight active'>长度测量</li>
        </ul>
        <div className='triangle' />
      </div>
    );
  }
}
TDDis.propTypes = {
  bool: ReactPropTypes.bool,
};
export default TDDis;
