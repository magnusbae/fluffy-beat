import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
  updateStrofe: function(strofe) {
    Dispatcher.dispatch({
      type: ActionTypes.STROFE_CHANGED,
      strofe: strofe,
    });
  },
};
