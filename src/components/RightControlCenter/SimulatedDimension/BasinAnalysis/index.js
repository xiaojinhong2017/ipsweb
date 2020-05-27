import React, { Component } from 'react';
import '../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';
import FirstStep   from './FirstStep';
import SecondStep  from './SecondStep';
import ThirdStep   from './ThirdStep';
import FourthStep  from './FourthStep';

class BasinAnalysis extends Component {
  constructor() {
    super();
    this.state = {
      nextStep: false,
      thirdStep: false,
      fourthStep: false,
    };
    this.wizard = this.wizard.bind(this);
  }

  wizard(label) {
    this.setState({
      nextStep: false,
      thirdStep: false,
      fourthStep: false,
    });
    this.setState({ [label]: !this.state[label] });
  }

  render() {
    return (
      <div className='functionWrapper' >
        {
          !this.state.nextStep && !this.state.thirdStep && !this.state.fourthStep &&
            <FirstStep
              wizard={this.wizard}
              updateActive={this.props.updateActive}
              nodes={this.props.nodes}
              views={this.props.views}
              basinAnalysis={this.props.basinAnalysis}
            />
        }
        {
          this.state.nextStep &&
            <SecondStep
              wizard={this.wizard}
              updateActive={this.props.updateActive}
              basinAnalysis={this.props.basinAnalysis}
            />
        }
        {
          this.state.nextStep &&
            <ThirdStep
              wizard={this.wizard}
              updateActive={this.props.updateActive}
              basinAnalysis={this.props.basinAnalysis}
            />
        }
        {
          this.state.nextStep &&
            <FourthStep
              wizard={this.wizard}
              updateActive={this.props.updateActive}
              basinAnalysis={this.props.basinAnalysis}
            />
        }
      </div>
    );
  }
}
BasinAnalysis.propTypes = {
  updateActive: ReactPropTypes.func,
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  basinAnalysis: ReactPropTypes.func,
};
export default BasinAnalysis;
