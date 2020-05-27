import React        from 'react';
import style        from 'VisualizerStyle/MainView.mcss';

// ----------------------------------------------------------------------------

export default React.createClass({

  displayName: 'ParaViewWeb/AreaCalculator',

  propTypes: {
    areaValue: React.PropTypes.array,
    position: React.PropTypes.object,
  },

  getInitialState() {
    return {
      areaVisible: false,
    };
  },

  componentDidMount() {
    this.timer = null;
  },

  componentWillReceiveProps(nextProps) {
    // 有新的value值才显示
    if (this.props.areaValue[1] !== nextProps.areaValue[1]) {
      this.setState({ areaVisible: true });
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.areaValue && this.props.areaValue[1] !== nextProps.areaValue[1]) {
      return true;
    }
    if (nextState.areaVisible !== this.state.areaVisible) {
      return true;
    }
    return false;
  },

  componentDidUpdate() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.hideArea();
      clearTimeout(this.timer);
    }, 2600);
  },

  componentWillUnmout() {
    clearTimeout(this.timer);
    this.timer = undefined;
  },

  hideArea() {
    this.setState({ areaVisible: false });
  },

  render() {
    if (!this.state.areaVisible) {
      return null;
    }
    return (
      <div className={style.AreaCalculator} style={{ top: this.props.position.top, left: this.props.position.left }} >
        {
          this.props.areaValue[0].split('\n').map((item, index) =>
            <p key={index}>{item}</p>
          )
        }
      </div>
    );
  },
});
