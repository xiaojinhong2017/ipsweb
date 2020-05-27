/* global window */

import React, { Component } from 'react';
import '../../style/ProgressControl.css';
import ReactPropTypes from 'prop-types';

// ----------------------------------------------------------------------------

class ProgressControl extends Component{
  constructor(){
        super();
        this.state = {
          prevValue: 0,
          nextValue: 0,
        };
    }

  componentWillMount() {
    this.client = window.navigator.userAgent;
    this.mobile = !!this.client.match(/AppleWebKit.*Mobile.*/); // 是否为移动终端
    this.ios = !!this.client.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    this.android = this.client.indexOf('Android') > -1 || this.client.indexOf('Adr') > -1; // android终端
    this.iPhone = this.client.indexOf('iPhone') > -1; // 是否为iPhone或者QQHD浏览器
    this.iPad = this.client.indexOf('iPad') > -1; // 是否iPad
    // if (this.mobile || this.ios || this.android || this.iPhone || this.iPad) {
    //   this.setState({
    //     pc: false,
    //   });
    // } else {
    //   this.setState({
    //     pc: true,
    //   });
    // }
  }

  componentDidMount() {
    this.timer = null;
    // thi  s.fps = 60;
    this.value = 0;
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props.progressValue);
    this.setState({
      prevValue: this.props.progressValue,
      nextValue: nextProps.progressValue,
    });
  }

  componentDidUpdate() {
    // avoid changeValue == 0
    // const changeValue = parseInt((this.state.nextValue - this.state.prevValue) / this.fps, 10) || 1;
    let changeValue = 0.15;
    if (this.value > 95) {
      changeValue = 0.05;
    }
    if (this.state.prevValue > this.value) {
      this.value = this.state.prevValue;
    }
    clearInterval(this.timer);
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      const gradient = this.ctx.createLinearGradient(0, 0, 204, 0);
      gradient.addColorStop(0, '#CA5DFF');
      gradient.addColorStop(1.0, '#76A8FF');

      this.ctx.lineWidth = 8;
      this.ctx.lineCap = 'round';

      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = '#fff';
      this.ctx.shadowOffsetY = 12;

      const circle = {
        x: 100, // 圆心的x轴坐标值
        y: 94, // 圆心的y轴坐标值
        r: 80, // 圆的半径
      };

      this.ctx.font = '24px Microsoft YaHei';
      // this.ctx.fillStyle = gradient;
      this.ctx.strokeStyle = gradient;
      this.ctx.fillStyle = '#fff';
      let timecount = 0;
      this.timer = setInterval(() => {
        timecount += 1;
        if (this.value > 95) {
          this.value += changeValue;
        } else {
          this.value = this.value + changeValue >= this.state.nextValue ? this.state.nextValue : this.value + changeValue;
        }

        if (timecount > 1000) {
          this.value = 100;
        }
        let progress = parseInt(this.value, 10);
        if (progress >= 100) {
          progress = 100;
        }
        this.ctx.clearRect(0, 0, 204, 204);
        this.ctx.beginPath();
        this.ctx.arc(circle.x, circle.y, circle.r, -Math.PI * 0.5, (progress * Math.PI / 50) - (0.5 * Math.PI), false);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillText(`${progress}%`, 102 - (this.ctx.measureText(`${progress}%`).width / 2), 102 + 10);

        if (this.value >= this.state.nextValue && this.value < 95) {
          clearInterval(this.timer);
          this.timer = undefined;
          timecount = 0;
        }
        if (this.value >= 100) {
          this.value = 0;
          this.props.setProgressVisible(false);
          this.props.setProgress();
          // this.props.resetPolyCount();
          clearInterval(this.timer);
          this.timer = undefined;
          timecount = 0;
        }
      }, 100);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = undefined;
    this.value = 0;
  }

  render() {
    let classname = 'OpenFileProgress';
    if(this.props.leftExpand===false && this.props.rightExpand ===false) {
      classname ='OpenFileProgress'
    }else if(this.props.leftExpand===true && this.props.rightExpand ===false){
      classname ='OpenFileProgressRight'
    }else if(this.props.leftExpand===false && this.props.rightExpand ===true){
      classname ='OpenFileProgressLeft'
    }else if(this.props.leftExpand===true && this.props.rightExpand ===true){
      classname ='OpenFileProgressLeftAndRight'
    }
    return (
      <div className={classname}>
        <div className='mask' />
        <canvas
          ref={(c) => { this.canvas = c; }}
          style={{ backgroundColor: 'rgba(0,0,0,0)' }}
          width={'204'}
          height={'204'}
        />
      </div>
    );
  }
}

ProgressControl.propTypes = {
  progressValue: ReactPropTypes.number,
  setProgressVisible: ReactPropTypes.func,
  leftExpand: ReactPropTypes.bool,
  rightExpand: ReactPropTypes.bool,
 };

export default ProgressControl;
