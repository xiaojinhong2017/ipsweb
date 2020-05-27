import React, { Component } from 'react';
import '../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';
import WizardStep   from './WizardStep';

class LiverSegment extends Component {
  constructor() {
    super();
    this.state = {
      nextStep: false,
    };
    this.wizard = this.wizard.bind(this);
  }


  wizard(bool) {
    this.setState({ nextStep: bool });
  }

  render() {
    const nodes = {};
    const views = [];
    const vesselData = [];
    return (
      <div className='functionWrapper'>
        <WizardStep
          nodes={nodes}
          views={views}
          vesselData={this.props.vesselData}
          wizard={this.wizard}
          updateActive={this.props.updateActive}
          liverSegment={this.props.liverSegment}
        />
      </div>
    );
  }
}
LiverSegment.propTypes = {
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  vesselData: ReactPropTypes.array,
  updateActive: ReactPropTypes.func,
  liverSegment: ReactPropTypes.func,
};
export default LiverSegment;
