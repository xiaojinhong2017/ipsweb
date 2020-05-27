import React, {Component} from 'react';
import ReactPropTypes from 'prop-types';
import '../../../../style/RenderControl.css';
import Left        from '../../../../images/ViewIcon/Left.png';
import Right       from '../../../../images/ViewIcon/Right.png';
import Anterior    from '../../../../images/ViewIcon/Anterior.png';
import Posterior   from '../../../../images/ViewIcon/Posterior.png';
import Superior    from '../../../../images/ViewIcon/Superior.png';
import Inferior    from '../../../../images/ViewIcon/Inferior.png';

const StandardViews = [
  { id: 1, preset: 'Left', name: '左', src: Left },
  { id: 2, preset: 'Right', name: '右', src: Right },
  { id: 3, preset: 'Anterior', name: '前', src: Anterior },
  { id: 4, preset: 'Posterior', name: '后', src: Posterior },
  { id: 5, preset: 'Superior', name: '上', src: Superior },
  { id: 6, preset: 'Inferior', name: '下', src: Inferior },
];

class StandardView extends Component {

  constructor() {
    super();
    this.state = {
      id: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.client === 'MOBILE' && nextProps.volumeVisible) {
      this.timer = setTimeout(() => {
        this.props.hideStandardView();
        clearTimeout(this.timer);
        this.timer = null;
      }, 4500);
    }
  }

  showStandardView(e) {
    const preset = e.target.getAttribute('data-preset') || e.target.parentNode.getAttribute('data-preset');
    window.vtk.apis.setStandardView(preset);
    this.props.hideStandardView();
  }

  addClass(e) {
    // this.props.clearTimer();
    this.setState({ id: Number(e.target.getAttribute('key') || e.target.parentNode.getAttribute('key')) });
  }

  removeClass() {
    this.setState({ id: 0 });
  }

  render() {
    if (!this.props.standardVisible) {
      return null;
    }
    return (
      <div className="standardView" onMouseEnter={this.props.clearTimer} onMouseLeave={this.props.hideStandardView} >
        <ul>
          {
            StandardViews.map(standardView => (
              <li
                key={standardView.id}
                data-id={standardView.id}
                data-preset={standardView.preset}
                className={this.state.id === standardView.id ? "focus" : ''}
                onClick={this.showStandardView.bind(this)}
                onTouchStart={this.addClass.bind(this)}
                onTouchEnd={this.removeClass.bind(this)}
              >
                <img src={standardView.src} alt={standardView.preset} />
                <span>{standardView.name}</span>
              </li>
              )
            )
          }
        </ul>
      </div>
    );
  }
}

StandardView.propTypes = {
  client: ReactPropTypes.string,
  hideStandardView: ReactPropTypes.func,
  clearTimer: ReactPropTypes.func,
};

export default StandardView;
