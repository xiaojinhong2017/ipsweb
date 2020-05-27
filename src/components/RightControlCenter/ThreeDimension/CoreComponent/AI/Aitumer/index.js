import React       from 'react';
import style       from 'VisualizerStyle/RightControl.mcss';

export default React.createClass({

  displayName: 'ParaViewWeb/Aitumor',

  propTypes: {
    nodes: React.PropTypes.object,
    views: React.PropTypes.array,
    dataNodeList: React.PropTypes.array,
    updateActive: React.PropTypes.func,
    aitumor: React.PropTypes.func,
  },

  getInitialState() {
    return {
    };
  },

  confirmData() {
    this.props.aitumor(this.aitumorName.value || '', this.aitumor.value || '');
  },

  updateActive() {
    this.props.updateActive('ai');
    // this.props.aitumor();
  },

  render() {
    return (
      <div className={style.functionWrapper}>
        <div className='rowPart'>
          第一步选择需要分割的肝脏数据，再选择输入数据，然后点击计算按钮即可;
        </div>
        <div className='rowPart'>
          <span style={{ position: 'relative' }}>分割数据：</span>
          <select ref={c => (this.aitumor = c)} >
            {
              this.props.views.length > 0 && this.props.nodes[this.props.views[3][0]] &&
                this.props.nodes[this.props.views[3][0]].map((node, index) =>
                  <option key={`${node.id}`} value={`${node.name}`} >{node.name}</option>
                )
            }
          </select>
        </div>
        <div className='rowPart'>
          <span style={{ position: 'relative' }}>数据名称：</span>
          <select ref={c => (this.aitumorName = c)} >
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
