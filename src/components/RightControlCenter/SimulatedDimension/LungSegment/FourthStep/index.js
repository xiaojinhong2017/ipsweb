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
  }

  apply() {
    // TODO
    // this.props.lungSegment({
    //   cmd: 'segment',
    // });
  }

  wizardBack() {
    this.props.wizard('thirdStep');
  }

  updateActive() {
    this.props.updateActive('lungSegment');
    // this.props.lungSegment({
    //   cmd: 'Cancel',
    // });
  }

  render() {
    return (
      <div className='lungSegment' >
        <div className='rowPart' >
          第三步：在中心线所属肺段得到正确标记后，点击“肺分段”按钮，完成肺分段过程。
        </div>
        <div className='rowPart' >
          <button className='btn' style={{ margin: '30px 0' }} onClick={this.apply} >肺分段</button>
        </div>
        <div className='rowPart' >
          {/* <button className='btn' onClick={this.wizardBack} >上一步</button>
          <button className='btn' onClick={this.updateActive} >完成</button> */}
          <button className='btn' onClick={this.updateActive} >放弃</button>
        </div>
      </div>
    );
  }
}
FourthStep.propTypes = {
  wizard: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  lungSegment: ReactPropTypes.func,
};
export default FourthStep;
