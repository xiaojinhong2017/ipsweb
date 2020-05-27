import React, { Component } from 'react';
import '../../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';

class FirstStep extends Component {

  constructor() {
    super();
    this.state = {
      nextStep: false,
    };
    this.wizard = this.wizard.bind(this);
    this.updateActive = this.updateActive.bind(this);
  }


  wizard() {
    this.props.wizard('nextStep');
    // {'cmd':'initialize', 'liver':'index0', 'mask':'index1', 'surface':'index2'}
    // this.props.basinAnalysis({
    //   cmd: 'initialize',
    //   liver: this.liverSurface.value || '0',
    //   // mask: this.vesselSurface.value || '0',
    //   // surface: this.vesselSegment.value || '0',
    //   mask: this.vesselSegment.value || '0',
    //   surface: this.vesselSurface.value || '0',
    // });
  }

  updateActive() {
    // this.props.basinAnalysis({ cmd: 'giveup' });
    this.props.updateActive('basinAnalysis');
  }

  render() {
    return (
      <div className='basinAnalysis' >
        <div className='rowPart' style={{ width: 339 }}>
          本模块根据脉管分支情况进行肝分段。
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
          <span>脉管（面）：</span>
          <select ref={c => (this.vesselSurface = c)} >
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                this.props.nodes[this.props.views[3][0]].map((node, index) =>
                  <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart' >
          <span>脉管（分割）：</span>
          <select ref={c => (this.vesselSegment = c)} >
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[0][0]] &&
                this.props.nodes[this.props.views[0][0]].map((node, index) =>
                  <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.wizard} >流域分析</button>
          <button className='btn' onClick={this.updateActive} >放弃</button>
        </div>
      </div>
    );
  }
}

FirstStep.propTypes = {
  wizard: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  basinAnalysis: ReactPropTypes.func,
};
export default FirstStep;
