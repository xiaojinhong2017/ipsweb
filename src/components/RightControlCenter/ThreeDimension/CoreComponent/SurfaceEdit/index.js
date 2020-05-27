import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/RightControl.css';
import OccupyDate from './OccupyDate';

class SurfaceEdit extends Component {
  constructor() {
    super();
    this.state = {
      openDatePage: false,
      activeId: '',
      occupyArr: [],
      occupyName: [],
      firstIn: true,
    };
    this.outArea = this.outArea.bind(this);
    this.checkOccupyDate = this.checkOccupyDate.bind(this);
    this.openDate = this.openDate.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.firstIn && nextProps.nodes.length !== 0) {
      this.setState({
        activeId: nextProps.nodes[nextProps.views[3][0]][0].id,
        firstIn: false,
      });
    }
  }

  openDate() {
    this.setState({
      openDatePage: !this.state.openDatePage,
    });
  }

  checkOccupyDate(arr, nameArr) {
    this.setState({
      occupyArr: arr,
      occupyName: nameArr,
    }, () => {
      if (this.state.occupyArr.length !== 0) {
        // this.props.surfaceEdit({ cmd: 'changevessel', vessel: this.state.occupyArr });
      }
    });
  }

  pick() {
    // this.props.surfaceEdit({ cmd: 'pick' });
  }

  checkSelectedVessel() {
    // this.props.surfaceEdit({ cmd: 'showselected' });
  }

  checkUnSelectedVessel() {
    // this.props.surfaceEdit({ cmd: 'shownoselected' });
  }

  drag() {
    // this.props.surfaceEdit({ cmd: 'drag' });
  }

  reset() {
    // this.props.surfaceEdit({ cmd: 'reset' });
  }

  save() {
    // this.props.surfaceEdit({ cmd: 'save' });
  }

  outArea() {
    this.props.updateActive('surfaceEdit');
  }

  render() {
    return (
      <div className='functionWrapper2DEDIT'>
        <div className={!this.state.openDatePage ? 'liverSegment' : 'displayNo'}>
          <div className='rowPart' >
            查看每个选中肝段的内部血供与回流
          </div>
          <div className='rowPart' >
            <i className='spanText4'>血管数据：</i>
            <div className='btn3' onClick={this.openDate}>
              {
                this.state.occupyName.length === 0 ?
                  <i style={{ marginLeft: 52 }}>选择面数据</i>
                : this.state.occupyName.map((item, index) =>
                  <i key={index} style={{ color: 'orange' }} >{item},</i>
                )
              }
            </div>
          </div>
          <div className='rowPart' >
            <button className='btn4' onClick={this.pick}>点选分段</button>
          </div>
          <div className='rowPart' >
            <button className='btn4' onClick={this.checkSelectedVessel}>查看选中分段血管</button>
          </div>
          <div className='rowPart' >
            <button className='btn4' onClick={this.checkUnSelectedVessel}>查看未选中分段血管</button>
          </div>
          <div className='rowPart' >
            <button className='btn4' onClick={this.drag}>拖动</button>
          </div>
          <div className='rowPart' >
            <button className='btn4' onClick={this.reset}>复位</button>
          </div>
          <div className='rowPart' >
            <button className='btn4' onClick={this.save}>保存</button>
          </div>
          <div className='rowPart' >
            <button className='btn4' onClick={this.outArea}>退出</button>
          </div>
        </div>
        <div className={this.state.openDatePage ? 'liverSegment' : 'displayNo'}>
          <OccupyDate openDate={this.openDate} nodes={this.props.nodes} views={this.props.views} view3dNodes={this.props.view3dNodes} checkOccupyDate={this.checkOccupyDate} />
        </div>
      </div>
    );
  }
}

SurfaceEdit.propTypes = {
  bool: ReactPropTypes.bool,
  surfaceEdit: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  view3dNodes: ReactPropTypes.array,
};
export default SurfaceEdit;
