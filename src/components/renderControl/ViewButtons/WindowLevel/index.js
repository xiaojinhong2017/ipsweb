import React, {Component}  from 'react';
import ReactPropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../../redux/index/index.reducer.js";
import '../../../../style/RenderControl.css';
import wlp1        from '../../../../images/PresetIcon/wlp1.png';
import wlp2        from '../../../../images/PresetIcon/wlp2.png';
import wlp3        from '../../../../images/PresetIcon/wlp3.png';
import wlp4        from '../../../../images/PresetIcon/wlp4.png';
import wlp5        from '../../../../images/PresetIcon/wlp5.png';
import wlp6        from '../../../../images/PresetIcon/wlp6.png';
import wlp7        from '../../../../images/PresetIcon/wlp7.png';
import wlp8        from '../../../../images/PresetIcon/wlp8.png';
import wlp9        from '../../../../images/PresetIcon/wlp9.png';
import wlp10       from '../../../../images/PresetIcon/wlp10.png';
import wlp11       from '../../../../images/PresetIcon/wlp11.png';
import wlp12       from '../../../../images/PresetIcon/wlp12.png';
import wlp13       from '../../../../images/PresetIcon/wlp13.png';
import wlp14       from '../../../../images/PresetIcon/wlp14.png';

// const windowLevelPreset = [
//   { id: 1, preset: 'Abdomen Soft Tissue', name: '腹部软组织', src: wlp1 },
//   { id: 2, preset: 'Bone 1', name: '骨头1', src: wlp2 },
//   { id: 3, preset: 'Pleura', name: '胸膜', src: wlp3 },
//   { id: 4, preset: 'Ischemia-Hard Non-Contrast', name: '缺血-非显影剂硬', src: wlp4 },
//   { id: 5, preset: 'Liver', name: '肝', src: wlp5 },
//   { id: 6, preset: 'Emphysema', name: '气肿', src: wlp6 },
//   { id: 7, preset: 'Lung', name: '肺', src: wlp7 },
//   { id: 8, preset: 'Mediastinum', name: '纵隔', src: wlp8 },
//   { id: 9, preset: 'Soft Tissue 1', name: '软组织1', src: wlp9 },
//   { id: 10, preset: 'Soft Tissue 2', name: '软组织2', src: wlp10 },
//   { id: 11, preset: 'Vasculature-Hard', name: '血管-硬', src: wlp11 },
//   { id: 12, preset: 'Bone 2', name: '骨头2', src: wlp12 },
//   { id: 13, preset: 'Bone 3', name: '骨头3', src: wlp13 },
//   { id: 14, preset: 'Ischemia-Soft Non-Contrast', name: '缺血-软非显影剂', src: wlp14 },
// ];

class WindowLevel extends Component {
  constructor() {
    super();
    this.state = {
      preset: '',
    };
    this.applyWindowLevelPreset = this.applyWindowLevelPreset.bind(this);
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.client === 'MOBILE' && nextProps.volumeVisible) {
      this.timer = setTimeout(() => {
        this.props.hideWindowLevel();
        clearTimeout(this.timer);
        this.timer = null;
      }, 4500);
    }
  }

  applyWindowLevelPreset(e) {
    const preset = e.target.getAttribute('data-value') || e.target.parentNode.getAttribute('data-value');
    window.vtk.apis.applyWindowLevelPreset(preset);
    this.props.hideWindowLevel();
    let window_level = window.vtk.apis.getWindowLevelPresets()
    this.props.WindowLevel(preset ,window_level)
    
  }

  addClass(e) {
    // this.props.clearTimer();
    this.setState({ preset: Number(e.target.getAttribute('data-value') || e.target.parentNode.getAttribute('data-value')) });
  }

  removeClass() {
    this.setState({ preset: '' });
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    const presets = window.vtk.apis.getWindowLevelPresets();
    presets.ABDOMEN_SOFT_TISSUE.src = wlp1;
    presets.BONE_1.src = wlp2;
    presets.PLEURA.src = wlp3;
    presets.ISCHEMIA_HARD_NON_CONTRAST.src = wlp4;
    presets.LIVER.src = wlp5;
    presets.EMPHYSEMA.src = wlp6;
    presets.LUNG.src = wlp7;
    presets.MEDIASTINUM.src = wlp8;
    presets.SOFT_TISSUE_1.src = wlp9;
    presets.SOFT_TISSUE_2.src = wlp10;
    presets.VASCULATURE_HARD.src = wlp11;
    presets.BONE_2.src = wlp12;
    presets.BONE_3.src = wlp13;
    presets.ISCHEMIA_SOFT_NON_CONTRAST.src = wlp14;
    return (
      <div className="windowLevel" onMouseEnter={this.props.clearTimer.bind(this)} onMouseLeave={this.props.hideWindowLevel.bind(this)} style={this.props.style} >
        <ul>
          {
              Object.keys(presets).map((preset) => (
              <li
                key={preset}
                data-value={preset}
                className={this.state.preset === preset ? 'focus' : ''}
                onClick={this.applyWindowLevelPreset}
                onTouchStart={this.addClass}
                onTouchEnd={this.removeClass}
              >
                <img src={presets[preset].src} alt={preset} />
                <span>{presets[preset].nameZh}</span>
              </li>
              )
            )
          }
        </ul>
      </div>
    );
  }
}
WindowLevel.propTypes = {
  visible: ReactPropTypes.bool,
  client: ReactPropTypes.string,
  style: ReactPropTypes.object,
  hideWindowLevel: ReactPropTypes.func,
  clearTimer: ReactPropTypes.func,
};

let mapStateToProps = (store) => ({...store.IndexStore})  
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth) 
export default connect(mapStateToProps,mapDispatchToProps )(WindowLevel);

