import React, { Component } from 'react';
import '../../../style/ViewportControl.css';
import ReactPropTypes from 'prop-types';


const Lists = [
  { id: '0', type: 'normal', src:require('../../../svg/Icons/normal.svg') },
  { id: '1', type: 'viewportOneTop', src:require('../../../svg/Icons/viewportOneTop.svg') },
  { id: '2', type: 'viewportLeftOne', src:require('../../../svg/Icons/viewportLeftOne.svg') },
  { id: '3', type: 'viewportTwoPoints', src:require('../../../svg/Icons/viewportTwoPoints.svg') },
];

export default class ViewportControl extends Component{
  constructor(){
        super();
        this.state = {
          display: false,
        };
    }

  componentWillMount() {
    this.timer = null;
  }

  setViewport=(e)=> {
    this.props.setViewport(e.target.getAttribute('data-type') || 'normal');
    clearTimeout(this.timer);
    this.timer = null;
  }

  handleClick=(e)=> {
    this.setState({
      display: true,
    });
    clearTimeout(this.timer);
    this.timer = null;
    this.timer = setTimeout(() => {
      this.setState({ display: false });
      clearTimeout(this.timer);
      this.timer = null;
    }, 3000);
  }

  handleTouch=(e)=> {
    this.props.setViewport(e.target.getAttribute('data-type') || 'normal');
    this.setState({
      display: false,
    });
    clearTimeout(this.timer);
    this.timer = null;
  }

  mouseLeave=()=> {
    this.setState({
      display: false,
    });
    clearTimeout(this.timer);
    this.timer = null;
  }

  render() {
    return (
      <div data-idx="4" className={this.props.className} onClick={this.handleClick} onMouseLeave={this.mouseLeave} title={'窗口布局'}>
        <ul className={this.state.display ? 'viewportContainer' : 'viewportContainerHide'} style={{width: '160px', right: '53px'}}>
          {
            Lists.map(list => <li style={{display:'inline-block', padding:'0 6px'}} key={list.id} data-type={list.type} onClick={this.setViewport} onTouchEnd={this.handleTouch} > <img data-type={list.type} src={list.src} /></li>)
          }
        </ul>
      </div>
    );
  }
}
ViewportControl.propTypes = {
  className: ReactPropTypes.string,
  setViewport: ReactPropTypes.func,
 };
