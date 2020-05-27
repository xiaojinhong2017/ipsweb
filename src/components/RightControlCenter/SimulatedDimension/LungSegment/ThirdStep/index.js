import React, { Component } from 'react';
import '../../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';

class ThirdStep extends Component {
  constructor() {
    super();
    this.state = {
      type: '',
      seedChoose: false,
      clear: false,
    };
    this.wizardBack = this.wizardBack.bind(this);
    this.wizardForward = this.wizardForward.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.liverOne = this.liverOne.bind(this);
    this.liverTwo = this.liverTwo.bind(this);
    this.liverThree = this.liverThree.bind(this);
    this.liverFour = this.liverFour.bind(this);
    this.liverFive = this.liverFive.bind(this);
    this.liverSix = this.liverSix.bind(this);
    this.liverSeven = this.liverSeven.bind(this);
    this.liverEight = this.liverEight.bind(this);
    this.liverNine = this.liverNine.bind(this);
    this.liverTen = this.liverTen.bind(this);
    this.clear = this.clear.bind(this);
  }

  wizardBack() {
    this.props.wizard('nextStep');
  }

  wizardForward() {
    this.props.wizard('fourthStep');
  }

  updateActive() {
    this.props.updateActive('lungSegment');
    // this.props.lungSegment({
    //   cmd: 'Cancel',
    // });
  }

  liverOne() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '0',
    // });
  }

  liverTwo() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '1',
    // });
  }

  liverThree() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '2',
    // });
  }

  liverFour() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '3',
    // });
  }

  liverFive() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '4',
    // });
  }

  liverSix() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '5',
    // });
  }

  liverSeven() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '6',
    // });
  }

  liverEight() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '7',
    // });
  }

  liverNine() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '8',
    // });
  }

  liverTen() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '9',
    // });
  }

  clear() {
    // this.props.lungSegment({
    //   cmd: 'lungsegmentmark',
    //   type: '-1',
    // });
  }

  render() {
    return (
      <div className='lungSegment' >
        <div className='rowPart' >
          第二步：在中心线上取点和选择所属的肺段，计算后，该段会标记某种颜色。
        </div>
        <div className='rowPart' >
          对于标记错误颜色的支气管段，提供“清除”的选项。
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.liverOne} >
            <i className='colorIcon1' />
            肺段01
          </button>
          <button className='btn' onClick={this.liverTwo} >
            <i className='colorIcon2' />
            肺段02
          </button>
          <button className='btn' onClick={this.liverThree} >
            <i className='colorIcon3' />
            肺段03
          </button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.liverFour} >
            <i className='colorIcon4' />
            肺段04
          </button>
          <button className='btn' onClick={this.liverFive} >
            <i className='colorIcon6' />
            肺段05
          </button>
          <button className='btn' onClick={this.liverSix} >
            <i className='colorIcon5' />
            肺段06
          </button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.liverSeven} >
            <i className='colorIcon7' />
            肺段07
          </button>
          <button className='btn' onClick={this.liverEight} >
            <i className='colorIcon8' />
            肺段08
          </button>
          <button className='btn' onClick={this.liverNine} >
            <i className='colorIcon9' />
            肺段09
          </button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.liverTen} >
            <i className='colorIcon10' />
            肺段10
          </button>
          <button className='btn' onClick={this.clear} >
            <i className='colorIcon12' />
            清除
          </button>
        </div>
        {/* <div cla ssName='rowPart' >
          <button className='btn' onClick={this.wizardBack} >上一步</button>
          <button className='btn' onClick={this.wizardForward} >下一步</button>
          <button className='btn' onClick={this.updateActive} >放弃</button>
        </div> */}
      </div>
    );
  }
}

ThirdStep.propTypes = {
  wizard: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  lungSegment: ReactPropTypes.func,
};
export default ThirdStep;
