import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/ToggleIcons.css';

class RebuildSlice extends Component {
  constructor() {
    super();
    this.state = {
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: 0,
      moveInY: 90,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

  }

  componentWillReceiveProps() {
    this.setState({
      moveInX: 0,
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

  rebuildCreatePlane() {
    // this.props.normalcutting({
    //   cmd: 'createplane',
    // });
  }

  rebuildCutting() {
    // this.props.normalcutting({
    //   cmd: 'cutting',
    // });
  }

  render() {
    return (
      <div
        className={this.props.bool ? 'functionWrapperClose' : 'functionWrapperOn functionWrapperOnRebuild'}
        ref={c => (this.wrapper = c)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        style={{ left: `${this.state.moveInX}px`, top: `${this.state.moveInY}px` }}
      >
        <ul>
          <li
            className={this.state.type === '0' ? 'highLight active' : 'highLight'}
            data-type="0"
            onClick={this.rebuildCreatePlane}
          >
            构建曲面
          </li>
          <li
            className={this.state.type === '1' ? 'highLight active' : 'highLight'}
            data-type="1"
            onClick={this.rebuildCutting}
          >
            曲面裁切
          </li>
        </ul>
        <div className='triangle' />
      </div>
    );
  }
}
RebuildSlice.propTypes = {
  bool: ReactPropTypes.bool,
  surfaceToImageAction: ReactPropTypes.func,
  normalcutting: ReactPropTypes.func,
};
export default RebuildSlice;
