import { ipcRenderer as ipc } from 'electron';
import Q from 'bluebird';


const TYPES = exports.TYPES = {
  INIT: 'INIT',
  CLIENT_BINARY: 'CLIENT_BINARY',
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
class Dispatcher {
  constructor () {
    ipc.on('ui-task-update', this.receiveIpc.bind(this));
  }

  setup (store) {
    this._dispatch = store.dispatch;
    this._getState = store.getState;
  }
  
  init () {
    this._action(TYPES.INIT, 'in_progress');
    this._sendIpc('ensureClient');    
  }
  
  _action (type, payload) {
    this._dispatch(buildAction(type, payload));
  }
  
  _sendIpc(task, params) {
    ipc.send('backend-task', task, params);
  }
  
  _receiveTaskUpdateIpc(e, task, state, data) {
    switch (task) {
      case 'ensureClientStatus':
        this._action(TYPES.CLIENT_BINARY, {
          state: state,
          data: data,
        });    
        
        if ('success' === state || 'error' === state) {
          this._action(TYPES.INIT, {
            state: state,
          });
        }
        
        break;

      default:
        throw new Error('unrecognized task', task);
    }
  }
}


exports.Dispatcher = Dispatcher;
