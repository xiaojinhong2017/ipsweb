import React, { Component } from 'react';
import  '../../../style/ToggleIcons.css';
import ReactPropTypes from 'prop-types';
import VR             from './CoreComponent/VR';


class ThreeDimension extends Component {
  constructor() {
    super();
    this.state = {
      volumeRender: false
    };
    this.updateActive = this.updateActive.bind(this);
    // this.volumeRender = this.volumeRender.bind(this);
  }

  // volumeRender(type){
  //     window.vtk.apis.setStyleMode3D(parseInt(type));
  //   }
  updateActive(type) {
    // this.handleClose();
    switch (type) {
      case 'volumeRender': {
        this.setState({ volumeRender: !this.state.volumeRender });
        this.props.toggleVolumeVisible();
        break;
      }
      default:
        return false;
    }
    return true;
  }
  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <div className={this.props.expand? 'toolContainer': 'toolContainerHide'} >
        <ul>
          <li className='iconBox'>
            <div
              className='VRButton'
              type={this.state.volumeRender ? '0' : '1'}
              onClick={(() => { this.updateActive('volumeRender');})}
            />
            <span className='textNormal'>
              显示体绘制
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
ThreeDimension.propTypes = {
  toggleVolumeVisible:ReactPropTypes.func,
  expand: ReactPropTypes.bool,
  visible: ReactPropTypes.bool,
};
export default ThreeDimension;
