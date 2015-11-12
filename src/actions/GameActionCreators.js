import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
  updateStrofe: function(strofe) {
    Dispatcher.dispatch({
      type: ActionTypes.STROFE_CHANGED,
      strofe: strofe,
    });
  },

  showScreen: function(number) {
    Dispatcher.dispatch({
      type: ActionTypes.SHOW_SCREEN,
      screen: number,
    });
  },

  showAllScreens: function () {
    Dispatcher.dispatch({
      type: ActionTypes.SHOW_ALL_SCREENS,
    });
  },
};
