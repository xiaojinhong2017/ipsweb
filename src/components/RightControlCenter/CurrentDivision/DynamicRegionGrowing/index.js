import React, { Component } from 'react';
import '../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IndexAction from "../../../../redux/index/index.reducer.js";
import { Select, Checkbox, Radio, Slider} from 'antd';
const { Option } = Select;

class DynamicRegionGrowing extends Component {
  constructor() {
    super();
    this.state = {
      confirm: false,
      confirmLine: false,
      confirmSurface: false,
      confirmSurfaceCut: false,
    };
    this.confirmData = this.confirmData.bind(this);
    this.drawCutLine = this.drawCutLine.bind(this);
    this.createSurface = this.createSurface.bind(this);
    this.surfaceCut = this.surfaceCut.bind(this);
    this.giveUp = this.giveUp.bind(this);
    this.updateActive = this.updateActive.bind(this);
  }

  confirmData() {
    this.setState({
      confirm: true,
    });
  }

  drawCutLine() {
    // this.props.lungSlice({
    //   cmd: 'drawprecuttingline',
    //   mask: this.lungSlice.value || '0',
    //   surface: this.lungSurface.value || '0',
    // });
    this.setState({
      confirmLine: true,
    });
  }

  createSurface() {
    // this.props.lungSlice({
    //   cmd: 'createsurface',
    //   mask: this.lungSlice.value || '0',
    //   surface: this.lungSurface.value || '0',
    // });
    this.setState({
      confirmSurface: true,
    });
  }

  surfaceCut() {
    // this.props.lungSlice({
    //   cmd: 'cutter',
    //   mask: this.lungSlice.value || '0',
    //   surface: this.lungSurface.value || '0',
    // });
    this.setState({
      confirmSurfaceCut: true,
    });
  }

  giveUp() {
    // this.props.lungSlice({
    //   cmd: 'giveup',
    // });
    this.props.updateActive('dynamicRegionGrowing');
  }

  updateActive() {
    // this.props.lungSlice({
    //   cmd: 'widget',
    //   value: 'close',
    // });
    this.props.updateActive('lungSlice');
  }
  handleChange=(value)=> {
    this.setState({value: value});
   console.log(`selected ${value}`);
  }
  onChange=()=>{

  }

  render() {
    return (
      <div className='functionWrapper'>
        <div className='rowPart'>
          1.选择相应的期项数据，通过鼠标左键在二维视图中单击以添加种子节点
          自动从改点进行种子生长计算
        </div>
        <div className='rowPart'>
          <label>期项数据</label>
          <Select
          value={this.state.value}
          style={{ width: 120,display:'inline-block' }}
          onChange={this.handleChange}>
            {
              this.props.openDicomArray.map((item,index)=>{
                return(<option value={item.index}>{item.name}</option>)
              })
            }
         </Select>
        </div>
        <div className='rowPart'>
          2.调节'偏差量'可调节生长程度
        </div>
        <div className='rowPart'>
          <label>偏差量</label>
          <Select
            value={this.state.value}
            style={{ width: 120,display:'inline-block',marginRight: '20px' }}
            onChange={this.handleChange}>
              <option key='0' value='0' >--</option>
              <option key='1' value='1' >包含在内</option>
              <option key='2' value='2' >排除在外</option>
          </Select>
        </div>
        <div>

        </div>
        <div className='rowPart'>
         4.确定阈值后，可勾选"种子点"选框，通过鼠标左键在二维视图中点击以添加种子点，在阈值结果的基础上进行生长计算
        </div>
        <div style={{padding: '8px 10px'}}>
          <Checkbox onChange={this.onChange}>种子点</Checkbox>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>替换</Radio>
            <Radio value={2}>添加</Radio>
          </Radio.Group>

        </div>
        <div className='rowPart'>
          <i>当前像素值：123</i>
        </div>
        <div className='rowPart'>
         5.选择是否填充小洞，点击完成以保存结果;若未使用种子点进行生长计算，则会直接保存阈值分割的结果。
        </div>
        <div className='rowPart'>
          <label>保存到</label>
          <Select
            value={this.state.value}
            style={{ width: 120,display:'inline-block',marginRight:'50px' }}
            onChange={this.handleChange}>
              {
                this.props.openDicomArray.map((item,index)=>{
                  return(<option value={item.index}>{item.name}</option>)
                })
              }
           </Select>
        </div>
        <div className='rowPart'>
         <Checkbox onChange={this.onChange}>填洞</Checkbox>
        </div>
        <div className='rowPart'>
          <button className={this.state.confirmSurfaceCut ? 'btn' : 'disable'} >完成</button>
          <button className={'btn'} onClick={this.giveUp} >放弃</button>
        </div>
      </div>
    );
  }
}
DynamicRegionGrowing.propTypes = {
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  updateActive: ReactPropTypes.func,
  lungSlice: ReactPropTypes.func,
};
let mapStateToProps = store => ({
   ...store.IndexStore
});
let mapDispatchToProps = dispacth =>
 bindActionCreators(
   {
     ...IndexAction
   },
   dispacth
 );
export default connect(mapStateToProps, mapDispatchToProps)(DynamicRegionGrowing);
