import dispatcher from '../core/Dispatcher';
import EventEmitter from 'events';
import _ from 'lodash';

import ActionTypes from '../constants/ActionTypes';

const CHANGE_EVENT = 'change';
let _currentWords = [];
let _displayedScreens = {};

class GameStore extends EventEmitter {
  
  init(strofe) {
    if (strofe) {
      _currentWords = strofe.split(' ');
      _displayedScreens = {};
      _.forEach(_currentWords, (word, index) => {
        _displayedScreens[index] = false;
      });
    }
  }

  getWords(){
    return _currentWords;
  }

  emitChange () {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const store = new GameStore();

store.dispatchToken = dispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.STROFE_CHANGED:
      store.init(action.strofe);
      store.emitChange();
      break;
    case ActionTypes.SHOW_SCREEN:
      _displayedScreens[action.screen] = true;
      store.emitChange();    
    default:
    //do nothing
  }
});

export default store;
