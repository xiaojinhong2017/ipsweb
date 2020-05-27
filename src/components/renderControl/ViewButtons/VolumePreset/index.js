import React, {Component} from 'react';
import { Select } from 'antd';

import ReactPropTypes from 'prop-types';
import style       from './../../../../style/RenderControl.css';

import CTBlackWhite                 from '../../../../images/ViewIcon/CT BlackWhite.png';
import CTBone                       from '../../../../images/ViewIcon/CT Bone.png';
import CTGeneric                    from '../../../../images/ViewIcon/CT Generic.png';
import CTThoraxLarge                from '../../../../images/ViewIcon/CT ThoraxLarge.png';
import CTThoraxSmall                from '../../../../images/ViewIcon/CT ThoraxSmall.png';
import MRGeneric                    from '../../../../images/ViewIcon/MR Generic.png';
import CTAAA                        from '../../../../images/ViewIcon/CT abdominal aortic aneurysm.png';
import CTAAA2                       from '../../../../images/ViewIcon/CT abdominal aortic aneurysm2.png';
import CTBone2                      from '../../../../images/ViewIcon/CT Bone2.png';
import CTCardiac                    from '../../../../images/ViewIcon/CT  heart shows.png';
import CTCardiac2                   from '../../../../images/ViewIcon/CT  heart shows2.png';
import CTCardiac3                   from '../../../../images/ViewIcon/CT  heart shows3.png';
import CTChestContrastEnhanced      from '../../../../images/ViewIcon/CT Contrast enhancement shows.png';
import CTChestVessels               from '../../../../images/ViewIcon/CT chest blood.png';
import CTCoronaryArtery             from '../../../../images/ViewIcon/CT Coronary artery.png';
import CTCoronaryArtery2            from '../../../../images/ViewIcon/CT Coronary artery2.png';
import CTCoronaryArtery3            from '../../../../images/ViewIcon/CT Coronary artery3.png';
import CTHighlightTheBonesShow      from '../../../../images/ViewIcon/CT Highlight the bones show.png';
import CTFat                        from '../../../../images/ViewIcon/CT Fat show.png';
import CTLiverBlood                 from '../../../../images/ViewIcon/CT liver blood.png';
import CTLungs                      from '../../../../images/ViewIcon/CT lungs.png';
import CTMaximumDensityProjection   from '../../../../images/ViewIcon/CT Maximum density projection.png';
import CTMuscle                     from '../../../../images/ViewIcon/CT muscle.png';
import CTPulmonaryVascular          from '../../../../images/ViewIcon/CT Pulmonary vascular.png';
import CTSoftTissue                 from '../../../../images/ViewIcon/CT Soft tissue.png';
import MRImaging                    from '../../../../images/ViewIcon/MR Imaging.png';
import MRMaximumDensityProjection   from '../../../../images/ViewIcon/MR Maximum density projection.png';
import MRBrainT2Phase               from '../../../../images/ViewIcon/MR Brain T2 phase.png';

