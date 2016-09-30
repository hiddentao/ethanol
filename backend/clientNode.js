"use strict";

const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  path = require('path'),
  EventEmitter = require('eventemitter3'),
  ClientManager = require('ethereum-client-binaries').Manager,
  clientBinariesConfig = require('../config/clientBinaries.json'),
  Settings = require('./settings'),
  log = require('./logger').create('ClientNode');




class ClientNode extends EventEmitter {
  /**
   * Ensure client binary exists.
   *
   * This will download it if necessary.
   * 
   * @return {EventEmitter}
   */
  ensureBinary () {
    log.info('Ensure client binary exists ...');
    
    let ev = new EventEmitter();
    
    const mgr = new ClientManager(clientBinariesConfig);
    mgr.logger = log;
    
    ev.emit('scanning');
    
    mgr.init({
      folders: [
        path.join(Settings.userDataDir, 'binaries', 'Geth', 'unpacked'),
      ]
    })
      .then(() => {
        const item = mgr.clients.Geth;
        
        if (!item) {
          throw new Error('Geth not available for this platform.');
        }

        if (!item.state.available) {
          log.info('Downloading client binary ...');

          // download
          return mgr.download('Geth', {
            downloadFolder: path.join(Settings.userDataDir, 'binaries'),
          });
        }
      })
      .then(() => {
        const item = mgr.clients.Geth;
        
        if (item.state.available) {
          this._gethPath = item.activeCli.fullPath;
          
          log.info('Client binary found');

          ev.emit('found');
        } else {
          throw new Error('Valid Geth could not be found or downloaded.');
        }
      })
      .catch((err) => {
        log.error('Error checking for client binaries', err);
        
        ev.emit('error', err);
      });
    
    return ev;
  }
}


module.exports = new ClientNode();
