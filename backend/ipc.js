"use strict";

const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  ipc = electron.ipcMain,
  ClientNode = require('./clientNode'),
  log = require('./logger').create('IpcManager');




class IpcManager {
  constructor () {
    ipc.on('backend-task', this._receiveIpc.bind(this));    
  }
  
  _notifyUiTask (task, state, data) {
    ipc.send('ui-task-notify', task, state, data);
  }
  
  _receiveIpc (e, task, params) {
    switch (task) {
      case 'ensureClient':
        ClientNode.ensureBinary()
          .on('scanning', () => {
            this._notifyUiTask('ensureClient', 'in_progress', 'Scanning for client binary');
          })
          .on('downloading', () => {
            this._notifyUiTask('ensureClient', 'in_progress', 'Downloading client binary');
          })
          .on('found', () => {
            this._notifyUiTask('ensureClient', 'success', 'Client binary found');
          })
          .on('error', (err) => {
            this._notifyUiTask('ensureClient', 'error', err.message);
          });
        break;
      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }
}


module.exports = new IpcManager();
