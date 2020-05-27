/* eslint-disable no-undef */
import React, { Component, PropTypes } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../redux/index/index.reducer.js";
import ContextMenu from './ContextMenu/index.js';
import Popout from "./Popout/index.js";
import  '../../style/widgets/GitTreeWidget.css';
import '../../style/widgets/PipelineBrowser.css';
import '../../style/nodeTree.css';
import show from '../../images/ViewIcon/show.png';
import hide from '../../images/ViewIcon/hide.png';
import Category from '../../images/ViewIcon/Category.png';
import { Tree } from 'antd';
import 'antd/dist/antd.css';
const { TreeNode } = Tree;

class componentName extends Component {
  constructor(props) {
    super(props)
    this.state={
      tree:0,
      index:0,
      value:{},
      flag:false,
      valueRep:0,
      current:null,
      valueIndex:null,
      menuVisible: false,
      activeType:0,
      currentId: '',
      label:"",
      error:"",
      viewIndex:0,
      initActive:true,
      multivalent:false,
      multiple:false,
      overflow:false,
      Popout:false,
      treeMenu:false,
    }
  }
  componentWillMount() {
    this.timer = null; // ipad 鼠标长按呼出右键菜单
  }
  componentDidMount(){
    let viewIndex = this.tree.getAttribute('index');
    this.setState({
      viewIndex:Number(viewIndex)
    })
  }

