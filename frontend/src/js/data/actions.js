const TYPES = exports.TYPES = {
  INIT: 'INIT',
};


function buildAction(type, payload = {}) {
  if (payload && payload instanceof Error) {
    payload = {
      error: payload
    };
  }

  return {
    type: type,
    payload: payload,
  };
};




/**
 * Action dispatcher.
 */
export class Dispatcher {
  constructor (dispatch, getState) {
    this._dispatch = dispatch;
    this._getState = getState;
  }
  
  init () {
    this._action(TYPES.INIT);
  }
  
  _action (type, payload) {
    this._dispatch(buildAction(type, payload));
  }
}


