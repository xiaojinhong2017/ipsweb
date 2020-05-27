/* global window */
import React, {Component}  from 'react';
import ReactPropTypes from 'prop-types';
// import style       from 'VisualizerStyle/RenderControl.mcss';

class SaveScreenShot extends Component {

  constructor() {
    super();
    this.state = {
      isDragging: false,
      moveInX: (window.innerWidth / 2) - 100,
      moveInY: window.innerHeight * 0.4,
      editing: false,
      error: false,
      value: '',
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
    this.inputTouch = this.inputTouch.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.saveScreenshot = this.saveScreenshot.bind(this);
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
    this.props.hidePanel();
  }

  inputTouch(e) {
    e.stopPropagation();
    e.target.focus();
  }

  changeValue(e) {
    if (e.target.value.length >= 20) {
      this.setState({
        value: e.target.value,
        editing: true,
        error: '不能超过20个字符',
      });
    } else if (e.target.value.match(/[ \\\/@#\$%\^&\*]+/g)) {
      this.setState({
        value: e.target.value,
        editing: true,
        error: '不能使用非法字符',
      });
    } else if (e.target.value.match(/(\.jpeg)$/ig)) {
      this.setState({
        value: e.target.value,
        editing: true,
        error: '请使用.jpg后缀',
      });
    } else {
      this.setState({
        value: e.target.value,
        editing: true,
        error: false,
      });
    }
  }

  saveScreenshot() {
    if (this.state.value.trim() === '') {
      this.setState({ error: '名称不能为空' });
    } else if (this.state.value.match(/\./g) && !this.state.value.match(/\.+jpg$|png$/ig)) {
      this.setState({ error: '格式或后缀名错误' });
    } else {
      window.vtk.apis.saveScreenshot(this.props.viewId,  this.state.value);
      this.props.hidePanel();
    }
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <div
        className='saveScreenShot'
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
        <div className='bgMask' />
        <div className='titlePop' >
          保存截图
          <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
        </div>
        <div className='bgBody' >
          <div className='bgLine'>
            <span>保存为</span>
            <input
              type="text"
              style={{'color':'#000'}}
              value={this.state.editing ? this.state.value : ''}
              onTouchEnd={this.inputTouch}
              onChange={this.changeValue}
            />
            { this.state.error && <i className='feedBack'>* {this.state.error}</i> }
          </div>
          <div className='btns' >
            <button
              className='btn'
              onClick={this.saveScreenshot}
              onTouchEnd={this.saveScreenshot}
            >
              确定
            </button>
            <button className='btn' onClick={this.hidePanel} onTouchEnd={this.hidePanel} >取消</button>
          </div>
          {
            this.props.client === 'MOBILE' &&
              <div className='bgLineMobile'>
                <i className='feedBackMobile'>* 若点击“确定”按钮无法截图，请使用设备本身截图功能</i>
              </div>
          }
        </div>
      </div>
    );
  }
}
SaveScreenShot.propTypes = {
  visible: ReactPropTypes.bool,
  viewId: ReactPropTypes.string,
  // client: React.PropTypes.string,
  // path: React.PropTypes.string,
  hidePanel: ReactPropTypes.func,
  // saveScreenshot: React.PropTypes.func,
};

export default SaveScreenShot;
