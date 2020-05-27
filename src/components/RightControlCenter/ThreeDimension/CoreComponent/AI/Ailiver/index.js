import React       from 'react';
import style       from 'VisualizerStyle/RightControl.mcss';

export default React.createClass({

  displayName: 'ParaViewWeb/ailiver',

  propTypes: {
    nodes: React.PropTypes.object,
    views: React.PropTypes.array,
    dataNodeList: React.PropTypes.array,
    stateAiliver: React.PropTypes.func,
    ailiver: React.PropTypes.func,
  },

  confirmData() {
    this.props.ailiver(this.ailiver.value || '');
  },

  updateActive() {
    this.props.stateAiliver();
  },


  render() {
    return (
      <div className={style.functionWrapper}>
        <div className='rowPart'>
          CT肝脏自动分割算法:适用于肝脏边缘较清晰的数据；
        </div>
        <div className='rowPart'>
          <span>数据名称：</span>
          <select ref={c => (this.ailiver = c)} >
            {
              this.props.views.length > 0 &&
                this.props.dataNodeList.map((value, index) =>
                  <option key={`${index}`} value={`${value[0]}`} >{value[0]}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart'>
          <button className={style.btn} onClick={this.confirmData} >计算</button>
          <button className={style.btn} onClick={this.updateActive} >完成</button>
        </div>
      </div>
    );
  },
});
