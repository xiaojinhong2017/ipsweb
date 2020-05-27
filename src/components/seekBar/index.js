import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IndexAction from "../../redux/index/index.reducer.js";
import "../../../src/style/seekBer.css";
var isMoblie = "ontouchstart" in window;
class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:this.props.height,
      top:this.props.top,
      left:this.props.left,
      right:this.props.right,
      ifBool: false,
      Order:9
    };
  }
  componentDidMount(){
    this.props.styleInit(this.parentW.offsetHeight)
  }
 
  dragStart=(ev)=> {
    this.setState({ ifBool: true });
    ev.preventDefault();
    ev.stopPropagation();
    let target = ev.target;
    if (isMoblie && ev.changedTouches) {
      this.startY = ev.changedTouches[0].pageY;
    } else {
      this.startY = ev.clientY;
    }
    // 偏移位置 = 鼠标的初始值 - 元素的offset
    this.disY = this.startY - target.offsetTop;
    // console.log(this.disY ,'偏移位置' , target.offsetTop ,'元素的offset')
    if (!isMoblie) {
      document.addEventListener("mousemove", this.dragMove, false);
      document.addEventListener("mouseup", this.dragEnd, false);
    }
  }
  dragMove=(ev)=> {
    this.setState({ ifBool: true });
    ev.preventDefault();
    ev.stopPropagation();
    if (Number(this.props.height) !== 100) {
      if (this.state.ifBool === true) {
        this.parent.setAttribute("style", "display:block");
        if (isMoblie && ev.changedTouches) {
          this.clientY = ev.changedTouches[0].pageY;
        } else {
          this.clientY = ev.clientY;
        }
        // 元素位置 = 现在鼠标位置 - 元素的偏移值
        let top = this.clientY - this.disY-(this.disY/2);
        // console.log( top,'元素位置' ,this.clientY ,'现在鼠标位置', this.disY,'元素的偏移值')
        top = (top / (this.parent.offsetHeight - this.textInput.offsetHeight)) * 100; 
        // 处理不可超出规定拖拽范围
        if (top < 0) {
          top = 0;
        }else if(top > 100 - Number(this.props.height)){
          top = 100 - Number(this.props.height);
        }
        
        this.props.styleLine(top, top + Number(this.props.height))
        let { max, min} = this.props.presetsData;
        let ParentW = this.parentW.offsetHeight;
        let ratio = (max - min) / ParentW;
        let ratioDiv = this.parent.offsetHeight / 100;
        this.X1 = (max-min)-Number(this.props.right) * ratioDiv * ratio;
        if(Math.sign(min) === -1){
           if(this.X1<= Math.abs(min)){
             this.X1 = -(Math.abs(min)- this.X1)
           }else{
             this.X1 = this.X1 - Math.abs(min)
           }
        }
        this.X2 = (max-min)-Number(this.props.left) * ratioDiv * ratio;
        if (this.X2 <= Math.abs(min)) {
          this.X2 = -(Math.abs(min)-this.X2)
        }else{
          this.X2 = this.X2-Math.abs(min)
        }
        // console.log(this.X2 , this.X1 ,'长')
        this.level_val = (this.X2 + this.X1) / 2; 
        this.window_val = this.X2 - this.X1;
        window.vtk.apis.setWindowLevel(Math.ceil(this.window_val),Math.ceil(this.level_val));
      }
    } else {
      this.setState({ ifBool: false });
    }
  }
  dragEnd=(e)=> {
    e.preventDefault();
    e.stopPropagation();
    this.parent.setAttribute("style", "");
    document.removeEventListener("mousemove", this.dragMove);
    document.removeEventListener("mouseup", this.dragEnd);
    this.setState({ ifBool: false });
  }
  //start_btn
  Start = ev => {
    this.setState({ ifBool: true });
    ev.preventDefault();
    ev.stopPropagation();
    let target = ev.target;
    if (isMoblie && ev.changedTouches) {
      this.spanAY = ev.changedTouches[0].pageY;
    } else {
      this.spanAY = ev.clientY;
    }
    // 偏移位置 = 鼠标的初始值 - 元素的offset
    this.disAY = this.spanAY - target.offsetTop;
    this.parentA = this.parent.offsetHeight;
    this.zIndex += 1;
    if (!isMoblie) {
      document.addEventListener("mousemove", this.Move, false);
      document.addEventListener("mouseup", this.End, false);
    }
  };
  Move = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.state.ifBool === true) {
      this.parent.setAttribute("style", "display:block");
      if (isMoblie && ev.changedTouches) {
        this.clientAY = ev.changedTouches[0].pageY;
      } else {
        this.clientAY = ev.clientY;
      }
      // 元素位置 = 现在鼠标位置 - 元素的偏移值
      let top = this.clientAY - this.disAY;
      top = (top / (this.parent.offsetHeight - this.span2.offsetHeight)) * 100

      // 处理不可超出规定拖拽范围
      let setBottom = this.props.right;
      if (top < 0) {
        top = 0;
      }
      if (top > setBottom) {
        top = setBottom;
      }
      if(setBottom- top === 0){
        this.setState({
          Order:999
        })
      }else{
        this.setState({
          Order:9
        })
      }
      this.props.styleStart(top, setBottom- top)
      let { max, min } = this.props.presetsData;
      let ParentW = this.parentW.offsetHeight;
      let ratio = (max - min) / ParentW;
      let ratioDiv = this.parent.offsetHeight / 100;
      this.X1 = (max-min)-Number(this.props.right) * ratioDiv * ratio;
        if(Math.sign(min) === -1){
           if(this.X1<= Math.abs(min)){
             this.X1 = -(Math.abs(min)- this.X1)
           }else{
             this.X1 = this.X1 - Math.abs(min)
           }
        }
        this.X2 = (max-min)-Number(this.props.left) * ratioDiv * ratio;
        if (this.X2 <= Math.abs(min)) {
          this.X2 = -(Math.abs(min)-this.X2)
        }else{
          this.X2 = this.X2-Math.abs(min)
        }
        // console.log(this.X2 , this.X1 ,'上')
        this.level_val = (this.X2 + this.X1) / 2; 
        this.window_val = this.X2 - this.X1;
        window.vtk.apis.setWindowLevel(Math.ceil(this.window_val),Math.ceil(this.level_val));
    }
  };
  End = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    this.parent.setAttribute("style", "");
    document.removeEventListener("mousemove", this.Move);
    document.removeEventListener("mouseup", this.End);
    this.setState({ ifBool: false });
  };
  //end_btn
  Start1 = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState({ ifBool: true });
    let target = ev.target;
    if (isMoblie && ev.changedTouches) {
      this.spanBY = ev.changedTouches[0].pageY;
    } else {
      this.spanBY = ev.clientY;
    }
    // 偏移位置 = 鼠标的初始值 - 元素的offset
    this.disBY = this.spanBY - target.offsetTop;
    this.parentB = this.parent.offsetHeight;
    this.zIndex += 1;
    if (!isMoblie) {
      document.addEventListener("mousemove", this.Move1, false);
      document.addEventListener("mouseup", this.End1, false);
    }
  };
  Move1 = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.state.ifBool === true) {
      this.parent.setAttribute("style", "display:block");
      if (isMoblie && ev.changedTouches) {
        this.clientBY = ev.changedTouches[0].pageY;
      } else {
        this.clientBY = ev.clientY;
      }
      let ratioDivs = this.parent.offsetHeight / 100;
      let top = this.clientBY - this.disBY;
      top = (top / (this.parent.offsetHeight - this.span2.offsetHeight)) * 100;
      // 处理不可超出规定拖拽范围
      let MinTop = this.props.left;
      if (top < MinTop) {
        top = MinTop;
      }
      let MaxTop = this.parent.offsetHeight / ratioDivs;
      if (top > MaxTop) {
        top = MaxTop;
      }
      // console.log(top ,'下')
      this.props.styleEnd(top , top-MinTop)
      let { max, min } = this.props.presetsData;
      let ParentW = this.parentW.offsetHeight;
      let ratio = (max - min) / ParentW;
      let ratioDiv = this.parent.offsetHeight / 100;
      this.X1 = (max-min)-Number(this.props.right) * ratioDiv * ratio;
        if(Math.sign(min) === -1){
           if(this.X1<= Math.abs(min)){
             this.X1 = -(Math.abs(min)- this.X1)
           }else{
             this.X1 = this.X1 - Math.abs(min)
           }
        }
        this.X2 = (max-min)-Number(this.props.left) * ratioDiv * ratio;
        if (this.X2 <= Math.abs(min)) {
          this.X2 = -(Math.abs(min)-this.X2)
        }else{
          this.X2 = this.X2-Math.abs(min)
        }
        // console.log(this.X2 , this.X1 ,'下')
        this.level_val = (this.X2 + this.X1) / 2; 
        this.window_val = this.X2 - this.X1;
        window.vtk.apis.setWindowLevel(Math.ceil(this.window_val),Math.ceil(this.level_val));
        
    }
  };
  End1 = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ ifBool: false });
    this.parent.setAttribute("style", "");
    document.removeEventListener("mousemove", this.Move1);
    document.removeEventListener("mouseup", this.End1);

  };

  render() {
    let { height, top, left, right } = this.props;
    // console.log(height, top, left, right)
    if(right>=100){
      right=100;
    }
    if(height>=right){
      height=right
    }
    if(left<=0 || top<=0){
      left=0;
      top=0;
    }
    return (
      <div
        className="Progress"
        ref={ref => {
          this.parentW = ref;
        }}
      >
        {" "}
        <div
          className="Progress_bar"
          ref={ref => {
            this.parent = ref;
          }}
        >
          {" "}
          <div
            className="Progress_back"
            style={{
              height: height + "%",
              position: "absolute",
              top:top + "%",
              bottom: "auto"
            }}
            ref={input => {
              this.textInput = input;
            }}
            onTouchStart={this.dragStart}
            onTouchMove={this.dragMove}
            onTouchEnd={this.dragEnd}
            onMouseDown={this.dragStart}
            onMouseUp={this.dragEnd}
          >
            {" "}
          </div>{" "}
          <span
            ref={ref => {
              this.span1 = ref;
            }}
            style={{
              position: "absolute",
              top: left + "%",
              bottom: "auto",
              transform: "translateY(-50%)",
              cursor: "s-resize",
              zIndex:this.state.Order
            }}
            className="circle"
            onTouchStart={this.Start}
            onTouchMove={e => this.Move(e)}
            onTouchEnd={this.End}
            onMouseDown={this.Start}
            onMouseUp={this.End}
          >
            {" "}
          </span>{" "}
          <span
            ref={ref => {
              this.span2 = ref;
            }}
            style={{
              position: "absolute",
              top: right + "%",
              bottom: "auto",
              transform: "translateY(-50%)",
              cursor: "s-resize",
              zIndex:9
            }}
            className="circle"
            onTouchStart={this.Start1}
            onTouchMove={e => this.Move1(e)}
            onTouchEnd={this.End1}
            onMouseDown={this.Start1}
            onMouseUp={this.End1}
          >
            {" "}
          </span>{" "}
        </div>{" "}
      </div>
    );
  }
}

componentName.propTypes = {};
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
export default connect(mapStateToProps, mapDispatchToProps)(componentName);
