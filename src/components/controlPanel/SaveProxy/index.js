import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IndexAction from "../../../redux/index/index.reducer.js";


const Lists = [
  { id: '0', type: '0', text: '保存当前YCM工程' },
  { id: '1', type: '1', text: '另存为原始数据新增项' },
  { id: '2', type: '2', text: '另存为重建数据新增项' }
];

class SaveProxy extends Component{
  constructor(){
        super();
        this.state = {
          display:false,
        };
    }

  componentWillMount() {
    this.timer = null;
  }

  setViewport=(e)=> {
    let type = e.target.getAttribute('data-type');
    const dataType = this.props.dataInfo === {}? '':this.props.dataInfo.type;
    console.log(type,this.props.openYcm, type ==='1' && this.props.openYcm!=='');
    if(this.props.openDicomArray.length !== 0 && type ==='1' && this.props.openYcm!==''){
      this.props.setToolTip('当前数据是YCM工程，不能保存为原始数据新增项');
      return;
    }
    if((this.props.openDicomArray.length !== 0 &&  type ==='0' &&  this.props.openYcm ==='' && dataType =='1')||(this.props.openDicomArray.length !== 0 &&  type ==='0' &&  this.props.dicom!=='' && dataType =='2')) {
       this.props.setToolTip('当前数据是原始数据，不能保存为YCM工程，可以通过选择‘保存为重建数据新增项’来保存YCM工程');
       return;
    }
    this.props.saveProxy(true, type);
    clearTimeout(this.timer);
    this.timer = null;
  }

  handleClick=(e)=> {
    this.setState({
      display: true,
    });
    clearTimeout(this.timer);
    this.timer = null;
    this.timer = setTimeout(() => {
      this.setState({ display: true });
      clearTimeout(this.timer);
      this.timer = null;
    }, 3000);
  }

  handleTouch=(e)=> {
    let type = e.target.getAttribute('data-type');
    this.props.saveProxy(true, type);
    this.setState({
      display: false,
    });
    clearTimeout(this.timer);
    this.timer = null;
  }

  mouseLeave=()=> {
    this.setState({
      display: false,
    });
    clearTimeout(this.timer);
    this.timer = null;
  }

  render() {
    return (
      <div data-idx="4" className={this.props.className} onClick={this.handleClick} onMouseLeave={this.mouseLeave} title={'保存当前病例'}>
        <ul className={this.state.display ? 'viewportContainer' : 'viewportContainerHide'}>
          {
            Lists.map(list => <li key={list.id} data-type={list.type} onClick={this.setViewport} onTouchEnd={this.handleTouch} >{list.text}</li>)
          }
        </ul>
      </div>
    );
  }
}
// SaveProxy.propTypes = {
//   saveProxy: ReactPropTypes.func,
// };
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
export default connect(mapStateToProps, mapDispatchToProps)(SaveProxy);
