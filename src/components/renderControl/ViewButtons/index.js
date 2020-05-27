import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../redux/index/index.reducer.js";
import '../../../style/MainView.css';
import ReactPropTypes from 'prop-types';
import StandardView from './StandardView';
import WindowLevel  from './WindowLevel';
import Background   from './Background';
// import StandardView from '../StandardView';
import ToggleSlice  from './ToggleSlice';
// import VolumePreset from './VolumePreset';
import LeftButton   from './LeftButton';
import SaveScreenShot from './SaveScreenShot';

// ----------------------------------------------------------------------------

class ViewsButtons extends Component {

  constructor() {
    super();
    this.state = {
      ifBool: false,
      top: 0, // ipad 兼容
      edit: false,
      standardVisible: false,
      leftVisible: false,
      screenShotVisible: false,
      visible: false,
      windowLevelBottom: 1,
      TSVisible: false,
      bgVisible: false,
    };
    this.resetWindowLevel = this.resetWindowLevel.bind(this);
    this.setCrossLineVisible = this.setCrossLineVisible.bind(this);
    this.setCornerTextVisible = this.setCornerTextVisible.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.hideWindowLevel = this.hideWindowLevel.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.resetCamera3D = this.resetCamera3D.bind(this);
    this.resetCamera2D = this.resetCamera2D.bind(this);
    this.toggleSliceVisible = this.toggleSliceVisible.bind(this);
    this.hideTgSlice = this.hideTgSlice.bind(this);
    this.hideBgPanel = this.hideBgPanel.bind(this);
    this.toggleBgVisible = this.toggleBgVisible.bind(this);
    this.hideVolumeView = this.hideVolumeView.bind(this);
    this.setObservationBackground = this.setObservationBackground.bind(this);
    this.set3DCornerTextVisible=this.set3DCornerTextVisible.bind(this);
  }

  toggleStandardVisible() {
    this.setState({
      standardVisible: !this.state.standardVisible,
    });
    this.timer = setTimeout(() => {
      this.setState({
        standardVisible: false
      });
      clearTimeout(this.timer);
      this.timer = null;
    }, 3000);
  }
  toggleLeftVisible() {
    this.setState({
      leftVisible: !this.state.leftVisible,
    });
    this.timer = setTimeout(() => {
      this.setState({ leftVisible: false });
      clearTimeout(this.timer);
      this.timer = null;
    }, 3000);
    this.props.ClickId(this.props.viewId)
  }

  hideLeftButton() {
    this.setState({ leftVisible: false });
    this.clearTimer.bind(this);
  }

  hideStandardView() {
    this.setState({
      standardVisible: false
    });
    this.clearTimer.bind(this);
  }
  clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  resetCamera3D() {
    window.vtk.apis.resetCamera3D();
  }

  resetCamera2D() {
    window.vtk.apis.resetCamera2D();
  }

  hideScreenShot() {
    this.setState({ screenShotVisible: false });
  }

  toggleScreenShotVisible() {
    this.setState({
      screenShotVisible: !this.state.screenShotVisible,
    });
  }

resetWindowLevel() {
  window.vtk.apis.resetWindowLevel();
  this.props.restore()
}

setCrossLineVisible() {
  window.vtk.apis.toggleCrossLineVisible();
}

setCornerTextVisible() {
  window.vtk.apis.toggleCornerTextVisible(3);
}
setObservationBackground(){
  var textured = window.vtk.apis.getTexturedBackground3D();
  window.vtk.apis.setTexturedBackground3D(!textured);
  var preset = window.vtk.apis.getLightPreset();
    if (preset === "bright")
      window.vtk.apis.applyLightPreset("default");
    else
      window.vtk.apis.applyLightPreset("bright");
}
toggleVisible(e) {
  this.setState({
    visible: !this.state.visible,
    windowLevelBottom: e.clientY < 350 ? -108 : 1,
  });
  this.timer = setTimeout(() => {
    this.setState({ visible: false });
    clearTimeout(this.timer);
    this.timer = null;
  }, 3500);
}

hideWindowLevel() {
  this.setState({ visible: false });
  this.clearTimer();
}

toggleSliceVisible() {
  this.setState({
    TSVisible: !this.state.TSVisible,
  });
  this.timer = setTimeout(() => {
    this.setState({ TSVisible: false });
    clearTimeout(this.timer);
    this.timer = null;
  }, 3000);
}

hideTgSlice() {
  this.setState({ TSVisible: false });
  this.clearTimer();
}

hideBgPanel() {
  this.setState({ bgVisible: false });
}

toggleBgVisible() {
  this.setState({
    bgVisible: !this.state.bgVisible,
  });
}


hideVolumeView() {
  this.setState({ volumeVisible: false });
  this.clearTimer();
}

set3DCornerTextVisible(){
  if(this.props.volumeString.length !== 0){
    this.props.setVolumeCalculator(!this.props.VolumeCalculator);
  }
}

