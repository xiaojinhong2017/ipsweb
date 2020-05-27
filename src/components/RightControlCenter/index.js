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
import CurrentDivision from './CurrentDivision';
import { Menu, Icon, Button} from "antd";
// import rightStyle  from '../../style/RightControl.css';

class RightControlCenter extends Component{
  constructor() {
    super();
    this.state = {
      expand: false,
      alert: false,
      visible: false,
      label: 'ThreeDimension',
      style: { width: '30px' },
    };
    this.changeAlert = this.changeAlert.bind(this);
    this.changeExpand = this.changeExpand.bind(this);
  }
  componentDidMount() {
     var btn = document.getElementsByClassName("drapDown")[0];
     btn.onclick = function(){
      document.getElementsByClassName('ant-menu')[0].scrollTop =document.getElementsByClassName('ant-menu')[0].scrollHeight;
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
        expand: false,
        style: { width: '30px' },
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
        style: { width: '30px' },
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
  menuItem=(item)=>{
    if(item.key === 'TwoDimension'|| item.key === 'ThreeDimension'|| item.key ==='SimulatedDimension'|| item.key === 'CurrentDivision' || item.key === 'ImageProcessing'){
      this.setState({label: item.key});
    }else {
      this.setState({label: 'TwoDimension'});
    }
    // console.log(item);
  }
  render() {
    return (
      <div className="RightControlContainer" style={this.state.style} >
        <div className="toolPanel" >
          <div className="toolLabelBox">
            <div style={{ width: 30,textAlign:'left'}}>
              <div className='expandButton'>
                <Icon title={this.state.expand ? '收起菜单' : '展开菜单'} onClick={this.changeExpand} type={!this.state.expand ? 'menu-unfold' : 'menu-fold'} />
              </div>
                <Menu
                  ref='menu'
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  inlineIndent={7}
                  mode="inline"
                  theme="dark"
                  onClick={this.menuItem}
                >
                    <Menu.Item key="1">
                      <Icon type="highlight" />
                      <span>手动勾画</span>
                    </Menu.Item>
                    <Menu.Item key="CurrentDivision">
                      <Icon type="plus-circle" />
                      <span>通用分割</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Icon type="plus-square" />
                      <span>器官分割</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Icon type="bg-colors" />
                      <span>自动勾画</span>
                    </Menu.Item>
                    <Menu.Item key="TwoDimension">
                      <Icon type="appstore" />
                      <span>二维工具</span>
                    </Menu.Item>
                    <Menu.Item key="ThreeDimension">
                      <Icon type="windows" />
                      <span>三维工具</span>
                    </Menu.Item>
                    <Menu.Item key="SimulatedDimension">
                      <Icon type="block" />
                      <span>模拟工具</span>
                    </Menu.Item>
                    <Menu.Item key="ImageProcessing">
                      <Icon type="file-image" />
                      <span>图像处理</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Icon type="fund" />
                      <span>体绘制</span>
                    </Menu.Item>
                </Menu>

              <div className='drapDown'>
                <Icon type="down" />
              </div>
              </div>
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
            <CurrentDivision
              visible={this.state.label === 'CurrentDivision'}
              baseFile=''
              expand={this.state.expand}
              // updateViewParamsAll={this.props.updateViewParamsAll}
            />
            <ImageProcessing
              visible={this.state.label === 'ImageProcessing'}
              // changeAlert={this.changeAlert}
              expand={this.state.expand}
            />



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
