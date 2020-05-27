/* global window */
import React, {Component} from 'react';
import ReactPropTypes from 'prop-types';
import Items    from './Items';

class Property extends Component {
  constructor() {
      super();
      this.state = {
        isDragging: false,
        relativeX: null,
        relativeY: null,
        moveInX: (window.innerWidth / 2) - 175,
        moveInY: window.innerHeight * 0.2,
        contentScroll: 0,
        contentRelative: 0,
      }
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.hidePanel = this.hidePanel.bind(this);
      this.touchContent = this.touchContent.bind(this);
      this.moveContent = this.moveContent.bind(this);
      this.endContent = this.endContent.bind(this);
  }

  handleMouseDown(e) {
    if (e.target.parentNode === this.wrapper && e.target.children.length !== 0) {
      const ALeft = parseInt(this.wrapper.style.left, 10);
      const ATop = parseInt(this.wrapper.style.top, 10);
      this.setState({
        relativeX: (e.pageX || Number(e.touches[0].pageX)) - ALeft,
        relativeY: (e.pageY || Number(e.touches[0].pageY)) - ATop,
        isDragging: true,
      });
    }
  }

  handleMouseMove(e) {
    e.preventDefault();
    if (this.state.isDragging === true) {
      const moveX = (e.pageX || Number(e.touches[0].pageX)) - this.state.relativeX;
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

  hidePanel(e) {
    e.stopPropagation();
    this.props.hideProperty();
  }

  touchContent(e) {
    e.stopPropagation();
    this.setState({ contentRelative: e.touches[0].pageY });
  }

  moveContent(e) {
    e.stopPropagation();
    this.scrollContent.scrollTop = this.state.contentScroll + (this.state.contentRelative - e.touches[0].pageY);
  }

  endContent(e) {
    this.setState({ contentScroll: this.scrollContent.scrollTop });
  }

  render() {
    return (
      <div
        className='propertyContent'
        ref={c => (this.wrapper = c)}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        style={{ left: `${this.state.moveInX}px`, top: `${this.state.moveInY}px` }}
      >
        <div className='mask' />
        <div className='propertyContentTitle' >
          属性
          <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
        </div>
        <div
          ref={c => (this.scrollContent = c)}
          className='propertyContentPart'
          onTouchStart={this.touchContent}
          onTouchMove={this.moveContent}
          onTouchEnd={this.endContent}
        >
          <div className='linePart'>
            <span style={{ textAlign: 'center', padding: 0 }} >信息</span>
            <span style={{ textAlign: 'center', padding: 0 }} >值</span>
          </div>
          {
            this.props.properties &&
              Object.keys(this.props.properties).map((key, index) =>
                <Items
                  key={`prop-${index}`}
                  label={key}
                  properties={this.props.properties[key]}
                />
              )
          }
        </div>
      </div>
    );
  }
}
Property.propTypes = {
  hideProperty: ReactPropTypes.func,
  properties: ReactPropTypes.object,
 };

export default  Property;
