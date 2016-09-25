"use strict";

const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  ipc = electron.ipcMain,
  log = require('./logger').create('IpcManager');


class IpcManager {
  constructor () {
    ipc.on('backend-task', this._receiveIpc().bind(this));    
  }
  
  
  _receiveIpc (e, task, params) {
    switch (task) {
      case 'ensureClient':
        
        break;
      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }
}


module.exports = new IpcManager();