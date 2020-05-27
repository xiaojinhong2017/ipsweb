import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/RightControl.css';
import RangeBar from './rangebar';

class SurfaceExt extends Component {

  constructor() {
    super();
    this.state = {
      firstIn: true,
      activeId: '',
      value: '1',
    };
    this.outArea = this.outArea.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.firstIn && nextProps.nodes.length !== 0) {
      this.setState({
        activeId: nextProps.nodes[nextProps.views[3][0]][0].id,
        firstIn: false,
      }, () => {
        // this.props.organExpanstion({ cmd: 'initialize', id: this.state.activeId });
      });
    }
  }

  vesselDataChange(e) {
    this.setState({
      activeId: this.vesselData.value,
    }, () => {
      // this.props.organExpanstion({ cmd: 'initialize', id: this.state.activeId });
    });
  }

  changeValue(val) {
    this.setState({ value: val });
  }

  organExpanstionCalc() {
    // this.props.organExpanstion({ cmd: 'calc', id: this.state.activeId, radius: this.state.value });
  }

  outArea() {
    // this.props.organExpanstion({ cmd: 'widget', value: 'close' });
    this.props.updateActive('organExpanstion');
  }

  render() {
    return (
      <div className='functionWrapper2DEXT'>
        <div className='liverSegment'>
          <div className='rowPart' >
            选择病灶节点
          </div>
          <div className='rowPart' >
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
            设置扩展半径(1-20mm)
          </div>
          <RangeBar id="rangeBar" changeValue={this.changeValue} />
          <div className='rowPart' >
            当前半径：<i style={{ color: 'orange' }} >{this.state.value}</i>
          </div>
          <div className='rowPart' >
            <button className='btn' onClick={this.organExpanstionCalc}>计算</button>
            <button className='btn' onClick={this.outArea}>退出</button>
          </div>
        </div>
      </div>
    );
  }
}

SurfaceExt.propTypes = {
  bool: ReactPropTypes.bool,
  organExpanstion: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
};
export default SurfaceExt;
