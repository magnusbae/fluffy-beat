/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './GamePage.css';
import TextBox from '../TextBox';
import GameActionCreators from '../../actions/GameActionCreators';
import GameView from '../GameView';
import GameStore from '../../stores/GameStore';
import _ from 'lodash';

import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class GamePage extends Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = {
      spillStrofe: GameStore.getWords(),
      wordCount: GameStore.getWords().length,
    };
  }
  
  componentWillUnmount() {
    GameStore.removeChangeListener(this._onChange);
  }

  componentDidMount() {
    GameStore.addChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({wordCount: GameStore.getWords().length});
  }

  _handleChange(event) {
    const strofe = event.target.value;
    this.setState({spillStrofe: strofe});
    GameActionCreators.updateStrofe(strofe);
  }

  showScreen(index) {
    if (index > -1) {
      GameActionCreators.showScreen(index);
    }else {
      GameActionCreators.showAllScreens();
    }
  }
  
  render() {
    const showScreen = this.showScreen;
    const showButtons = _.map(Array.from(new Array(this.state.wordCount), (x, i) => i),
      function(index) {
        return <button className="GamePage-button" onClick={showScreen.bind(this, index)}>{index + 1}</button>;
      }
    );
    
    return (
      <div>
        <GameView />
        <div>
          <h3>Spillkontroll</h3>
          <TextBox maxLines={1} value={this.state.spillStrofe} onChange={this._handleChange.bind(this)} />
          <h4>Vis alle skjermer</h4>
          <button className="GamePage-button button-red" onClick={showScreen.bind(this, -1)}>Vis alle</button>
          <h4>Vis skjerm</h4>
          {showButtons}
        </div>
      </div>
    );
  }

}

export default GamePage;
