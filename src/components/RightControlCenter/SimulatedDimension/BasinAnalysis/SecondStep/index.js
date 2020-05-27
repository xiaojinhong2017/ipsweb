import React, { Component } from 'react';
import '../../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';

class SecondStep extends Component {
  constructor() {
    super();
    this.state = {
      seedChoose: false,
    };
    this.toggleSeedChoose = this.toggleSeedChoose.bind(this);
    this.wizardBack = this.wizardBack.bind(this);
    this.wizardForward = this.wizardForward.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.calculateLine = this.calculateLine.bind(this);
  }

  toggleSeedChoose() {
    this.setState({ seedChoose: !this.state.seedChoose });
  }

  wizardBack() {
    this.props.wizard('nextStep');
  }

  wizardForward() {
    this.props.wizard('thirdStep');
  }

  updateActive() {
    // this.props.basinAnalysis({ cmd: 'giveup' });
    this.props.updateActive('basinAnalysis');
  }

  calculateLine() {
    // this.props.basinAnalysis({
    //   cmd: 'calccenterline',
    //   updown: this.vesselSegment.value,
    // });
  }

  render() {
    return (
      <div className='basinAnalysis' >
        <div className='rowPart' >
          第一步：请在三维视图中门静脉进入肝脏的位置选取脉管走势，计算后即可将为不同肝段供血的中心线用不同颜色表示。
        </div>
        <div className='rowPart' >
          脉管走势：
          <select ref={c => (this.vesselSegment = c)} >
            <option key="0" value="0">向上</option>
            <option key="1" value="1">向下</option>
          </select>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.calculateLine}>计算中心线</button>
        </div>
        {/* <div className='rowPart' >
          <button className='btn' onClick={this.wizardBack} >上一步</button>
          <button className='btn' onClick={this.wizardForward} >下一步</button>
          <button className='btn' onClick={this.updateActive} >放弃</button>
        </div> */}
      </div>
    );
  }
}
SecondStep.propTypes = {
  wizard: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  basinAnalysis: ReactPropTypes.func,
};
export default SecondStep;
