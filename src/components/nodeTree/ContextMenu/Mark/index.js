import React, { Component, PropTypes } from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../../redux/index/index.reducer.js";
class componentName extends Component {
  constructor(props) {
    super(props)
    this.state={
      isDragging: false,
      relativeX: null,
      relativeY: null,
      moveInX: (window.innerWidth / 2) - 175,
      moveInY: window.innerHeight * 0.35,
    }
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

  componentWillMount=()=> {
    this.select = null;
  }

  hidePanel=(e)=> {
    e.stopPropagation();
    this.props.hideMark();
  }

  inputTouch=(e)=> {
    e.stopPropagation();
    e.target.focus();
  }

  confirm=()=> {
    if (this.select) {
      this.props.labelMark(this.select.value);
    }
  }
  render() {
    return (
      <div
        className='markContent'
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
        <div className='mask' />
        <div className='titlePop' >
          <span>器官标记</span>
          <span onClick={this.hidePanel} onTouchEnd={this.hidePanel} >&times;</span>
        </div>
        <div className='contentW'>
          <div className='linePart' >
            <span>标记选项</span>
            <select ref={(c) => { this.select = c; }} style={{'color':'#000'}} onTouchEnd={this.inputTouch} >
              <option value='arterial'>动脉血管</option>
              <option value='vein'>静脉血管</option>
              <option value='portal_vein'>门静脉血管</option>
              <option value='small_vessels'>细小血管</option>
              <option value='stomach'>胃</option>
              <option value='gallbladder'>胆囊</option>
              <option value='pancreas'>胰脏</option>
              <option value='liver'>肝脏</option>
              <option value='spleen'>脾脏</option>
              <option value='kidney'>肾脏</option>
              <option value='lung'>肺</option>
              <option value='skin'>皮肤</option>
              <option value='bile_duct'>胆管</option>
              <option value='bronchial'>支气管</option>
              <option value='tumor'>占位</option>
              <option value='other'>其他</option>
              <option value='bone'>骨骼</option>
              <option value='cartilage'>软骨</option>
              <option value='meniscus'>半月板</option>
              <option value='NO'>无</option>
              <option value='necrosis_tumor'>坏死肿瘤</option>
              <option value='active_tumor'>活性肿瘤</option>
              <option value='Inferior vena cava'>下腔静脉</option>
            </select>
            <div
              className='btn'
              onClick={this.confirm}
              onTouchEnd={this.confirm}
            >
              标记
            </div>
          </div>
        </div>
      </div>
    );
  }
}

componentName.propTypes = {

}

let mapStateToProps = (store) => ({...store.IndexStore})  
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth) 
export default connect(mapStateToProps,mapDispatchToProps )(componentName);