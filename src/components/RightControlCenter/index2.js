/* global window */
/* eslint no-alert: 0 */
import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import  '../../style/RightControl.css';
import 'font-awesome/css/font-awesome.min.css';
import ThreeDimension from './ThreeDimension';
// import rightStyle  from '../../style/RightControl.css';

//  function ControlPanel() {
//     return (
//       <div className="RightControlContainer" style={{ width: '40px' }}>
//         <div className="toolPanel" >
//           <div className="toolLabelBox">
//             <div className="expand fa fa-bars" />
//             <span className="toolLabel" data-label="TwoDimension">二维工具</span>
//             <span className="toolLabel" data-label="ThreeDimension">三维工具</span>
//             <span className="toolLabel" data-label="SimulatedDimension">模拟工具</span>
//             <span className="toolLabel" data-label="ImageProcessing">勾画工具</span>
//           </div>
//
//         </div>
//       </div>
//     );
// };
//
// export default  ControlPanel;

class RightControlCenter extends Component{

  // displayName: '3dLiver/RightControl',

  // propTypes: {
    // setSurfaceCut: React.PropTypes.func,
    // remoteRendering: React.PropTypes.bool,
    // toggle3dVR: React.PropTypes.bool,
    // updateViewParamsAll: React.PropTypes.func,
    // toggleProgressIcon: React.PropTypes.func,
    // changeIsVisible: React.PropTypes.func,
    // toggleVR: React.PropTypes.func,
  // },
  constructor() {
    super();
    this.state = {
      expand: false,
      alert: false,
      visible: false,
      label: 'ThreeDimension',
      style: { width: '40px' },
    };
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
    this.props.windowSize(this.props.fullScreen, this.state.expand);
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
            <span className={this.state.label === 'TwoDimension' ? "toolLabelActive" : "toolLabel"}  data-label="TwoDimension">二维工具</span>
            <span className={this.state.label === 'ThreeDimension' ? "toolLabelActive" : "toolLabel"} onClick={this.changeLabel.bind(this)} data-label="ThreeDimension">三维工具</span>
            <span className={this.state.label === 'SimulatedDimension' ? "toolLabelActive" : "toolLabel"} data-label="SimulatedDimension">模拟工具</span>
            <span className={this.state.label === 'ImageProcessing' ? "toolLabelActive" : "toolLabel"} data-label="ImageProcessing">勾画工具</span>
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
            />
        </div>
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
