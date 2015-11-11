/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import GameStore from '../../stores/GameStore';
import _ from 'lodash';

import BeatBox from '../BeatBox';

@withContext
@withViewport
@withStyles(styles)
class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this._onChange);
  }

  componentDidMount() {
    GameStore.addChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({words: GameStore.getWords()});
  }

  render() {
    const width = this.props.viewport.width / 5;
    const height = width * 0.879;

    this.renderCss(`.BeatBox-container { width: ${width}px; height: ${height}px; } ` +
        `.BeatBox-text { \
        font-size: ${height / 5}px; \
        margin-top: ${height / 30}px; \
        padding-bottom: ${height / 30}px; \
        }`);

    const words = _.get(this, 'state.words') || ['every', 'step', 'you', 'take', 'every'];
    const boxes = _.map(words, function(word, index) {
      return (
        <BeatBox content={word} red={index % 3 === 0} />
      );
    });

    return !this.props.error ? (
      <div>
        {boxes}
        <div>
          {this.props.children}
        </div>
      </div>
    ) : this.props.children;
  }
}

export default App;
