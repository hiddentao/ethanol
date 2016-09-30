import { ipcRenderer as ipc } from 'electron';
import Q from 'bluebird';


const TYPES = exports.TYPES = {
  INIT: 'INIT',
  ENSURE_CLIENT: 'ENSURE_CLIENT',
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
    ipc.on('ui-task-notify', this._receiveTaskNotificationIpc.bind(this));
  }

  setStore (store) {
    this._dispatch = store.dispatch;
    this._getState = store.getState;
  }
  
  init () {
    this._action(TYPES.INIT, 'in_progress');
    this._sendTaskIpc('ensureClient');    
  }
  
  _action (type, payload) {
    this._dispatch(buildAction(type, payload));
  }
  
  _sendTaskIpc(task, params) {
    ipc.send('backend-task', task, params);
  }
  
  _receiveTaskNotificationIpc(e, task, state, data) {
    switch (task) {
      case 'ensureClient':
        this._action(TYPES.ENSURE_CLIENT, {
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


exports.Dispatcher = new Dispatcher();
