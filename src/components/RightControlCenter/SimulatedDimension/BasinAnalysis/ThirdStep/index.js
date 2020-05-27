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
    this.toggleSeedChoose = this.toggleSeedChoose.bind(this);
    this.wizardBack = this.wizardBack.bind(this);
    this.wizardForward = this.wizardForward.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.changeSegmentation = this.changeSegmentation.bind(this);
    this.toggleClear = this.toggleClear.bind(this);
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

  changeSegmentation(e) {
    this.setState({ type: e.target.getAttribute('data-type') });
  }

  toggleSeedChoose() {
    this.setState({ seedChoose: !this.state.seedChoose });
  }

  toggleClear() {
    this.setState({ clear: !this.state.clear });
  }

  wizardBack() {
    this.props.wizard('nextStep');
  }

  wizardForward() {
    this.props.wizard('fourthStep');
  }

  updateActive() {
    // this.props.basinAnalysis({ cmd: 'giveup' });
    this.props.updateActive('basinAnalysis');
  }

  liverOne() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '0',
    // });
  }

  liverTwo() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '1',
    // });
  }

  liverThree() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '2',
    // });
  }

  liverFour() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '3',
    // });
  }

  liverFive() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '4',
    // });
  }

  liverSix() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '5',
    // });
  }

  liverSeven() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '6',
    // });
  }

  liverEight() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '7',
    // });
  }

  liverNine() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '8',
    // });
  }

  liverTen() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '9',
    // });
  }

  liverEle() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '10',
    // });
  }

  clear() {
    // this.props.basinAnalysis({
    //   cmd: 'liversegmentmark',
    //   type: '-1',
    // });
  }

  render() {
    return (
      <div className='basinAnalysis' >
        <div className='rowPart' >
          第二步：在错误标记的中心线上选点和所属肝段，计算后该段会标记正确。
        </div>
        <div className='rowPart' >
          对于不属于任何肝段但是已经标记颜色的血管段提供“清除”的选项。
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.liverOne} >
            <i className='colorIcon1' />
            肝段02
          </button>
          <button className='btn' onClick={this.liverTwo} >
            <i className='colorIcon2' />
            肝段03
          </button>
          <button className='btn' onClick={this.liverThree} >
            <i className='colorIcon3' />
            肝段04
          </button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.liverFour} >
            <i className='colorIcon4' />
            肝段05
          </button>
          <button className='btn' onClick={this.liverFive} >
            <i className='colorIcon6' />
            肝段06
          </button>
          <button className='btn' onClick={this.liverSix} >
            <i className='colorIcon5' />
            肝段07
          </button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.liverSeven} >
            <i className='colorIcon7' />
            肝段08
          </button>
          <button className='btn' onClick={this.liverEight} >
            <i className='colorIcon8' />
            肝段09
          </button>
          <button className='btn' onClick={this.liverNine} >
            <i className='colorIcon9' />
            肝段10
          </button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.liverTen} >
            <i className='colorIcon10' />
            肝段11
          </button>
          <button className='btn' onClick={this.liverEle} >
            <i className='colorIcon11' />
            肝段12
          </button>
          <button className='btn' onClick={this.clear} >
            <i className='colorIcon12' />
            清除
          </button>
        </div>
        {/* <div className='rowPart' style={{ margin: '20px 0' }} >
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
  basinAnalysis: ReactPropTypes.func,
};
export default ThirdStep;