  render() {
    return (
      <div className="viewActions">
        {
          this.props.label === "" && (
            <ul className="renderBox_2D">
              {/* <li><a className="DelMeasure viewbutton" title={'删除测量'}>button</a></li> */}
              <li>
                <a
                  className={this.props.viewId === this.props.type ? 'FullScreenActive viewbutton': "FullScreen viewbutton"}
                  onClick={this.props.fullScreen}
                  title={'全屏'}
                  data-type={this.props.viewId}
                >
                  button
                </a>
              </li>
              <li style={{ zIndex: this.state.screenShotVisible ? 10 : 0 }} >
                <div className="ScreenShot viewbutton" onClick={this.toggleScreenShotVisible.bind(this)} title={'截图'} />
                <SaveScreenShot
                  visible={this.state.screenShotVisible}
                  viewId={this.props.viewId}
                  // client={this.props.client}
                  // path={this.state.path}
                  hidePanel={this.hideScreenShot.bind(this)}
                  // saveScreenshot={this.props.saveScreenshot}
                />
              </li>
              <li><a className="ResetCamera viewbutton" onClick={this.resetCamera2D} title={'重置摄像机'} >button</a></li>
              <li><a className="ResetWindow viewbutton" onClick={this.resetWindowLevel}  title={'重置窗宽窗位'} >button</a></li>
              <li><a className="WindowCross viewbutton" onClick={this.setCrossLineVisible} title={'显示/隐藏十字交叉面'} >button</a></li>
              <li className="row " style={{ zIndex:  5 }} >
                <div className="WindowInit viewbutton"  onClick={this.toggleVisible} onMouseLeave={this.hideWindowLevel} title={'窗宽窗位预设值'} >
                  <WindowLevel
                    visible={this.state.visible}
                    style={{ bottom: `${this.state.windowLevelBottom}px` }}
                    hideWindowLevel={this.hideWindowLevel}
                    clearTimer={this.clearTimer}
                  />
                </div>
                <div className="LeftButton viewbutton" onClick={this.toggleLeftVisible.bind(this)} onMouseLeave={this.hideLeftButton.bind(this)} title={'左键交互方式'} >
                  <LeftButton
                    visible={this.state.leftVisible}
                    // remoteRendering={this.props.remoteRendering}
                    hideLeftButton={this.hideLeftButton.bind(this)}
                    setMouseLeftMode={this.props.setMouseLeftMode}
                    clearTimer={this.clearTimer.bind(this)}
                  />
                </div>
                { window.type !== 'new' &&
                  <a className="TextShow viewbutton" onClick={this.setCornerTextVisible} title={'显示/隐藏文字'} >button</a>
                }
              </li>
            </ul>

          )

        }
        {
          this.props.label === "1" && (
            <ul className="renderBox_3D">
            {/*  <li><a className="Stereoscopic viewbutton" title={'立体显示'} >button</a></li> */}
              <li>
                <a
                  className={this.props.viewId === this.props.type ? 'FullScreenActive viewbutton': "FullScreen viewbutton"}
                  onClick={this.props.fullScreen}
                  title={'全屏'}
                  data-type={this.props.viewId}
                >
                  button
                </a>
              </li>
              <li><a className="Observation viewbutton" onClick={this.setObservationBackground} title={'光照/背景'} >button</a></li>
              <li><a className='TextShow viewbutton' onClick={this.set3DCornerTextVisible} title={'显示/隐藏文字'} >button</a></li>
              {/* <li><a className="Slice viewbutton" title={'激活/关闭任意切面'} >button</a></li> */}
              <li style={{ zIndex: this.state.bgVisible ? 5 : 0  }} >
                <div className="BgColor viewbutton" onClick={this.toggleBgVisible} title={'背景色设置'} />
                <Background
                  bgVisible={this.state.bgVisible}
                  hideBgPanel={this.hideBgPanel}
                  // colors={this.props.bgColors}
                  // setBgColor={this.props.setBgColor}
                />
              </li>
              <li style={{ zIndex: this.state.screenShotVisible ? 10 : 0 }} >
                <div className="ScreenShot viewbutton" onClick={this.toggleScreenShotVisible.bind(this)} title={'截图'} />
                <SaveScreenShot
                  visible={this.state.screenShotVisible}
                  viewId={this.props.viewId}
                  // client={this.props.client}
                  // path={this.state.path}
                  hidePanel={this.hideScreenShot.bind(this)}
                  // saveScreenshot={this.props.saveScreenshot}
                />
              </li>
              <li className="row" style={{ zIndex: this.state.TSVisible || this.state.standardVisible ? 5 : 0 }} >
              {/*
                <div className="VolumeRender viewbutton"  onClick={this.toggleVolumeVisible} onMouseLeave={this.hideVolumeView} title={'体绘制预设值'} >
                  <VolumePreset
                    volumeVisible={this.state.volumeVisible}
                    hideVolumeView={this.hideVolumeView}
                    clearTimer={this.clearTimer}
                  />
                </div>
              */}
                {/* <a className="InterestArea viewbutton"  title={'感兴趣区域'} >button</a> */}
                <div className="SliceShow viewbutton" onClick={this.toggleSliceVisible} onMouseLeave={this.hideTgSlice}  title={'显示/隐藏切面'} >
                  <ToggleSlice
                    TSVisible={this.state.TSVisible}
                    // toggleSlice={this.props.toggleSlice}
                    hideTgSlice={this.hideTgSlice}
                    clearTimer={this.clearTimer}
                  />
                </div>
                <div className="StandardView viewbutton" onClick={this.toggleStandardVisible.bind(this)} onMouseLeave={this.hideStandardView.bind(this)}  title={'标准视图'} >
                  <StandardView
                    standardVisible={this.state.standardVisible}
                    hideStandardView={this.hideStandardView.bind(this)}
                    clearTimer={this.clearTimer.bind(this)}
                  />
                </div>
                <a className="ResetCamera viewbutton" onClick={this.resetCamera3D} title={'重置摄像机'} >button</a>
              </li>
            </ul>

          )
        }
        </div>
    );
}
}

ViewsButtons.propTypes = {
  label: ReactPropTypes.string.isRequired,
  showStandardView: ReactPropTypes.oneOfType([
    ReactPropTypes.bool,
    ReactPropTypes.func,
  ]),
  viewId: ReactPropTypes.string,
  fullScreen: ReactPropTypes.func,
  type: ReactPropTypes.string,
};
let mapStateToProps = (store) => ({...store.IndexStore})
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth)
export default connect(mapStateToProps,mapDispatchToProps )(ViewsButtons);
