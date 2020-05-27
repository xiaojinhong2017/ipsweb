import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Select, Icon} from "antd";
import leftBot from '../../images/ViewIcon/two.png';
import leftTop from '../../images/ViewIcon/position-left-top.png';
import rightBot from '../../images/ViewIcon/position-right-bot.png';
import rightTop from '../../images/ViewIcon/position-right-top.png';
import * as IndexAction from "../../redux/index/index.reducer.js";
const { Option } = Select;

class ViewControl extends Component{
  constructor(){
        super();
        this.state = {
          value:''
        };
    }
    componentWillReceiveProps(nextProps) {

      if(this.props.openDicomArray !== nextProps.openDicomArray){
        if(nextProps.openYcm !== ''){
           let index = nextProps.openDicomArray.length ===0 ?'': nextProps.openDicomArray[0].index;
           this.setState({value:index});
        }else if(nextProps.dicom !== '') {
           let index = nextProps.openDicomArray.length ===0 ?'': nextProps.openDicomArray[nextProps.openDicomArray.length-1].index;
           this.setState({value:index});
        }else if(nextProps.openFile === '') {
          this.setState({value:''});
        }


      }
    }
    handleChange=(value)=> {
      window.vtk.nodeapis.switchToImageNode(value);
      this.setState({value:value});
    }
  render() {
    return (
      <div className="viewControl"  style={this.props.isDicom? this.props.pageSwitch===true ? {} : {"display":'none'}: {}}>
        <Select
        value={this.state.value}
        style={{ width: 120,display:'inline-block' }}
        onChange={this.handleChange}>
          {
            this.props.openDicomArray.map((item,index)=>{
              return(<Option value={item.index}>{item.name}</Option>)
            })
          }
       </Select>
      </div>
    );
  }
}
ViewControl.propTypes = {
  setViewport: ReactPropTypes.func,
 };
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewControl);
