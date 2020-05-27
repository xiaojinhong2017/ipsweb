import React, {Component} from 'react';
import ReactPropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../../redux/index/index.reducer.js";
import  '../../../../style/RenderControl.css';
import mutipleView        from '../../../../images/ViewIcon/mutipleView.png';
import singleView         from '../../../../images/ViewIcon/singleView.png';
import windowLevel        from '../../../../images/ViewIcon/windowLevel.png';

const LeftButtons = [
  { id: 1, preset: 'Reslice All', name: '多视图交互', src: mutipleView, mode: 0 },
  { id: 2, preset: 'Reslice Single', name: '单视图交互', src: singleView, mode: 1 },
  { id: 3, preset: 'Window/Level', name: '窗宽窗位交互', src: windowLevel, mode: 2 },
];

class LeftButton extends Component {
  constructor() {
    super();
    this.state = {
        id: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.client === 'MOBILE' && nextProps.volumeVisible) {
      this.timer = setTimeout(() => {
        this.props.hideLeftButton();
        clearTimeout(this.timer);
        this.timer = null;
      }, 4500);
    }
  }

  addClass(e) {
    // this.props.clearTimer();
    this.setState({ id: Number(e.target.getAttribute('key') || e.target.parentNode.getAttribute('key')) });
  }

  removeClass() {
    this.setState({ id: 0 });
  }

  handleClick(e) {
      window.vtk.apis.setStyleMode2D(Number(e.target.getAttribute('data-mode') || e.target.parentNode.getAttribute('data-mode')));
      this.props.hideLeftButton.bind(this);
      this.props.StyleMode(window.vtk.apis.getStyleMode2D())
      window.vtk.apis.registerCallback("SliceChanged", () => {
        const sliceInfo0 = window.vtk.apis.getSliceInfo(0);
        const sliceInfo1 = window.vtk.apis.getSliceInfo(1);
        const sliceInfo3 = window.vtk.apis.getSliceInfo(2);
        this.props.info(sliceInfo0,sliceInfo1,sliceInfo3)
      });
      if(window.vtk.apis.getStyleMode2D(2)===2){
        window.vtk.apis.registerCallback("WindowLevelChanged", () => {
          const windowLevel = window.vtk.apis.getWindowLevelInfo();
          let newObject = Object.assign({},{max:windowLevel.max},{min:windowLevel.min},{window:windowLevel.window}, {level:windowLevel.level})
          this.props.NewWindowLevel(newObject)
        });
      }
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <div className="leftButton" onMouseEnter={this.props.clearTimer.bind(this)} onMouseLeave={this.props.hideLeftButton.bind(this)} >
        <ul>
          {
            LeftButtons.map(func => (
              <li
                key={func.id}
                data-id={func.id}
                data-mode={func.mode}
                data-preset={func.preset}
                className={this.state.id === func.id ? "focus" : ''}
                onTouchStart={this.addClass.bind(this)}
                onTouchEnd={this.removeClass.bind(this)}
                onClick={this.handleClick.bind(this)}
              >
                <img src={func.src} alt={func.preset} />
                <span>{func.name}</span>
              </li>
              )
            )
          }
        </ul>
      </div>
    );
  }
}
LeftButton.propTypes = {
  visible: ReactPropTypes.bool,
  client: ReactPropTypes.string,
  // remoteRendering: ReactPropTypes.bool,
  hideLeftButton: ReactPropTypes.func,
  setMouseLeftMode: ReactPropTypes.func,
  setStyleMode: ReactPropTypes.func,
  clearTimer: ReactPropTypes.func,
};

let mapStateToProps = (store) => ({...store.IndexStore})  
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth) 
export default connect(mapStateToProps,mapDispatchToProps )(LeftButton);
