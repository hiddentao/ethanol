"use strict";

const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  ipc = electron.ipcMain,
  ClientNode = require('./clientNode'),
  log = require('./logger').create('IpcManager');




class IpcManager {
  constructor () {
    ipc.on('backend-task', this._receiveIpc().bind(this));    
  }
  
  _updateUi (task, state, data) {
    ipc.send('ui-task-update', task, state, data);
  }
  
  _receiveIpc (e, task, params) {
    switch (task) {
      case 'ensureClient':
        ClientNode.ensureBinary();
        break;
      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }
}


module.exports = ipcManager = new IpcManager();

// relay messages back to UI

ClientNode.on('scanning-for-binary', () => {
  ipcManager._updateUi('ensureClient', 'in_progress', 'Scanning for client binary');
});
ClientNode.on('downloading-binary', () => {
  ipcManager._updateUi('ensureClient', 'in_progress', 'Downloading client binary');
});
ClientNode.on('binary-found', () => {
  ipcManager._updateUi('ensureClient', 'success', 'Client binary found');
});
ClientNode.on('binary-not-found', () => {
  ipcManager._updateUi('ensureClient', 'error', 'Client binary not found');
});


