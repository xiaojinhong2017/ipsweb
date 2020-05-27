import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../../style/ToggleIcons.css';
import '../../../style/RightControl.css';

// import { selectors, actions, dispatch } from '../../../redux';

// TODO funcMap
const funcMap = {
  distanceMeasure: 'distanceMeasure',
  bidimensionalMeasure: 'bidimensionalMeasure',
  angleMeasure: 'angleMeasure',
  areameasure: 'areameasure',
};

class TwoDimension extends Component{
  constructor() {
    super();
    this.state = {
      expand: false,
      enabled: false,
      visibleArr: [],
      distanceMeasure: false,
      bidimensionalMeasure: false,
      angleMeasure: false,
      areameasure: false,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!this.props.visible || nextProps.baseFile === '') {
  //     this.setState({
  //       distanceMeasure: false,
  //       bidimensionalMeasure: false,
  //       angleMeasure: false,
  //       areameasure: false,
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

  // componentDidUpdate() {
  //   if (this.props.visible && Object.keys(funcMap).filter(visible => this.state[visible]).length === 0) {
  //     this.props.changeAlert(false);
  //   } else if (this.props.visible && Object.keys(funcMap).filter(visible => this.state[visible]).length !== 0) {
  //     this.props.changeAlert(true);
  //   } else {
  //     return;
  //   }
  // }

  handleClose() {
    // loop funcMap to set other button's functype >> 'false'
    Object.keys(this.state).forEach((item) => {
      if (this.state[item] === true && this[funcMap[item]]) {
        this[funcMap[item]](false);
      }
    });
    this.setState({
      distanceMeasure: false,
      bidimensionalMeasure: false,
      angleMeasure: false,
      areameasure: false,
    });
  }

  updateActive(type) {
    this.handleClose();
    switch (type) {
      case 'distanceMeasure': {
        this.setState({ distanceMeasure: !this.state.distanceMeasure });
        if (!this.state.distanceMeasure) {
          this.distanceMeasure(!this.state.distanceMeasure);
        }
        break;
      }
      case 'bidimensionalMeasure': {
        this.setState({ bidimensionalMeasure: !this.state.bidimensionalMeasure });
        if (!this.state.bidimensionalMeasure) {
          this.bidimensionalMeasure(!this.state.bidimensionalMeasure);
        }
        break;
      }
      case 'angleMeasure': {
        this.setState({ angleMeasure: !this.state.angleMeasure });
        if (!this.state.angleMeasure) {
          this.angleMeasure(!this.state.angleMeasure);
        }
        break;
      }
      case 'areameasure': {
        this.setState({ areameasure: !this.state.areameasure });
        if (!this.state.areameasure) {
          this.areameasure(!this.state.areameasure);
        }
        break;
      }
      default:
        return false;
    }
    return true;
  }

  distanceMeasure(type) {
    if (type) {
      // dispatch(actions.button.storeButton('calculatorTool'));
    } else {
      // dispatch(actions.button.storeButton(''));
    }
    // this.props.distanceMeasure(type);
  }

  bidimensionalMeasure(type) {
    if (type) {
      // dispatch(actions.button.storeButton('calculatorTool'));
    } else {
      // dispatch(actions.button.storeButton(''));
    }
    // this.props.bidimensionalMeasure(type);
  }

  angleMeasure(type) {
    if (type) {
      // dispatch(actions.button.storeButton('calculatorTool'));
    } else {
      // dispatch(actions.button.storeButton(''));
    }
    // this.props.angleMeasure(type);
  }

  areameasure(type) {
    // this.props.areameasure(type);
  }

  render() {
    if (!this.props.visible && !this.state.alert) {
      return null;
    }
    return (
      <div className={this.props.expand ? 'toolContainer' :'toolContainerHide'} >
        <ul>
          <li className={this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'DistanceButtonDisabled' : !this.state.distanceMeasure ? 'DistanceButton' : 'DistanceButtonActive'}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.distanceMeasure ? 'textNormal' : 'textActive'}>
              二维直线测量
            </span>
          </li>
          <li className={this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'BiDimensionalButtonDisabled' : !this.state.bidimensionalMeasure ? 'BiDimensionalButton' : 'BiDimensionalButtonActive'}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.bidimensionalMeasure ? 'textNormal' : 'textActive'}>
              二维双直线测量
            </span>
          </li>
          <li className={this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'AngleButtonDisabled' : !this.state.angleMeasure ? 'AngleButton' : 'AngleButtonActive'}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.angleMeasure ? 'textNormal' : 'textActive'}>
              二维角度测量
            </span>
          </li>
          <li className={this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'ContourButtonDisabled' : !this.state.areameasure ? 'ContourButton' : 'ContourButtonActive'}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.areameasure ? 'textNormal' : 'textActive'}>
              二维轮廓测量
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

// Binding --------------------------------------------------------------------
/* eslint-disable arrow-body-style */

TwoDimension.propTypes = {
  visible: ReactPropTypes.bool,
  expand: ReactPropTypes.bool,
  // actives: ReactPropTypes.array,
  // nodes: ReactPropTypes.object,
  // views: ReactPropTypes.array,
  baseFile: ReactPropTypes.string,
  // dataNode: ReactPropTypes.string,
  // measureResult: ReactPropTypes.bool,
  //
  // changeAlert: ReactPropTypes.func,
  // distanceMeasure: ReactPropTypes.func,
  // bidimensionalMeasure: ReactPropTypes.func,
  // angleMeasure: ReactPropTypes.func,
  // areameasure: ReactPropTypes.func,
};
export default TwoDimension;
