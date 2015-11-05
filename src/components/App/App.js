/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';


import BeatBox from '../BeatBox';

@withContext
@withStyles(styles)
class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  render() {
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
