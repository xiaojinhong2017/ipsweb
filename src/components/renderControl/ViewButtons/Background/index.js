/* global window */
import React, {Component} from 'react';
import ReactPropTypes from 'prop-types';
import './../../../../style/RenderControl.css';
// import { ChromePicker } from 'react-color';
import ColorPicker from './ColorPicker';


class Background extends Component{

  constructor() {
    super();
    this.state = {
      bgColor1: '#808080',
      bgColor2: '#c0c0c0',
      textColor: 'blue',
      bgVisible1: false,
      bgVisible2: false,
      textVisible: false,
      isDragging: false,
      moveInX: window.innerWidth * 0.2,
      moveInY: 10,
    };
    this.getValue = this.getValue.bind(this);
    this.setBackground = this.setBackground.bind(this);
    this.valueTrans = this.valueTrans.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  getValue(value) {
    const backgroundColor = [];
    value.forEach((item, index) => {
      const number = parseInt((item * 255), 10);
      backgroundColor[index] = number.toString(16).length !== 1 ? number.toString(16) : `0${number.toString(16)}`;
    });
    return `#${backgroundColor.join('')}`;
  }

  setBackground() {
    const  Background2 = this.valueTrans(this.state.bgColor1);
    const Background = this.valueTrans(this.state.bgColor2);
    const Text = this.valueTrans(this.state.textColor);
    // this.props.setBgColor(colors);
    window.vtk.apis.setBackgroundColors(Background2, Background, Text);
    this.props.hideBgPanel();
  }

  valueTrans(color) {
    const colorStr = color.substr(1);
    const R = parseInt(colorStr.substr(0, 2), 16) / 255;
    const G = parseInt(colorStr.substr(2, 2), 16) / 255;
    const B = parseInt(colorStr.substr(4, 2), 16) / 255;
    return [Number(R), Number(G), Number(B)];
  }

  colorChange(type, color) {
    switch (type) {
      case 'bgColor1':
        this.setState({ bgColor1: color.hex });
        break;
      case 'bgColor2':
        this.setState({ bgColor2: color.hex });
        break;
      case 'textColor':
        this.setState({ textColor: color.hex });
        break;
      default:
        return false;
    }
    return true;
  }

  handleClick(type) {
    this.handleClose();
    switch (type) {
      case 'bgVisible1':
        this.setState({ bgVisible1: !this.state.bgVisible1 });
        break;
      case 'bgVisible2':
        this.setState({ bgVisible2: !this.state.bgVisible2 });
        break;
      case 'textVisible':
        this.setState({ textVisible: !this.state.textVisible });
        break;
      default:
        return false;
    }
    return false;
  }

  handleClose() {
    this.setState({
      bgVisible1: false,
      bgVisible2: false,
      textVisible: false,
    });
  }

  hidePanel(e) {
    e.stopPropagation();
    this.handleClose();
    this.props.hideBgPanel();
  }

  handleMouseDown(e) {
    if (e.target.parentNode === this.wrapper && e.target.children.length !== 0) {
      const ARight = parseInt(this.wrapper.style.right, 10);
      const ABottom = parseInt(this.wrapper.style.bottom, 10);
      this.setState({
        relativeX: window.innerWidth - (e.pageX || Number(e.touches[0].pageX)) - ARight,
        relativeY: window.innerHeight - (e.pageY || Number(e.touches[0].pageY)) - ABottom,
        isDragging: true,
      });
    }
  }

  handleMouseMove(e) {
    e.preventDefault();
    if (this.state.isDragging === true) {
      const moveX = window.innerWidth - (e.pageX || Number(e.touches[0].pageX)) - this.state.relativeX;
      const moveY = window.innerHeight - (e.pageY || Number(e.touches[0].pageY)) - this.state.relativeY;
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
    if (!this.props.bgVisible) {
      return null;
    }
    const bgColor = { background: `-webkit-linear-gradient(top, ${this.state.bgColor1}, ${this.state.bgColor2})`, color: `${this.state.textColor}` };
    return (
      <div
        className='bgColorSet'
        ref={c => (this.wrapper = c)}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        style={{ right: `${this.state.moveInX}px`, bottom: `${this.state.moveInY}px` }}
      >
        <div className='bgMask' />
        <div className='titlePop' >
          三维视图设置
          <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
        </div>
        <div className='bgBody' >
          <div className='bgPicker' >
            <div className='colorPicker' >
              三维视图渐变背景颜色1：
              <div
                className='colorLabel'
                onClick={() => { this.handleClick('bgVisible1'); }}
                onTouchEnd={() => { this.handleClick('bgVisible1'); }}
                style={{ background: this.state.bgColor1 }}
              />
              <ColorPicker
                visible={this.state.bgVisible1}
                label={'bgColor1'}
                top="10px"
                color={this.state.bgColor1}
                colorChange={this.colorChange}
              />
            </div>
            <div className='colorPicker' >
              三维视图渐变背景颜色2：
              <div
                className='colorLabel'
                onClick={() => { this.handleClick('bgVisible2'); }}
                onTouchEnd={() => { this.handleClick('bgVisible2'); }}
                style={{ background: this.state.bgColor2 }}
              />
              <ColorPicker
                visible={this.state.bgVisible2}
                label={'bgColor2'}
                top="45px"
                color={this.state.bgColor2}
                colorChange={this.colorChange}
              />
            </div>
            <div className='colorPicker' >
              三维视图文字颜色:
              <div
                className='colorLabel'
                onClick={() => { this.handleClick('textVisible'); }}
                onTouchEnd={() => { this.handleClick('textVisible'); }}
                style={{ background: this.state.textColor }}
              />
              <ColorPicker
                visible={this.state.textVisible}
                label={'textColor'}
                top="80px"
                color={this.state.textColor}
                colorChange={this.colorChange}
              />
            </div>
          </div>
          <div className='bgAction' >
            <div className='preview' >
              预览结果：
              <div className='color' style={bgColor} >示例文字AaBbCc</div>
            </div>
            <div className='btns' >
              <button className='btn' onClick={this.setBackground} onTouchEnd={(e) => { e.stopPropagation(); this.setBackground(); }} >确定</button>
              <button className='btn' onClick={this.hidePanel} onTouchEnd={this.hidePanel} >取消</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Background.propTypes = {
  bgVisible: ReactPropTypes.bool,
  colors: ReactPropTypes.object,
  hideBgPanel: ReactPropTypes.func,
  // setBgColor: ReactPropTypes.func,
};

export default Background;
