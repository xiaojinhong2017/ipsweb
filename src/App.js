import React, { Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "./redux/index/index.reducer.js";
import MainView from './MainView';
import DataMenu from './components/DataMenu';
import {Card, Modal, Form,Input, Button, Icon, Upload, message, Select, List, Typography,} from "antd";
import './style/App.css';
import reqwest from 'reqwest';
import jQuery from 'jquery';
import logo from './images/yorktal.png';
import ReactPropTypes from 'prop-types';
// import Test from './test';
const FormItem = Form.Item;
const { confirm } = Modal;
class App extends Component {

  constructor() {
    super();
    this.orderNo=window.orderNo;
    this.orderId=window.orderId;
    this.state = {
      roleVisible:false,
      detail:{},
      title:'',
      NodeTreeItem:null,
      filePathRootName:'',
      expand:false,
      currentRootMenuKey:null,
    };

  }
componentDidMount() {
    document.addEventListener('click', this._handleClick);
 };
 componentWillMount(){
  this.props.getData();
  // this.props.setCurrentRootMenu(this.props.rootMenu[0]);
 }
componentWillReceiveProps(nextProps) {
  if(this.props.rootMenu!== nextProps.rootMenu){
    if(this.props.rootMenu.length!==0){
      if(this.props.rootMenu.length !== nextProps.rootMenu.length) {
        this.props.setCurrentRootMenu(nextProps.rootMenu[0]);
      }else {
        this.props.setCurrentRootMenu(nextProps.rootMenu[this.state.currentRootMenuKey]);
      }
    }
  }
 }
 
  // 新增数据
  addData=()=>{
      this.setState({
          detail:{
              type:'',
              description:'',
              dataName:'',
              id:'',
              orderId:'',
              orderNo:'',
              status:''
          },
          roleVisible:true,
          title: "新增数据",
          type: "addData",
          fileList:[],
      })
  }

  setCurrentRootMenu=(index)=>{
    this.setState({currentRootMenuKey: index});
    this.props.setCurrentRootMenu(this.props.rootMenu[index]);
  }

  _handleClick=()=>{
    this.setState({
      NodeTreeItem: null
    });
  }

  onContextMenu(dataItem,e){
    e.preventDefault()
    let scrollHeight = e.currentTarget.parentNode.scrollTop;
    var x = e.currentTarget.offsetLeft + e.currentTarget.clientWidth;
    var y = e.currentTarget.offsetTop - scrollHeight;
    this.setState({
      NodeTreeItem: {
        pageX: x,
        pageY: y,
        data:dataItem,
      }
    });
  }


  delete=(data)=>{
    const _this = this;
    const isTree = this.props.currentRootMenu.dataName === data.dataName? true: false;
    if(data.dataName === this.state.filePathRootName) {
      message.error("当前文件夹下的某个文件已经被打开，不能执行操作");
    }else {
      confirm({
        title: '您要删除“'+data.dataName+'”目录吗？',
        content: '请确保当前选择的文件夹没有被其他用户访问，否则操作可能会失败',
        className:'modalStyle confirm',
        onOk() {

        let jsonData = {
          "responseCode": 0,
          "ossObject": {
            "id": data.id,
            "orderId": data.orderId,
            "orderNo": data.orderNo,
            "dataName":data.dataName
            }
          };
          let json = JSON.stringify(jsonData);

        var url = window.requestUrl +'/dmitweb/oss/deleteData'
          reqwest({
             url: url,
             method: 'post',
             contentType:'application/json',
             data: json,
             success: (data) => {
               if(data.OTOrderOssObjectDTO.responseCode == 0) {
                  message.success("删除操作成功！");
                  _this.props.getData();
                  if(isTree) {
                    _this.setState({currentRootMenuKey: null});
                  }
               } else if(data.OTOrderOssObjectDTO.responseCode == 1) {
                  message.error("删除操作失败");
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
  attribute=(data)=>{
    if(data.dataName === this.state.filePathRootName) {
      message.error("当前文件夹下的某个文件已经被打开，不能执行操作");
    }else {
      this.attributeData(data);
    }
  }
  packageDownload=(data)=>{
    console.log(data);
    let path = data.parentObject + data.dataName;
    let orderNo = data.orderNo;
    let fileName = data.object;
    let orderId = data.orderId;
    let url = window.requestUrl + "/dmitweb/oss/zipBack"
    let dataObject = {
      "ossObject": {
          "id": "",
          "orderId": orderId,
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
         // let url = window.requestUrl + "/dmitweb/download?orderNo=" + orderNo + "&ossType=6&fileName=" + encodeURIComponent(fileName)+"&path="+path;
         // window.location.href = url;
         this.props.loadingStore(false);
       },
       error: () => {
         message.error('请求失败');
         this.props.loadingStore(false);
       },
     });
  }

  getNodeTreeMenu() {
    const {pageX, pageY, data} = {...this.state.NodeTreeItem};
    const tmpStyle = {
      position: 'absolute',
      textAlign: 'center',
      left: `52px`,
      top: `${pageY + 15}px`,
    };
    const menu = (
      <ul
       className='rightMenu'
       style={tmpStyle}
      >
        <li className='rightMenuItem' onClick={this.delete.bind(this, data)}>
           <Icon type='minus-circle-o' /><span className='rightMenuItemText'>删除数据</span>
        </li>
        <li className='rightMenuItem' onClick={this.attribute.bind(this, data)}>
           <Icon type='edit'/><span className='rightMenuItemText'>属性</span>
        </li>
        <li className='rightMenuItem' onClick={this.packageDownload.bind(this, data)}>
          <Icon type='plus-circle-o' /><span className='rightMenuItemText'>打包下载</span>
        </li>

      </ul>
    );
    return (this.state.NodeTreeItem == null) ? '' : menu;
  }
  attributeData=(data)=>{
    this.setState({
        detail:{
            type: data.type===1 ? '1' : '2',
            dataName:data.dataName,
            description: data.description,
            id:data.id,
            orderId:data.orderId,
            orderNo:data.orderNo,
            status:data.status
        },
        roleVisible:true,
        title:'属性',
        type:'attribute'
    })
  }

  addDataItem = (e) => {//点击对话框OK按钮触发的事件
    if(this.state.type === 'addData'){
      message.loading('正在上传请稍后..', 'upload')
       this.props.loadingStore(true);
       let ecs_upload_url = window.requestUrl + "/dmitweb/upload";
       // let ecs_upload_url = "http://192.168.1.153:8083" + "/dmitweb/upload";
       let demo=this.refs.getFormVlaue;//通过refs属性可以获得对话框内form对象
       demo.validateFields((err, values) => {
         if(!err){
           const { fileList } = this.state;
           var dataName = values.dataName;
           var description = values.description;
           var type = values.status;
           var orderNo = this.orderNo;
           var orderId = this.orderId;
           var url = ecs_upload_url + "?userId=&name=test&ossType=" + type + "&ossObjectId="+
                    "&orderNo=" + orderNo + "&orderId=" + orderId +"&dataName=" + dataName+ "&description=" + description;
          // var orderNo = "20200330-ZSC0001-0007";
          // var orderId = "590";
          // var url = ecs_upload_url + "?userId=&name=test&ossType=1" + "&ossObjectId=3354"+
          // "&orderNo=" + orderNo + "&orderId=" + orderId;
          var  formData = new FormData();
            fileList.forEach((file) => {
              formData.append('files', file);
            });
            this.setState({roleVisible: false});
          reqwest({
             url: url,
             method: 'post',
             processData: false,
             data: formData,
             success: (data) => {
               this.setState({
                 fileList: [],
               });
               if(data.status == 200) {
                 message.success('upload successfully.','upload');
                 this.props.getData();
               }else {
                  message.error('upload failed.', 'upload');
               }
               this.props.loadingStore(false);
             },
             error: () => {
               message.error('upload failed.','upload');
               this.props.loadingStore(false);
             },
           });
         }
       });
    }else if(this.state.type==='attribute'){
      var ossObject = this.state.detail;
      var demo=this.refs.getFormVlaue;
      demo.validateFields((err, values) => {
        var dataName = values.dataName;
        var description = values.description;
        var type = values.status;
        ossObject.dataName = dataName;
        ossObject.description = description;
        ossObject.type = type;
      })
      var data = {'ossObject': ossObject};
      var jsondata = JSON.stringify(data);
      var url = window.requestUrl +'/dmitweb/oss/rename';
      this.setState({roleVisible: false});
      reqwest({
         url: url,
         method: 'post',
         contentType:'application/json',
         data: jsondata,
         success: (data) => {
           if(data.OTOrderOssObjectDTO.responseCode===0){
             message.success('修改成功');
             this.props.getData();
           }else if(data.OTOrderOssObjectDTO.responseCode===2){
             message.error('修改失败');
           }

           // if(data.status == 200) {
           //   message.success('upload successfully.','upload');
           //   this.getData();
           // }else {
           //    message.error('upload failed.', 'upload');
           // }
         },
         error: () => {
           message.error('修改失败');
         },
       });
    }
 }

 fileList = (list)=>{
   this.setState({
     fileList:list
   });
 }
 setYcmPath = (path, dataName)=>{
   this.setState({
     filePathRootName:dataName,
  });
  this.props.setOpenFile(path);
  this.props.setDataInfo(this.props.currentRootMenu);
  this.props.setOpenYcm(path);
  this.props.setOpenDicom('');
  // this.setState({expand: true});
 }
 setDicom = (path, dataName)=>{
   this.setState({
     filePathRootName:dataName,
  });
  this.props.setOpenDicom(path);
  this.props.setOpenFile(path);
  this.props.setOpenYcm('');
  this.props.setDataInfo(this.props.currentRootMenu);
  // this.setState({expand: true});
 }
 dataExpand=(bool)=>{
   this.setState({expand: bool});
 }

 returnPage=()=> {
   const confirm = window.confirm('回退操作将中断当前会话，所有没有保存的数据都将丢失');
   if (confirm === true) {
     if (document.referrer === '') {
       window.close();
     } else {
       window.history.back(-1);
     }
   } else {
     return false;
   }
   return true;
 }
  render(){
    const rootMenu = this.props.rootMenu;
    return(
      <div className='App'>
        <div className='header'>
          <div className='orderInfo'>
            <span>申请单号：{window.orderNo}</span>
            <span>医院名称：{window.hospitalName} </span>
            <span>患者姓名：{window.patientName}</span>
            <span>医生姓名：{window.doctorName}</span>
            <span>申请人：{window.apply}</span>
          </div>
          <i
           className="fa fa-reply returnButton"
           onClick={this.returnPage}
           />
        </div>
        <div className='main'>
        <div className='DataCenter' style={this.state.expand? {'display':'none'}:{}}>
         <div className='DataManger'>
           <img
             src={logo}
             style={{ height: '34px', marginTop:'4px'}}
             alt="旭东数字医学影像"
           />

             <Button className='dataButton' onClick={this.addData.bind(this,'addData')}><Icon type="plus" />新增</Button>

           <Modal
               style={{ top: 200}}
               width={450}
               wrapClassName={'modalStyle addData'}
               title={this.state.title}
               visible={this.state.roleVisible}
               onOk={this.addDataItem}
               okText={this.state.type==='addData'? '添加':'修改'}
               cancelText='取消'
               onCancel={()=>{this.setState({
                   roleVisible:false
               })}}
           >
               <AddFileInfo
                   detail = {this.state.detail}
                   type={this.state.type}
                   wrappedComponentRef={(inst) => this.roleForm = inst}
                   ref="getFormVlaue"
                   fileList={this.fileList}
               />
           </Modal>
         </div>
         <div className='DataTree'>
          <div>
            <ul className='rootMenu'
            >{
              rootMenu.length!==0 && rootMenu.map((item,index)=>{
                if(this.props.currentRootMenu==={}){
                  return(
                    <li
                    onClick={this.setCurrentRootMenu.bind(this,index)}
                    onContextMenu={this.onContextMenu.bind(this, item)}
                    className='active' key={index}>{item.dataName}</li>);
                }else{
                  return(
                    <li
                    onClick={this.setCurrentRootMenu.bind(this,index)}
                    onContextMenu={this.onContextMenu.bind(this, item)}
                    className={this.props.currentRootMenu.id === rootMenu[index].id ? 'active':''} key={index}>{item.dataName}</li>);
                }
              })

            }
            </ul>
             {this.state.NodeTreeItem != null ? this.getNodeTreeMenu() : ""}
          </div>
          <div className='dataMessage'>
            {/*
              {this.state.currentRootMenu!==[]? '<span>请先选择数据</span>':
                '创建时间: &nbsp;<span>this.state.currentRootMenu.createDate</span>
                创建人:&nbsp;<span>你好世界</span>'
              */}
              <div className='dataMessageContent'>
                <span>数据类型：{this.props.currentRootMenu.type===undefined?'': this.props.currentRootMenu.type===1?'原始数据': '重建数据'}</span><br/>
                <span>创建时间: &nbsp;{this.props.currentRootMenu.createDate?this.props.currentRootMenu.createDate.substring(0,19): ''}</span><br/>
                {
                  window.email!==''&&
                    <span>创建者: &nbsp;{window.email}</span>
                }
              </div>
          </div>
           <DataMenu
             orderNo={this.orderNo}
             orderId={this.orderId}
             setYcmPath={this.setYcmPath}
             setDicom={this.setDicom}
           />
         </div>
        </div>
          <MainView
           dataExpand={this.dataExpand}
           expand={this.state.expand}
           />

        </div>

      </div>
    )
  }
}

class AddFileInfo extends React.Component{
    state = {
      fileList: [],
      uploading: false,
    };
    handleChange = info => {
      let fileList = [...info.fileList];
      // 1. Limit the number of uploaded files
      // Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);
      // 2. Read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });
      this.setState({ fileList });
  }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        }
        const detail = this.props.detail;
        const { uploading, fileList } = this.state;
        const props = {
          onRemove: file => {
            this.setState(state => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            });
          },
          beforeUpload:(file)=>{
            if(this.state.fileList.length===0){
              this.setState(state => ({
                fileList: [...state.fileList, file],
              }));
              this.props.fileList([this.state.fileList, file]);
            }else{
              message.error('只能上传一个文件');
              this.setState(state => ({
                fileList: [...state.fileList],
              }));
            }
            return false;
          },
          fileList,
        };
      const { Option } = Select;
      // const  disabled = this.props.type==='addData'? false : true;
        return (
            <Form>
                <FormItem
                 label="数据类型"
                 {...formItemLayout}
                 >
                    {
                        getFieldDecorator('status',{
                            initialValue:detail.type,
                            rules:[{ required: true}]
                        })(
                          <Select placeholder="请选择数据类型">
                            <Option value="1">原始数据</Option>
                            <Option value="2">重建数据</Option>
                          </Select>
                        )
                    }
                </FormItem>

                <FormItem
                 label="新增数据"
                {...formItemLayout}
                rules={[{ required: true, message: '请输入数据名称' }]}
                >
                    {
                        getFieldDecorator('dataName',{
                            initialValue:detail.dataName,
                            rules:[{ required: true, message: '请输入数据名称' }]

                        })(
                            <Input type="text" placeholder="数据名称" />
                        )
                    }
                </FormItem>
                <FormItem
                 label="描述说明"
                 disabled
                 {...formItemLayout}
                 >
                    {
                        getFieldDecorator('description',{
                            initialValue:detail.description
                        })(
                          <Input.TextArea  placeholder="描述说明" />
                        )
                    }
                </FormItem>
                {
                  this.props.type == 'addData' &&
                  <FormItem
                  name="upload"

                  label="文件上传"
                  {...formItemLayout}>
                  {
                      getFieldDecorator('upload',{
                          rules:[{ required: true, message: '请上传文件' }]

                      })(
                        <Upload {...props} fileList={this.state.fileList}>
                          <Button>
                            <Icon type="upload" />Select File
                          </Button>
                        </Upload>
                      )
                  }

                  </FormItem>
                }
            </Form>
        )
    }
}
AddFileInfo.propTypes = {
  type: ReactPropTypes.string,
  detail: ReactPropTypes.object,
 };
AddFileInfo = Form.create()(AddFileInfo)

let mapStateToProps = (store) => ({...store.IndexStore})
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth)
export default connect(mapStateToProps,mapDispatchToProps )(App);
