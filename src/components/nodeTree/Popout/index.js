import React, { Component, PropTypes } from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../redux/index/index.reducer.js";
import { ChromePicker } from 'react-color';
import opacity from "../../../images/ViewIcon/opacity.png";
import color from '../../../images/ViewIcon/color1.jpg';
class componentName extends Component {
  constructor(props) {
    super(props)
    this.state={
      opacity:0,
      value:'',
      changeSet: {},
      valueRep: this.getValue(this.props.val.color),
      displayColorPicker: false,
    }

  }
  componentDidMount(){
    this.setState({
      value:this.props.val.opacity,
    })
  }
  //改变透明度
  valueChangeInput=(e)=>{
    this.setState({
      value:e.target.value
    })
    let nodes = this.props.val.index
    let opacity = this.state.value
    window.vtk.nodeapis.setNodeOpacity(nodes ,Number(opacity));
  }

  getValue(value) {
    const backgroundColor = [];
    value.map((item, index) => {
      const number = parseInt(~~(item * 255));
      backgroundColor[index] = number.toString(16).length != 1 ? number.toString(16) : '0' + number.toString(16);
    });
    return `rgba(${parseInt(value[0] * 255)}, ${parseInt(value[1] * 255)}, ${parseInt(value[2] * 255)}, ${value[3] || this.props.val.opacity})`;
  }
  handleClick =(e)=> {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }
  handleClose=(e)=> {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ displayColorPicker: false });
  }
  colorChange=(color) => {
    let newColor = `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    this.setState({
      valueRep:newColor
    })
    let index = this.props.val.index
    let colors = [color.rgb.r/255, color.rgb.g /255, color.rgb.b/255]
    window.vtk.nodeapis.setNodeColor(index, colors)
    this.props.SetColor()
  }
  render () {
    const bgColor = this.state.valueRep;
    const popover = { position: 'absolute', zIndex: '999', top: '26px', right: '0px' };
    const cover = { position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' };
    return (
      <div className="Popout">
      <div className='popWrap'>
        <div className='opacity'>
          <img src={opacity} slt='透明度' className='opacityImg'/>
          <input 
            type="range" 
            name="points" 
            min="0" 
            max="1" 
            step="0.1" 
            value={this.state.value}
            title={this.state.value}
            onChange={this.valueChangeInput}
          />
        </div>
        <div className='backColor'>
            <img src={color} slt='颜色' className='colorImg'/>
            <div
              className='getColor'
              onClick={ this.handleClick }
              style={{ background: bgColor }}
            />
            { this.state.displayColorPicker ?
              <div style={ popover }>
                <div style={ cover } onClick={ this.handleClose } />
                <ChromePicker
                  color={ this.state.valueRep }
                  onChange={ this.colorChange }
                />
              </div> : null
            }
        </div>
      </div>
    </div>
    )
  }
}

componentName.propTypes = {

}

let mapStateToProps = (store) => ({...store.IndexStore})  
let mapDispatchToProps = (dispacth) =>bindActionCreators({...IndexAction},dispacth) 
export default connect(mapStateToProps,mapDispatchToProps )(componentName);