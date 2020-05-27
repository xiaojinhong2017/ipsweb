import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
// import { connect }      from 'react-redux';
import '../../../style/ToggleIcons.css';
import '../../../style/RightControl.css';
import LiverSegment     from './LiverSegment';
import KidneySegment     from './KidneySegment';
import LungSegment      from './LungSegment';
import LungSlice        from './LungSlice';
import BasinAnalysis    from './BasinAnalysis';

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

class SimulatedDimension extends Component{
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
    };
    this.handleClose = this.handleClose.bind(this);
    this.updateActive = this.updateActive.bind(this);
  }


  // componentWillReceiveProps(nextProps) {
  //   if (!this.props.visible || nextProps.baseFile === '') {
  //     this.setState({
  //       liverSegment: false,
  //       kidneySegment: false,
  //       lungRegistration: false,
  //       lungSlice: false,
  //       lungSegment: false,
  //       basinAnalysis: false,
  //     });
  //   } else {
  //     this.setState({ enabled: true });
  //     if (nextProps.dataNode !== this.props.dataNode) {
  //       this.handleClose();
  //     }
  //   }
  //   if (nextProps.measureResult !== this.props.measureResult && !nextProps.measureResult) {
  //     Object.keys(funcMap).forEach((visible) => {
  //       if (this.state[visible]) {
  //         this.setState({ [visible]: false });
  //         this[funcMap[visible]](false);
  //       }
  //     });
  //   }
  // }
  //
  // componentDidUpdate() {
  //   if (this.props.visible && Object.keys(funcMap).filter(visible => this.state[visible]).length === 0) {
  //     this.props.changeAlert(false);
  //   } else if (this.props.visible && Object.keys(funcMap).filter(visible => this.state[visible]).length !== 0) {
  //     this.props.changeAlert(true);
  //   } else {
  //     return;
  //   }
  // }
  //
  // handleClose() {
  //   // loop funcMap to set other button's functype >> 'false'
  //   Object.keys(this.state).forEach((item) => {
  //     if (this.state[item] === true && this[funcMap[item]]) {
  //       this[funcMap[item]](false);
  //     }
  //   });
  //   this.setState({
  //     liverSegment: false,
  //     kidneySegment: false,
  //     lungRegistration: false,
  //     lungSlice: false,
  //     lungSegment: false,
  //     basinAnalysis: false,
  //   });
  // }

  updateActive(type) {
    this.handleClose();
    switch (type) {
      case 'liverSegment': {
        this.setState({ liverSegment: !this.state.liverSegment });
        if (!this.state.liverSegment) {
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
  // kidneySegment(param) {
  //   const option = param || { cmd: 'widget', value: 'close' };
  //   if (param) {
  //     dispatch(actions.button.storeButton('calculatorTool'));
  //   } else {
  //     dispatch(actions.button.storeButton(''));
  //   }
  //   this.setState({ messageVisible: !!param });
  //   if (option.cmd === 'cutter') {
  //     this.props.updateViewParamsAll({ context: 'KidneySegment-VesselCut' });
  //   }
  //   this.props.kidneySegment(option);
  // }
  //
  // lungRegistration(type) {
  //   if (type) {
  //     dispatch(actions.button.storeButton('calculatorTool'));
  //   } else {
  //     dispatch(actions.button.storeButton(''));
  //   }
  //   this.props.lungRegistration(type);
  // }
  //
  // lungSlice(param) {
  //   const option = param || { cmd: 'widget', value: 'close' };
  //   if (param) {
  //     dispatch(actions.button.storeButton('calculatorTool'));
  //   } else {
  //     dispatch(actions.button.storeButton(''));
  //   }
  //   this.setState({ messageVisible: !!param });
  //   if (option.cmd === 'createsurface') {
  //     this.props.updateViewParamsAll({ context: 'LungSlice-CreateSurface' });
  //   }
  //   this.props.lungSlice(option);
  // }
  //
  // lungSegment(param) {
  //   const option = param || { cmd: 'widget', value: 'close' };
  //   if (param) {
  //     dispatch(actions.button.storeButton('calculatorTool'));
  //   } else {
  //     dispatch(actions.button.storeButton(''));
  //   }
  //   this.setState({ messageVisible: !!param });
  //   if (option.cmd === 'calccenterline') {
  //     this.props.updateViewParamsAll({ context: 'LungSegment-CalcCenterLine' });
  //   } else if (option.cmd === 'lungsegmentmark') {
  //     this.props.updateViewParamsAll({ context: 'LungSegment-LungSegmentMark' });
  //   }
  //   this.props.lungSegment(option);
  // }
  //
  // basinAnalysis(param) {
  //   const option = param || { cmd: 'widget', value: 'close' };
  //   if (param) {
  //     dispatch(actions.button.storeButton('calculatorTool'));
  //   } else {
  //     dispatch(actions.button.storeButton(''));
  //   }
  //   this.setState({ messageVisible: !!param });
  //   if (option.cmd === 'calccenterline') {
  //     this.props.updateViewParamsAll({ context: 'BasinAnalysis-CalcCenterLine' });
  //   } else if (option.cmd === 'liversegmentmark') {
  //     this.props.updateViewParamsAll({ context: 'BasinAnalysis-LiverSegmentMark' });
  //   }
  //   this.props.basinAnalysis(option);
  // }
  //
  // changeKidneySegmentSelectOne(param) {
  //   this.setState({
  //     sOneValue: param,
  //   });
  // }
  //
  // changeKidneySegmentSelectTwo(param) {
  //   this.setState({
  //     sTwoValue: param,
  //   });
  // }
  //
  showMessage() {
    this.setState({ messageVisible: true });
  }

  hideMessage() {
    this.setState({ messageVisible: false });
    this.props.storeLiverSegment(true); // reset liverSegmentResult
    this.props.storeLungVolume(true);
    this.props.storeBasinAnalysis(true);
    this.props.storeLungSegment(true);
    this.props.storeKidneySegment(true);
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
          <li className={'SurfaceExtWrapper' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'liverSegmentButtonDisabled' : !this.state.liverSegment ? 'liverSegmentButton' : 'liverSegmentButtonActive'}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.liverSegment ? 'textNormal' : 'textActive'}>
              肝分段
            </span>
          </li>
          <li className={'SurfaceExtWrapper' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'kidneySegmentButtonDisabled' : !this.state.kidneySegment ? 'kidneySegmentButton' : 'kidneySegmentButtonActive'}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.kidneySegment ? 'textNormal' : 'textActive'}>
              肾分段
            </span>
          </li>
          {/*
            <li
              className={this.props.baseFile === '' ? style.lungRegistrationButtonDisabled : !this.state.lungRegistration ? style.lungRegistrationButton : style.lungRegistrationButtonActive}
              onClick={this.props.baseFile !== '' && (() => { this.updateActive('lungRegistration'); })}
              title={'肺部配准'}
            />
          */}
          <li className={'SurfaceExtWrapper' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'lungSliceButtonDisabled' : !this.state.lungSlice ? 'lungSliceButton' : 'lungSliceButtonActive'}
              onClick={this.updateActive.bind(this,'lungSlice')}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.lungSlice ? 'textNormal' : 'textActive'}>
              肺分叶
            </span>
          </li>
          <li className={'SurfaceExtWrapper' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'lungSegmentButtonDisabled' : !this.state.lungSegment ? 'lungSegmentButton' : 'lungSegmentButtonActive'}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.lungSegment ? 'textNormal' : 'textActive'}>
              肺分段
            </span>
          </li>
          <li className={'SurfaceExtWrapper' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'basinAnalysisButtonDisabled' : !this.state.basinAnalysis ? 'basinAnalysisButton' : 'basinAnalysisButtonActive'}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.basinAnalysis ? 'textNormal' : 'textActive'}>
              肝脏流域分析
            </span>
          </li>
        </ul>
        {
          this.state.liverSegment &&
            <LiverSegment
              updateActive={this.updateActive}
              nodes={nodes}
              vesselData={this.props.vesselData}
              views={views}
              liverSegment={this.liverSegment}
            />
        }
        {
          this.state.kidneySegment &&
            <KidneySegment
              updateActive={this.updateActive}
              nodes={nodes}
              views={views}
              kidneySegment={this.kidneySegment}
              changeKidneySegmentSelectOne={this.changeKidneySegmentSelectOne}
              changeKidneySegmentSelectTwo={this.changeKidneySegmentSelectTwo}
              sOneValue={this.state.sOneValue}
              sTwoValue={this.state.sTwoValue}
            />
        }
        {
          this.state.lungSlice &&
            <LungSlice
              updateActive={this.updateActive}
              nodes={nodes}
              views={views}
              lungSlice={this.lungSlice}
            />
        }
        {
          this.state.lungSegment &&
            <LungSegment
              updateActive={this.updateActive}
              nodes={nodes}
              views={views}
              lungSegment={this.lungSegment}
            />
        }
        {
          this.state.basinAnalysis &&
            <BasinAnalysis
              updateActive={this.updateActive}
              nodes={nodes}
              views={views}
              basinAnalysis={this.basinAnalysis}
            />
        }
        {
          this.state.messageVisible && !this.props.liverSegmentResult &&
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

        {
          this.state.messageVisible && !this.props.lungVolume &&
            <div className='messageContent'>
              <div className='mask' />
              <div className='title' >
                提示
                <span onClick={this.hideMessage} onTouchEnd={this.hideMessage} >&times;</span>
              </div>
              <div className='content' >
                <div className='rowPart' >
                  <span style={{ width: '100%', lineHeight: '50px' }}>
                    * 肺分叶错误，请重新操作。
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

        {
          this.state.messageVisible && !this.props.liverWatershed &&
            <div className='messageContent'>
              <div className='mask' />
              <div className='title' >
                提示
                <span onClick={this.hideMessage} onTouchEnd={this.hideMessage} >&times;</span>
              </div>
              <div className='content' >
                <div className='rowPart' >
                  <span style={{ width: '100%', lineHeight: '50px' }}>
                    * 肝流域分析错误，请重新操作。
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

        {
          this.state.messageVisible && !this.props.lungSegmentResult &&
            <div className='messageContent'>
              <div className='mask' />
              <div className='title' >
                提示
                <span onClick={this.hideMessage} onTouchEnd={this.hideMessage} >&times;</span>
              </div>
              <div className='content' >
                <div className='rowPart' >
                  <span style={{ width: '100%', lineHeight: '50px' }}>
                    * 肺分段错误，请重新操作。
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

        {
          this.state.messageVisible && !this.props.kidneySegmentResult &&
            <div className='messageContent'>
              <div className='mask' />
              <div className='title' >
                提示
                <span onClick={this.hideMessage} onTouchEnd={this.hideMessage} >&times;</span>
              </div>
              <div className='content' >
                <div className='rowPart' >
                  <span style={{ width: '100%', lineHeight: '50px' }}>
                    * 肾分段错误，请重新操作。
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
SimulatedDimension.propTypes = {
  visible: ReactPropTypes.bool,
  expand: ReactPropTypes.bool,
  baseFile: ReactPropTypes.string,
  // actives: ReactPropTypes.array,
  // nodes: ReactPropTypes.object,
  // views: ReactPropTypes.array,
  // dataNode: ReactPropTypes.string,
  // measureResult: ReactPropTypes.bool,
  // vesselData: ReactPropTypes.array,
  // liverSegmentResult: ReactPropTypes.bool,
  // lungVolume: ReactPropTypes.bool,
  // liverWatershed: ReactPropTypes.bool,
  // lungSegmentResult: ReactPropTypes.bool,
  // kidneySegmentResult: ReactPropTypes.bool,
  //
  // changeAlert: ReactPropTypes.func,
  // liverSegment: ReactPropTypes.func,
  // storeLiverSegment: ReactPropTypes.func,
  // updateViewParamsAll: ReactPropTypes.func,
  // storeLungVolume: ReactPropTypes.func,
  // storeBasinAnalysis: ReactPropTypes.func,
  // storeLungSegment: ReactPropTypes.func,
  // storeKidneySegment: ReactPropTypes.func,
  // kidneySegment: ReactPropTypes.func,
  // lungRegistration: ReactPropTypes.func,
  // lungSlice: ReactPropTypes.func,
  // lungSegment: ReactPropTypes.func,
  // basinAnalysis: ReactPropTypes.func,
}
export default SimulatedDimension;
