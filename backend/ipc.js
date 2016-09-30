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
            e.sender.send('ensureClient', 'in_progress', 'Scanning for client binary');
          })
          .on('downloading', () => {
            e.sender.send('ensureClient', 'in_progress', 'Downloading client binary');
          })
          .on('found', () => {
            e.sender.send('ensureClient', 'success', 'Client binary found');
          })
          .on('error', (err) => {
            e.sender.send('ensureClient', 'error', err.message);
          });
        break;
      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }
}


module.exports = new IpcManager();
