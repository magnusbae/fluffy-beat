import dispatcher from '../core/Dispatcher';
import events, {EventEmitter} from 'events';
import _ from 'lodash';

import ActionTypes from '../constants/ActionTypes';
var CHANGE_EVENT = 'change';

var _currentWords = null;

var GameStore = _.assign({}, EventEmitter.prototype, {

  init: function (strofe) {
    if(strofe){
      _currentWords = strofe.split(' ');
    }
  },

  getWords: function(){
    return _currentWords;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});


GameStore.dispatchToken = dispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.STROFE_CHANGED:
      GameStore.init(action.strofe);
      GameStore.emitChange();
      break;
    default:
    //do nothing
  }
});

export default GameStore;
