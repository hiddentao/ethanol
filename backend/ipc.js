"use strict";

const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  ipc = electron.ipcMain,
  EventEmitter = require('eventemitter3'),
  ClientNode = require('./clientNode'),
  log = require('./logger').create('IpcManager');




class IpcManager {
  constructor () {
    ipc.on('backend-task', this._receiveIpcFromUi.bind(this));
  }
  
  _receiveIpcFromUi (e, task, params) {
    switch (task) {
      case 'init':
        log.info('Ensuring client binary exists ...');
        
        const ev = new EventEmitter();
        
        ev
          .on('scanning', () => {
            this._notifyUi(e, 'init', 'in_progress', 'Scanning for client binary');
          })
          .on('downloading', () => {
            this._notifyUi(e, 'init', 'in_progress', 'Downloading client binary');
          })
          .on('found', () => {
            this._notifyUi(e, 'init', 'in_progress', 'Client binary found');
          })
          .on('starting', () => {
            this._notifyUi(e, 'init', 'in_progress', 'Starting client');
          })
          .on('started', () => {
            this._notifyUi(e, 'init', 'success', 'Client started');
          })
          .on('error', (err) => {
            this._notifyUi(e, 'init', 'error', err.message);
          });        

        ClientNode.startup(ev);
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
