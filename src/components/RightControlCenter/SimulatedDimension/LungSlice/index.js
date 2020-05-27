import React, { Component } from 'react';
import '../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';

class LungSlice extends Component {
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
    // this.props.lungSlice({
    //   cmd: 'select',
    //   mask: this.lungSlice.value || '0',
    //   surface: this.lungSurface.value || '0',
    // });
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
    this.props.updateActive('lungSlice');
  }

  updateActive() {
    // this.props.lungSlice({
    //   cmd: 'widget',
    //   value: 'close',
    // });
    this.props.updateActive('lungSlice');
  }

  render() {
    return (
      <div className='functionWrapper'>
        <div className='rowPart'>
          根据二维视图对肺分割划线对三维肺面进行分割。
        </div>
        <div className='rowPart'>
          <span>肺（分割）：</span>
          <select ref={c => (this.lungSlice = c)} >
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[0][0]] &&
                this.props.nodes[this.props.views[0][0]].map((node, index) =>
                  <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart'>
          <span>肺（面）：</span>
          <select ref={c => (this.lungSurface = c)} >
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                this.props.nodes[this.props.views[3][0]].map((node, index) =>
                  <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart'>
          <button className={'btn'} onClick={this.confirmData} >确认数据</button>
        </div>

        <div className='rowPart'>
          第一步：在二维视图中画曲线，用于生成裁切曲面。
        </div>
        <div className='rowPart'>
          <button className={this.state.confirm ? 'btn' : 'disable'} onClick={this.state.confirm && this.drawCutLine} >画预切线</button>
        </div>
        <div className='rowPart'>
          第二步：根据预切线生成裁切曲面，可对曲面进行必要的微调。
        </div>
        <div className='rowPart'>
          <button className={this.state.confirmLine ? 'btn' : 'disable'} onClick={this.state.confirm && this.state.confirmLine && this.createSurface} >生成曲面</button>
        </div>
        <div className='rowPart'>
          第三步：完成曲面构建之后，用曲面对肺进行裁切，完成肺分叶。
        </div>
        <div className='rowPart'>
          <button className={this.state.confirmSurface ? 'btn' : 'disable'} onClick={this.state.confirm && this.state.confirmLine && this.state.confirmSurface && this.surfaceCut} >曲面裁切</button>
        </div>
        <div className='rowPart'>
          <button className={this.state.confirmSurfaceCut ? 'btn' : 'disable'} onClick={this.state.confirmSurfaceCut && this.updateActive} >完成</button>
          <button className={'btn'} onClick={this.giveUp} >放弃</button>
        </div>
      </div>
    );
  }
}
LungSlice.propTypes = {
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  updateActive: ReactPropTypes.func,
  lungSlice: ReactPropTypes.func,
};
export default LungSlice;
