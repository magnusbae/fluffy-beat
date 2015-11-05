/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';


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

  render() {
    const width = this.props.viewport.width / 5;
    const height = width * 0.879;

    this.renderCss(`.BeatBox-container { width: ${width}px; height: ${height}px; } ` +
        `.BeatBox-text { \
        font-size: ${height/5}px; \
        margin-top: ${height/30}px; \
        padding-bottom: ${height/30}px; \
        }`);

    return !this.props.error ? (
      <div>
        <BeatBox content="every" />
        <BeatBox content="step" />
        <BeatBox content="you" red={true} />
        <BeatBox content="take" />
        <BeatBox content="every" />
      </div>
    ) : this.props.children;
  }

}

export default App;
