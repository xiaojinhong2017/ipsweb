
import React, { Component, PropTypes } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../../redux/index/index.reducer.js";
class componentName extends Component {
  constructor(props) {
    super(props);
    this.state={
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: (window.innerWidth / 2) - 175,
      moveInY: window.innerHeight * 0.2,
      expand: true,
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

  toggleExpand=()=> {
    this.setState({ expand: !this.state.expand });
  }

  renderProp=()=> {
    let nodes2D = window.vtk.nodeapis.getNodeDicomProperties(this.props.index)
    let nodes3D = window.vtk.nodeapis.getNodeProperties(this.props.index)
    if(this.props.label===3){
      let arr = []
      for (let i in nodes3D) {
          let o = {};
          o[i] = nodes3D[i];
          arr.push(o)
      }
      return arr&&arr.map((item, index) => {
        return (
          <div key={index} className='linePart' >
            <span key={`key-${index}`} title={Object.keys(item)} >{Object.keys(item)}</span>
            <span key={`value-${index}`} title={Object.values(item)} >{Object.values(item)}</span>
          </div>
        );
      });
    }else{
      let properties= nodes2D.basicInfo
      let arr = []
      for (let i in properties) {
          let o = {};
          o[i] = properties[i];
          arr.push(o)
      }
      return arr&&arr.map((item, index) => {
        return (
          <div key={index} className='linePart' >
            <span key={`key-${index}`} title={Object.keys(item)} >{Object.keys(item)}</span>
            <span key={`value-${index}`} title={Object.values(item)} >{Object.values(item)}</span>
          </div>
        );
      });
    }
  }
  
  hidePanel=(e)=> {
    e.stopPropagation();
    this.props.hideProperty();
  }
  render() {
    return (
      <div
        className='propertyContent'
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
          <span>属性</span>
          <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
        </div>
        <div className='contentW' >
          <div className='linePart'>
            <span>信息</span>
            <span>值</span>
          </div>
          <div className='label' onClick={this.toggleExpand} onTouchEnd={this.toggleExpand} >属性列表</div>
          {this.state.expand && this.renderProp()}
        </div>
      </div>
    );
  }
}

componentName.propTypes = {

};

let mapStateToProps = (store) => ({...store.IndexStore})  
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth) 
export default connect(mapStateToProps,mapDispatchToProps )(componentName);