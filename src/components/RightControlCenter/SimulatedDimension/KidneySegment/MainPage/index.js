import React, { Component } from 'react';
import '../../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';

class KidneySegment extends Component {
  constructor() {
    super();
    this.state = {
      vesselPage: false,
    };
    this.vesselPage = this.vesselPage.bind(this);
    this.kidneySegment = this.kidneySegment.bind(this);
    this.complete = this.complete.bind(this);
    this.updateActive = this.updateActive.bind(this);
  }

  vesselPage() {
    // this.props.kidneySegment({
    //   cmd: 'initialize',
    //   kidney: this.kidney.value,
    //   vessel: this.vessel.value,
    // });
    this.props.vesselPage();
  }

  kidneySegment() {
    // this.props.kidneySegment({
    //   cmd: 'segment',
    // });
  }

  complete() {
    // this.props.kidneySegment({
    //   cmd: 'complete',
    // });
    this.props.updateActive('kidneySegment');
  }

  updateActive() {
    // this.props.kidneySegment({
    //   cmd: 'abandon',
    // });
    this.props.updateActive('kidneySegment');
  }

  render() {
    return (
      <div>
        <div className='rowPart' >
          根据动脉血管的血供对肾脏进行分段。
        </div>
        <div className='rowPart' >
          要求：肾脏，动脉血管已经重建，并且动脉血管重建到三级及以上分支。
        </div>
        <div className='rowPart' >
          <span>肾脏：</span>
          <select ref={c => (this.kidney = c)} value={this.props.sOneValue} onChange={e => this.props.changeKidneySegmentSelectOne(e.target.value)}>
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                this.props.nodes[this.props.views[3][0]].map((node, index) =>
                  <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart'>
          <span>动脉：</span>
          <select ref={c => (this.vessel = c)} onChange={e => this.props.changeKidneySegmentSelectTwo(e.target.value)} value={this.props.sTwoValue}>
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                this.props.nodes[this.props.views[3][0]].map((node, index) =>
                  <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart'>
          第一步：采用血管段裁切工具获得每个肾段的血供。
        </div>
        <div className='rowPart'>
          <button className='btn' onClick={this.vesselPage}>血管段裁切</button>
        </div>
        <div className='rowPart'>
          第二步：根据每个肾段的血供对肾脏进行分段。
        </div>
        <div className='rowPart'>
          <button className='btn' onClick={this.kidneySegment} >肾分段</button>
        </div>
        <div className='rowPart'>
          <button className='btn' onClick={this.complete} >完成</button>
          <button className='btn' onClick={this.updateActive} >放弃</button>
        </div>
      </div>
    );
  }
}
KidneySegment.propTypes = {
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  updateActive: ReactPropTypes.func,
  kidneySegment: ReactPropTypes.func,
  vesselPage: ReactPropTypes.func,
  changeKidneySegmentSelectOne: ReactPropTypes.func,
  changeKidneySegmentSelectTwo: ReactPropTypes.func,
  sOneValue: ReactPropTypes.string,
  sTwoValue: ReactPropTypes.string,
};
export default KidneySegment;
