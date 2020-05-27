import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/RightControl.css';

class FirstStep extends Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
    this.updateActive = this.updateActive.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.vesselDataChange = this.vesselDataChange.bind(this);
    this.vesselCut = this.vesselCut.bind(this);
    this.vesselGiveUp = this.vesselGiveUp.bind(this);
    this.segment = this.segment.bind(this);
    this.giveUp = this.giveUp.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.vesselData.length !== 0) {
      this.setState({
        [this.state.activeId]: nextProps.vesselData,
      });
    }
  }

  updateActive() {
    // this.props.liverSegment({ cmd: 'finish' });
    this.props.updateActive('liverSegment');
  }

  handleChange(e) {
    const value = e.target.checked ? '1' : '0';
    this.setState({
      checked: e.target.checked,
      activeId: this.vesselData.value,
    });
    // this.props.liverSegment({ cmd: 'active', value, id: this.vesselData.value });
  }

  vesselDataChange(e) {
    this.setState({
      checked: false,
      activeId: this.vesselData.value,
    });
  }

  vesselCut() {
    this.setState({ checked: false });
    // this.props.liverSegment({ cmd: 'cut', value: '1', id: this.vesselData.value });
  }

  vesselGiveUp() {
    this.setState({ checked: false });
    // this.props.liverSegment({ cmd: 'cut', value: '0', id: this.vesselData.value });
  }

  segment() {
    // this.props.liverSegment({
    //   cmd: 'segment',
    //   vesselIndex: this.vesselData.value,
    //   vesselSegmentIndex: this.vesselSliceData.value || '0',
    //   liverIndex: this.liverSurface.value,
    //   liverMaskIndex: this.liverSegment.value || '0',
    // });
  }

  giveUp() {
    // this.props.liverSegment({ cmd: 'giveup' });
    this.props.updateActive('liverSegment');
  }

  render() {
    return (
      <div className='liverSegment'>
        <div className='rowPart' >
          本软件根据门静脉、肝静脉的血供对肝脏进行分段。
        </div>
        <div className='rowPart' >
          基本要求：肝脏，门静脉，肝静脉已经重建，并且血管重建到三级及以上分支。
        </div>
        <div className='rowPart' >
          第一步：血管裁切。
        </div>
        <div className='rowPart' >
          <span>血管数据：</span>
          <select ref={c => (this.vesselData = c)} onChange={this.vesselDataChange} >
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                this.props.nodes[this.props.views[3][0]].map((node, index) =>
                  <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart'>
          血管段裁切工具：
          <div className='checkbox'>
            <input type="checkbox" onChange={this.handleChange} checked={this.state.checked} />
            <label />
          </div>
        </div>
        <div className='rowPart' >
          <button className={this.state.checked ? 'btn' : 'disable'} onClick={this.state.checked && this.vesselCut} >裁切</button>
          <button className={this.state.checked ? 'btn' : 'disable'} onClick={this.state.checked && this.vesselGiveUp} >撤销</button>
        </div>
        <div className='rowPart' >
          第二步：选择数据。
        </div>
        <div className='rowPart' >
          <span>血管段数据：</span>
          <select ref={c => (this.vesselSliceData = c)} >
            {
              this.state[this.state.activeId] && this.state[this.state.activeId].map((node, index) =>
                <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
              )
            }
          </select>
        </div>
        <div className='rowPart' >
          <span>肝脏（面）：</span>
          <select ref={c => (this.liverSurface = c)} >
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                this.props.nodes[this.props.views[3][0]].map((node, index) =>
                  <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart' >
          <span>肝脏（分割）：</span>
          <select ref={c => (this.liverSegment = c)} >
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[0][0]] &&
                this.props.nodes[this.props.views[0][0]].map((node, index) =>
                  <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart' >
          第三步：选择裁切好的肝段，进行肝分段。
        </div>
        <div className='rowPart' >
          <button className={this.state[this.state.activeId] ? 'btn' : 'disable'} onClick={this.state[this.state.activeId] && this.segment} >肝分段</button>
        </div>
        <div className='rowPart'>
          <button className={this.state[this.state.activeId] ? 'btn' : 'disable'} onClick={this.state[this.state.activeId] && this.updateActive} >完成</button>
          <button className='btn' onClick={this.giveUp} >放弃</button>
        </div>
      </div>
    );
  }
}
FirstStep.propTypes = {
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  vesselData: ReactPropTypes.array,
  updateActive: ReactPropTypes.func,
  liverSegment: ReactPropTypes.func,
};
export default FirstStep;
