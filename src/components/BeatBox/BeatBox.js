/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './BeatBox.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class BeatBox extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    red: PropTypes.bool,
  };

  render() {
    return (
        <div className="BeatBox-container">
          <div className={'BeatBox-text ' + (this.props.red ? 'BeatBox-red' : '')}>
            {this.props.content}
          </div>
        </div>
    );
  }

}

export default BeatBox;
