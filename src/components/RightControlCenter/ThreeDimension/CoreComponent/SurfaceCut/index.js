// /* global window */
import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/ToggleIcons.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../../../redux/index/index.reducer.js";

class SurfaceCut extends Component {
  constructor() {
    super();
    this.state = {
      onHighLight: false,
      onHighLight2: false,
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: -90,
      moveInY: 90,
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.createPlane = this.createPlane.bind(this);
    this.drawBeforeHand = this.drawBeforeHand.bind(this);
    this.surfaceTrimming= this.surfaceTrimming.bind(this);
    this.activeSurface = this.activeSurface.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

  }

  drawBeforeHand() {
    window.vtk.toolapis.updateTool('SurfaceCutting', {cmd:'DrawCutLine'});
    this.setState({ onHighLight: true });
  }

  createPlane() {
    if (this.state.onHighLight === true) {
      this.setState({ onHighLight2: true });
      window.vtk.toolapis.updateTool('SurfaceCutting', {cmd:'CreatePlane'});
    }
  }
  surfaceTrimming() {
    if (this.state.onHighLight === true) {
      this.setState({ onHighLight2: true });
      window.vtk.toolapis.updateTool('SurfaceCutting',  {cmd:'SurfaceCut'});
    }
  }
  activeSurface() {
    if (this.state.onHighLight === true) {
      this.setState({ onHighLight2: true });
      window.vtk.toolapis.updateTool('SurfaceCutting',  {cmd:'ActiveNurbs'});
    }
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
        ref={c => (this.wrapper = c)}
        className={this.props.bool ? 'functionWrapperClose' : 'functionWrapperOn'}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        style={{ left: `${this.state.moveInX}px`, top: `${this.state.moveInY}px` }}
      >
        <ul>
          <li onClick={this.drawBeforeHand} className='highLight'>画预切线</li>
          <li onClick={this.createPlane} className={this.state.onHighLight ? 'highLight' : ''}>创建平面</li>
          <li onClick={this.activeSurface} className={this.state.onHighLight2 ? 'highLight' : ''}>点取曲面</li>
          <li onClick={this.surfaceTrimming} className={this.state.onHighLight2 ? 'highLight' : ''}>曲面裁切</li>
        </ul>
        <div className='triangle' style={{ left: '145px' }} />
      </div>
    );
  }
}

SurfaceCut.propTypes = {
  bool: ReactPropTypes.bool,
  surfaceCut: ReactPropTypes.func,
  updateViewParamsAll: ReactPropTypes.func,
};
// export default SurfaceCut;
let mapStateToProps = (store) => ({...store.IndexStore})
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth)
export default connect(mapStateToProps,mapDispatchToProps )(SurfaceCut);
