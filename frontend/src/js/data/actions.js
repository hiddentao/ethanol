import { ipcRenderer as ipc } from 'electron';
import Q from 'bluebird';


const TYPES = exports.TYPES = {
  INIT: 'INIT',
  BACKEND_INIT: 'BACKEND_INIT',
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
    this._sendTaskIpc('init');    
  }
  
  _action (type, payload) {
    this._dispatch(buildAction(type, payload));
  }
  
  _sendTaskIpc(task, params) {
    ipc.send('backend-task', task, params);
  }
  
  _receiveTaskNotificationIpc(e, task, state, data) {
    console.debug(`Recv IPC: task:${task} state:${state} data:${typeof data}`);
    
    switch (task) {
      case 'init':
        this._action(TYPES.BACKEND_INIT, {
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
        throw new Error('Unrecognized task', task);
    }
  }
}


exports.Dispatcher = new Dispatcher();
