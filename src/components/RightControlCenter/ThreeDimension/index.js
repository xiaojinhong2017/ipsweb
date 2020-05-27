import React, { Component } from 'react';
import  '../../../style/ToggleIcons.css';
import ReactPropTypes from 'prop-types';
import SurfaceCut     from './CoreComponent/SurfaceCut';
import Remnant        from './CoreComponent/Remnant';
import SurfaceEdit    from './CoreComponent/SurfaceEdit';
import SurfaceExt     from './CoreComponent/SurfaceExt';
import SurfaceToImg   from './CoreComponent/SurfaceToImg';
import TDAngle        from './CoreComponent/TD_Angle';
import TDDis          from './CoreComponent/TD_Dis';
import VR             from './CoreComponent/VR';
import RebuildSlice   from './CoreComponent/RebuildSlice';
import Project        from './CoreComponent/Project';
import Subtract       from './CoreComponent/Subtract';


const funcMap = {
  distance3d: 'distance3d',
  angleMeasure3d: 'angleMeasure3d',
  volumeCalculator: 'volumeCalculator',
  surfaceCut: 'surfaceCut',
  remnant: 'remnant',
  surfaceEdit: 'surfaceEdit',
  normalcutting: 'normalcutting',
  subtract: 'subtract',
  project: 'project',
  surfaceToImage: 'surfaceToImage',
  organExpanstion: 'organExpanstion',
  volumeRender: 'volumeRender',
  ai: 'ai',
};

