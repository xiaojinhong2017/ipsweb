import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../style/ProxyContent.css';
import reqwest from 'reqwest';
import { message} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IndexAction from "../../../redux/index/index.reducer.js";

class ProxyContent extends Component{
  constructor(){
        super();
        this.state = {
          value: '',
          path: '',
          isDragging: false,
          relativeX: null,
          relativeY: null,
          moveInX: (window.innerWidth / 2) - 175,
          moveInY: window.innerHeight * 0.2,
          filePath:'',
          inputShow:true,
        };
    }

  componentWillMount() {
    let file = this.props.openFile;
    let obj = file.lastIndexOf("/");
    let fileName=file.substr(obj+1);
    if(this.props.saveType =='0') {
      this.setState({value : fileName});
    }
    this.timer = null;
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
    this.props.saveProxy(false,this.props.saveType);
  }

  inputTouch=(e)=> {
    e.stopPropagation();
    e.target.focus();
  }

  changeValue=(e)=> {
    if (e.target.value.length >= 30) {
      this.setState({
        value: e.target.value,
        error: '不能超过30个字符',
      });
    } else if (e.target.value.match(/[ \\\/@#\$%\^&\*\.]+/g)) {
      this.setState({
        value: e.target.value,
        error: '不能使用非法字符',
      });
    } else {
      this.setState({
        value: e.target.value,
        error: false,
      });
    }
  }

  save=()=> {
    const dataInfo = this.props.dataInfo;
    var data = {
        "responseCode": 0,
        "ossObject": {
          "orderId": dataInfo.orderId,
          "orderNo": dataInfo.orderNo,
          "dataName":this.state.value,
          "dataType":this.props.saveType,
          "type": this.props.saveType,
          "object" : dataInfo.object,
          "isFolder":2,
          "status":1,
      }
    };

    let json = JSON.stringify(data);
    let url = window.requestUrl +'/dmitweb/oss/createDir'
    reqwest({
       url: url,
       method: 'post',
       contentType:'application/json',
       data: json,
       success: (data) => {
         if(data.OTOrderOssObjectDTO.responseCode == 0) {
            this.setState({inputShow: false});
         var writePath =data.OTOrderOssObjectDTO.ossObject.parentObject +data.OTOrderOssObjectDTO.ossObject.dataName;
         if(this.props.saveType ==='1') {
           window.vtk.toolapis.saveDicomSeriesDirectory(writePath.slice(12));
           this.setState({filePath: writePath})
         }else if (this.props.saveType === '2') {
           this.setState({filePath: writePath})
           window.vtk.toolapis.saveDicomSeriesDirectoryWithYcmProject(writePath.slice(12), this.state.value);
         }

       }else if(data.OTOrderOssObjectDTO.responseCode == 2){
          message.error('此文件夹已经存在!');
       }else if(data.OTOrderOssObjectDTO.responseCode == 10016){
          message.error('OSS OBJECT保存失败。');
       }
       },
       error: () => {
         message.error('请求失败');
       },
     });

  }
  confirm=()=> {
     if(this.state.value.trim() === ''){
       this.setState({ error: '名称不能为空' });
     }else if(!this.state.error) {
       if(this.props.saveType ==='0') {
         window.vtk.toolapis.saveYcmProject(this.props.openFile.slice(12));
         this.props.saveProxy(false,this.props.saveType);
       }else if (this.props.saveType === '1' || this.props.saveType === '2') {
         this.save();
     }
  }
}
  Ok=()=>{
    this.props.setIsOpenNew(false);
    this.props.saveProxy(false,this.props.saveType);
    if(this.props.saveType==='1'){
      this.props.setOpenFile(this.state.filePath);
      this.props.setOpenYcm('');
      this.props.setOpenDicom(this.state.filePath);
    }else if(this.props.saveType==='2'){
      var ycmPath = this.state.filePath+ '/' + this.state.value + '.ycm' ;
      this.props.setOpenFile(ycmPath);
      this.props.setOpenYcm(ycmPath);
      this.props.setOpenDicom('');
    }
  }
  No=()=>{
   this.props.setIsOpenNew(false);
   this.props.saveProxy(false,this.props.saveType);
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
        {
          this.props.openDicomArray.length === 0 &&
            <div>
              <div className='mask' />
              <div className='popupTitle' >
                工程管理
                <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
              </div>

              <div className='popupContent' >
                <div className='popupLinePart' >
                  <span style={{ width: '100%', lineHeight: '50px' }}>无数据节点存在！</span>
                </div>
                <div className='btns' >
                  <div className='btn' onClick={this.hidePanel} onTouchEnd={this.hidePanel} style={{ float: 'right' }} >
                    确定
                  </div>
                </div>
              </div>
            </div>
        }
        {
          this.props.openDicomArray.length !== 0 && this.state.inputShow &&
            <div>
              <div className='mask' />
              <div className='popupTitle' >
                工程管理
                <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
              </div>

              <div className='popupContent' >
                <div className='popupLinePart' style={{ lineHeight: '50px' }} >
                  <span>{this.props.saveType ==='0'? '保存为' : '保存数据名称'}</span>
                  <input
                    type="text"
                    disabled = {this.props.saveType==='0'? true: false}
                    value={this.state.value}
                    onTouchEnd={this.inputTouch}
                    onChange={this.changeValue}
                  />
                  { this.state.error && <i className='feedBack'>* {this.state.error}</i> }
                </div>
                <div className='btns' >
                  <div
                    className='btn'
                    onClick={this.confirm}
                  >
                    确定
                  </div>
                  <div className='btn' onClick={this.hidePanel} onTouchEnd={this.hidePanel} >
                    取消
                  </div>
                </div>
              </div>
            </div>
        }
        {
          this.props.isOpenNew &&
            <div>
              <div className='mask' />
              <div className='popupTitle' >
                工程管理
                <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
              </div>
              <div className='popupContent' >
                <div className='popupLine' style={{ lineHeight: '50px' }} >
                  <span>是否切换至新的数据路径？</span>
                </div>
                <div className='btns' >
                  <div
                    className='btn'
                    onClick={this.Ok}
                  >
                    确定
                  </div>
                  <div className='btn' onClick={this.No} onTouchEnd={this.No} >
                    取消
                  </div>
                </div>
              </div>
            </div>
        }
      </div>

    );
  }
}
// ProxyContent.propTypes = {
//   saveType: ReactPropTypes.string,
//   saveProxy:ReactPropTypes.func,
//   dataInfo:ReactPropTypes.object,
//   openFile: ReactPropTypes.string,
//  };
 let mapStateToProps = store => ({
    ...store.IndexStore
 });
 let mapDispatchToProps = dispacth =>
  bindActionCreators(
    {
      ...IndexAction
    },
    dispacth
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProxyContent);
