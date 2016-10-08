import { ipcRenderer as ipc } from 'electron';
import Q from 'bluebird';
import Web3 from 'web3';
import EthereumBlocks from 'ethereum-blocks';


const TYPES = exports.TYPES = {
  INIT: 'INIT',
  BACKEND_INIT: 'BACKEND_INIT',
  WEB3_INIT: 'WEB3_INIT',
  BLOCK: 'BLOCK',
  BLOCK_ERROR: 'BLOCK_ERROR',
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
  
  _connectWeb3 () {
    this._action(TYPES.WEB3_INIT, 'in_progress');
    
    let connected = false;
    
    const blocks = new EthereumBlocks({ 
      web3: new Web3(new Web3.providers.HttpProvider('http://localhost:38545'))
    });
    
    // blocks.logger = console;

    blocks.registerHandler('default', this._blockHandler.bind(this));

    blocks.start().catch((err) => {
      this._blockHandler('error', null, err);
    });
  }

  _blockHandler (eventType, blockId, data) {
    const connected = 
      ('success' === this._getState().app.get('web3Initialization').getState());
    
    switch (eventType) {
      case 'block':
        if (!connected) {
          this._action(TYPES.WEB3_INIT, 'success');
          this._action(TYPES.INIT, 'success');
        }
        
        this._action(TYPES.BLOCK, data);
        break;
      case 'error':
        if (!connected) {
          this._action(TYPES.WEB3_INIT, {
            state: 'error',
            data: data,
          });
          
          this._action(TYPES.INIT, {
            state: 'error',
            data: 'Web3 initialization failed',
          });
        } else {
          this._action(TYPES.BLOCK_ERROR, data);
        }
        break;
    }    
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
        
        switch (state) {
          case 'error':
            this._action(TYPES.INIT, {
              state: 'error',
              data: 'Backend initialization failed',
            });
            break;
          case 'success':
            this._connectWeb3();
            break;
        }
        
        break;

      default:
        throw new Error('Unrecognized task', task);
    }
  }
}


exports.Dispatcher = new Dispatcher();
