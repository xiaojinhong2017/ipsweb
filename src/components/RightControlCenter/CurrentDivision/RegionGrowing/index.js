import React, { Component } from 'react';
import '../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IndexAction from "../../../../redux/index/index.reducer.js";
import { Select, Checkbox, Radio, Slider, InputNumber} from 'antd';
const { Option } = Select;

class RegionGrowing extends Component {
  constructor() {
    super();
    this.params = window.vtk.toolapis.getToolParams('RegionGrowing');
    this.inputSeriesList = this.params.inputSeriesList;
    this.maskROIList = this.params.maskROIList;
    this.maskTypeList = this.params.maskTypeList;
    this.outputROIList = this.params.outputROIList;
    this.predefinedList = this.params.predefinedList;
    this.histogram = this.params.histogram;
    this.options = this.params.options;
    this.state = {
      inputSeries: this.options.inputSeries,
      maskROI: this.options.maskROI,
      maskType: this.options.maskType,
      outputROI: this.options.outputROI,
      predefined: this.options.predefined,
      histogram: this.options.histogram,
      CTCur: this.options.CTCur,
      CTHigh: this.options.CTHigh,
      CTLow: this.options.CTLow,
      fillHoles: this.options.fillHoles,
      replace: this.options.replace,
      seed: this.options.seed,
    };

    this.giveUp = this.giveUp.bind(this);
    this.updateActive = this.updateActive.bind(this);
  }

  componentWillMount(){
   // this.props.setCurrentRootMenu(this.props.rootMenu[0]);
  }
  // componentWillReceiveProps(nextProps) {
  //
  //   if(this.props.openDicomArray !== nextProps.openDicomArray){
  //     if(nextProps.openYcm !== ''){
  //        let index = nextProps.openDicomArray.length ===0 ?'': nextProps.openDicomArray[0].index;
  //        this.setState({value:index});
  //     }else if(nextProps.dicom !== '') {
  //        let index = nextProps.openDicomArray.length ===0 ?'': nextProps.openDicomArray[nextProps.openDicomArray.length-1].index;
  //        this.setState({value:index});
  //     }else if(nextProps.openFile === '') {
  //       this.setState({value:''});
  //     }
  //   }
  // }

