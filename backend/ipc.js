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
  
  _receiveIpc (e, task, params) {
    switch (task) {
      case 'ensureClient':
        log.info('Ensuring client binary exists ...');
        
        ClientNode.ensureBinary()
          .on('scanning', () => {
            this._notifyUi(e, 'ensureClient', 'in_progress', 'Scanning for client binary');
          })
          .on('downloading', () => {
            this._notifyUi(e, 'ensureClient', 'in_progress', 'Downloading client binary');
          })
          .on('found', () => {
            this._notifyUi(e, 'ensureClient', 'success', 'Client binary found');
          })
          .on('error', (err) => {
            this._notifyUi(e, 'ensureClient', 'error', err.message);
          });
        break;
      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }
  
  
  _notifyUi (e, task, status, data) {
    e.sender.send('ui-task-notify', task, status, data);
  } 
}


module.exports = new IpcManager();
