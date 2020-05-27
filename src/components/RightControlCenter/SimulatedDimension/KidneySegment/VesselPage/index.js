import React, { Component } from 'react';
import '../../../../../style/RightControl.css';
import ReactPropTypes from 'prop-types';

class VesselPage extends Component {
  constructor() {
    super();
    this.state = {
      confirm: false,
    };
    this.afterArea = this.afterArea.bind(this);
    this.upArea = this.upArea.bind(this);
    this.downArea = this.downArea.bind(this);
    this.downFontArea = this.downFontArea.bind(this);
    this.upFontArea = this.upFontArea.bind(this);
  }

  upArea() {
    // this.props.kidneySegment({
    //   cmd: 'cutter',
    //   type: 'superior',
    // });
  }

  upFontArea() {
    // this.props.kidneySegment({
    //   cmd: 'cutter',
    //   type: 'superioranterior',
    // });
  }

  downArea() {
    // this.props.kidneySegment({
    //   cmd: 'cutter',
    //   type: 'inferior',
    // });
  }

  downFontArea() {
    // this.props.kidneySegment({
    //   cmd: 'cutter',
    //   type: 'inferioranterior',
    // });
  }

  afterArea() {
    // this.props.kidneySegment({
    //   cmd: 'cutter',
    //   type: 'posterior',
    // });
  }

  rollBack() {
    // this.props.kidneySegment({
    //   cmd: 'rollback',
    // });
  }

  render() {
    return (
      <div className='VesselPage' >
        <div className='rowPart' >
          请在3D视图中画出裁切的位置，然后点击下列预设的血管段并进行标记。
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.upArea} >上段</button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.upFontArea} >上前段</button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.downArea} >下段</button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.downFontArea} >下前段</button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.afterArea} >后段</button>
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.rollBack} >撤销</button>
          <button className='btn' onClick={this.props.complete} >完成</button>
        </div>
      </div>
    );
  }
}
VesselPage.propTypes = {
  updateActive: ReactPropTypes.func,
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
  kidneySegment: ReactPropTypes.func,
  complete: ReactPropTypes.func,
};
export default VesselPage;
