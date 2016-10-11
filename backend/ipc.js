"use strict";

const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  ipc = electron.ipcMain,
  EventEmitter = require('eventemitter3'),
  ClientNode = require('./clientNode'),
  CONSTANTS = require('../common/constants'),
  Windows = require('./windows'),
  log = require('./logger').create('IpcManager');




class IpcManager {
  constructor () {
    ipc.on(CONSTANTS.IPC.BACKEND_TASK, this._receiveIpcFromUi.bind(this));
  }
  
  _receiveIpcFromUi (e, task, params) {
    switch (task) {
      case CONSTANTS.IPC.INIT:
        log.info('Initialize backend ...');
        
        const ev = new EventEmitter();
        
        ev
          .on('scanning', () => {
            this._notifyUi(CONSTANTS.IPC.INIT, 'in_progress', 'Scanning for client binary');
          })
          .on('downloading', () => {
            this._notifyUi(CONSTANTS.IPC.INIT, 'in_progress', 'Downloading client binary');
          })
          .on('found', () => {
            this._notifyUi(CONSTANTS.IPC.INIT, 'in_progress', 'Client binary found');
          })
          .on('starting', () => {
            this._notifyUi(CONSTANTS.IPC.INIT, 'in_progress', 'Starting client');
          })
          .on('started', () => {
            this._notifyUi(CONSTANTS.IPC.INIT, 'success', 'Client started');
          })
          .on('error', (err) => {
            this._notifyUi(CONSTANTS.IPC.INIT, 'error', err.message);
          });        

        ClientNode.startup(ev);
        break;
      default:
        log.error(`Unrecognized task: ${task}`)
    }
  }
  
  
  _notifyUi (task, status, data) {
    Windows.get('main').send(CONSTANTS.IPC.UI_TASK_NOTIFY, task, status, data);
  } 
}


module.exports = new IpcManager();
