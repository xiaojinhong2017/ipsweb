import React, { Component, PropTypes } from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../../redux/index/index.reducer.js";
class componentName extends Component {
  constructor(props) {
    super(props)
    this.state={
      changeable: true,
      radius: 1,
      radiusOrigin: 1,
      simple: 80,
      simpleOrigin: 80,
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: (window.innerWidth / 2) - 150,
      moveInY: window.innerHeight * 0.25,
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

  handleDown=(e)=> {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      touchX: e.pageX || e.touches[0].pageX,
    });
  }

  handleMove=(e)=> {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.touchX !== 0) {
      if (e.target.getAttribute('data-type') === 'simple') {
        const value = this.state.simpleOrigin;
        const change = (100 / e.target.offsetWidth) * ((e.pageX || e.touches[0].pageX) - this.state.touchX);
        const newValue = parseInt(value + change, 10);
        this.setState({
          simple: newValue > 100 ? 100 : newValue < 0 ? 0 : newValue,
        });
      } else {
        const value = this.state.radiusOrigin;
        const change = (8 / e.target.offsetWidth) * ((e.pageX || e.touches[0].pageX) - this.state.touchX);
        let newValue = 0;
        if (change < 0) {
          newValue = Math.floor(value + change);
        } else if (change > 0) {
          newValue = Math.ceil(value + change);
        }
        this.setState({
          radius: newValue > 8 ? 8 : newValue < 1 ? 1 : newValue,
        });
      }
    }
  }

  handleUp=(e)=> {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.touchX !== 0) {
      if (e.target.getAttribute('data-type') === 'simple') {
        this.setState({
          simpleOrigin: this.state.simple,
          touchX: 0,
        });
      } else {
        this.setState({
          radiusOrigin: this.state.radius,
          touchX: 0,
        });
      }
    }
  }

  simpleChange=(e)=> {
    this.setState({ simple: e.target.value });
  }

  radiusSwitch=()=> {
    this.setState({ changeable: !this.state.changeable });
  }

  radiusChange=(e)=> {
    this.setState({ radius: e.target.value });;
  }

  confirm=()=> {
    if (this.state.changeable) {
      this.props.rebuild(`${this.state.simple},${this.state.radius}`);
    } else {
      this.props.rebuild(`${this.state.simple},0`);
    }
    this.props.hideReBuild();
  }

  hidePanel=(e)=> {
    e.stopPropagation();
    this.props.hideReBuild();
  }

  render() {
    return (
      <div
        className='reBuildContent'
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
          直接重建
          <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
        </div>
        <div className='contentW' >
          <div className='linePart' >
            <span>简化程度：</span>
            <i>{this.state.simple}</i>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={this.state.simple}
              data-type="simple"
              onChange={this.simpleChange}
              onMouseUp={this.handleUp}
              onKeyDown={this.handleDown}
              onKeyUp={this.handleUp}
              onTouchStart={this.handleDown}
              onTouchMove={this.handleMove}
              onTouchEnd={this.handleUp}
            />
          </div>
          <div className='linePart' >
            <span>
              <input
                type="checkBox"
                checked={this.state.changeable ? true : false}
                onChange={this.radiusSwitch}
                onTouchEnd={this.radiusSwitch}
              />优化半径：
            </span>
            <i>{this.state.radius}</i>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={this.state.radius}
              data-type="radius"
              disabled={!this.state.changeable}
              onChange={this.state.changeable && this.radiusChange}
              onMouseUp={this.state.changeable && this.handleUp}
              onKeyDown={this.state.changeable && this.handleDown}
              onKeyUp={this.state.changeable && this.handleUp}
              onTouchStart={this.state.changeable && this.handleDown}
              onTouchMove={this.state.changeable && this.handleMove}
              onTouchEnd={this.state.changeable && this.handleUp}
            />
            <div className='btn' onClick={ this.confirm} onTouchEnd={this.confirm} >
              确定
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (store) => ({...store.IndexStore})  
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth) 
export default connect(mapStateToProps,mapDispatchToProps )(componentName);