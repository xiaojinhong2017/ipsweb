import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../style/RightControl.css';

class SurfaceToImg extends Component {
    constructor() {
      super();
      this.state = {
        book: true,
        firstIn: true,
        activeId: '',
      };

      this.outArea = this.outArea.bind(this);
      this.vesselDataChange = this.vesselDataChange.bind(this);

    }

  componentWillReceiveProps(nextProps) {
    if (this.state.firstIn && nextProps.nodes.length !== 0) {
      this.setState({
        activeId: nextProps.nodes[nextProps.views[3][0]][0].id,
        firstIn: false,
      }, () => {
        this.props.surfaceToImage({ cmd: 'initialize', id: this.state.activeId });
      });
    }
  }

  vesselDataChange(e) {
    this.setState({
      activeId: this.vesselData.value,
    }, () => {
      // this.props.surfaceToImage({ cmd: 'initialize', id: this.state.activeId });
    });
  }

  bookPicture() {
    this.setState({
      book: false,
    });
    // this.props.surfaceToImage({ cmd: 'preview', id: this.state.activeId });
  }

  resetPicture() {
    // this.props.surfaceToImage({ cmd: 'cancel' });
    this.setState({
      book: true,
    });
  }

  saveResult() {
    // this.props.surfaceToImage({ cmd: 'save' });
  }

  outArea() {
    // this.props.surfaceToImage({ cmd: 'widget', value: 'close' });
    this.props.updateActive('surfaceToImage');
  }

  render() {
    return (
      <div className='functionWrapper2D'>
        <div className='liverSegment'>
          <div className='rowPart' >
            第一步：选择要进行映射的面数据
          </div>
          <div className='rowPart' >
            <i className='spanText'>面数据：</i>
            <select ref={c => (this.vesselData = c)} onChange={this.vesselDataChange} >
              {
                this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                  this.props.nodes[this.props.views[3][0]].map((node, index) =>
                    <option key={`${node.id}`} value={`${node.id}`} >{node.name}</option>
                  )
              }
            </select>
          </div>
          <div className='rowPart' >
            在保存之前根据需要可决定是否先进行分割数据预览
          </div>
          <div className='rowPart' >
            <button className={this.state.book ? 'btn' : 'disable'} onClick={this.state.book && this.bookPicture}>预览</button>
          </div>
          <div className='rowPart' >
            <button className={!this.state.book ? 'btn' : 'disable'} onClick={!this.state.book && this.saveResult}>保存</button>
            <button className={!this.state.book ? 'btn' : 'disable'} onClick={!this.state.book && this.resetPicture}>重置</button>
          </div>
          <div className='rowPart' >
            <button className='btn' onClick={this.outArea}>退出</button>
          </div>
        </div>
      </div>
    );
  }
}
SurfaceToImg.propTypes = {
  bool: ReactPropTypes.bool,
  surfaceToImage: ReactPropTypes.func,
  updateActive: ReactPropTypes.func,
  nodes: ReactPropTypes.object,
  views: ReactPropTypes.array,
};
export default SurfaceToImg;
