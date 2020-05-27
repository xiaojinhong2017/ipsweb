import React       from 'react';
import style       from 'VisualizerStyle/RightControl.mcss';
import Aitumer from './Aitumer';
import Ailiver from './Ailiver';

export default React.createClass({

  displayName: 'ParaViewWeb/AI',

  propTypes: {
    nodes: React.PropTypes.object,
    views: React.PropTypes.array,
    dataNodeList: React.PropTypes.array,
    updateActive: React.PropTypes.func,
    aitumor: React.PropTypes.func,
    ailiver: React.PropTypes.func,
  },

  getInitialState() {
    return {
      ailiver: false,
      aitumor: false,
    };
  },

  ailiver() {
    this.setState({ ailiver: !this.state.ailiver });
  },

  aitumor() {
    this.setState({ aitumor: !this.state.aitumor });
  },

  outArea() {
    this.props.updateActive('ai');
  },
  render() {
    return (
      <div className={style.functionWrapper2DAI}>
        <div className={!this.state.ailiver && !this.state.aitumor ? style.display : style.displayNo}>
          <div className='rowPart' >
            <button className={style.btn} onClick={this.ailiver}>自动肝脏重建</button>
            <button className={style.btn} onClick={this.aitumor}>自动肝内肿瘤重建</button>
          </div>
          <div className='rowPart' >
            <button className={style.btn} onClick={this.outArea}>退出</button>
          </div>
        </div>
        {
          this.state.ailiver && (
            <Ailiver nodes={this.props.nodes} views={this.props.views} dataNodeList={this.props.dataNodeList} ailiver={this.props.ailiver} stateAiliver={this.ailiver} />
          )
        }

        {
          this.state.aitumor && (
            <Aitumer nodes={this.props.nodes} views={this.props.views} dataNodeList={this.props.dataNodeList} aitumor={this.props.aitumor} updateActive={this.props.updateActive} />
          )
        }

      </div>
    );
  },
});
