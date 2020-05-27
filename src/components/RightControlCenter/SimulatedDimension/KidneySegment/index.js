import React, { Component } from 'react';
import '../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';
import VesselPage  from './VesselPage';
import MainPage    from './MainPage';

class KidneySegment extends Component {
  constructor() {
    super();
    this.state = {
      vesselPage: false,
    };
    this.updateActive = this.updateActive.bind(this);
    this.vesselPage = this.vesselPage.bind(this);
    this.complete = this.complete.bind(this);
  }

  updateActive() {
    this.props.updateActive('kidneySegment');
  }

  vesselPage() {
    this.setState({ vesselPage: true });
  }

  complete() {
    // this.props.kidneySegment({
    //   cmd: 'vesselfinish',
    // });
    this.setState({ vesselPage: false });
  }

  render() {
    return (
      <div className='functionWrapper'>
        {
          !this.state.vesselPage &&
            <MainPage
              nodes={this.props.nodes}
              views={this.props.views}
              updateActive={this.props.updateActive}
              kidneySegment={this.props.kidneySegment}
              vesselPage={this.vesselPage}
              changeKidneySegmentSelectOne={this.props.changeKidneySegmentSelectOne}
              changeKidneySegmentSelectTwo={this.props.changeKidneySegmentSelectTwo}
              sOneValue={this.props.sOneValue}
              sTwoValue={this.props.sTwoValue}
            />
        }
        {
          this.state.vesselPage &&
            <VesselPage
              nodes={this.props.nodes}
              views={this.props.views}
              updateActive={this.props.updateActive}
              kidneySegment={this.props.kidneySegment}
              complete={this.complete}
            />
        }
      </div>
    );
  }
}
KidneySegment.propTypes = {
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  updateActive: ReactPropTypes.func,
  kidneySegment: ReactPropTypes.func,
  changeKidneySegmentSelectOne: ReactPropTypes.func,
  changeKidneySegmentSelectTwo: ReactPropTypes.func,
  sOneValue: ReactPropTypes.string,
  sTwoValue: ReactPropTypes.string,
};
export default KidneySegment;
