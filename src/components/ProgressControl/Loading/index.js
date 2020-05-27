/* global window */

import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../style/ProgressControl.css';

// ----------------------------------------------------------------------------

class Loading extends Component{
  constructor(props) {
    super(props)
    this.state={
      prevValue: 0,
      nextValue: 0,
      pc: true,
    }
  }

  componentWillMount() {
    this.client = window.navigator.userAgent;
    this.mobile = !!this.client.match(/AppleWebKit.*Mobile.*/); // 是否为移动终端
    this.ios = !!this.client.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    this.android = this.client.indexOf('Android') > -1 || this.client.indexOf('Adr') > -1; // android终端
    this.iPhone = this.client.indexOf('iPhone') > -1; // 是否为iPhone或者QQHD浏览器
    this.iPad = this.client.indexOf('iPad') > -1; // 是否iPad
    if (this.mobile || this.ios || this.android || this.iPhone || this.iPad) {
      this.setState({
        pc: false,
      });
    } else {
      this.setState({
        pc: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expand === true) {
      this.setState({
        pc: true,
      });
    } else if (nextProps.expand === false) {
      this.setState({
        pc: false,
      });
    }
  }

  render() {
    let classname = 'wrapper';
    if(this.props.leftExpand===false && this.props.rightExpand ===false) {
      classname ='wrapper'
    }else if(this.props.leftExpand===true && this.props.rightExpand ===false){
      classname ='wrapperLeft'
    }else if(this.props.leftExpand===false && this.props.rightExpand ===true){
      classname ='wrapperRight'
    }else if(this.props.leftExpand===true && this.props.rightExpand ===true){
      classname ='wrapperLeftAndRight'
    }
    return (
      <div className={classname} >
        <div className='mask' />
        <svg className='loading' >
          <g id="circle" className='gCircles'>
            <circle className='circle' id="12" transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35" cy="16.6987298" r="10" />
            <circle className='circle' id="11" transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298" cy="35" r="10" />
            <circle className='circle' id="10" transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60" r="10" />
            <circle className='circle' id="9" transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298" cy="85" r="10" />
            <circle className='circle' id="8" transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35" cy="103.30127" r="10" />
            <circle className='circle' id="7" cx="60" cy="110" r="10" />
            <circle className='circle' id="6" transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85" cy="103.30127" r="10" />
            <circle className='circle' id="5" transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127" cy="85" r="10" />
            <circle className='circle' id="4" transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60" r="10" />
            <circle className='circle' id="3" transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) " cx="103.30127" cy="35" r="10" />
            <circle className='circle' id="2" transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85" cy="16.6987298" r="10" />
            <circle className='circle' id="1" cx="60" cy="10" r="10" />
          </g>
        </svg>
      </div>
    )
  }
}
Loading.propTypes = {
  className: ReactPropTypes.string,
  expand: ReactPropTypes.bool,
};
export default Loading;
