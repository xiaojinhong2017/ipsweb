import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../redux/index/index.reducer.js";
import { Tree, Icon, Modal, Typography, message, List, Divider, Radio} from 'antd';
import ReactPropTypes from 'prop-types';
import reqwest from 'reqwest';
import Axios from 'axios';
// const { TreeNode } = Tree;
const { TreeNode, DirectoryTree } = Tree;
const { confirm } = Modal;

class DataMenu extends Component{
  constructor(props) {
    super(props)
    this.state={
      NodeTreeItem: null,
      treeData:[],
      ycmList:[],
      ycmPath:'',
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.currentRootMenu.id !== nextProps.currentRootMenu.id){
      let orderno = nextProps.currentRootMenu.orderNo || this.props.orderNo;
      let object = nextProps.currentRootMenu.dataName;
      let name;
      if(object){
         name = object.split('.')[0];
         const _this = this;
         Axios.get(window.requestUrl + '/dmitweb/litefile/findAllPathForTrees', {
           params: {
             orderno: orderno,
             name: name
           }
         })
         .then(function (response) {
           if(response.data.baseDTO.responseCode === 0){
             _this.setState({treeData: response.data.baseDTO.tree.treeList});
           }else if(response.data.baseDTO.responseCode === 1) {
             _this.setState({treeData: []});
           }
         })
         .catch(function (error) {
           console.log(error);
         });
      }
      document.addEventListener('click', this._handleClick);
    }
  }

