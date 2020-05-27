/* global window */
import React, {Component} from 'react';
import ReactPropTypes from 'prop-types';
import  '../../../style/ProxyContent.css';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IndexAction from "../../../redux/index/index.reducer.js";


class DataSet extends Component {
  constructor() {
    super();
    this.state = {
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: (window.innerWidth / 2) - 175,
      moveInY: window.innerHeight * 0.3,
      property: false,
      rename: false,
      active:0,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
    this.inputTouch = this.inputTouch.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  handleMouseDown(e) {
    if (e.target.parentNode === this.wrapper && e.target.children.length !== 0) {
      const ALeft = parseInt(this.wrapper.style.left, 10);
      const ATop = parseInt(this.wrapper.style.top, 10);
      this.setState({
        relativeX: (e.pageX || Number(e.touches[0].pageX)) - ALeft,
        relativeY: (e.pageY || Number(e.touches[0].pageY)) - ATop,
        isDragging: true,
      });
    }
  }

  handleMouseMove(e) {
    e.preventDefault();
    if (this.state.isDragging === true) {
      const moveX = (e.pageX || Number(e.touches[0].pageX)) - this.state.relativeX;
      const moveY = (e.pageY || Number(e.touches[0].pageY)) - this.state.relativeY;
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

  hidePanel(e) {
    e.stopPropagation();
    this.props.hideData();
  }

  inputTouch(e) {
    e.stopPropagation();
    e.target.focus();
  }

  confirm() {
      let nodeIndex = this.props.openDicomArray[this.select.value].nodeIndex;
      window.vtk.nodeapis.switchToImageNode(nodeIndex);
      this.props.hideData();
  }
  render() {
    console.log('openDicomArray',this.props.openDicomArray);
    return (
      <div
        className='changeData'
        ref={c => (this.wrapper = c)}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        style={{ left: `${this.state.moveInX}px`, top: `${this.state.moveInY}px` }}
      >
        <div className='mask' />
        <div className='popupTitle' >
          切换数据节点
          <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
        </div>
        {
          (this.props.openDicomArray.length === 0) &&
            <div className='popupContent' >
              <div className='popupLinePart' >
                <span style={{ width: '100%', lineHeight: '50px' }}>无数据节点存在！</span>
              </div>
              <div className='btns' >
                <div className='btn' onClick={this.hidePanel} onTouchEnd={this.hidePanel} style={{ float: 'none', margin: '10px auto' }} >
                  确定
                </div>
              </div>
            </div>
        }
        {
           this.props.openDicomArray.length !== 0 &&
            <div className='popupContent' >
              <div className='changeDataLineLeft' >
                  <span>图像数据节点</span>
                  <select ref={(c) => { this.select = c; }} onTouchEnd={this.inputTouch} defaultValue={0} >
                    {
                      this.props.openDicomArray.map((node, index) =>
                        <option key={index} value={index} >{node.SeriesTitle}</option>
                      )
                    }
                  </select>
              </div>
              <div className='changeDataLineRight' >
                <div className='btn'  onClick={this.confirm} onTouchEnd={this.confirm} >
                  确定
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}
DataSet.propTypes = {
  hideData: ReactPropTypes.func,
  setProgressVisible: ReactPropTypes.func,
 };
let mapStateToProps = store => ({
   ...store.IndexStore
});
let mapDispatchToProps = dispacth =>
 bindActionCreators(
   {
     ...IndexAction
   },
   dispacth
 );
 export default connect(mapStateToProps, mapDispatchToProps)(DataSet);
