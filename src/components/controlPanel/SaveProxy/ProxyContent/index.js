import React, { Component } from 'react';
import '../../../../style/ProxyContent.css';
import ReactPropTypes from 'prop-types';

export default class ProxyContent extends Component{
  constructor(){
        super();
        this.state = {
        };
    }

  handleMouseDown=(e)=> {
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

  handleMouseMove=(e)=> {
    e.preventDefault();
    if (this.state.isDragging === true) {
      const moveX = (e.pageX || Number(e.touches[0].pageX)) - this.state.relativeX;
      const moveY = (e.pageY || Number(e.touches[0].pageY)) - this.state.relativeY;
      this.setState({ moveInX: moveX, moveInY: moveY });
    }
  }

  handleMouseUp=(e)=> {
    e.preventDefault();
    this.setState({
      isDragging: false,
    });
  }

  handleMouseLeave=()=> {
    this.setState({
      isDragging: false,
    });
  }

  hidePanel=(e)=> {
    e.stopPropagation();
    this.props.hideProxy();
  }

  inputTouch=(e)=> {
    e.stopPropagation();
    e.target.focus();
  }

  changeValue=(e)=> {
    if (e.target.value.length >= 30) {
      this.setState({
        value: e.target.value,
        editing: true,
        error: '不能超过30个字符',
      });
    } else if (e.target.value.match(/[ \\\/@#\$%\^&\*]+/g)) {
      this.setState({
        value: e.target.value,
        editing: true,
        error: '不能使用非法字符',
      });
    } else {
      this.setState({
        value: e.target.value,
        editing: true,
        error: false,
      });
    }
  }

  confirm=()=> {
    // const path = this.state.path === '.' ? '' : this.state.path;
    const oldName = this.props.baseFile.match(/(?!\/)([\w\W])(?![\w\W]*?\/)([\w\W]*?\.ycm)/)[0];
    const path = this.state.path === '.' ? '' : this.props.baseFile.replace(`/${oldName}`, '');
    /* eslint-disable no-alert, no-console */
    if (this.props.saveName) {
      if (this.state.value === oldName) {
        if (window.confirm('名称已存在，是否覆盖？')) {
          this.props.saveName(`${path}/${this.state.value.trim()}`);
        }
      } else if (this.state.value.trim() === '') {
        this.setState({ error: '名称不能为空' });
      } else {
        this.props.saveName(`${path}/${this.state.value.trim()}`);
      }
    }
    /* eslint-enable no-alert */
  }
  render() {
    return (
        <div
          className='ProxyContent'
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
          <div className='title' >
            工程管理
            <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
          </div>
          {
            this.props.baseFile === '' &&
              <div className='content' >
                <div className='linePart' >
                  <span style={{ width: '100%', lineHeight: '50px' }}>无数据节点存在！</span>
                </div>
                <div className='btns' >
                  <div className='btn' onClick={this.hidePanel} onTouchEnd={this.hidePanel} style={{ float: 'none', margin: '10px auto' }} >
                    确定
                  </div>
                </div>
              </div>
          }
          {
            this.props.baseFile !== '' &&
              <div className='content' >
                <div className='linePart' style={{ lineHeight: '50px' }} >
                  <span>保存为</span>
                  <input
                    type="text"
                    value={this.state.editing ? this.state.value : ''}
                    onTouchEnd={this.inputTouch}
                    onChange={this.changeValue}
                    readOnly="true"
                  />
                  { this.state.error && <i className='feedBack'>* {this.state.error}</i> }
                </div>
                <div className='btns' >
                  <div
                    className='btn'
                    onClick={!this.state.error && this.props.userClient === 'PC' && this.confirm}
                    onTouchStart={!this.state.error && this.props.userClient === 'MOBILE' && this.confirm}
                  >
                    确定
                  </div>
                  <div className='btn' onClick={this.hidePanel} onTouchEnd={this.hidePanel} >
                    取消
                  </div>
                </div>
              </div>
          }
        </div>
    );
  }
}
ProxyContent.propTypes = {
  // className: ReactPropTypes.string,
 };
