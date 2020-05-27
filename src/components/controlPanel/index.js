/* eslint no-alert: 0 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Modal} from "antd";
import * as IndexAction from "../../redux/index/index.reducer.js";
import ViewportControl  from './ViewportControl';
import SaveProxy  from './SaveProxy';
import ProxyContent  from './ProxyContent';
import '../../style/ToggleIcons.css';
import 'font-awesome/css/font-awesome.min.css';
const { confirm } = Modal;

class ControlPanel extends Component {
  constructor() {
    super();
    this.state = {
      dataVisible : false,
      saveVisible:false,
      saveType:'',
    }
    this.showData = this.showData.bind(this);
    this.hideData = this.hideData.bind(this);
  }

  showData(e) {
     // this.updateActive(e);
     this.setState({ dataVisible: true });
  }

  hideData() {
    this.setState({ dataVisible: false });
  }

  saveProxy=(saveVisible, saveType)=> {
    this.setState({ saveVisible: saveVisible, saveType:saveType});
  }

  close=()=>{
    if(this.props.openFile === '') return;
    let _this = this;
    confirm({
      title: '是否关闭当前数据？',
      content: '',
      className:'modalStyle confirm',
      onOk() {
        window.vtk.toolapis.closeYcmProject();
        _this.props.setOpenDicomArray([]);
        _this.props.closeDicom();
        _this.props.setOpenFile('');
        _this.props.setOpenYcm('');
        _this.props.setOpenDicom('');
      },
      onCancel() {},
    });
  }
  render() {
    return (
      <div className="system">
        <div className="systemControl">
        <i className="fa fa-plus playButton" aria-hidden="true"></i>
        <i className="fa fa-reply playButton" aria-hidden="true"></i>
        <i className="fa fa-share playButton" aria-hidden="true"></i>
        <i title="自动播放开始" className="fa fa-play-circle playButton"></i>

        <i title="结束自动播放" className="fa fa-pause-circle pauseButton"></i>

          {/*
            <i className="fa fa-file-text-o openFileButton button"></i>
              <i
                data-idx="1"
                title={'打开病例'}
                className="openFileButton button"
              />
              <i
                data-idx="8"
                title={'本地加速'}
                className="accorlateButton button"
              />
              <i title="切换图像数据节点" className="fa fa-database showData" onClick={this.showData}></i>
              {
                this.state.dataVisible &&
                  <DataSet
                    baseFile={this.props.baseFile}
                    hideData={this.hideData}
                    setProgressVisible={this.props.setProgressVisible}
                  />
              }
              <ViewportControl
                data-idx="4"
                className="fa fa-th-large windowlayout"
                setViewport={this.props.setViewport}
              />
            */}


        {/*
          <i title="窗口布局" className="fa fa-th-large showData"></i>
          */}
          <ViewportControl
            data-idx="4"
            className="fa fa-th-large windowlayout"
            setViewport={this.props.setViewport}
          />
          <SaveProxy
            data-idx="4"
            className="fa fa-save saveProxy"
            saveProxy={this.saveProxy}
          />
          {
            this.state.saveVisible &&
              <ProxyContent
              saveProxy={this.saveProxy}
              saveType={this.state.saveType}
              openFile={this.props.openFile}
               />
          }
        <i title="关闭当前数据" className="fa fa-times saveProxy" onClick={this.close}></i>
        </div>
      </div>
    );
  }

};
// ControlPanel.propTypes = {
//   setViewport: ReactPropTypes.func,
//   openFile: ReactPropTypes.string,
//   setProgressVisible: ReactPropTypes.func,
//  };

 let mapStateToProps = (store) => ({...store.IndexStore})
 let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth)
 export default connect(mapStateToProps,mapDispatchToProps )(ControlPanel);
