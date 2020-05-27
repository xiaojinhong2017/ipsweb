/* global window */
import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';

import '../../../style/MainView.css';

// ----------------------------------------------------------------------------

class VolumeCalculator extends Component{
  constructor(){
        super();
        this.state = {
          isDragging: false,
          relativeX: null,
          relativeY: null,
          moveInX: 30,
          moveInY: 0
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

  handleMouseDown(e) {
    const ARight = parseInt(this.wrapper.style.right, 10);
    const ATop = parseInt(this.wrapper.style.top, 10);
    this.setState({
      relativeX: window.innerWidth - (e.pageX || Number(e.touches[0].pageX)) - ARight,
      relativeY: (e.pageY || Number(e.touches[0].pageY)) - ATop,
      isDragging: true,
    });
  }

  handleMouseMove(e) {
    e.preventDefault();
    if (this.state.isDragging === true) {
      const moveX = window.innerWidth - (e.pageX || Number(e.touches[0].pageX)) - this.state.relativeX;
      const moveY = (e.pageY || Number(e.touches[0].pageY)) - this.state.relativeY;
      this.setState({ moveInX: moveX, moveInY: moveY });
    }
  }

  handleMouseUp(e) {
    e.preventDefault();
    this.setState({
      isDragging: false,
    });
  }

  handleMouseLeave() {
    this.setState({
      isDragging: false,
    });
  }

  render() {
    return (
      <div
        className='VolumeCalculator'
        ref={c => (this.wrapper = c)}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        style={{ right: `${this.state.moveInX}px`, top: `${this.state.moveInY}px` }}
      >
        <table>
          <thead>
            <tr>
            {/*
              {
                this.props.volumeString[1][this.props.volumeString[1].length - 1] !== '' &&
                  <th />
              }
              */}
              {
                this.props.volumeString[0].map((item, index) =>
                  <th key={`th-${index}`}>{item}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              this.props.volumeString.map((item, index) => {
                if (index === 0) {
                  return false;
                }
                const tds = item.map((prop, idx) =>
                  <td key={`td-${idx}`} >{prop}</td>
                );
                if (tds.filter(it => it.props.children === '').length !== 0) {
                  tds.pop();
                }
                return (
                  <tr key={`tds-${index}`} >
                    {tds}
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
VolumeCalculator.propTypes = {
  volumeString: ReactPropTypes.array,
 };

export default VolumeCalculator;