  getTreeData = ()=> {
    reqwest({
       url: window.requestUrl + '/dmitweb/litefile/findAllPathForTrees',
       method: 'get',
       data:{
         orderno: this.props.orderNo,
         name: this.props.currentRootMenu.dataName
       },
       success: (response) => {
         if(response.baseDTO.responseCode === 0){
           this.setState({treeData: response.baseDTO.tree.treeList});
         }else if(response.baseDTO.responseCode === 1) {
           this.setState({treeData: []});
            message.error('暂无数据');
         }
       },
       error: () => {
         message.error('请求失败');
       },
     });
  }
 onRightClick = ({event,node}) => {
   var x = event.currentTarget.offsetLeft + event.currentTarget.clientWidth;
   var y = event.currentTarget.offsetTop ;
   this.setState({
     NodeTreeItem: {
       pageX: x,
       pageY: y,
       node: node.props,
       name: node.props.title,
     }
   });
 }
 getNodeTreeMenu() {
   const {pageX, pageY, node} = {...this.state.NodeTreeItem};
   const pagex = pageX > 160 ? 160 : pageX-8;
   const pack = node.children? true : false;
   const path = node.dataRef.path?node.dataRef.path:'';
   const fileName = node.dataRef.name? node.dataRef.name:'';
   const orderno = this.props.orderNo;
   const tmpStyle = {
     position: 'absolute',
     textAlign: 'center',
     left: `${pagex - 8}px`,
     top: `${pageY + 15}px`,
   };
   console.log(node);
   const menu = (
     <ul
      className='rightMenu'
      style={tmpStyle}
     >
       <li className='rightMenuItem' onClick={this.openYCM.bind(this, orderno, path, pack)}>
            <Icon type="right-circle" /><span className='rightMenuItemText'>打开YCM工程</span>
       </li>
       { pack &&
         <li className='rightMenuItem' onClick={this.openDicom.bind(this,path)}>
            <Icon type="play-circle" /><span className='rightMenuItemText'>打开Dicom序列</span>
         </li>
      }
       <li className='rightMenuItem' onClick={this.delete.bind(this, path, pack)}>
            <Icon type="delete" /><span className='rightMenuItemText'>删除</span>
       </li>
       { pack &&
         <li className='rightMenuItem' onClick={this.package.bind(this,path)}>
            <Icon type="vertical-align-middle" /><span className='rightMenuItemText'>打包</span>
         </li>
       }

       <li className='rightMenuItem' onClick={this.download.bind(this, orderno, path, fileName)}>
          <Icon type="download" /><span className='rightMenuItemText'>下载</span>
       </li>
       { pack &&
         <li className='rightMenuItem' onClick={this.packageDownload.bind(this, orderno, path, fileName)}>
              <Icon type='plus-circle-o' /><span className='rightMenuItemText'>打包下载</span>
         </li>
       }
     </ul>
   );
   return (this.state.NodeTreeItem == null) ? '' : menu;
 }
_handleClick=()=>{
  this.setState({
    NodeTreeItem: null
  });
}

openYCM=(orderno, path, isFolder)=>{
  if(!isFolder){
    let index = path.lastIndexOf(".");
    let fileType = path.substr(index+1);
    if(fileType == 'ycm') {
      this.setState({
        ycmPath: path
      });
      // window.vtk.toolapis.openYcmProject(path.slice(12));
      this.props.setYcmPath(path,this.props.currentRootMenu.dataName);
    }else{
      message.error("未找到ycm类型文件");
    }
  }else{
    let url = window.requestUrl + "/dmitweb/litefile/findAllPaths?orderno="+orderno +"&path="+ path +"&fileType=.ycm";
    reqwest({
       url: url,
       method: 'get',
       success: (data) => {
         if(data.baseDTO.responseCode == 0) {
            this.setState({
              roleVisible: true,
              ycmList: data.baseDTO.treeList
            });
         } else if(data.baseDTO.responseCode == 1) {
            message.error("未找到可以打开的ycm文件");
         }
       },
       error: () => {
         message.error('请求失败');
       },
     });
  }

}

download=(orderNo, path, fileName)=>{
  let url = window.requestUrl + "/dmitweb/download?orderNo=" + orderNo + "&ossType=1&fileName=" + encodeURIComponent(fileName)+"&path="+path;
  window.location.href = url;
}

openDicom=(path)=>{
  this.props.setDicom(path,this.props.currentRootMenu.dataName);
}

package=(path)=>{
  let url = window.requestUrl + "/dmitweb/oss/zipBack"
  let dataObject = {
    "ossObject": {
        "id": "",
        "orderId": this.props.orderId,
        "path": path
      }
  };
  this.props.loadingStore(true);
  let json = JSON.stringify(dataObject);
  reqwest({
     url: url,
     method: 'post',
     data: json,
     contentType:'application/json',
     success: (data) => {
       if(data.OTOrderOssObjectDTO.responseCode == 0) {
          message.success("打包成功");
          this.getTreeData();
       } else if(data.OTOrderOssObjectDTO.responseCode == 1) {
          message.error("打包失败");
       }
       this.props.loadingStore(false);
     },
     error: () => {
       message.error('请求失败');
       this.props.loadingStore(false);
     },
   });
}
packageDownload=(orderNo, path, fileName)=>{
  let url = window.requestUrl + "/dmitweb/oss/zipBack"
  let dataObject = {
    "ossObject": {
        "id": "",
        "orderId": this.props.orderId,
        "path": path
      }
  };
  this.props.loadingStore(true);
  let json = JSON.stringify(dataObject);
  reqwest({
     url: url,
     method: 'post',
     data: json,
     contentType:'application/json',
     success: (data) => {
       if(data.OTOrderOssObjectDTO.responseCode == 0) {
          message.success("打包成功");
          let zipPath = data.OTOrderOssObjectDTO.ossObject.path;
          let url = window.requestUrl + "/dmitweb/download?orderNo=" + orderNo + "&ossType=6&fileName=" + encodeURIComponent(fileName)+"&path="+zipPath;
          window.location.href = url;
       } else if(data.OTOrderOssObjectDTO.responseCode == 1) {
          message.error("打包失败");
       }
       this.props.loadingStore(false);
     },
     error: () => {
       message.error('请求失败');
       this.props.loadingStore(false);
     },
   });
}
delete=(path, isFolder)=>{
  let pos = path.lastIndexOf('/');//'/所在的最后位置'
  let fileName = path.substr(pos+1);
  let _this = this;
  if(isFolder) {
    if(this.props.openFile!==''&& path.indexOf(this.props.openFile) !== -1){
        message.error("当前文件夹下的某个文件已经被打开，不能执行操作");
    }else {
      confirm({
        title: '您要删除“'+fileName+'”文件夹吗？请确保当前选择的文件夹没有被其他用户访问，否则操作可能会失败',
        content: '删除操作不可恢复，请谨慎操作',
        className:'modalStyle confirm',
        onOk() {
        var url = window.requestUrl +'/dmitweb/oss/deleteFile?filePath='+ path;
          reqwest({
             url: url,
             method: 'get',
             success: (data) => {
               if(data.OTOrderOssObjectDTO.responseCode == 0) {
                  message.success("删除操作成功！");
                  _this.getTreeData();
               } else if(data.OTOrderOssObjectDTO.responseCode == 1) {
                  message.error("删除操作失败");
               } else {
                  message.error("请求失败");
               }
             },
             error: () => {
               message.error('请求失败');
             },
           });
        },
        onCancel() {},
      });

    }
  }else {
    if(this.props.openFile===path){
      message.error("当前文件已经被打开，不能执行操作");
    } else {
      confirm({
        title: '您要删除“'+fileName+'”文件吗？',
        content: '请确保当前选择的文件夹没有被其他用户访问，否则操作可能会失败',
        className:'modalStyle confirm',
        onOk() {
        var url = window.requestUrl +'/dmitweb/oss/deleteFile?filePath='+ path;
          reqwest({
             url: url,
             method: 'get',
             success: (data) => {
               if(data.OTOrderOssObjectDTO.responseCode == 0) {
                  message.success("删除操作成功！");
                  _this.getTreeData();
               } else if(data.OTOrderOssObjectDTO.responseCode == 1) {
                  message.error("删除操作失败");
               } else {
                  message.error("请求失败");
               }
             },
             error: () => {
               message.error('请求失败');
             },
           });
        },
        onCancel() {},
      });
    }

  }

}


setYcmPath=()=>{
  this.setState({roleVisible: false});
  this.props.setYcmPath(this.state.ycmPath,this.props.currentRootMenu.dataName);
}

checkYcmPath=(path)=>{
  this.setState({ycmPath: path});
}
onSelect = (keys, event) => {
   console.log('Trigger Select', keys, event);
 };
onCheck=()=>{}
renderTreeNodes = data => data&&data.map((item ,ind) => {
  if (item.treeList.length !== 0) {
    return (
      <TreeNode title={item.name} key={item.ind}  dataRef={item} >
      {this.renderTreeNodes(item.treeList)}
      </TreeNode>
    );
  }
  return <TreeNode title={item.name} key={item.ind} isLeaf  dataRef={item} />;
})
render() {
  let splitMenu = this.props.orderNo + '/' + this.props.currentRootMenu.dataName;
  return (
    <div className='DataMenu'
    >
      <DirectoryTree
        multiple
        defaultExpandAll
        onRightClick={this.onRightClick}
        expandAction='doubleClick'
        onSelect={this.onSelect}
      >
      {this.renderTreeNodes(this.state.treeData)}
      </DirectoryTree>
      {this.state.NodeTreeItem != null ? this.getNodeTreeMenu() : ""}
      <Modal
          style={{ top: 200}}
          wrapClassName={'modalStyle openYcm'}
          visible={this.state.roleVisible}
          onOk={this.setYcmPath}
          okText={'打开'}
          cancelText='取消'
          onCancel={()=>{this.setState({
              roleVisible:false
          })}}
      >
          <Filelist
           ycmList = {this.state.ycmList}
           checkYcmPath = {this.checkYcmPath.bind(this)}
           splitMenu= {splitMenu}
          />
      </Modal>
    </div>
  )
}
}
class Filelist extends React.Component{
    state = {
      value: '',
    };
    onChange = e => {
    this.setState({
      value: e.target.value,
    });
    this.props.checkYcmPath(e.target.value);
  };
  componentWillMount(){
      this.setState({
        value: this.props.ycmList[0].path
    })
    this.props.checkYcmPath(this.props.ycmList[0].path);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.ycmList !== nextProps.ycmList) {
      this.setState({
        value: nextProps.ycmList[0].path,
      });
      this.props.checkYcmPath(nextProps.ycmList[0].path);
    }
  }
    render(){
      const data = this.props.ycmList;
      const { value } = this.state;
      const splitMenu = this.props.splitMenu;
        return (
          <Radio.Group name="radiogroup" onChange={this.onChange} value={value}>
            <Divider orientation="left">请选择您要打开的ycm文件</Divider>

            <List
               bordered
               dataSource={data}
               renderItem={(item, index) => (
                 <List.Item>
                   <Radio  value={item.path}>
                    {item.path.split(splitMenu)[1]}
                  </Radio>
                 </List.Item>
               )}
            />
          </Radio.Group>
        )
    }
}
Filelist.propTypes = {
  ycmList: ReactPropTypes.array,
  checkYcmPath: ReactPropTypes.func,
  splitMenu: ReactPropTypes.string,
 };

// DataMenu.propTypes = {
//   currentRootMenu: ReactPropTypes.object,
//   orderNo:ReactPropTypes.string,
//   orderId:ReactPropTypes.number,
//   setYcmPath:ReactPropTypes.func,
//   openFile:ReactPropTypes.string,
//  };
 let mapStateToProps = (store) => ({...store.IndexStore})
 let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth)
 export default connect(mapStateToProps,mapDispatchToProps )(DataMenu);
