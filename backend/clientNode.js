"use strict";

const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  EthereumClientBinaries = require('ethereum-client-binaries'),
  clientBinariesConfig = require('./config/clientBinaries.json'),
  EventEmitter = require('eventemitter3')
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
    let ev = new EventEmitter();
    
    const mgr = new EthereumClientBinaries(clientBinariesConfig);
    
    ev.emit('scanning');
    
    mgr.init()
      .then(() => {
        let item = mgr.clients[0];
        
        if (!item) {
          throw new Error('Geth not available for this platform.');
        }
        
        if (!item.state.available) {
          // download
          return mgr.download('Geth');
        }
      })
      .then(() => {
        if (!item.state.available) {
          this._gethPath = item.activeCli.fullPath;
          
          ev.emit('found');
        } else {
          throw new Error('Valid Geth could not be found or downloaded.');
        }
      })
      .catch((err) => {
        log.error('Error checking for client binaries', err);
        
        ev.emit('error', err);
      });
  }
}


module.exports = new ClientNode();
