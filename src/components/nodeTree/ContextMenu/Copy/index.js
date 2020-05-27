import React, { Component, PropTypes } from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../../redux/index/index.reducer.js";
class componentName extends Component {
  constructor(props) {
    super(props)
    this.state={
      editing: false,
      error: false,
      value: '',
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: (window.innerWidth / 2) - 175,
      moveInY: window.innerHeight * 0.35,
    }
  }
  handleMouseDown=(e)=> {
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

  handleMouseMove=(e)=> {
    e.preventDefault();
    if (this.state.isDragging === true) {
      const moveX = (e.pageX || Number(e.touches[0].pageX)) - this.state.relativeX;
      const moveY = (e.pageY || Number(e.touches[0].pageY)) - this.state.relativeY;
      this.setState({ moveInX: moveX, moveInY: moveY });
    }
  }

  handleMouseUp=(e)=> {
    e.preventDefault();
    this.setState({
      isDragging: false,
    });
  }

  handleMouseLeave=()=> {
    this.setState({
      isDragging: false,
    });
  }

  hidePanel=(e)=> {
    e.stopPropagation();
    this.props.hideCopy();
  }

  inputTouch=(e)=> {
    e.stopPropagation();
    e.target.focus();
  }

  changeValue=(e)=> {
    if (e.target.value.length >= 30) {
      this.setState({
        value: e.target.value,
        editing: true,
        error: '不能超过30个字符',
      });
    } else if (e.target.value.match(/[ \|\\\/@#\$%\^&\*]+/g)) {
      this.setState({
        value: e.target.value,
        editing: true,
        error: '不能使用非法字符',
      });
    } else {
      this.setState({
        value: e.target.value,
        editing: true,
        error: false,
      });
    }
  }

  confirm=()=> {
    if (this.state.value.trim() === '') {
      this.setState({ error: '名称不能为空' });
    } else {
      window.vtk.nodeapis.copyNode(this.props.indexId)                    
    }
  }

  render() {
    return (
      <div
        className='copyContent'
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
        <div className='titlePop' >
          复制选中节点
          <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
        </div>
        <div className='contentW' >
          <div className='linePart' >
            <div className='backZindex'>
              <span>节点名称</span>
              <input
                type="text"
                value={this.state.editing ? this.state.value : ''}
                onTouchEnd={this.inputTouch}
                onChange={this.changeValue}
                style={{'color':"#000"}}
              />
              <div
                className='btn'
                onClick={!this.state.error && this.confirm}
                onTouchEnd={!this.state.error  && this.confirm}
              >
                确定
              </div>
            </div>
            { this.state.error && <i className='feedBack'>* {this.state.error}</i> }
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (store) => ({...store.IndexStore})  
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth) 
export default connect(mapStateToProps,mapDispatchToProps )(componentName);