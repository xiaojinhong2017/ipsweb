import React, { Component } from 'react';
import '../../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';

class FourthStep extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.apply = this.apply.bind(this);
    this.wizardBack = this.wizardBack.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.giveUp = this.giveUp.bind(this);
  }

  apply() {
    // this.props.basinAnalysis({ cmd: 'segment' });
  }

  wizardBack() {
    this.props.wizard('thirdStep');
  }

  updateActive() {
    this.props.updateActive('basinAnalysis');
  }

  giveUp() {
    // this.props.basinAnalysis({ cmd: 'giveup' });
    this.props.updateActive('basinAnalysis');
  }

  render() {
    return (
      <div className='basinAnalysis' >
        <div className='rowPart' >
          第三步：在中心线所属肝段得到正确标记后，点击“肝分段”按钮，完成肝分段过程。
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.apply} >肝分段</button>
        </div>
        <div className='rowPart' >
          {/* <button className='btn' onClick={this.wizardBack} >上一步</button> */}
          {/* <button className='btn' onClick={this.updateActive} >完成</button> */}
          <button className='btn' onClick={this.giveUp} >放弃</button>
        </div>
      </div>
    );
  }
}
FourthStep.propTypes = {
  wizard: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  basinAnalysis: ReactPropTypes.func,
};
export default FourthStep;
