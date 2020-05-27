import React, { Component } from 'react';
import '../../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';

class FirstStep extends Component {

  constructor() {
    super();
    this.state = {
      confirm: false,
    };
    this.wizard = this.wizard.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.confirmData = this.confirmData.bind(this);
  }

  wizard() {
    this.props.wizard('nextStep');
  }

  updateActive() {
    this.props.updateActive('lungSegment');
    // this.props.lungSegment({
    //   cmd: 'Cancel',
    // });
  }

  confirmData() {
    // this.props.lungSegment({
    //   cmd: 'initialize',
    //   lung: this.lungSurface.value,
    //   surface: this.vesselSurface.value,
    //   mask: this.vesselSegment.value,
    // });
    this.setState({ confirm: true }, () => {
      this.wizard();
    });
  }

  render() {
    return (
      <div className='lungSegment' >
        <div className='rowPart' style={{ width: 339 }}>
          本模块根据气管分支情况进行肺分段。
        </div>
        <div className='rowPart' >
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
        <div className='rowPart' >
          <span>气管（面）：</span>
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
          <span>气管（分割）：</span>
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
          <button className='btn' onClick={this.confirmData} >流域分析</button>
          <button className='btn' onClick={this.updateActive} >放弃</button>
        </div>
        {/* <div className='rowPart' >
          <button className={this.state.confirm ? style.btn : style.disable} onClick={this.state.confirm && this.wizard} >下一步</button>
          <button className='btn' onClick={this.updateActive} >放弃</button>
        </div> */}
      </div>
    );
  }
}
FirstStep.propTypes = {
  wizard: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  lungSegment: ReactPropTypes.func,
};
export default FirstStep;