  giveUp() {
    // this.props.lungSlice({
    //   cmd: 'giveup',
    // });
    this.props.updateActive('regionGrowing');
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
  CTChange=(value)=>{
    this.setState({
      CTLow:value[0],
      CTHigh: value[1]
    })
  }
  inputSeriesChange=(value)=>{
    this.setState({inputSeries:value});
  }
  predefinedChange=(value)=>{
    this.setState({predefined:value});
  }
  maskTypeChange=(value)=>{
    this.setState({maskType:value});
  }
  maskROIChange=(value)=>{
    this.setState({maskROI:value});
  }
  outputROIChange=(value)=>{
    this.setState({outputROI:value});
  }
  CTLowChange=(value)=>{
    this.setState({CTLow:value});
  }
  CTHighChange=(value)=>{
    this.setState({CTHigh:value});
  }
  seedChange=(value)=>{
    this.setState({seed:value});
  }
  replaceChange=(value)=>{
    this.setState({replace:value});
  }
  fillHolesChange=(value)=>{
    this.setState({fillHoles:value});
  }

  render() {
    const max = this.histogram.max;
    const marks = {
      0: {
        style: {
          color: '#f50',
        },
        label: <strong>{this.histogram.min}</strong>,
      },
      100: {
        style: {
          color: '#f50',
        },
        label: <strong>{this.histogram.max}</strong>,
      },
    };
    console.log(this.state.maskROI);
    return (
      <div className='functionWrapper'>
        <div className='rowPart'>
          1.选择相应的期项数据，会自动算出一个初始值下的阈值结果
        </div>
        <div className='rowPart'>
          <label>期项数据</label>
          <Select
          value={this.state.inputSeries}
          style={{ width: 120,display:'inline-block' }}
          onChange={this.inputSeriesChange}>
            {
              this.inputSeriesList.map((item,index)=>{
                return(<Option key={index} value={index}>{item.name}</Option>)
              })
            }
         </Select>
        </div>
        <div className='rowPart'>
          2.可选择限制在某器官内，或排除在某器官外
        </div>
        <div className='rowPart'>
        <Select
          value={this.state.maskType}
          style={{ width: 120,display:'inline-block',marginRight: '20px' }}
          onChange={this.maskTypeChange}>
          {
            this.maskTypeList.map((item,index)=>{
              return(<Option key={index} value={index}>{item}</Option>)
            })
          }
        </Select>
        <Select
          value={this.state.maskROI}
          style={{ width: 120,display:'inline-block',marginRight: '20px' }}
          onChange={this.maskROIChange}>
          {
            this.maskROIList.map((item,index)=>{
              return(<Option  key={index} value={index}>{item.name}</Option>)
            })
          }
        </Select>
        </div>
        <div>

        </div>
        <div className='rowPart'>
          3.调节高低阈值以预览分割结果，也可选择预设阈值
        </div>
        <div className='rowPart'>
          <Slider
            range
            step={10}
            max={this.histogram.max}
            min={this.histogram.min}
            marks={marks}
            defaultValue={[this.state.CTLow, this.state.CTHigh]}
            onChange={this.CTChange}
          />
          <div className='inlinePart'>
            <label>低阈值</label>
            <InputNumber size="small" min={this.histogram.min} max={this.histogram.max} defaultValue={this.state.CTLow} onChange={this.CTLowChange} />
          </div>
         <div className='inlinePart'>
           <label>预设阈值</label>
           <Select
             value={this.state.predefined}
             style={{ width: 150,display:'inline-block',margin: '0 20px' }}
             onChange={this.predefinedChange}>
             {
               this.predefinedList.map((item,index)=>{
                 return(<Option value={index}>{item.id}</Option>)
               })
             }
           </Select>
         </div>
         <div className='inlinePart'>
           <label>高阈值</label>
           <InputNumber size="small" min={this.histogram.min} max={this.histogram.max} defaultValue={this.state.CTHigh} onChange={this.CTHighChange} />
         </div>

        </div>
        <div className='rowPart'>
         4.确定阈值后，可勾选"种子点"选框，通过鼠标左键在二维视图中点击以添加种子点，在阈值结果的基础上进行生长计算
        </div>
        <div style={{padding: '8px 10px'}}>
          <Checkbox value={this.seed} onChange={this.seedChange}>种子点</Checkbox>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Radio.Group onChange={this.replaceChange} value={this.state.replace}>
            <Radio value={false}>添加</Radio>
            <Radio value={true}>删除</Radio>
          </Radio.Group>
          <br/>
        </div>
        <div className='rowPart'>
         5.选择是否填充小洞，点击完成以保存结果;若未使用种子点进行生长计算，则会直接保存阈值分割的结果。
        </div>
        <div className='rowPart'>
          <label>保存到</label>
          <Select
            value={this.state.outputROI}
            style={{ width: 120,display:'inline-block',marginRight:'50px' }}
            onChange={this.outputROIChange}>
              {
                this.outputROIList.map((item,index)=>{
                  return(<Option key={index} value={index}>{item.name}</Option>)
                })
              }
           </Select>
        </div>
        <div className='rowPart'>
          <Checkbox value={this.state.fillHoles} onChange={this.fillHolesChange}>填洞</Checkbox>
        </div>
        <div className='rowPart'>
          <button className={this.state.confirmSurfaceCut ? 'btn' : 'disable'} >完成</button>
          <button className={'btn'} onClick={this.giveUp} >放弃</button>
        </div>
      </div>
    );
  }
}
RegionGrowing.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(RegionGrowing);
