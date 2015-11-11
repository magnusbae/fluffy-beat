/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './GamePage.css';
import TextBox from '../TextBox';
import GameActionCreators from '../../actions/GameActionCreators';

import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class GamePage extends Component {

  constructor(props) {
    super(props);
    this.state = {spillStrofe: ''};
  }

  _handleChange(event) {
    const strofe = event.target.value;
    this.setState({spillStrofe: strofe});
    GameActionCreators.updateStrofe(strofe);
  }

  render() {
    return (
      <div>
        <div>
          <h3>Spillkontroll</h3>
          <TextBox maxLines={1} value={this.state.spillStrofe} onChange={this._handleChange.bind(this)} />
        </div>
      </div>
    );
  }

}

export default GamePage;