const { Option } = Select;
const VolumePresets = [
  { id: 31601, preset: 'CT Black & White', name: 'CT黑白显示', src: CTBlackWhite },
  { id: 31602, preset: 'CT Bone', name: 'CT骨骼显示', src: CTBone },
  { id: 31603, preset: 'CT Generic', name: 'CT通用显示', src: CTGeneric },
  { id: 31604, preset: 'CT Thorax Large', name: 'CT胸腔大阈值显示', src: CTThoraxLarge },
  { id: 31605, preset: 'CT Thorax Small', name: 'CT胸腔小阈值显示', src: CTThoraxSmall },
  { id: 31606, preset: 'MR Generic', name: 'MR通用显示', src: MRGeneric },
  { id: 31607, preset: 'CT-AAA', name: 'CT腹主动脉肿瘤显示', src: CTAAA },
  { id: 31608, preset: 'CT-AAA2', name: 'CT腹主动脉肿瘤显示2', src: CTAAA2 },
  { id: 31609, preset: 'CT-Bone2', name: 'CT骨骼显示2', src: CTBone2 },
  { id: 31610, preset: 'CT-Cardiac', name: 'CT心脏显示', src: CTCardiac },
  { id: 31611, preset: 'CT-Cardiac2', name: 'CT心脏显示2', src: CTCardiac2 },
  { id: 31612, preset: 'CT-Cardiac3', name: 'CT心脏显示3', src: CTCardiac3 },
  { id: 31613, preset: 'CT-Chest-Contrast-Enhanced', name: 'CT胸腔对比度增强显示', src: CTChestContrastEnhanced },
  { id: 31614, preset: 'CT-Chest-Vessels', name: 'CT胸腔血管显示', src: CTChestVessels },
  { id: 31615, preset: 'CT-Coronary-Arteries', name: 'CT冠状动脉显示', src: CTCoronaryArtery },
  { id: 31616, preset: 'CT-Coronary-Arteries-2', name: 'CT冠状动脉显示2', src: CTCoronaryArtery2 },
  { id: 31617, preset: 'CT-Coronary-Arteries-3', name: 'CT冠状动脉显示3', src: CTCoronaryArtery3 },
  { id: 31618, preset: 'CT-Cropped-Volume-Bone', name: 'CT突出骨骼显示', src: CTHighlightTheBonesShow },
  { id: 31619, preset: 'CT-Fat', name: 'CT脂肪显示', src: CTFat },
  { id: 31620, preset: 'CT-Liver-Vasculature', name: 'CT肝脏血管显示', src: CTLiverBlood },
  { id: 31621, preset: 'CT-Lung', name: 'CT肺部显示', src: CTLungs },
  { id: 31622, preset: 'CT-MIP', name: 'CT最大密度投影显示', src: CTMaximumDensityProjection },
  { id: 31623, preset: 'CT-Muscle', name: 'CT肌肉显示', src: CTMuscle },
  { id: 31624, preset: 'CT-Pulmonary-Arteries', name: 'CT肺部血管显示', src: CTPulmonaryVascular },
  { id: 31625, preset: 'CT-Soft-Tissue', name: 'CT软组织显示', src: CTSoftTissue },
  { id: 31626, preset: 'MR-Angio', name: 'MR造影显示', src: MRImaging },
  { id: 31627, preset: 'MR-MIP', name: 'MR最大密度投影显示', src: MRMaximumDensityProjection },
  { id: 31628, preset: 'MR-T2-Brain', name: 'MR脑部T2相显示', src: MRBrainT2Phase },
];

class VolumePreset extends Component {
  constructor() {
    super();
    this.state = {
        type: '3',
        value:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.activeClick = this.activeClick.bind(this);

  }

  handleChange(value) {
    this.setState({value: value});
    window.vtk.apis.applyVolumeRenderPreset(value);
  }
  activeClick(event) {
    window.vtk.apis.setStyleMode3D(parseInt(event.target.value));
    this.setState({ type: event.target.value });
  }

  render() {
    if (!this.props.volumeVisible) {
      return null;
    }
    var presets2 = this.props.presets2? this.props.presets2:[];
    return (
      <div className='volumeView'>
      <div className='volumView_radio'>
        <input type="radio" name="interactive" value="2" onClick={this.activeClick} defaultChecked={this.state.type ==='2'? true : false} />
        <label>窗宽窗位交互</label><br/>
        <input type="radio" name="interactive" value="3" onClick={this.activeClick} defaultChecked={this.state.type ==='3'? true : false}/>
        <label>旋转视图交互</label>
      </div>
      <div className='volumeView_select'>
      <label>体绘制预测值设置</label>
      <Select
        showSearch
        style={{ width: 200, marginTop:'5px' }}
        placeholder="==体绘制预设值=="
        optionFilterProp="children"
        dropdownMenuStyle={{margin:'4px',color:'#000',fontSize:'16px'}}
        onChange={this.handleChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
          {
            VolumePresets &&
            VolumePresets.map((preset, index) => (
              <Option
                  key={index}
                  value={preset.id}
                >
                  <img className='volumeView_img' src={preset.src} alt={preset.preset} style={{width:'20px',height:'20px',margin:'4px'}}/>
                  {preset.name}
                  </Option>
                )
              )
            }
            {
              presets2 &&
               presets2.map((preset, index) => (
                <Option
                  key={index}
                  value={preset}
                >
                  {"OTHER: "+  preset}
                </Option>
              )
            )
          }
      </Select>
      </div>
      </div>
    );
  }
}
VolumePreset.propTypes = {
  volumeVisible: ReactPropTypes.bool,
  presets2:ReactPropTypes.array,
};

export default VolumePreset;
