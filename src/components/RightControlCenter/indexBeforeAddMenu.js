/* global window */
/* eslint no-alert: 0 */
import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import  '../../style/RightControl.css';
import 'font-awesome/css/font-awesome.min.css';
import ThreeDimension from './ThreeDimension';
import TwoDimension   from './TwoDimension';
import SimulatedDimension from './SimulatedDimension';
import ImageProcessing from './ImageProcessing';

const { SubMenu } = Menu;
// import rightStyle  from '../../style/RightControl.css';

class RightControlCenter extends Component{
  constructor() {
    super();
    this.state = {
      expand: false,
      alert: false,
      visible: false,
      label: 'ThreeDimension',
      style: { width: '40px' },
    };
    this.changeAlert = this.changeAlert.bind(this);
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
        expand: false,
        style: { width: '40px' },
      });
      this.props.setExpand();
    } else {
      this.setState({
        expand: true,
        style: { width: '400px' },
      });
    }
  }

  changeExpand() {
    this.props.setExpand();
    // this.props.windowSize(this.props.fullScreen, this.state.expand);
    if (this.state.alert) {
      this.setState({ visible: true });
      return;
    }
    if (this.state.expand) {
      this.setState({
        expand: false,
        style: { width: '40px' },
      });
      // this.props.toggleProgressIcon(false);
    } else {
      this.setState({
        expand: true,
        style: { width: '400px' },
      });
      // this.props.toggleProgressIcon(true);
    }
  }

  changeLabel(e) {
    if (!this.state.alert) {
      if (e.target.getAttribute('data-label') !== 'settingModel') {
        this.setState({
          visible: false,
          label: e.target.getAttribute('data-label'),
        }, () => {
          // this.props.changeIsVisible(true);
        });
      } else {
        this.setState({
          visible: false,
        }, () => {
          // this.props.changeIsVisible(true);
        });
      }
    } else {
      this.setState({ visible: true }, () => {
        // this.props.changeIsVisible(false);
      });
      return;
    }
  }

  changeAlert(bool) {
    this.setState({ alert: bool });
    // this.props.changeIsVisible(!bool);
  }

  hideLivers() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div className="RightControlContainer" style={this.state.style} >
        <div className="toolPanel" >
          <div className="toolLabelBox">
          {/*
            <div className={!this.state.expand ? "expand fa fa-bars" : "expandActive fa fa-bars"} onClick={this.changeExpand.bind(this)} />
            <span className={this.state.label === 'TwoDimension' ? "toolLabelActive" : "toolLabel"} onClick={this.state.expand && this.changeLabel.bind(this)} data-label="TwoDimension">二维工具</span>
            <span className={this.state.label === 'ThreeDimension' ? "toolLabelActive" : "toolLabel"} onClick={this.state.expand && this.changeLabel.bind(this)} data-label="ThreeDimension">三维工具</span>
            <span className={this.state.label === 'SimulatedDimension' ? "toolLabelActive" : "toolLabel"} onClick={this.state.expand && this.changeLabel.bind(this)} data-label="SimulatedDimension">模拟工具</span>
            <span className={this.state.label === 'ImageProcessing' ? "toolLabelActive" : "toolLabel"} onClick={this.state.expand && this.changeLabel.bind(this)} data-label="ImageProcessing">勾画工具</span>
          */}
            <div className={!this.state.expand ? "expand fa fa-bars" : "expandActive fa fa-bars"} onClick={this.changeExpand.bind(this)} />
            <span className={this.state.label === 'TwoDimension' ? "toolLabelActive" : "toolLabel"} onClick={this.changeLabel.bind(this)} data-label="TwoDimension">二维工具</span>
            <span className={this.state.label === 'ThreeDimension' ? "toolLabelActive" : "toolLabel"} onClick={this.changeLabel.bind(this)} data-label="ThreeDimension">三维工具</span>
            <span className={this.state.label === 'SimulatedDimension' ? "toolLabelActive" : "toolLabel"} onClick={this.changeLabel.bind(this)} data-label="SimulatedDimension">模拟工具</span>
            {/*
            <span className={this.state.label === 'ImageProcessing' ? "toolLabelActive" : "toolLabel"} onClick={this.changeLabel.bind(this)} data-label="ImageProcessing">勾画工具</span>
            */}
          </div>
          {/*
          {
            this.state.label === ''  &&
              <div className='toolContainer' />
          }
          */}
            <ThreeDimension
              toggleVolumeVisible={this.props.toggleVolumeVisible}
              visible={this.state.label === 'ThreeDimension'}
              expand={this.state.expand}
              baseFile=''
            />
            <TwoDimension
              visible={this.state.label === 'TwoDimension'}
              baseFile=''
              // changeAlert={this.changeAlert}
              expand={this.state.expand}
            />
            <SimulatedDimension
              visible={this.state.label === 'SimulatedDimension'}
              baseFile=''
              expand={this.state.expand}
              // updateViewParamsAll={this.props.updateViewParamsAll}
            />
            {/*
              <ImageProcessing
                visible={this.state.label === 'ImageProcessing'}
                // changeAlert={this.changeAlert}
                expand={this.state.expand}
                // updateViewParamsAll={this.props.updateViewParamsAll}
              />
              */}

        </div>
        {
          this.state.alert && this.state.visible &&
            <div className='liversContent'>
              <div className='mask' />
              <div className='title' >
                提示
                <span onClick={this.hideLivers} onTouchEnd={this.hideLivers} >&times;</span>
              </div>
              <div className='content' >
                <div className='linePart' >
                  <span style={{ width: '100%', lineHeight: '50px' }}>
                    * 有未完成的工具，请确认。
                  </span>
                </div>
                <div className='btns'>
                  <div className='btn' onClick={this.hideLivers} style={{ float: 'none', margin: '10px auto' }} >
                    确定
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
};

RightControlCenter.propTypes = {
  toggleVolumeVisible:ReactPropTypes.func,
  windowSize: ReactPropTypes.func,
  setExpand: ReactPropTypes.func,
  fullScreen: ReactPropTypes.string,
};
export default RightControlCenter;
