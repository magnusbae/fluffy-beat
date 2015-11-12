import dispatcher from '../core/Dispatcher';
import EventEmitter from 'events';
import _ from 'lodash';
import { Howl } from 'howler';
import ActionTypes from '../constants/ActionTypes';

const CHANGE_EVENT = 'change';
let _currentWords = [];
let _displayedScreens = {};
let _redScreens = [];



class GameStore extends EventEmitter {

  constructor(props) {
    super(props);
    this.init('Beat for Beat');
    this.redSound = new Howl({
      urls: ['/red_sound.wav'],
      onloaderror: function(error){
        debugger;
      }
    });
  }

  _hideScreens() {
    _displayedScreens = {};
    _.forEach(_currentWords, (word, index) => {
      _displayedScreens[index] = false;
    });
  }

  _showScreens() {
    _displayedScreens = {};
    _.forEach(_currentWords, (word, index) => {
      _displayedScreens[index] = true;
    });
  }

  _randomGenerateRedScreens() {
    _redScreens = [];
    let redOne;
    let redTwo;
    if (_currentWords.length > 4) {
      redOne = this._randomScreenNumber();
      _redScreens.push(redOne);
    }
    do {
      redTwo = this._randomScreenNumber();
    } while (redTwo === redOne);
    _redScreens.push(redTwo);
  }

  _randomScreenNumber() {
    return Math.floor(Math.random() * _currentWords.length);
  }

  init(strofe) {
    if (strofe) {
      _currentWords = strofe.split(' ');
      this._hideScreens();
      this._randomGenerateRedScreens();
    }
  }

  getWords() {
    return _currentWords;
  }

  getScreenState() {
    return _displayedScreens;
  }

  getWordColor() {
    return _redScreens;
  }

  showScreen(screen) {
    _displayedScreens[screen] = true;
    if (_.contains(_redScreens, screen)) {
      this.redSound.play();
    }
  }
  
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const store = new GameStore();

store.dispatchToken = dispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.STROFE_CHANGED:
      store.init(action.strofe);
      store.emitChange();
      break;
    case ActionTypes.SHOW_SCREEN:
      store.showScreen(action.screen);
      store.emitChange();
      break;
    case ActionTypes.SHOW_ALL_SCREENS:
      store._showScreens();
      store.emitChange();
      break;
    default:
    //do nothing
  }
});

export default store;
