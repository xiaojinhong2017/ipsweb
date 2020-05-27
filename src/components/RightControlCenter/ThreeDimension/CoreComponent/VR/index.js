import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/ToggleIcons.css';

class VR extends Component {
  constructor() {
    super();
    this.state = {
      type: '3',
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: -112,
      moveInY: 90,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.apply = this.apply.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      moveInX: -112,
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

  apply(e) {
    this.props.apply(e.target.getAttribute('data-type'));
    this.setState({ type: e.target.getAttribute('data-type') });
  }

  render() {
    return (
      <div
        className='functionWrapperOn functionWrapperOnVR'
        ref={c => (this.wrapper = c)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        style={{ left: `${this.state.moveInX}px`, top: `${this.state.moveInY}px` }}
      >
        <ul>
          <li className={this.state.type === '2' ? 'highLight active' : 'highLight'} data-type="2" onClick={this.apply} >窗宽窗位交互</li>
          <li className={this.state.type === '3' ? 'highLight active' : 'highLight'} data-type="3" onClick={this.apply} >旋转视图</li>
        </ul>
        <div className='triangle4' />
      </div>
    );
  }
}
VR.propTypes = {
  apply: ReactPropTypes.func,
};
export default VR;
