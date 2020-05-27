import React, { Component} from 'react';
import {Card, Modal, Form,Input, Button, Icon, Upload, message, Select, List, Typography, Table, Slider} from "antd";
import reqwest from 'reqwest';
import Axios from 'axios';
import jQuery from 'jquery';
import ReactPropTypes from 'prop-types';
import '../../style/stagesOperation.css';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IndexAction from "../../redux/index/index.reducer.js";
const FormItem = Form.Item;
const { confirm } = Modal;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    console.log(this.props);
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
class StagesOperation extends Component {

  constructor() {
    super();
    this.term = [
      {
        title: '期项',
        dataIndex: 'SeriesTitle',
        width: '15%',
        editable: true,
      },
      {
        title: '序列号',
        dataIndex: 'SeriesNumber',
      },
      {
        title: '检查日期',
        dataIndex: 'SeriesDate',
      },
      {
        title: '图像数目',
        dataIndex: 'ImageCount',
      },
      {
        title: '检查类型',
        dataIndex: 'Modality',
      },
      {
        title: '制造商',
        dataIndex: 'Manufacturer',
      },
      {
        title: '机构名称',
        dataIndex: 'InstitutionName',
      }
    ];
    this.archives = [
      {
        title: 'PID',
        dataIndex: 'PatId',
        width: '15%',
      },
      {
        title: '姓名',
        dataIndex: 'PatName',
      },
      {
        title: '性别',
        dataIndex: 'PatSex',
      },
      {
        title: '年龄',
        dataIndex: 'PatAge',
      },
      {
        title: '拼音',
        dataIndex: 'PinYin',
      },
      {
        title: '检查次数',
        dataIndex: 'StudyCount',
      },
      {
        title: '更新时间',
        dataIndex: 'UpdateTime',
      }
    ];
    this.inspect = [
      {
        title: '检查ID',
        dataIndex: 'StudyId',
        width: '25%',
      },
      {
        title: '检查日期',
        dataIndex: 'StudyDate',
        width: '25%',
      },
      {
        title: '检查类型',
        dataIndex: 'Modalities',
        width: '25%',
      },
      {
        title: '备注',
        dataIndex: 'Description',
        width: '25%',
      }
    ];
    this.property = [
      {
        title: '标签',
        dataIndex: 'tag',
        width: '20%',
      },
      {
        title: '说明',
        dataIndex: 'label',
        width: '30%',
      },
      {
        title: '值',
        dataIndex: 'value',
        width: '40%',
      }
    ];
    this.PatId=window.vtk.toolapis.getDicomPatientInfos()[0].PatId;
    this.StudyId=window.vtk.toolapis.getDicomStudyInfos(this.PatId)[0].StudyId;
    this.state = {
      archives:window.vtk.toolapis.getDicomPatientInfos(),
      PatId:window.vtk.toolapis.getDicomPatientInfos()[0].PatId,
      inspect:window.vtk.toolapis.getDicomStudyInfos(this.PatId),
      StudyId:window.vtk.toolapis.getDicomStudyInfos(this.PatId)[0].StudyId,
      term:window.vtk.toolapis.getDicomSeriesInfos(this.PatId, this.StudyId),
      property:[],
      count: 2,
      archivesSelectedRowKeys:[0],
      inspectSelectedRowKeys:[0],
      termSelectedRowKeys: [],
      showProperty: false,
      dataProperty:[],
      dicomInfos:[],
      NodeTreeItem:null
    }
  }
  componentDidMount() {
      document.addEventListener('click', this._handleClick);
      let termSelectedRowKeys = new Array(this.state.term.length);
      var i = termSelectedRowKeys.length
      while(i--){termSelectedRowKeys[i] = i}
      this.setState({termSelectedRowKeys});
   };
 componentWillMount(){

 }
 componentWillReceiveProps(nextProps) {
   if(this.props.openDicom !== nextProps.openDicom) {
     let archives = window.vtk.toolapis.getDicomPatientInfos()
     let patId = window.vtk.toolapis.getDicomPatientInfos()[0].PatId;
     let inspect = window.vtk.toolapis.getDicomStudyInfos(patId);
     let studyId = window.vtk.toolapis.getDicomStudyInfos(patId)[0].StudyId;
     let term = window.vtk.toolapis.getDicomSeriesInfos(patId, studyId);
     // let property= window.toolapis.getDicomSeriesTags(0);
     // let dataProperty=window.toolapis.getDicomSeriesTags(0)[0];
     let termSelectedRowKeys = new Array(term.length);
     var i = termSelectedRowKeys.length
     while(i--){termSelectedRowKeys[i] = i}
     this.setState({
       archives:archives,
       PatId:patId,
       inspect:inspect,
       StudyId:studyId,
       term:term,
       termSelectedRowKeys: termSelectedRowKeys
     });
   }
 }
 _handleClick=()=>{
   this.setState({
     NodeTreeItem: null
   });
 }
 handleSave = row => {
   let newData = [...this.state.term];
   const index = newData.findIndex(item => row.SeriesIndex === item.SeriesIndex);
   const item = newData[index];
   window.vtk.toolapis.setDicomSeriesTitle(row.SeriesIndex, row.SeriesTitle);
   newData.splice(index, 1, {
     ...item,
     ...row,
   });
   this.setState({ term: newData });
 };
 onArchivesSelectChange = selectedRowKeys => {
    this.setState({ archivesSelectedRowKeys: selectedRowKeys});
    let archiveKey =  selectedRowKeys[0];
    let PatId = this.state.archives[archiveKey].PatId;
    let inspect = window.vtk.toolapis.getDicomStudyInfos(PatId);
    let inspectSelectedRowKeys=[0];
    let StudyId = inspect[0].StudyId;
    let term = window.vtk.toolapis.getDicomSeriesInfos(PatId, StudyId);
    let termSelectedRowKeys = new Array(term.length);
    var i = termSelectedRowKeys.length
    while(i--){termSelectedRowKeys[i] = i}

    this.setState({
      PatId: PatId,
      inspect:inspect,
      inspectSelectedRowKeys: inspectSelectedRowKeys,
      StudyId: StudyId,
      term: term,
      termSelectedRowKeys: termSelectedRowKeys
    })
  };
 onInspectSelectChange = selectedRowKeys => {
     this.setState({ inspectSelectedRowKeys: selectedRowKeys });
     let inspectKey =  selectedRowKeys[0];
     let StudyId = this.state.inspect[inspectKey].StudyId;
     let term = window.vtk.toolapis.getDicomSeriesInfos(this.state.PatId, StudyId);
     let termSelectedRowKeys = new Array(term.length);
     var i = termSelectedRowKeys.length
     while(i--){termSelectedRowKeys[i] = i}

     this.setState({
       StudyId: StudyId,
       term: term,
       termSelectedRowKeys: termSelectedRowKeys
     })
   };
 onTermSelectChange = selectedRowKeys => {
    let property = selectedRowKeys.length===0?window.toolapis.getDicomSeriesTags(0): window.toolapis.getDicomSeriesTags(selectedRowKeys[0]);
    this.setState({
      termSelectedRowKeys: selectedRowKeys,
     });
  };
  showProperty = (index)=> {
    let property=window.toolapis.getDicomSeriesTags(index);
    this.setState({
      property: property,
      dataProperty:property[0]
     });
    this.setState({showProperty: true});
  }
  cancel = ()=>{
    this.setState({showProperty: false});
  }

changeValue = (value)=>{
  let data = this.state.property[parseInt(value)];
  this.setState({dataProperty: data});
}
openDicom=()=>{
  if(this.props.dicom === '')
  return;
  if(this.state.termSelectedRowKeys.length === 0){
    message.error('请选择要打开的序列');
  }else{
    if(this.state.termSelectedRowKeys.length!==0){
      let seriesIndexArray = [];
      let openDicomArray = [];
      this.state.termSelectedRowKeys.map((item)=>{
        let nodeInfo = {};
        let seriesIndex;
        nodeInfo.index =window.vtk.toolapis.prepareDicomSeries(item);
        // window.vtk.toolapis.openDicomSeries(this.state.term[item].SeriesIndex);
        nodeInfo.name= this.state.term[item].SeriesTitle;
        seriesIndex =  this.state.term[item].SeriesIndex;
        openDicomArray.push(nodeInfo);
        seriesIndexArray.push(seriesIndex);
      })
      this.props.setOpenDicomArray(openDicomArray);
      window.vtk.toolapis.openDicomSeriesList(seriesIndexArray);
    }
    // if(this.props.seriesList===[]|| (this.props.seriesList!==[]&& (this.state.termSelectedRowKeys !== this.props.seriesList))){
    //     this.props.setProgressVisible(true);
    // }

    this.props.pageSwitch();
  }


}
onContextMenu=(record,e)=>{
  e.preventDefault()
  // // let scrollHeight = e.currentTarget.parentNode.scrollTop;
  // var x = e.currentTarget.offsetLeft + e.currentTarget.clientWidth;
  // var y = e.currentTarget.offsetTop;
  this.setState({
    NodeTreeItem: {
      pageX: e.pageX,
      pageY: e.pageY,
      data:record,
    }
  });
}
getNodeTreeMenu() {
  const {pageX, pageY, data} = {...this.state.NodeTreeItem};
  const tmpStyle = {
    position: 'absolute',
    textAlign: 'center',
    left: this.props.leftExpand?`${pageX}px`: `${pageX - 320}px`,
    top: `${pageY - 75}px`,
  };
  let index = data.SeriesIndex;
  const menu = (
    <ul
     className='rightMenu'
     style={tmpStyle}
    >
      <li className='rightMenuItem'>
         <Icon type='minus-circle-o' /><span className='rightMenuItemText' onClick={this.showProperty.bind(this,index)}>查看属性</span>
      </li>
    </ul>
  );
  return (this.state.NodeTreeItem == null) ? '' : menu;
}
render(){
    const {archivesSelectedRowKeys, inspectSelectedRowKeys, termSelectedRowKeys} = this.state;
    const archivesRowSelection = {
      selectedRowKeys:archivesSelectedRowKeys,
      onChange: this.onArchivesSelectChange,
      type:'radio',
    };
    const inspectRowSelection = {
      selectedRowKeys:inspectSelectedRowKeys,
      onChange: this.onInspectSelectChange,
      type:'radio',
    };
    const termRowSelection = {
      selectedRowKeys: termSelectedRowKeys,
      onChange: this.onTermSelectChange,
    };
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.term.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
  return(
    <div className='maincontent' style={this.props.pageSwitch==true ? {zIndex:-1} : {zIndex:0} }>
      <div className='dataOperation'>
      {/*
        <div className='dataOperationBtn'>
         <Icon type="project" style={{fontSize:'24px',display:'block',paddingBottom: '5px'}} onClick={this.showProperty}/>
          查看属性
        </div>
        */}

        <div className='dataOperationBtn' style={this.props.dicom!==''? {}:{opacity:'.3'}}>
         <Icon type="folder-open" style={{fontSize:'24px',display:'block',paddingBottom: '5px'}} onClick={this.openDicom}/>
          打开数据
        </div>

      </div>
      <div className='property'>
        <div className='dataPropertyImg'>
        {
          this.state.term.map((item, index)=>{
            return(<div key={index} className='termImgTitle'><span>{item.SeriesDescription}</span><img src={item.PreviewImage} slt='预览'  /></div>)
          })
        }
        </div>
        <div className='dataProperty blackTable'>
          <h4>档案</h4>
          <Table
              className='archivesTable'
              pagination={false}
              rowSelection={archivesRowSelection}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={this.state.archives}
              columns={this.archives}
              scroll={{y: 140}}
            />
             <h4>检查</h4>
            <Table
                className='inspectTable'
                pagination={false}
                rowSelection={inspectRowSelection}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={this.state.inspect}
                columns={this.inspect}
                scroll={{y:150}}
              />
              <h4>序列</h4>
              <Table
                  onRow={record => {
                   return {
                     onContextMenu: this.onContextMenu.bind(this,record)
                   };
                  }}
                  className='termTable'
                  pagination={false}
                  rowSelection={termRowSelection}
                  components={components}
                  rowClassName={() => 'editable-row'}
                  bordered
                  dataSource={this.state.term}
                  columns={columns}
                  scroll={{y:230}}
                />
               {this.state.NodeTreeItem != null ? this.getNodeTreeMenu() : ""}
        </div>


          <Modal
              title='查看属性'
              wrapClassName={'blackTable modalStyle propertyModal'}
              visible={this.state.showProperty}
              onOk={this.cancel}
              okText={'确定'}
              cancelText='取消'
              onCancel={this.cancel}
          >
          {/*
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
          */}
              <Slider
                defaultValue={0}
                max={this.state.property.length}
                onChange={this.changeValue}
                />
            <Table
               columns={this.property}
               pagination={false}
               scroll={{y:400}}
               dataSource={this.state.dataProperty}
               bordered
             />
          </Modal>
      </div>

    </div>
  )
}

}
// StagesOperation.propTypes = {
//   pageSwitch: ReactPropTypes.bool,
//   DicomSeriesTags: ReactPropTypes.array,
//   pageSwitch:ReactPropTypes.func,
//   setProgressVisible:ReactPropTypes.func,
//   openFile:ReactPropTypes.string,
//  };
StagesOperation = Form.create()(StagesOperation)
// export default StagesOperation;
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
export default connect(mapStateToProps, mapDispatchToProps)(StagesOperation);
