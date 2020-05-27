import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "./redux/index/index.reducer.js";
import logo from './images/yorktal.png';
import './style/MainView.css';
import './style/RightControl.css';
import ControlPanel  from './components/controlPanel';
import RightControlCenter  from './components/RightControlCenter';
import ViewButtons         from './components/renderControl/ViewButtons';
import ToggleSlice         from './components/renderControl/ViewButtons/ToggleSlice';
import ProgressControl     from './components/ProgressControl';
import SeekBar from './components/seekBar/index.js';
import RightSeek from './components/rightSeek';
import NodeTree from './components/nodeTree';
import StagesOperation from './components/StagesOperation';
import VolumePreset from './components/renderControl/ViewButtons/VolumePreset';
import { Modal, Icon, Table, message } from 'antd';
import Loading  from './components/ProgressControl/Loading';
import VolumeCalculator    from './components/CalculatorValue/VolumeCalculator';
import ViewControl    from './components/viewControl';

 class MainView extends Component{
   constructor(props) {
    super(props);
    this.state = {
      // progressVisible: false,
      volumeVisible: false,
      progressValue: 0,
      activeStyle: { border: '2px solid #1386ff', zIndex: 1, cursor:'pointer'},
      normalStyle: { border: '2px solid #aaa', zIndex: 0, cursor:'pointer' },
      activeClick:{'pointer-events':''},
      normalClick:{'pointer-events':'none'},
      fullScreen:'',
      activeViewId: '',
      expand: false,
      offender:false,
      treeMenu:false,
      parentHeight:0,
      height:0,
      top:0,
      left:0,
      right:0,
      TSVisible:false,
      viewportType:'normal',
      pageSwitch:false,
      expandChange:false,
      isDicom:false,
      openDicom:'',
    }
    this.fullScreen = this.fullScreen.bind(this);
    // this.setProgressVisible = this.setProgressVisible.bind(this);
    this.setProgress = this.setProgress.bind(this);
    this.setActiveView = this.setActiveView.bind(this);
    this.onWindowSize = this.onWindowSize.bind(this);
    this.setExpand = this.setExpand.bind(this);
    this.toggleVolumeVisible = this.toggleVolumeVisible.bind(this);
    this.toggleSliceVisible = this.toggleSliceVisible.bind(this);
    this.hideTgSlice = this.hideTgSlice.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.warning = this.warning.bind(this);
    this.setObservationBackground = this.setObservationBackground.bind(this);
  }

   componentDidUpdate(prevProps) {
     if(prevProps.presetsData.level !== this.props.presetsData.level){
     let { max, min, window, level } = this.props.presetsData;
     let ParentW = this.state.parentHeight;
     let ratio = (max - min) / ParentW;
     let setHeight = (window / ratio / ParentW) * 100;
     let Y = (level - min - window / 2) / ratio;
     let setBottom = (Y / ParentW) * 100;
     let left = 100 - setHeight - setBottom;
     let right = left + setHeight
     if(this.props.presetsData.min===0){
       if(right>=100){
         right =100
       }
     }
     this.setState({
       height: setHeight,
       top: left,
       left:left,
       right: right
     });
   }
   }

   componentWillReceiveProps(nextProps) {
       if(!this.props.expand === nextProps.expand) {
         this.setState({expandChange: true},()=>{
             this.windowSize();
         })
       }else {
         this.setState({expandChange: false});
       }
       if(this.props.dicom!== nextProps.dicom && nextProps.dicom!=='') {
         this.props.setOpenDicomArray([]);
         window.vtk.toolapis.importDicomSeriesDirectory(nextProps.dicom.slice(12),false);
     }
     if(this.props.openYcm!== nextProps.openYcm && nextProps.openYcm!=='') {
         this.props.setOpenDicomArray([]);
         console.log(nextProps.openYcm.slice(12));
         window.vtk.toolapis.openYcmDicomSeries(nextProps.openYcm.slice(12));
       }

   }

   shouldComponentUpdate(nextProps, nextState){
       return true;
   }

   componentDidMount() {
     window.vtk.GlobalOptions.USE_ZIP = true;
     window.vtk.GlobalOptions.USE_DEPTHPEEL = true;
     window.vtk.GlobalOptions.USE_WS_FIRST = true;
     window.vtk.GlobalOptions.USE_DS_FIRST = true;
     window.vtk.GlobalOptions.USE_DATA_SERVER = false;
     window.vtk.GlobalOptions.USE_DICOM_DATA = true;
     window.vtk.GlobalOptions.USE_VR_WINDOW = true;
     window.vtk.GlobalOptions.USE_VR_INVIEW3D = false;
     if(window.type === 'new') {
       window.vtk.GlobalOptions.SHOW_DICOM_INFO = false;
     }
     window.vtk.GlobalOptions.DICOM_MODE = 'single';
     window.vtk.GlobalOptions.ALGO_SERVER_URL = 'ws://'+ window.serverUrl;
     var renderer = window.vtk.Yorktal.vtkYcmRenderer.newInstance();
     // window.vtk.GlobalOptions.YCM_PATH =  nextProps.ycmPath.slice(12);
       window.vtk.GlobalOptions.YCM_PATH =  '';
     renderer.setServerUrl("ws://"+ window.ipconfig +"/data");
     // this.setProgressVisible(true);
     renderer.render();
     // window.vtk.toolapis.openDicomSeriesDirectory(window.dicomDirectory,function(){
     //   var data = window.vtk.toolapis.getDicomSeriesInfos();
     //   alert(data);
     //   window.vtk.toolapis.openDicomSeries(data[0]);
     // });
     window.vtk.apis.registerCallback("FileLoadOnProgress",this.onProgress.bind(this));
     window.vtk.apis.registerCallback("YcmLoadOnProgress", this.onProgress.bind(this));
     window.vtk.apis.registerCallback('WaitingLock', (lock) => {
       if(!this.props.progressVisible){
           this.props.loadingStore(lock);
       }
     });
     window.vtk.apis.registerCallback('ToolDone', (errInfo) => {
       console.log(errInfo);

       if(errInfo.result == 'Success' && errInfo.toolCmd == "OpenYcmDicomSeries") {
           this.setState({
             openDicom:this.props.openFile,
             isDicom:true,
             pageSwitch:true,
           });
            this.props.dataExpand(true);
       }
       if(errInfo.result == 'Error' && errInfo.toolCmd == "OpenYcmDicomSeries") {
          window.vtk.toolapis.closeYcmProject();
          this.props.setOpenFile('');
          this.props.setOpenYcm('');
       }
       if(errInfo.result == 'Success' && errInfo.toolCmd == "ImportDicomSeriesDirectory") {
           if(window.vtk.toolapis.getDicomPatientInfos('').length === 0){
             this.props.setToolTip('该文件夹下没有Dicom文件');
             this.props.setOpenFile('');
             this.props.setOpenDicom('');
             return false;
           }
           this.setState({
             openDicom:this.props.openFile,
             isDicom:true,
             pageSwitch:false,
           });
           this.props.dataExpand(true);
       }

       if(errInfo.result == 'Success' && errInfo.toolCmd == "SaveDicomSeriesDirectory") {
         this.props.setIsOpenNew(true);
         this.props.getData();
         this.props.setDataInfo(this.props.rootMenu[0]);
         // this.props.setToolTip(errInfo.reason + ' : ' + errInfo.detail);
       }
       if(errInfo.result == 'Success' && errInfo.toolCmd == "SaveDicomSeriesDirectoryWithYcmProject") {
         this.props.setIsOpenNew(true);
         this.props.getData();
         this.props.setDataInfo(this.props.rootMenu[0]);
       }
       if(errInfo.result == 'Success' && errInfo.toolCmd == "SaveYcmProject") {
         message.success("保存成功");
       }
       if(errInfo.result == "Error" && errInfo.toolCmd == "SaveYcmProject") {
         message.success("保存失败");
       }
       if(errInfo.result == "Error" && errInfo.toolCmd == "SaveDicomSeriesDirectoryWithYcmProject") {
         message.success("保存失败");
         this.props.getData();
       }
       if(errInfo.result == "Error" && errInfo.toolCmd == "SaveDicomSeriesDirectory") {
         message.success("保存失败");
         this.props.getData();
       }

       if(errInfo.result == 'Success' && errInfo.toolCmd == "SurfaceCut") {
         this.props.ndoes3D(window.vtk.nodeapis.getViewNodeList(3));
         this.props.setVolumeString(window.vtk.nodeapis.getVolumeStr());
         if(this.props.volumeString !== '') {
           this.props.setVolumeCalculator(true);
         }
       }else if(errInfo.result == 'Error' && errInfo.toolCmd == "SurfaceCut") {
         this.props.setToolTip(errInfo.reason + ':' + errInfo.detail);
         this.props.setVolumeString('');
       }else if(errInfo.result == 'Error') {
         this.props.setToolTip(errInfo.reason + ' : ' + errInfo.detail);
       }
     });
     var domElementXY = window.vtk.apis.getDomElement('ViewXY');
     this.refs.viewXY.appendChild(domElementXY);
     var domElementYZ = window.vtk.apis.getDomElement('ViewYZ');
     this.refs.viewYZ.appendChild(domElementYZ);
     var domElementXZ = window.vtk.apis.getDomElement('ViewXZ');
     this.refs.viewXZ.appendChild(domElementXZ);
     var domElement3D = window.vtk.apis.getDomElement('View3D');
     this.refs.view3D.appendChild(domElement3D);
     var domElementVR = window.vtk.apis.getDomElement('ViewVR');
     if (domElementVR) {
       window.domElementVR = true;
       this.refs.viewVR.appendChild(domElementVR);
     } else {
       window.domElementVR = false;
       this.refs.viewVR.style.display = "none";
     }

     window.vtk.apis.updateWindowSize();
     window.vtk.apis.getDicomInfoVisible(false);
     this.client = window.navigator.userAgent;
     this.mobile = !!this.client.match(/AppleWebKit.*Mobile.*/); // 是否为移动终端
     this.ios = !!this.client.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
     this.android = this.client.indexOf('Android') > -1 || this.client.indexOf('Adr') > -1; // android终端
     this.iPhone = this.client.indexOf('iPhone') > -1; // 是否为iPhone或者QQHD浏览器
     this.iPad = this.client.indexOf('iPad') > -1; // 是否iPad
     if (this.mobile || this.ios || this.android || this.iPhone || this.iPad) {
         this.onWindowSize(this.state.fullScreen, true);
     }else {
         this.onWindowSize(this.state.fullScreen, this.state.expand);
     }
     this.onWindowSize(this.state.fullScreen, this.state.expand);
     window.addEventListener('resize',  this.windowSize.bind(this), false);
     window.vtk.apis.setStyleMode2D(0);
     let textured = window.vtk.apis.getTexturedBackground3D();
     window.vtk.apis.setTexturedBackground3D(!textured);
     window.vtk.apis.applyLightPreset('default');
     window.presets = window.vtk.apis.getVolumeRenderPresets();
     window.presets2 = window.vtk.apis.getVolumeRenderPresets2();
   }
    // setProgressVisible(bool) {
    //   this.setState({ progressVisible: bool, progressValue: 0 });
    // }

   setProgress() {
     this.setState({progressValue: 0 });
   }
   onProgress(progressData) {
     console.log('---------');
       var progress = parseInt(progressData.progress);
       if(progress>0 && progress <100){
         this.props.setProgressVisible(true);
         if(this.props.openYcm && this.props.openDicomArray.length===0) {
           console.log(this.props.openDicomArray,window.vtk.nodeapis.getImageNodeList());
            this.props.setOpenDicomArray(window.vtk.nodeapis.getImageNodeList());
         }
       }
       if (progress === 100) {
        this.setState({
          offender:true
        })
          this.generateNodeList()
          this.generateNodeObject()
        }
       if (progress > this.state.progressValue) {
         this.setState({ progressValue: progressData.progress });
        }
   }

   generateNodeObject=()=>{
    let { max, min, window, level } = this.props.presetsData;
    let ParentW = this.state.parentHeight;
    let ratio = (max - min) / ParentW;
    let setHeight = (window / ratio / ParentW) * 100;
    let Y = (level - min - window / 2) / ratio;
    let setBottom = (Y / ParentW) * 100;
    let left = 100 - setHeight - setBottom;
    let right = left + setHeight
    if(this.props.presetsData.min===0){
      if(right>=100){
        right =100
      }
    }
    this.setState({
      height: setHeight,
      top: left,
      left:left,
      right: right
    });
   }
   generateNodeList=()=>{
    let viewNodes2D = window.vtk.nodeapis.getViewNodeList(0);
    let viewNodes3D = window.vtk.nodeapis.getViewNodeList(3);
    let ObjectStr = window.vtk.apis.getWindowLevelInfo();
    let info0 = window.vtk.apis.getSliceInfo(0);
    let info1 = window.vtk.apis.getSliceInfo(1)
    let info2 = window.vtk.apis.getSliceInfo(2)
    this.props.ndoes2D(viewNodes2D);
    this.props.ndoes3D(viewNodes3D);
    this.props.presets(ObjectStr);
    this.props.infoA(info0);
    this.props.infoB(info1);
    this.props.infoC(info2);
  }
   fullScreen(e) {
     const et = e.target ? e.target : e;
     if (this.state.fullScreen || e === '') {
       this.updateFullScreen(this.state.expand);
     } else {
       this.setState({
         fullScreen: et.getAttribute('data-type')
       },function(){
          this.windowSize();

       });
     }
   }

   updateFullScreen(expand) {
     // if(this.prop)
     this.setState({ fullScreen: '' },function(){
       // this.onWindowSize('', expand);
       this.windowSize();
     });
   }

   setActiveView(id) {
     if (window.vtk.apis) {
       window.vtk.apis.setActiveWindow(id);
       this.setState({activeViewId: window.vtk.apis.getActiveWindow()})
     }
     window.vtk.apis.registerCallback("SliceChanged", () => {
      const sliceInfo0 = window.vtk.apis.getSliceInfo(0);
      const sliceInfo1 = window.vtk.apis.getSliceInfo(1);
      const sliceInfo3 = window.vtk.apis.getSliceInfo(2);
      this.props.info(sliceInfo0,sliceInfo1,sliceInfo3)
    });

   }

   setExpand() {
     this.setState({expand: !this.state.expand},function(){
       if(!this.state.expand && this.state.viewportType!=='normal'){
         this.timer = setTimeout(() => {
            this.windowSize();
           clearTimeout(this.timer);
           this.timer = null;
         }, 5);
       }else {
           this.windowSize();
       }
     });
   }


   setViewport=(type)=>{
     this.setState({viewportType: type},
     function(){
       this.windowSize();
     })
   }
    onWindowSize(id, expand = false) {
      var list = document.getElementsByTagName('canvas');
      var expandWidth = expand ? 60 : 400;
      // var expandWidth = 0;
      for (var i in list) {
        if (list[i].parentNode) {
          if (list[i].parentNode.parentNode.id === id) {
            list[i].parentNode.style.width = window.innerWidth - expandWidth - 34 - 320 + 'px';
            list[i].parentNode.style.height =  window.innerHeight - 80 - 4 + 'px';
            list[i].style.width = window.innerWidth - expandWidth - 34 - 153 + 'px';
            list[i].style.height =  window.innerHeight - 80 - 4 + 'px';
          } else {
            list[i].parentNode.style.width = (window.innerWidth - expandWidth - 320) / 2 - 34 + 'px';
            list[i].parentNode.style.height =  (window.innerHeight - 80) / 2 - 4 + 'px';
            list[i].style.width = (window.innerWidth - expandWidth - 320) / 2 - 34 + 'px';
            list[i].style.height =  (window.innerHeight - 80) / 2 - 4 + 'px';
          }
        }
      }
      if(window.vtk.apis.updateWindowSize) {
        window.vtk.apis.updateWindowSize();
      }
    }

    windowSize() {
       var list = document.getElementsByTagName('canvas');
       for (var i in list) {
         if (list[i].parentNode && (list[i].parentNode.className !== 'OpenFileProgress'||list[i].parentNode.className !== 'OpenFileProgressLeft'||list[i].parentNode.className !== 'OpenFileProgressRight'||list[i].parentNode.className !== 'OpenFileProgressLeftAndRight' )) {
             list[i].parentNode.style.width = list[i].parentNode.parentNode.offsetWidth - 34 + 'px';
             list[i].parentNode.style.height = list[i].parentNode.parentNode.offsetHeight - 8 + 'px';
             list[i].style.width = list[i].parentNode.parentNode.offsetWidth - 34 + 'px';
             list[i].style.height = list[i].parentNode.parentNode.offsetHeight - 8 + 'px';
         }
       }
         window.vtk.apis.updateWindowSize();
   };
    warning(title, message) {
      Modal.warning({
        title: title,
        content: message,
        className:'warning'
      });
    }


    styleInit=(parentHeight)=>{
      this.setState({
        parentHeight: parentHeight
      });
    }
    styleLine=(top ,right)=>{
      this.setState({
          top: top,
          left: top,
          right: right
      });
    }
    styleStart=(top,height)=>{
        this.setState({
          top: top,
          height:height,
          left: top
        });
    }
    styleEnd=(top,height)=>{
      this.setState({
        height: height,
        right: top
      });
    }

  toggleVolumeVisible (){
    this.setState({
      volumeVisible: !this.state.volumeVisible,
    },function(){
      this.windowSize();
    });
    this.props.loadingStore(true);
    window.vtk.apis.volumeRender(!window.vtk.apis.isVolumeRender());
    var isVR = window.vtk.apis.isVolumeRender();
    if (window.domElementVR) {
      window.vtk.apis.setVRWindowVisible(isVR);
    } else {
      window.vtk.apis.setVRWindowVisible(isVR);
      // window.vtk.apis.set3DWindowVisible(!isVR);
    }
    this.props.loadingStore(false);
  }
  toggleSliceVisible() {
    this.setState({
      TSVisible: !this.state.TSVisible,
    });
    this.timer = setTimeout(() => {
      this.setState({ TSVisible: false });
      clearTimeout(this.timer);
      this.timer = null;
    }, 3000);
  }
  hideTgSlice() {
    this.setState({ TSVisible: false });
  }
  clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }
  setObservationBackground(){
    var textured = window.vtk.apis.getTexturedBackground3D();
    window.vtk.apis.setTexturedBackground3D(!textured);
    var preset = window.vtk.apis.getLightPreset();
      if (preset === "bright"){
        window.vtk.apis.applyLightPreset("default");
      } else{
        window.vtk.apis.applyLightPreset("bright");
      }
  }

  handleOk=()=>{
    this.props.setToolTip('');
  }
  dataExpand=()=>{
     this.props.dataExpand(!this.props.expand);
  }
  pageSwitch=()=>{
    this.setState({pageSwitch:!this.state.pageSwitch});
  }
  closeDicom=()=>{
    this.setState({isDicom:false});
  }
  render() {
    const filePath = this.props.openFile? this.props.openFile.split(this.props.dataInfo.orderNo)[1]: '';
    let viewportTypeX = 'viewport viewBase';
    let viewportTypeY = 'viewport viewBase';
    let viewportTypeZ = 'viewport viewBase';
    let viewportType3D = 'viewport viewBase';
    if(this.state.viewportType === 'viewportTwoPoints') {
      viewportTypeX = 'viewportTwoPoints viewBase';
      viewportType3D = 'viewportTwoPoints viewBase';
      viewportTypeY = 'viewportTwoPointsHide viewBase';
      viewportTypeZ = 'viewportTwoPointsHide viewBase';
    } else if(this.state.viewportType === 'viewportOneTop') {
        viewportTypeX = 'viewportOneTop viewBase';
        viewportType3D = 'viewportThreeBottom viewBase';
        viewportTypeY = 'viewportThreeBottom viewBase';
        viewportTypeZ = 'viewportThreeBottom viewBase';
    } else if(this.state.viewportType === 'viewportLeftOne'){
        viewportTypeX = 'viewportActive viewBase';
        viewportType3D = 'viewportSmall viewBase';
        viewportTypeY = 'viewportSmall viewBase';
        viewportTypeZ = 'viewportSmall viewBase';
    }

    return (
      <div className="container">
        <div className="topBar">
          <div className="topTitle">
            <div title={!this.props.expand ? '收起菜单' : '展开菜单'}  className={this.props.expand? 'fa fa-bars topMenuItem ':'fa fa-bars topMenuItem topMenuItemActive'} onClick={this.dataExpand} />
            {
              this.state.isDicom &&
              <div title='切换' className={this.state.pageSwitch? 'fa fa-window-restore topMenuItem ':'fa fa-window-restore topMenuItem topMenuItemActive'} onClick={this.pageSwitch} />
            }
            <ViewControl
              setViewport={this.setViewport}
              pageSwitch={this.state.pageSwitch}
              isDicom={this.state.isDicom}
              />
            {
              filePath!=='' &&
                <span style={{"lineHeight": "40px",'fontSize':'15px',}}>当前数据：&nbsp;{filePath}</span>
            }
          </div>
          <div className="menu" style={this.state.isDicom? this.state.pageSwitch===true ? {} : {"display":'none'}: {}}>
            <ControlPanel
              setViewport={this.setViewport}
              closeDicom={this.closeDicom}
            />
          </div>
        </div>
        {
          this.state.isDicom &&
          <StagesOperation
            pageSwitch={this.state.pageSwitch}
            pageSwitch={this.pageSwitch}
            openDicom={this.state.openDicom}
            leftExpand={this.props.expand}
           />
        }
        <div className="mainContent" style={this.state.isDicom? this.state.pageSwitch===true ? {zIndex:0} : {zIndex:-1}: {} }>
        {/*<div className="viewContainer"> */}

          <div className={this.state.viewportType === 'normal' ||  this.state.viewportType === 'viewportOneTop'? 'VTKContainer' : "VTKContainer VTKcontainerActive"}>
            <div  id='2' ref='viewXY'
              onClick={this.setActiveView.bind(this, 2)}
              className={this.state.fullScreen ==='' ? viewportTypeX : this.state.fullScreen === '2'? 'viewportLarge viewBase' : viewportTypeX }   style = {this.state.activeViewId !== 2 ?
              this.state.normalStyle :  this.state.fullScreen === '' ? this.state.activeStyle : this.state.fullScreen === '2'? this.state.activeStyle : Object.assign({}, this.state.normalStyle, {'display': 'none'})}>
              <ViewButtons
              fullScreen={this.fullScreen}
              type={this.state.fullScreen}
              label= ''
              viewId='2'/>
              <NodeTree  index={2} treeMenu={this.state.treeMenu} />
              {
                this.state.offender && <SeekBar
                  viewId='2'
                  styleInit={this.styleInit}
                  styleLine={this.styleLine}
                  styleStart={this.styleStart}
                  styleEnd={this.styleEnd}
                  height={this.state.height}
                  top={this.state.top}
                  left={this.state.left}
                  right={this.state.right} />
              }
              <div
                 style = {this.state.activeViewId !== 2 ?
                  this.state.normalClick :  this.state.fullScreen === '' ?
                  this.state.activeClick : this.state.fullScreen === '2'?
                  this.state.activeClick : ""}
                ref={(ref)=>{this.indexId=ref}}
                >< RightSeek index={2}/>
              </div>
            </div>
            <div id='0' ref='viewYZ'  onClick={this.setActiveView.bind(this, 0)} className={this.state.fullScreen ==='' ? viewportTypeY : this.state.fullScreen === '0'? 'viewportLarge viewBase' : viewportTypeY } style = {this.state.activeViewId !== 0 ?
              this.state.normalStyle : this.state.fullScreen === '' ? this.state.activeStyle : this.state.fullScreen === '0'? this.state.activeStyle : Object.assign({}, this.state.normalStyle, {'display': 'none'})}>
              <ViewButtons
              fullScreen={this.fullScreen}
              type={this.state.fullScreen}
              label= ''
              viewId='0'/>
              <NodeTree index={0} treeMenu={this.state.treeMenu} />
              {
                this.state.offender &&  <SeekBar
                  viewId='0'
                  styleInit={this.styleInit}
                  styleLine={this.styleLine}
                  styleStart={this.styleStart}
                  styleEnd={this.styleEnd}
                  height={this.state.height}
                  top={this.state.top}
                  left={this.state.left}
                  right={this.state.right} />
              }
              <div
                 style = {this.state.activeViewId !== 0 ?
                  this.state.normalClick :  this.state.fullScreen === '' ?
                  this.state.activeClick : this.state.fullScreen === '0'?
                  this.state.activeClick : ""}
                ref={(ref)=>{this.indexId=ref}}
                >< RightSeek index={0}/>
              </div>
            </div>
            <div id='1' ref='viewXZ' onClick={this.setActiveView.bind(this, 1)} className={this.state.fullScreen ==='' ? viewportTypeZ : this.state.fullScreen === '1'? 'viewportLarge viewBase' : viewportTypeZ }  style = {this.state.activeViewId !== 1 ?
              this.state.normalStyle : this.state.fullScreen === '' ? this.state.activeStyle : this.state.fullScreen === '1'? this.state.activeStyle : Object.assign({}, this.state.normalStyle, {'display': 'none'})}>
              <ViewButtons
              fullScreen={this.fullScreen}
              type={this.state.fullScreen}
              label= ''
              viewId='1'/>
              <NodeTree index={1} treeMenu={this.state.treeMenu}/>
              {
                this.state.offender &&  <SeekBar
                  viewId='1'
                  styleInit={this.styleInit}
                  styleLine={this.styleLine}
                  styleStart={this.styleStart}
                  styleEnd={this.styleEnd}
                  height={this.state.height}
                  top={this.state.top}
                  left={this.state.left}
                  right={this.state.right}/>
              }
              <div
                 style = {this.state.activeViewId !== 1 ?
                  this.state.normalClick :  this.state.fullScreen === '' ?
                  this.state.activeClick : this.state.fullScreen === '1'?
                  this.state.activeClick : ""}
                  ref={(ref)=>{this.indexId=ref}}
                >< RightSeek index={1}/>
              </div>
            </div>
            <div id='3' ref='view3D' onClick={this.setActiveView.bind(this, 3)} className={this.setActiveView.bind(this, 1)} className={this.state.fullScreen ==='' ? viewportType3D : this.state.fullScreen === '3'? 'viewportLarge viewBase' : viewportType3D }  style = {this.state.activeViewId !== 3 ?
              this.state.normalStyle : this.state.fullScreen === '' ? this.state.activeStyle : this.state.fullScreen === '3'? this.state.activeStyle : Object.assign({}, this.state.normalStyle, {'display': 'none'})}>
              <ViewButtons
              fullScreen={this.fullScreen}
              type={this.state.fullScreen}
              label= '1'
              viewId='3'/>
              <NodeTree index={3} treeMenu={this.state.treeMenu}/>
              <div className="viewAction">
                <div id="lineDivs"  className="sliders lineDivs"  ref={(ref)=>{this.parent=ref}}>
                </div>
              </div>
              {
                this.props.VolumeCalculator && this.props.volumeString.length !== 0 &&
                  <VolumeCalculator volumeString={this.props.volumeString} />
              }
            </div>
          </div>

          <div  className='viewVR viewportLarge viewBase' style = {{display:this.state.volumeVisible?'block':'none',zIndex:10,backgroundColor:'gray'}}  >
            <div className='viewVR_topBar'>
              <div className='viewVR_title'>体绘制</div>
              <i className='fa fa-times viewVR_close' onClick={this.toggleVolumeVisible}></i>
            </div>
            <div className='viewVR_container'>
              <ul className='viewButtons'>
                <li className="Observation viewbutton" onClick={this.setObservationBackground} title={'光照/背景'} >button</li>
                <div className="SliceShow viewbutton" onClick={this.toggleSliceVisible} onMouseLeave={this.hideTgSlice}  title={'显示/隐藏切面'} >
                  <ToggleSlice
                    TSVisible={this.state.TSVisible}
                    hideTgSlice={this.hideTgSlice}
                    clearTimer={this.clearTimer}
                  />
                </div>
              </ul>
              <div ref='viewVR' className='viewVR_VR'></div>
                <ul className='viewVR_dot'>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
              <VolumePreset
              volumeVisible={this.state.volumeVisible}
              presets={window.presets}
              presets2={window.presets2}/>
            </div>
        </div>
            <RightControlCenter
              windowSize={this.onWindowSize}
              fullScreen={this.state.fullScreen}
              setExpand={this.setExpand}
              toggleVolumeVisible={this.toggleVolumeVisible}
            />
        </div>
        {
          this.props.progressVisible && this.props.openFile&&
          <ProgressControl
            setProgressVisible={this.props.setProgressVisible}
            setProgress={this.setProgress}
            progressValue={this.state.progressValue}
            leftExpand={this.props.expand}
            rightExpand={this.state.expand}
          />
        }
        {
          this.props.loading &&
            <Loading
              leftExpand={this.props.expand}
              rightExpand={this.state.expand}
            />
        }
        <Modal
          style={{ top: 200}}
          width={400}
          className="modalStyle warning"
          title="提示"
          okText="确认"
          visible={this.props.toolTip!==''? true:false}
          onOk={this.handleOk}
          onCancel={this.handleOk}
        >
          <p>{this.props.toolTip}</p>
        </Modal>

      </div>
    );

  }

}

let mapStateToProps = (store) => ({...store.IndexStore})
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth)
export default connect(mapStateToProps,mapDispatchToProps )(MainView);
