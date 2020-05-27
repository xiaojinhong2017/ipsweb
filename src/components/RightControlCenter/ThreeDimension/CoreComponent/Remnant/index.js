import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/ToggleIcons.css';
import OccupyDate from './OccupyDate';

class Remnant extends Component {
  constructor() {
    super();
    this.state = {
      openDatePage: false,
      activeId: '',
      occupyArr: [],
      occupyName: [],
      height: 175.0,
      weight: 65.0,
      firstIn: true,
    };
    this.outArea = this.outArea.bind(this);
    this.openDate = this.openDate.bind(this);
    this.checkOccupyDate = this.checkOccupyDate.bind(this);
    this.vesselDataChange = this.vesselDataChange.bind(this);
    this.checkedDate = this.checkedDate.bind(this);
    this.checkedCut = this.checkedCut.bind(this);
    this.heightChange = this.heightChange.bind(this);
    this.weightChange = this.weightChange.bind(this);
    this.calculate = this.calculate.bind(this);

  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.state.firstIn && nextProps.nodes.length !== 0) {
  //     this.setState({
  //       activeId: nextProps.nodes[nextProps.views[3][0]][0].id,
  //       firstIn: false,
  //     });
  //   }
  // }

  openDate() {
    this.setState({
      openDatePage: !this.state.openDatePage,
    });
  }

  checkOccupyDate(arr, nameArr) {
    this.setState({
      occupyArr: arr,
      occupyName: nameArr,
    });
  }

  vesselDataChange() {
    this.setState({
      activeId: this.vesselData.value,
    });
  }

  checkedDate() {
    if (this.state.occupyArr.length !== 0) {
      // this.props.remnant({ cmd: 'initialize', liver: this.state.activeId, occupy: this.state.occupyArr });
    }
  }

  checkedCut() {
    // this.props.remnant({ cmd: 'selectresection' });
  }

  heightChange(e) {
    this.setState({ height: e.target.value });
  }

  weightChange(e) {
    this.setState({ weight: e.target.value });
  }

  calculate() {
    // this.props.remnant({ cmd: 'calc', height: this.state.height, weight: this.state.weight, liver: this.state.activeId });
  }

  outArea() {
    this.props.updateActive('remnant');
  }

  render() {
    return (
      <div className='functionWrapper2DREM'>
        <div className={!this.state.openDatePage ? 'liverSegment' : 'displayNo'}>
          <div className='rowPart' >
            计算占位体积、残肝体积、标准肝体积等以及百分比
          </div>
          <div className='rowPart' >
            <i className='spanText2'>肝脏面数据：</i>
            <select ref={c => (this.vesselData = c)} onChange={this.vesselDataChange} >
              {
                this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                  this.props.nodes[this.props.views[3][0]].map((node, index) =>
                    <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                  )
              }
            </select>
          </div>
          <div className='rowPart' >
            <i className='spanText2'>占位面数据:</i>
            <div className='btn3' onClick={this.openDate}>
              {
                this.state.occupyName.length === 0 ?
                  <i style={{ marginLeft: 42 }}>选择占位面数据</i>
                : this.state.occupyName.map((item, index) =>
                  <i key={index} style={{ color: 'orange' }} >{item},</i>
                )
              }
            </div>
          </div>
          <div className='rowPart' >
            <button className='btn' onClick={this.checkedDate}>确认数据</button>
          </div>
          <div className='rowPart' >
            <button className='btn' onClick={this.checkedCut}>选中切除部分</button>
          </div>
          <div className='rowPart' >
            确认身高、体重：
          </div>
          <div className='rowPart' >
            <i className='spanText2'> 身高(cm)：</i>
            <input type="text" defaultValue={this.state.height} onChange={this.heightChange} />
          </div>
          <div className='rowPart' >
            <i className='spanText2'> 体重(kg)：</i>
            <input type="text" defaultValue={this.state.weight} onChange={this.weightChange} />
          </div>
          <div className='rowPart' >
            <button className='btn' onClick={this.calculate}>计算</button>
          </div>
          <div className='rowPart' >
            <button className='btn' onClick={this.outArea}>退出</button>
          </div>
        </div>
        <div className={this.state.openDatePage ? 'liverSegment' : 'displayNo'}>
          <OccupyDate openDate={this.openDate} nodes={this.props.nodes} views={this.props.views} view3dNodes={this.props.view3dNodes} checkOccupyDate={this.checkOccupyDate} />
        </div>
      </div>
    );
  }
}

Remnant.propTypes = {
  bool: ReactPropTypes.bool,
  livers: ReactPropTypes.array,
  remnant: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  showLivers: ReactPropTypes.func,
  nodes: ReactPropTypes.object,
  view3dNodes: ReactPropTypes.array,
  views: ReactPropTypes.array,
};
export default Remnant;
