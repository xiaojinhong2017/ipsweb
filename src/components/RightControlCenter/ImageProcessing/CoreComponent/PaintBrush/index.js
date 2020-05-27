import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/ToggleIcons.css';

class PaintBrush extends Component {
  constructor() {
    super();
    this.state = {
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: -20,
      moveInY: 92,
      erase: false,
      cancel: false,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.brusOperation = this.brusOperation.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      moveInX: -20,
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


  brusOperation(type) {
    switch (type) {
      case 'erase': {
        if (!this.state.erase) {
          this.props.setBrushToolMode('n', true);
          this.setState({ erase: true });
        } else {
          this.props.setBrushToolMode('n', false);
          this.setState({ erase: false });
        }
        break;
      }
      case 'cancel': {
        if (!this.state.cancel) {
          this.props.setBrushToolMode('z', true);
          this.setState({ cancel: true });
        } else {
          this.props.setBrushToolMode('z', false);
          this.setState({ cancel: false });
        }
        break;
      }
      default:
        return false;
    }
    return true;
  }

  render() {
    return (
      <div
        className='functionWrapperOn'
        ref={c => (this.wrapper = c)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        style={{ left: `${this.state.moveInX}px`, top: `${this.state.moveInY}px` }}
      >
        <ul style={{ margin: '0px 10px' }}>
          <li
            className={this.state.erase ? 'highLight active' : 'highLight'}
            data-type="0"
            onClick={this.brusOperation('erase')}
          >
            擦除
          </li>
          <li
            className={this.state.cancel ? 'highLight active' : 'highLight'}
            data-type="1"
            onClick={this.brusOperation('cancel')}
          >
            撤销
          </li>
        </ul>
        <div className='triangle4' style={{ left: '60px' }} />
      </div>
    );
  }
}
PaintBrush.propTypes = {
  setBrushToolMode: ReactPropTypes.func,
};
export default PaintBrush;
