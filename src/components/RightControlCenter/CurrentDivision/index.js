import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
// import { connect }      from 'react-redux';
import '../../../style/ToggleIcons.css';
import '../../../style/RightControl.css';
import RegionGrowing     from './RegionGrowing';
import DynamicRegionGrowing     from './DynamicRegionGrowing';

// import { selectors, actions, dispatch } from '../../../redux';

// TODO funcMap
const funcMap = {
  liverSegment: 'liverSegment',
  kidneySegment: 'kidneySegment',
  lungRegistration: 'lungRegistration',
  lungSlice: 'lungSlice',
  lungSegment: 'lungSegment',
  basinAnalysis: 'basinAnalysis',
};

class CurrentDivision extends Component{
  constructor() {
    super();
    this.state = {
      expand: false,
      enabled: false,
      visibleArr: [],

      liverSegment: false,
      kidneySegment: false,
      lungRegistration: false,
      lungSlice: false,
      lungSegment: false,
      basinAnalysis: false,

      messageVisible: false,
      sOneValue: '',
      sTwoValue: '',
      regionGrowing: false,
      dynamicRegionGrowing: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.updateActive = this.updateActive.bind(this);
  }

  updateActive(type) {
    this.handleClose();
    switch (type) {
      case 'regionGrowing': {
        if (!this.state.regionGrowing) {
          window.vtk.toolapis.activeTool('RegionGrowing');
          // this.liverSegment({ cmd: 'widget', value: 'open' });
        } else {
          window.vtk.toolapis.inactiveTool('');
        }
        this.setState({ regionGrowing: !this.state.regionGrowing });
        break;
      }
      case 'dynamicRegionGrowing': {
        this.setState({ dynamicRegionGrowing: !this.state.dynamicRegionGrowing });
        if (!this.state.dynamicRegionGrowing) {
          // this.liverSegment({ cmd: 'widget', value: 'open' });
        }
        break;
      }
      case 'kidneySegment': {
        this.setState({ kidneySegment: !this.state.kidneySegment });
        if (!this.state.kidneySegment) {
          // this.kidneySegment({ cmd: 'widget', value: 'open' });
        }
        break;
      }
      case 'lungRegistration': {
        this.setState({ lungRegistration: !this.state.lungRegistration });
        // if (!this.state.lungRegistration) {
        //   this.lungRegistration(!this.state.lungRegistration);
        // }
        break;
      }
      case 'lungSlice': {
        this.setState({ lungSlice: !this.state.lungSlice });
        if (!this.state.lungSlice) {
          // this.lungSlice({ cmd: 'widget', value: 'open' });
        }
        break;
      }
      case 'lungSegment': {
        this.setState({ lungSegment: !this.state.lungSegment });
        if (!this.state.lungSegment) {
          // this.lungSegment({ cmd: 'widget', value: 'open' });
        }
        break;
      }
      case 'basinAnalysis': {
        this.setState({ basinAnalysis: !this.state.basinAnalysis });
        if (!this.state.basinAnalysis) {
          // this.basinAnalysis({ cmd: 'widget', value: 'open' });
        }
        break;
      }
      default:
        return false;
    }
    return true;
  }


  handleClose() {
    // loop funcMap to set other button's functype >> 'false'
    Object.keys(this.state).forEach((item) => {
      if (this.state[item] === true && this[funcMap[item]]) {
        this[funcMap[item]](false);
      }
    });
    this.setState({
      liverSegment: false,
      kidneySegment: false,
      lungRegistration: false,
      lungSlice: false,
      lungSegment: false,
      basinAnalysis: false,
    });
  }

  // liverSegment(param) {
  //   const option = param || { cmd: 'widget', value: 'close' };
  //   if (param) {
  //     dispatch(actions.button.storeButton('calculatorTool'));
  //   } else {
  //     dispatch(actions.button.storeButton(''));
  //   }
  //   this.setState({ messageVisible: !!param });
  //   if (option.cmd === 'cut' && option.value === '1') {
  //     this.props.updateViewParamsAll({ context: 'LiverSegment-VesselCut' });
  //   }
  //   this.props.liverSegment(option);
  // }
  //
  showMessage() {
    // this.setState({ messageVisible: true });
  }

  hideMessage() {
    // this.setState({ messageVisible: false });
    // this.props.storeLiverSegment(true); // reset liverSegmentResult
    // this.props.storeLungVolume(true);
    // this.props.storeBasinAnalysis(true);
    // this.props.storeLungSegment(true);
    // this.props.storeKidneySegment(true);
  }

  render() {
    if (!this.props.visible && !this.state.alert) {
      return null;
    }
    const nodes = {};
    const views = [];
    return (
      <div className={this.props.expand ? 'toolContainer' : 'toolContainerHide' } >
        <ul>
          <li className={'SurfaceExtWrapper' && 'iconBox'}>
            <div
              className={!this.state.liverSegment ? 'liverSegmentButton' : 'liverSegmentButtonActive'}
              onClick={this.updateActive.bind(this,'regionGrowing')}
            />
            <span className={!this.state.liverSegment ? 'textNormal' : 'textActive'}>
              区域生长
            </span>
          </li>
          <li className={'SurfaceExtWrapper' && 'iconBox'}>
            <div
              className={!this.state.liverSegment ? 'liverSegmentButton' : 'liverSegmentButtonActive'}
              onClick={this.updateActive.bind(this,'dynamicRegionGrowing')}
            />
            <span className={!this.state.liverSegment ? 'textNormal' : 'textActive'}>
              动态区域生长
            </span>
          </li>
        </ul>
        {
          this.state.regionGrowing &&
            <RegionGrowing
              updateActive={this.updateActive}
              nodes={nodes}
              vesselData={this.props.vesselData}
              views={views}
              liverSegment={this.regionGrowing}
            />
        }
        {
          this.state.dynamicRegionGrowing &&
            <DynamicRegionGrowing
              updateActive={this.updateActive}
              nodes={nodes}
              vesselData={this.props.vesselData}
              views={views}
              liverSegment={this.dynamicRegionGrowing}
            />
        }
        {
          this.state.messageVisible && !this.props.regionGrowing &&
            <div className='messageContent'>
              <div className='mask' />
              <div className='title' >
                提示
                <span onClick={this.hideMessage} onTouchEnd={this.hideMessage} >&times;</span>
              </div>
              <div className='content' >
                <div className='rowPart' >
                  <span style={{ width: '100%', lineHeight: '50px' }}>
                    * 肝分段错误，请重新操作。
                  </span>
                </div>
                <div className='btns' >
                  <div className='btn' onClick={this.hideMessage} style={{ float: 'none', margin: '10px auto' }} >
                    确定
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

// Binding --------------------------------------------------------------------
/* eslint-disable arrow-body-style */
CurrentDivision.propTypes = {
  visible: ReactPropTypes.bool,
  expand: ReactPropTypes.bool,
  baseFile: ReactPropTypes.string,
}
export default CurrentDivision;
