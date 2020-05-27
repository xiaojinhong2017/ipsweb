import React, { Component } from 'react';
import '../../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';

class SecondStep extends Component {
  constructor() {
    super();
    this.state = {
      seedChoose: false,
      click: false,
    };
    this.toggleSeedChoose = this.toggleSeedChoose.bind(this);
    this.wizardBack = this.wizardBack.bind(this);
    this.wizardForward = this.wizardForward.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.calculate = this.calculate.bind(this);
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
    this.props.updateActive('lungSegment');
    // this.props.lungSegment({
    //   cmd: 'Cancel',
    // });
  }

  calculate() {
    // this.props.lungSegment({
    //   cmd: 'calccenterline',
    //   updown: '1',
    // });
    this.setState({
      click: true,
    });
  }

  render() {
    return (
      <div className='lungSegment' >
        <div className='rowPart' >
          第一步：请在三维视图支气管主干上选取四个以上种子点，然后选择气管走势向下，计算支气管中心线。
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.calculate} >计算中心线</button>
        </div>
        {/* <div className='rowPart' >
          <button className='btn' onClick={this.wizardBack} >上一步</button>
          <button className={this.state.click ? style.btn : style.disable} onClick={this.state.click && this.wizardForward} >下一步</button>
          <button className='btn' onClick={this.updateActive} >放弃</button>
        </div> */}
      </div>
    );
  }
}
SecondStep.propTypes = {
  wizard: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  lungSegment: ReactPropTypes.func,
};
export default SecondStep;
