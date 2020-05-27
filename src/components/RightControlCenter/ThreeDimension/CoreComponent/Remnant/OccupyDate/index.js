import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../../../style/RightControl.css';

const data = {};

class OccupyDate extends Component {
  constructor() {
    super();
    this.state = {
      occupyArr: [],
      view3dNodes: [],
      occupyName: [],
      firstIn: true,
    };
    this.selectedData = this.selectedData.bind(this);
    this.checkOccupyDate = this.checkOccupyDate.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.view3dNodes !== undefined && this.state.firstIn) {
      this.setState({
        view3dNodes: [...this.state.view3dNodes, nextProps.view3dNodes],
        firstIn: false,
      });
    }
  }

  selectedData(id, name, index) {
    if (this.state.occupyArr.includes(id)) {
      this.setState({
        occupyArr: this.state.occupyArr.filter(i => i !== id),
        occupyName: this.state.occupyName.filter(i => i !== name),
        data,
        view3dNodes: [...this.state.view3dNodes, this.state.view3dNodes[0][index].active = 0],
      });
    } else {
      this.setState({
        occupyArr: [...this.state.occupyArr, id],
        occupyName: [...this.state.occupyName, name],
        data,
        view3dNodes: [...this.state.view3dNodes, this.state.view3dNodes[0][index].active = 1],
      });
    }
  }

  checkOccupyDate() {
    this.props.openDate();
    this.props.checkOccupyDate(this.state.occupyArr, this.state.occupyName);
  }

  render() {
    return (
      <div>
        <div className='rowPart' >
          {
            this.state.view3dNodes[0] !== undefined &&
              this.state.view3dNodes[0].map((node, index) =>
                <div key={node.id} className='pipeStructure' onClick={() => this.selectedData(node.id, node.name, index)}>
                  <div className={node.active !== 0 ? 'checkedBox' : 'uncheckedBox'} />
                  <p className={node.active !== 0 ? 'checkboxNameActive' : 'checkboxName'}>{node.name}</p>
                </div>
              )
          }
        </div>
        <div className='rowPart' >
          <button className='btn' onClick={this.checkOccupyDate} style={{ marginLeft: 108 }}>返回</button>
        </div>
      </div>
    );
  }
}
OccupyDate.propTypes = {
  openDate: ReactPropTypes.func,
  checkOccupyDate: ReactPropTypes.func,
  nodes: ReactPropTypes.object,
  view3dNodes: ReactPropTypes.array,
  views: ReactPropTypes.array,
};
export default OccupyDate;
