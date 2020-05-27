/* global window */
import React, {Component} from 'react';
import ReactPropTypes from 'prop-types';
import { Modal, Table, Slider, Switch } from 'antd';
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
        currentData: 0,
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

  cancel=()=>{
    this.props.hideProperty();
  }
  changeValue=(value)=>{
    this.setState({currentData: parseInt(value)});

  }
  render() {
    const columns = [
      {
        title: '标签',
        dataIndex: 'tag',
        render: text => <a>{text}</a>,
      },
      {
        title: '说明',
        className: 'column-money',
        dataIndex: 'label',
      },
      {
        title: '值',
        dataIndex: 'value',
      },
    ];
    if(this.props.properties === undefined){
      return false;
    }
    return (
      <Modal
          title='查看属性'
          visible={this.props.property}
          onOk={this.cancel}
          okText={'确定'}
          cancelText='取消'
          onCancel={this.cancel}
      >
        <div>
          <Slider
            max={this.props.properties.length}
            defaultValue={0}
            onChange={this.changeValue}
            />
        </div>
        <Table
           columns={columns}
           pagination={false}
           scroll={{y:400}}
           dataSource={this.props.properties[this.state.currentData]}
           bordered
         />
      </Modal>
    );
  }
}
Property.propTypes = {
  hideProperty: ReactPropTypes.func,
  property: ReactPropTypes.bool,
  properties: ReactPropTypes.array,
 };

export default  Property;
