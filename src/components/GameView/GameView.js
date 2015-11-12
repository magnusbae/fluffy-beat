/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './GameView.css';
import withStyles from '../../decorators/withStyles';
import _ from 'lodash';

import GameStore from '../../stores/GameStore';
import withViewport from '../../decorators/withViewport';
import BeatBox from '../BeatBox';


@withViewport
@withStyles(styles)
class GameView extends Component {

  static propTypes = {
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
    const words = _.get(this, 'state.words') || ['every', 'step', 'you', 'take', 'every'];
    const width = this.props.viewport.width / 5;
    const height = width * 0.879;

    this.renderCss(`.BeatBox-container { width: ${width}px; height: ${height}px; } ` +
      `.BeatBox-text { \
          font-size: ${height / 5}px; \
          margin-top: ${height / 30}px; \
          padding-bottom: ${height / 30}px; \
        } \
        .GameView-marginbox { \
          width: ${width * words.length}px; \
        }`);

    const boxes = _.map(words, function(word, index) {
      return (
        <BeatBox content={word} red={index % 3 === 0}/>
      );
    });

    return (
      <div className="GameView-container">
        <div className="GameView-marginbox">
          {boxes}
        </div>
      </div>
    );
  }
}

export default GameView;