class ThreeDimension extends Component {
  constructor() {
    super();
    this.state = {
      volumeRender: false
    };
    this.updateActive = this.updateActive.bind(this);
    this.volumeRender = this.volumeRender.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  updateActive(type) {
    this.handleClose();
    switch (type) {
      case 'distance3d': {
        this.setState({ distance3d: !this.state.distance3d });
        if (!this.state.distance3d) {
          // this.distance3d(!this.state.distance3d);
        }
        break;
      }
      case 'angleMeasure3d': {
        this.setState({ angleMeasure3d: !this.state.angleMeasure3d });
        if (!this.state.angleMeasure3d) {
          // this.angleMeasure3d(!this.state.angleMeasure3d);
        }
        break;
      }
      case 'volumeCalculator': {
        this.setState({ volumeCalculator: !this.state.volumeCalculator });
        if (!this.state.volumeCalculator) {
          // this.volumeCalculator(!this.state.volumeCalculator);
        }
        break;
      }
      case 'surfaceCut': {
        this.setState({ surfaceCut: !this.state.surfaceCut });
        if (!this.state.surfaceCut) {
          window.vtk.toolapis.activeTool('SurfaceCutting');
        }else {
          window.vtk.toolapis.inactiveTool('');
        }
        break;
      }
      case 'remnant': {
        this.setState({ remnant: !this.state.remnant });
        if (!this.state.remnant) {
          // this.remnant({ cmd: 'widget', value: 'open' }, true);
        }
        break;
      }
      case 'surfaceEdit': {
        this.setState({ surfaceEdit: !this.state.surfaceEdit });
        if (!this.state.surfaceEdit) {
          // this.surfaceEdit({ cmd: 'widget', value: 'open' }, true);
        }
        break;
      }
      case 'normalcutting': {
        this.setState({ normalcutting: !this.state.normalcutting });
        if (!this.state.normalcutting) {
          // this.normalcutting({ cmd: 'widget', value: 'open' });
        }
        break;
      }
      case 'subtract': {
        this.setState({ subtract: !this.state.subtract });
        if (!this.state.subtract) {
          // this.subtract({ cmd: 'widget', value: 'open' });
        }
        break;
      }
      case 'project': {
        this.setState({ project: !this.state.project });
        if (!this.state.project) {
          // this.project({ cmd: 'widget', value: 'open' });
        }
        break;
      }
      case 'surfaceToImage': {
        this.setState({ surfaceToImage: !this.state.surfaceToImage });
        if (!this.state.surfaceToImage) {
          // this.surfaceToImage({ cmd: 'widget', value: 'open' });
        }
        break;
      }
      case 'organExpanstion': {
        this.setState({ organExpanstion: !this.state.organExpanstion });
        if (!this.state.organExpanstion) {
          // this.organExpanstion({ cmd: 'widget', value: 'open' });
        }
        break;
      }
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

  volumeRender(type){
    window.vtk.apis.setStyleMode3D(parseInt(type));
  }
  normalcutting(){
  }

  handleClose() {
    // loop funcMap to set other button's functype >> 'false'
    Object.keys(this.state).forEach((item) => {
      if (this.state[item] === true && this[funcMap[item]]) {
        this[funcMap[item]](false);
      }
    });
    this.setState({
      surfaceCut: false,
      remnant: false,
      surfaceEdit: false,
      normalcutting: false,
      subtract: false,
      project: false,
      surfaceToImage: false,
      organExpanstion: false,
      distance3d: false,
      angleMeasure3d: false,
      volumeCalculator: false,
      volumeRender: false,
      ai: false,
    });
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    const nodes = {};
    const views = [];
    return (
      <div className={this.props.expand? 'toolContainer': 'toolContainerHide'} >
        <ul>
          <li className={'TD_Dis' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              key={16}
              data-idx={16}
              className={this.props.baseFile === '' ? 'TD_DisButtonDisabled ' : !this.state.distance3d ? 'TD_DisButton ' : 'TD_DisButtonActive '}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.distance3d ? 'textNormal' : 'textActive'}>
              三维长度测量
            </span>
            {
              this.state.distance3d && (
                <TDDis />
              )
            }
          </li>
          <li className={'TD_Angle' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              key={17}
              data-idx={17}
              className={this.props.baseFile === '' ? 'TD_AngleButtonDisabled ' : !this.state.angleMeasure3d ? 'TD_AngleButton ' : 'TD_AngleButtonActive '}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.angleMeasure3d ? 'textNormal' : 'textActive'}>
              三维角度测量
            </span>
            {
              this.state.angleMeasure3d && (
                <TDAngle />
              )
            }
          </li>
          <li className={this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'VolumeButtonDisabled ' : !this.state.volumeCalculator ? 'VolumeButton ' : 'VolumeButtonActive '}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.volumeCalculator ? 'textNormal' : 'textActive'}>
              体积测量
            </span>
          </li>
          <li className={'SurfaceToImg ' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'SurfaceToImgButtonDisabled ' : !this.state.surfaceToImage ? 'SurfaceToImgButton ' : 'SurfaceToImgButtonActive '}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.surfaceToImage ? 'textNormal' : 'textActive'}>
              面数据映射
            </span>
            {
              this.state.surfaceToImage && (
                <SurfaceToImg nodes={nodes} views={views}  updateActive={this.updateActive} />
              )
            }
          </li>
        </ul>
        <ul>
          <li className={'SurfaceExtWrapper ' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'SurfaceExtButtonDisabled ' : !this.state.organExpanstion ? 'SurfaceExtButton ' : 'SurfaceExtButtonActive '}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.organExpanstion ? 'textNormal' : 'textActive'}>
              病灶边缘外扩
            </span>
            {
              this.state.organExpanstion && (
                <SurfaceExt  nodes={nodes} views={views} updateActive={this.updateActive} />
              )
            }
          </li>
          <li className={'RemnantWrapper ' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'RemnantButtonDisabled ' : !this.state.remnant ? 'RemnantButton ' : 'RemnantButtonActive '}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.remnant ? 'textNormal' : 'textActive'}>
              残肝比测量
            </span>
            {
              this.state.remnant && (
                <Remnant remnant={this.remnant} livers={this.props.livers} nodes={nodes} views={views}  updateActive={this.updateActive} />
              )
            }
          </li>
          <li className={'SurfaceCutWrapper' && 'iconBox'}>
            <div
              className={!this.state.surfaceCut ? 'SurfaceCutButton ' : 'SurfaceCutButtonActive '}
              onClick={(() => { this.updateActive('surfaceCut'); })}
            />
            <span className={!this.state.surfaceCut ? 'textNormal' : 'textActive'}>
              曲面裁切
            </span>
            {
              this.state.surfaceCut && (
                <SurfaceCut />
              )
            }

          </li>
          <li className={'SurfaceEditWrapper ' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'SurfaceEditButtonDisabled ' : !this.state.surfaceEdit ? 'SurfaceEditButton ' : 'SurfaceEditButtonActive '}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.surfaceEdit ? 'textNormal' : 'textActive'}>
              血管分段查看
            </span>
            {
              this.state.surfaceEdit  && (
                <SurfaceEdit surfaceEdit={this.surfaceEdit} livers={this.props.livers} showLivers={this.showLivers} nodes={this.props.nodes} views={this.props.views} view3dNodes={this.props.view3dNodes} updateActive={this.updateActive} />
              )
            }
          </li>
        </ul>
        <ul>
          <li className={'SurfaceEditWrapper' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'SubButtonDisabled ' : !this.state.subtract ? 'SubButton ' : 'SubButtonActive '}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.subtract ? 'textNormal' : 'textActive'}>
              面数据相减
            </span>
            {
              this.state.subtract && (
                <Subtract subtract={this.subtract} nodes={nodes} views={views} />
              )
            }
          </li>
          <li className={'rebuildSliceWrapper' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'rebuildSliceButtonDisabled ' : !this.state.normalcutting ? 'rebuildSliceButton ' : 'rebuildSliceButtonActive '}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.normalcutting ? 'textNormal' : 'textActive'}>
              重建分割
            </span>
            {
              this.state.normalcutting  && (
                <RebuildSlice normalcutting={this.normalcutting} />
              )
            }
          </li>
          <li className={'rebuildSliceWrapper' && this.props.baseFile === '' ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={this.props.baseFile === '' ? 'SkinMapButtonDisabled ' : !this.state.project ? 'SkinMapButton ' : 'SkinMapButtonActive '}
            />
            <span className={this.props.baseFile === '' ? 'textDisabled' : !this.state.project ? 'textNormal' : 'textActive'}>
              表面投影
            </span>
            {
              this.state.project && (
                <Project project={this.project} nodes={nodes} views={views} />
              )
            }
          </li>
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
ThreeDimension.defaultProps = {
  livers: [],
};
export default ThreeDimension;
