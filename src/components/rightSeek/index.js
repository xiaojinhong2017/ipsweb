import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../redux/index/index.reducer.js";
var isMoblie = 'ontouchstart' in window;
// import PropTypes from 'prop-types';
// eslint-disable-next-line import/first
import '../../style/RightSeek.css';
class componentName extends Component {
  constructor(props) {
    super(props)
    this.elementWid = props.width || 100; 
    this.elementHeight = props.height || 100; 
    this.left = props.left || 0; 
    this.top =  props.top || 0; 
    this.zIndex = props.zIndex || 0;
    this.clientWidth = props.maxWidth;
    this.clientHeight = props.maxHeight;
    this._dragStart = this.dragStart.bind(this);
    this.state={
      top:0,
      ifBool:false
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.index === 0){
      if(nextProps.info0!==null){
        let ratio = nextProps.info0.max /(this.parent.offsetHeight - this.textInput.offsetHeight)
        let index = nextProps.info0.slice/ ratio
        this.setState({
          top:index
        })
      }
    }else if(nextProps.index === 1){
      if(nextProps.info1!==null){
        let ratio = nextProps.info1.max /(this.parent.offsetHeight - this.textInput.offsetHeight)
        let index = nextProps.info1.slice/ ratio
        this.setState({
          top:index
        })
      }
    }else if(nextProps.index === 2){
      if(nextProps.info2!==null){
        let ratio = nextProps.info2.max /(this.parent.offsetHeight - this.textInput.offsetHeight)
        let index = nextProps.info2.slice/ ratio
        this.setState({
          top:index
        })
      }
    }
  }
  dragStart(ev) {
    this.setState({
      ifBool:true
    })
    ev.preventDefault();
    ev.stopPropagation();
    let target = ev.target; 
    if(isMoblie && ev.changedTouches) {
      this.startY = ev.changedTouches[0].pageY;
    } else {
      this.startY = ev.clientY;
    }

    // 偏移位置 = 鼠标的初始值 - 元素的offset
    this.disY = this.startY - target.offsetTop;
    this.zIndex += 1;
    this._dragMove = this.dragMove.bind(this);
    this._dragEnd = this.dragEnd.bind(this);

    if(!isMoblie) {
      document.addEventListener('mousemove', this._dragMove, false);
      document.addEventListener('mouseup', this._dragEnd, false);
    } 

  }

  dragMove(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if(isMoblie && ev.changedTouches) {
      this.clientY = ev.changedTouches[0].pageY;
    } else {
      this.clientY = ev.clientY;
    } 

    // 元素位置 = 现在鼠标位置 - 元素的偏移值
    let top = this.clientY - this.disY;
    // 处理不可超出规定拖拽范围
    if (top < 0) {
      top = 0;
    }

    if (top > this.parent.offsetHeight - this.textInput.offsetHeight) {
      top = this.parent.offsetHeight - this.textInput.offsetHeight
    }
    if(this.props.index === 0){
      if(this.props.info0!==null){
        let ratio = this.props.info0.max /(this.parent.offsetHeight - this.textInput.offsetHeight)
        let slice = (this.parent.offsetHeight -this.textInput.offsetHeight- top)*ratio
        window.vtk.apis.setSlice(this.props.index, slice) 
      }
    }else if(this.props.index === 1){
      if(this.props.info1!==null){
        let ratio = this.props.info1.max /(this.parent.offsetHeight - this.textInput.offsetHeight)
        let slice = (this.parent.offsetHeight -this.textInput.offsetHeight- top)*ratio
        window.vtk.apis.setSlice(this.props.index, slice) 
      }
    }else if(this.props.index === 2){
      if(this.props.info2!==null){
        let ratio = this.props.info2.max /(this.parent.offsetHeight - this.textInput.offsetHeight)
        let slice = (this.parent.offsetHeight -this.textInput.offsetHeight- top)*ratio
        window.vtk.apis.setSlice(this.props.index, slice) 
      }
    }
    this.setState({
      top: top
    });
  }
  dragEnd(e) {
    this.setState({
      ifBool:false
    })
    e.preventDefault();
    e.stopPropagation();
    document.removeEventListener('mousemove', this._dragMove);
    document.removeEventListener('mouseup', this._dragEnd);
  }
  render() {
    let {top} = this.state
    return (
      <div className="viewAction">
        <div id="lineDivs"  className="sliders lineDivs"  ref={(ref)=>{this.parent=ref}}>
          <div id="minDivs" className="minDivs" 
            ref={(input)=>{this.textInput=input}}
            style={{'position':'absolute', 'top':top}}
            onTouchStart = {this._dragStart}
            onTouchMove = {(e)=>this._dragMove(e)}
            onTouchEnd = {this._dragEnd}
            onMouseDown = {this._dragStart}
            onMouseUp = {this._dragEnd}
          >
          </div>
        </div>
    </div>
    )
  }
}

let mapStateToProps = (store) => ({...store.IndexStore})  
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth) 
export default connect(mapStateToProps,mapDispatchToProps )(componentName);