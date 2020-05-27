import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/ToggleIcons.css';

class Subtract extends Component {
  constructor() {
    super();
    this.state = {
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: -115,
      moveInY: 90,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      moveInX: -115,
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

  subtract() {
    // this.props.subtract({
    //   cmd: 'subtract',
    //   nodeindex1: this.nodeindex1.value,
    //   nodeindex2: this.nodeindex2.value,
    // });
  }


  render() {
    return (
      <div
        className={this.props.bool ? 'functionWrapperClose' : 'functionWrapperOn functionWrapperOnSubtract'}
        ref={c => (this.wrapper = c)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        style={{ left: `${this.state.moveInX}px`, top: `${this.state.moveInY}px` }}
      >
        <div className='height'>
          面数据1：
          <select ref={c => (this.nodeindex1 = c)} >
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                this.props.nodes[this.props.views[3][0]].map((node, index) =>
                  <option key={index} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='height'>
          面数据2：
          <select ref={c => (this.nodeindex2 = c)} >
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                this.props.nodes[this.props.views[3][0]].map((node, index) =>
                  <option key={index} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <ul>
          <li
            className={this.state.type === '0' ? 'highLight  active' : 'highLight'}
            style={{ marginLeft: '64px' }}
            data-type="0"
            onClick={this.subtract}
          >
            点击开始
          </li>
        </ul>
        <div className='triangleS' />
      </div>
    );
  }
}
Subtract.propTypes = {
  bool: ReactPropTypes.bool,
  subtract: ReactPropTypes.func,
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
};
export default Subtract;
