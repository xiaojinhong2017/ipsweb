import React, { Component, PropTypes } from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../redux/index/index.reducer.js";
import ReBuild               from './ReBuild';
import ReName                from './ReName';
import Property              from './Property';
import Copy                  from './Copy';
import Mark                  from './Mark';
import Save                  from './Save';
class componentName extends Component {
  constructor(props) {
    super(props)
    this.state={
      deleteVisible: false,
      chooseVisible: false,
      reBuild: false,
      reName: false,
      property: false,
      copy: false,
      mark: false,
      save: false,
    }
  }
  componentWillMount() {
    this.timer = null;
  }
  componentDidMount() {
    let self = this;
    this._onBlurHandler(self)
    if (this.props.client === 'MOBILE') {
      this.timer = setTimeout(() => {
        this.props.hideContent();
        clearTimeout(this.timer);
        this.timer = null;
      }, 3500);
    }

  }
  //点击空白处关闭
  _onBlurHandler(self){
        document.body.addEventListener('click', function(e){
            //针对不同浏览器的解决方案
            function matchesSelector(element, selector){

                if(element.matches){

                    return element.matches(selector);

                } else if(element.matchesSelector){

                    return element.matchesSelector(selector);

                } else if(element.webkitMatchesSelector){

                    return element.webkitMatchesSelector(selector);

                } else if(element.msMatchesSelector){

                    return element.msMatchesSelector(selector);

                } else if(element.mozMatchesSelector){

                    return element.mozMatchesSelector(selector);

                } else if(element.oMatchesSelector){

                    return element.oMatchesSelector(selector);

                }

            }
            //匹配当前组件内的所有元素
            if(matchesSelector(e.target,'.contextMenuBox *')){               
                return;
            }
    self.props.hideContent()
        }, false);
  }
  showDeleteContent=(e)=> {
    e.stopPropagation();
    this.setState({ deleteVisible: true });
  }
  hideDeleteContent=()=> {
    this.setState({ deleteVisible: false });
  }
  showChooseContent=(e)=> {
    e.stopPropagation();
    this.setState({ chooseVisible: true });
  }
  hideChooseContent=()=> {
    this.setState({ chooseVisible: false });
  }
  hideContent=()=> {
      // this.props.hideContent();
  }
  //选中删除
  deleteNode=(type , orientation)=> {
    switch (type) {
      case 'current':
          window.vtk.nodeapis.removeNode(this.props.indexId);
          this.props.removeCurrent()
        break;

      case 'actives':
          this.props.ActivesRemoveCurrent()
        break;
      default:
        return false;
    }
    // this.hideContent();
    this.props.hideContent()
  }
  //选中显示隐藏
  toggleActivesVisibility=(type , index ,ind )=> {
    this.props.RightKey(type,ind)	
    const setNodes = function(list){
      list.forEach(function(v){
          if(v.type_selected===1||v.selected === 1){
            if(type){
              window.vtk.nodeapis.setNodeVisible(v.index, 1);
            }else{
              window.vtk.nodeapis.setNodeVisible(v.index, 0);
            }
          }
          if(v.children){
              setNodes(v.children)
          }
        })
    }
    if(index===3){
      setNodes(this.props.data3D)
      
    }else{
      setNodes(this.props.data2D)
    }
    this.props.ShowHideR(type,index) 
    // this.hideContent();
    this.props.hideContent();
  }
  //全选反选
  chooseActives=(e, type ,orientation )=> {
    e.stopPropagation();
    this.props.chooseActives(type, orientation);
    // this.hideContent();
    this.props.hideContent()
  }
  reBuild=()=> {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ reBuild: true });
  }
  hideReBuild=()=> {
    this.setState({ reBuild: false });
    // this.hideContent();
    this.props.hideContent()
  }
  rebuild=(text)=> {
    this.props.rebuild({
      id: this.props.currentId,
      value: text
    });
    // this.hideReBuild();
    this.props.hideContent()
  }
  reName=()=> {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ reName: true });
  }
  hideReName=()=> {
    this.setState({ reName: false });
    // this.hideContent();
    this.props.hideContent()
  }
  showProperty=()=> {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ property: true });
  }
  hideProperty=()=> {
    this.setState({ property: false });
    // this.hideContent();
    this.props.hideContent()
  }
  showCopy=()=> {
    window.vtk.nodeapis.copyNode(this.props.indexId)
    this.props.CopyNode()
    this.props.hideContent()
  }
  showMark=()=> {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ mark: true });
  }
  hideMark=()=> {
    this.setState({ mark: false });
    // this.hideContent();
    this.props.hideContent()
  }
  //标记
  labelMark=(text)=> {
    window.vtk.nodeapis.setNodeOrganName(this.props.indexId, text)
    this.props.LabelMarkR(this.props.indexId, text)
    this.hideMark();
  }
  showSave=()=> {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ save: true });
  }
  hideSave=()=> {
    this.setState({ save: false });
    // this.hideContent();
    this.props.hideContent()
  }
  saveName=(name)=> {
    this.props.saveName({
      id: this.props.currentId,
      value: name
    });
    this.hideSave();
  }
  render() {
    return (
      <div className="contextMenuBox" style={this.props.style} ref={ref => {this.root = ref}} 
      onClick={this.handleClick}
      >
        {
          this.props.label !== 3 && !this.state.reBuild && !this.state.reName && !this.state.property && !this.state.mark && (
            
            <ul className='contextMenu' onMouseLeave={this.hideContent}  >
              <li className='delete' onTouchStart={this.showDeleteContent} onMouseEnter={this.showDeleteContent} onMouseLeave={this.hideDeleteContent} >
                <span>删除</span>
                {
                  this.state.deleteVisible && (
                    <div className='deleteContent' onMouseLeave={this.hideDeleteContent} >
                      <p onClick={() => { this.deleteNode('current',this.props.label); }} onTouchEnd={() => { this.deleteNode('current' ,this.props.label); }} >删除当前数据</p>
                      <p onClick={() => { this.deleteNode('actives',this.props.label); }} onTouchEnd={() => { this.deleteNode('actives' ,this.props.label); }} >删除选中数据</p>
                    </div>
                  )
                }
              </li>
              <li onClick={() => { this.toggleActivesVisibility(true ,this.props.label,this.props.indexId); }} onTouchEnd={() => { this.toggleActivesVisibility(true ,this.props.label,this.props.indexId); }} >显示选中数据</li>
              <li onClick={() => { this.toggleActivesVisibility(false ,this.props.label,this.props.indexId); }} onTouchEnd={() => { this.toggleActivesVisibility(false ,this.props.label,this.props.indexId); }} >隐藏选中数据</li>
              <li className='choose' onTouchStart={this.showChooseContent} onMouseEnter={this.showChooseContent} onMouseLeave={this.hideChooseContent} >
                <span>选择</span>
                {
                  this.state.chooseVisible && (
                    <div className='chooseContent' onMouseLeave={this.hideChooseContent} >
                      <p onClick={(e) => { this.chooseActives(e, 'all' ,this.props.label); }} onTouchEnd={(e) => { this.chooseActives(e, 'all' ,this.props.label); }} >全选</p>
                      <p onClick={(e) => { this.chooseActives(e, 'inverse' ,this.props.label); }} onTouchEnd={(e) => { this.chooseActives(e, 'inverse' ,this.props.label); }} >反选</p>
                    </div>
                  )
                }
              </li>
              <li className='reName' onClick={this.reName} onTouchEnd={this.reName} >修改名称</li>
              <li className='attribute' onClick={this.showProperty} onTouchEnd={this.showProperty} >属性</li>
              <li onClick={this.showMark} onTouchEnd={this.showMark} >器官标记</li>
            </ul>
          )
        }
        {
          this.props.label === 3 && !this.state.reBuild && !this.state.reName && !this.state.property && !this.state.mark && !this.state.save && (
            <ul className='contextMenu' style={this.props.style} onMouseLeave={this.hideContent} >
              <li className='delete' onTouchStart={this.showDeleteContent} onMouseEnter={this.showDeleteContent} onMouseLeave={this.hideDeleteContent}  >
                <span>删除</span>
                {
                  this.state.deleteVisible && (
                    <div className='deleteContent' onMouseLeave={this.hideDeleteContent} >
                      <p onClick={() => { this.deleteNode('current',this.props.label); }} onTouchEnd={() => { this.deleteNode('current' ,this.props.label); }} >删除当前数据</p>
                      <p onClick={() => { this.deleteNode('actives',this.props.label); }} onTouchEnd={() => { this.deleteNode('actives' ,this.props.label); }} >删除选中数据</p>
                    </div>
                  )
                }
              </li>
              <li onClick={() => { this.toggleActivesVisibility(true ,this.props.label,this.props.indexId); }} onTouchEnd={() => { this.toggleActivesVisibility(true ,this.props.label,this.props.indexId); }} >显示选中数据</li>
              <li onClick={() => { this.toggleActivesVisibility(false ,this.props.label,this.props.indexId); }} onTouchEnd={() => { this.toggleActivesVisibility(false ,this.props.label,this.props.indexId); }} >隐藏选中数据</li>
              <li className='choose' onTouchStart={this.showChooseContent} onMouseEnter={this.showChooseContent} onMouseLeave={this.hideChooseContent} >
                <span>选择</span>
                {
                  this.state.chooseVisible && (
                    <div className='chooseContent' onMouseLeave={this.hideChooseContent} >
                      <p onClick={(e) => { this.chooseActives(e, 'all' ,this.props.label); }} onTouchEnd={(e) => { this.chooseActives(e, 'all' ,this.props.label); }} >全选</p>
                      <p onClick={(e) => { this.chooseActives(e, 'inverse' ,this.props.label); }} onTouchEnd={(e) => { this.chooseActives(e, 'inverse' ,this.props.label); }} >反选</p>
                    </div>
                  )
                }
              </li>
              {/* <li className='save' onClick={this.showSave} onTouchEnd={this.showSave} >保存</li> */}
              <li className='copy' onClick={this.showCopy} onTouchEnd={this.showCopy} >复制</li>
              <li className='reName' onClick={this.reName} onTouchEnd={this.reName} >修改名称</li>
              <li className='attribute' onClick={this.showProperty} onTouchEnd={this.showProperty} >属性</li>
              <li onClick={this.showMark} onTouchEnd={this.showMark} >器官标记</li>
            </ul>
          )
        }
        {
          this.state.reBuild &&
            <ReBuild
              client={this.props.client}
              hideReBuild={this.hideReBuild}
              rebuild={this.rebuild}
            />
        }
        {
          this.state.reName &&
            <ReName
              changeName={this.changeName}
              hideReName={this.hideReName}
              error={this.props.error}
            />
        }
        {
          this.state.property &&
            <Property
              hideProperty={this.hideProperty}
              index={this.props.indexId}
              label={this.props.label}
            />
        }
        {
          this.state.mark &&
            <Mark
              client={this.props.client}
              hideMark={this.hideMark}
              labelMark={this.labelMark}
            />
        }
        {
          this.state.save &&
            <Save
              client={this.props.client}
              hideSave={this.hideSave}
              saveName={this.saveName}
            />
        }
      </div>
    );
  }
}

// componentName.propTypes = {
//   hideContent:PropTypes.func
//   // hideContent: PropTypes.func,
// }

let mapStateToProps = (store) => ({...store.IndexStore})  
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth) 
export default connect(mapStateToProps,mapDispatchToProps )(componentName);