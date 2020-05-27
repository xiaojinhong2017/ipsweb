import React, {Component} from 'react';
import ReactPropTypes from 'prop-types';
import  './../../../../style/RenderControl.css';

const ToggleSlices = [
  { id: 0, preset: 'Sagittal', name: '显示/隐藏矢状面' },
  { id: 1, preset: 'Coronal', name: '显示/隐藏冠状面' },
  { id: 2, preset: 'Transversal', name: '显示/隐藏横断面' },
  { id: 3, preset: 'All', name: '显示/隐藏全部切面' },
];

class ToggleSlice extends Component {
  constructor() {
    super();
    this.toggleSlice = this.toggleSlice.bind(this);
  }

  toggleSlice(e) {
    const id = e.target.getAttribute('data-id') || e.target.parentNode.getAttribute('data-id');
    window.vtk.apis.toggleSlice3DVisible(id);
  }

  render() {
    if (!this.props.TSVisible) {
      return null;
    }
    return (
      <div className='toggleSlice' onMouseEnter={this.props.clearTimer.bind(this)} onMouseLeave={this.props.hideTgSlice.bind(this)} >
        <ul>
          {
            ToggleSlices.map(slice => (
              <li key={slice.id} data-id={slice.id} data-preset={slice.preset} onClick={this.toggleSlice}>
                <span>{slice.name}</span>
              </li>
              )
            )
          }
        </ul>
      </div>
    );
  }
}

ToggleSlice.propTypes = {
  TSVisible: ReactPropTypes.bool,
  hideTgSlice: ReactPropTypes.func,
  toggleSlice: ReactPropTypes.func,
  clearTimer: ReactPropTypes.func,
};

export default ToggleSlice;