   contextMenu=(e)=> {
    e.stopPropagation();
    e.preventDefault();
    const Left = e.clientX + 215 > window.innerWidth ? window.innerWidth - 215 : e.clientX - 5;
    const Top = e.clientY + 230 > window.innerHeight ? window.innerHeight - 230 : e.clientY - 5;
    this.setState({
      menuLeft: Left,
      menuTop: Top,
      menuVisible: true,
    });
  }
  // mobileContextMenu=(e)=> {
  //   const Left = e.touches[0].clientX + 210 > window.innerWidth ? window.innerWidth - 210 : e.touches[0].clientX;
  //   const Top = e.touches[0].clientY + 225 > window.innerHeight ? window.innerHeight - 225 : e.touches[0].clientY;
  //   const currentId = e.target.getAttribute('index');
  //   clearTimeout(this.timer);
  //   this.timer = setTimeout(() => {
  //     this.setState({
  //       menuLeft: Left,
  //       menuTop: Top,
  //       menuVisible: true,
  //       currentId
  //     });
  //   }, 1000);
  // }
  // mobileContextMenuCancel=()=>{
  //   clearTimeout(this.timer);
  //   this.timer = null;
  // }
  //单击选中 和多选
  toggleActive =(event ,item) => {
    event.preventDefault();
    event.stopPropagation();
    let index =  item.index;
    this.props.currentIdR(index);
    if(this.state.Popout){
      this.setState({
        Popout:true,
        current:index,
      })
    }
    this.setState({
          activeType: index,
          multiple:false,
          initActive:false,
          valueIndex:event.target.getAttribute('index')
       }) 
    if(event.ctrlKey||event.shiftKey){
      this.setState({
        multivalent:true
      })
      window.vtk.nodeapis.setNodeTypeSelected(index, true)
      this.props.TypeSelected(index )
    }else{
      this.setState({
        multivalent:false
      })
      window.vtk.nodeapis.setSelectedNode(index)
      this.props.Selected(index)
    }
  }
   //全选反选
   chooseActives = (actives , orientation)=> {
     this.setState({
      multiple:true
     })
    switch (actives) {
      case 'all':
        window.vtk.nodeapis.selectAllNodes(Number(orientation))
        this.props.All_ChooseActives(actives)
        break;

      case 'inverse':
        window.vtk.nodeapis.revertSelectNodes(Number(orientation))
        this.props.Inverse_ChooseActives(actives)
        break;
      default:
        return false;
    }
  }
  //隐藏右键菜单
  hideContent=()=> {
    this.setState({ menuVisible: false });
  }
  //节点显示隐藏
  handleClick=(e)=>{
    this.setState({
    treeMenu:!this.state.treeMenu
    })
  }
  //弹框显示隐藏
  ClickColor=(e)=> {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      activeType:Number(e.target.getAttribute('index') ),
    })
    window.vtk.nodeapis.setSelectedNode(Number(e.target.getAttribute('index')))
    this.props.Selected(Number(e.target.getAttribute('index')))
    if(!this.state.Popout){
      this.setState({
        current:e.target.getAttribute('index') ,
        Popout:true
      })
    }else{
      this.setState({
        current:null,
        Popout:false
      })
    }
  }
  // 显示隐藏
  ClickVisible=(e,index)=>{
    e.preventDefault();
    e.stopPropagation();
    var visible = window.vtk.nodeapis.getNodeVisible(Number(index));
    visible = visible ? 0 : 1;
    window.vtk.nodeapis.setNodeVisible(Number(index), visible);
    this.props.SetNoes(Number(index), visible)
    this.setState({ activeType: Number(index) ,Popout:false})
  }
  //颜色
  getValue = (value) => {
    const backgroundColor = [];
    value.map((item, index) => {
      const number = parseInt(~~(item * 255));
      backgroundColor[index] = number.toString(16).length != 1 ? number.toString(16) : '0' + number.toString(16);
    });
    return { background:`rgb(${parseInt(value[0] * 255)}, ${parseInt(value[1] * 255)}, ${parseInt(value[2] * 255)})`};
  };
  //树形节点
  renderTreeNodes = data => data&&data.map((item ,ind) => {
    const liClass = this.state.activeType === item.index ? 'listActive' : '';
    if (item.children) {
      return (
        <TreeNode title={
          <div
            className={`list ${liClass}`}
            key={ind}
            onClick={e => this.toggleActive(e ,item)}
            onContextMenu={this.contextMenu}
          >
            {
              (this.state.multiple||this.state.multivalent) ? (item.type_selected===1)&&<div
              className='backgroundMark'
              onContextMenu={this.contextMenu}
              onTouchStart={this.mobileContextMenu}
              onTouchEnd={this.mobileContextMenuCancel}
              ></div>:(item.selected===1)&&<div
              className='backgroundMark'
              onContextMenu={this.contextMenu}
              onTouchStart={this.mobileContextMenu}
              onTouchEnd={this.mobileContextMenuCancel}
            ></div>
            }
            <div className="setColor"
              index={item.index}
              ref={(ref)=>{this.color=ref}}
              style={this.getValue(item.color)}
              onClick={(e) => this.ClickColor(e)}
            ></div>
            <div className='showHead'
              onClick={(e) => this.ClickVisible(e,item.index)}
            ><img src= {item.visible === 1 ? `${show}` :`${hide}`} alt='显示隐藏'/></div>
            <div
              className="getText"
              index={item.index}
              onTouchStart={this.mobileContextMenu}
              onTouchEnd={this.mobileContextMenuCancel}
              onContextMenu={e=>this.contextMenu(e ,item.index)}
            >{item.name}</div>
             {
              (this.state.valueIndex == item.index) &&  this.state.viewIndex !== 3 &&
              <div className='getVolume' index={item.index}>
                {item.volume}ml
              </div>
            }
            {
              (this.state.current == item.index)&& this.state.Popout && <Popout val={item} />
            }

          </div>} key={ind} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} dataRef={item} />;
  })
  renderNode=()=>{
   let index = this.props.index
   if(index === 3){
    return   <Tree className='nodeList hide-file-icon' showLine={true} >
              {this.renderTreeNodes(this.props.data3D)}
            </Tree>
   }else {
    return   <Tree className='nodeList hide-file-icon' style={{'background':'rgba(0,0,0,.5)'}} showLine ={true} >
              {this.renderTreeNodes(this.props.data2D)}
            </Tree>
   }

  }
  render() {
    return (
      <div className='nodeTree'>
        <button className='nodeBtn'
          onClick={e => this.handleClick(e)}
          onTouchStart={this.touchstart}
          onTouchEnd={this.touchend}
          index = {this.props.index}
          ref={(ref)=>{this.tree=ref}}

        ><img src={Category} slt='展开菜单'></img>
        </button>
        {
           this.state.treeMenu && <div className="nodeWrap" ref={(ref)=>{this.list=ref}} >
          {
            this.renderNode()
          }
           {
            this.state.menuVisible &&  <ContextMenu
              className='contextMenuBox'
              currentId={this.state.currentId}
              // deleteNode={this.deleteNode}
              label={this.props.index}
              hideContent={this.hideContent}
              chooseActives={this.chooseActives}
              changeName={this.changeName}
              labelMark={this.labelMark}
              saveName={this.saveName}
              copy={this.copy}
              rebuild={this.rebuild}
              client={this.props.client}
              error={this.props.error}
              style={{ top: `${this.state.menuTop}px`, left: `${this.state.menuLeft}px` }}
            />
            }
        </div>
        }

      </div>

    );
  }
}

let mapStateToProps = (store) => ({...store.IndexStore})
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth)
export default connect(mapStateToProps,mapDispatchToProps )(componentName);
