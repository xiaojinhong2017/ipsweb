import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../style/RightControl.css';
import '../../../style/ToggleIcons.css';
import Brush       from './CoreComponent/Brush';
import PaintBrush  from './CoreComponent/PaintBrush';


// TODO funcMap
const funcMap = {
  brush: 'brush',
  paintBrush: 'paintBrush',
};

class ImageProcessing extends Component {

  constructor() {
    super();
    this.state = {
      expand: false,
      enabled: false,
      visibleArr: [],
      brush: false,
      paintBrush: false,
    };
    this.setBrushToolModeFalse = this.setBrushToolModeFalse.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.brush = this.brush.bind(this);
    this.paintBrush = this.paintBrush.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible || nextProps.baseFile === '') {
      this.setState({
        brush: false,
        paintBrush: false,
      });
    } else {
      this.setState({ enabled: true });
      if (nextProps.dataNode !== this.props.dataNode) {
        this.handleClose();
      }
    }
    if (nextProps.measureResult !== this.props.measureResult && !nextProps.measureResult) {
      Object.keys(funcMap).forEach((visible) => {
        if (this.state[visible]) {
          this.setState({ [visible]: false });
          this[funcMap[visible]](false);
        }
      });
    }
  }

  componentDidUpdate() {
    if (this.props.visible && Object.keys(funcMap).filter(visible => this.state[visible]).length === 0) {
      // this.props.changeAlert(false);
    } else if (this.props.visible && Object.keys(funcMap).filter(visible => this.state[visible]).length !== 0) {
      // this.props.changeAlert(true);
    } else {
      return;
    }
  }

  setBrushToolModeFalse() {
    this.props.setBrushToolMode('b', false);
    this.props.setBrushToolMode('n', false);
    this.props.setBrushToolMode('z', false);
  }

  handleClose() {
    // loop funcMap to set other button's functype >> 'false'
    Object.keys(this.state).forEach((item) => {
      if (this.state[item] === true && this[funcMap[item]]) {
        this[funcMap[item]](false);
      }
    });
    this.setState({
      brush: false,
      paintBrush: false,
    });
  }

  updateActive(type) {
    this.handleClose();
    switch (type) {
      case 'brush': {
        this.setState({ brush: !this.state.brush });
        if (!this.state.brush) {
          this.brush(!this.state.brush);
        } else {
          this.setBrushToolModeFalse();
        }
        break;
      }
      case 'paintBrush': {
        this.setState({ paintBrush: !this.state.paintBrush });
        if (!this.state.paintBrush) {
          this.paintBrush(!this.state.paintBrush);
        } else {
          this.setBrushToolModeFalse();
        }
        break;
      }
      default:
        return false;
    }
    return true;
  }

  brush(type) {
    if (type) {
      this.props.brush(true, '5');
    } else {
      this.props.brush(false, '1');
    }
  }

  paintBrush(type) {
    if (type) {
      this.props.paintBrush(true);
    } else {
      this.props.paintBrush(true);
    }
  }


  render() {
    if (!this.props.visible && !this.state.alert) {
      return null;
    }

    // const activeView = this.props.views.some(view =>
    const activeView = [].some(view =>
     (Number(this.props.activeViewId) === view[0] && view[1] === 'YView2DXY'));

    const transparent = this.props.activeViewId ? this.props.nodes[Number(this.props.activeViewId)].filter(item => item.selected).map(cell => cell.visible)[0] : false;
    return (
      <div className={this.props.expand ? 'toolContainer' : 'toolContainerHide'} >
        <ul>
          <li className={(!transparent || !activeView) ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={(!transparent || !activeView) ? 'brushButtonDisabled' : !this.state.brush ? 'brushButton' : 'brushButtonActive'}
              onClick={this.updateActive('brush')}
            />
            <span className={(!transparent || !activeView) ? 'textDisabled' : !this.state.brush ? 'textNormal' : 'textActive'}>
              可形变画刷
            </span>
            {
              this.state.brush && this.state.enabled && (
                <Brush
                  brush={this.props.brush}
                  setBrushToolMode={this.props.setBrushToolMode}
                />)
            }
          </li>
          <li className={(!transparent || !activeView) ? 'iconBoxDisable' : 'iconBox'}>
            <div
              className={(!transparent || !activeView) ? 'paintBrushButtonDisabled' : !this.state.paintBrush ? 'paintBrushButton' : 'paintBrushButtonActive'}
              onClick={this.updateActive('paintBrush')}
            />
            <span className={(!transparent || !activeView) ? 'textDisabled' : !this.state.paintBrush ? 'textNormal' : 'textActive'}>
              画笔
            </span>
            {
              this.state.paintBrush && this.state.enabled && (
                <PaintBrush
                  setBrushToolMode={this.props.setBrushToolMode}
                />)
            }
          </li>
        </ul>
      </div>
    );
  }
}

// Binding --------------------------------------------------------------------
/* eslint-disable arrow-body-style */

ImageProcessing.propTypes = {
  visible: ReactPropTypes.bool,
  expand: ReactPropTypes.bool,
  actives: ReactPropTypes.array,
  baseFile: ReactPropTypes.string,
  dataNode: ReactPropTypes.string,
  measureResult: ReactPropTypes.bool,
  activeViewId: ReactPropTypes.oneOfType([
    ReactPropTypes.string,
    ReactPropTypes.number,
  ]),

  changeAlert: ReactPropTypes.func,
  paintBrush: ReactPropTypes.func,
  brush: ReactPropTypes.func,
  setBrushToolMode: ReactPropTypes.func,
};
ImageProcessing.DefalutPropTypes = {
  nodes: {},
  views: [],
}
export default ImageProcessing;
