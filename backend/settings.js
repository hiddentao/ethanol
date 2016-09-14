const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  path = require('path'),
  packageJson = require('../package.json'),
  log = require('./logger').creater('Settings');


let DEFAULT_CONFIG = {
  mode: 'development',
  datadir: path.join(app.getPath('userData'), 'blockchain'),
};
try {
  _.extend(DEFAULT_CONFIG, require('../config.json'));
} catch (err) {}


const MODE_IS_PRODUCTION = (MODE==='production');
const MODE_IS_DEVELOPMENT = (MODE==='development');


const argv = require('yargs')
  .usage('Usage: $0 [Ethanol options] [Node options]')
  .option({
    mode: {
      demand: false,
      default: DEFAULT_CONFIG.mode,
      describe: 'Runtime mode: development, production',
      requiresArg: true,
      nargs: 1,
      type: 'string',
      group: 'Ethanol options:',
    },
    gethpath: {
      demand: false,
      describe: 'Path to Geth executable to use instead of default.',
      requiresArg: true,
      nargs: 1,
      type: 'string',
      group: 'Ethanol options:',
    },
    loglevel: {
      demand: false,
      default: MODE_IS_PRODUCTION ? 'info' : 'debug',
      describe: 'Minimum logging threshold: trace (all logs), debug, info, warn, error.',
      requiresArg: true,
      nargs: 1,
      type: 'string',
      group: 'Ethanol options:',                        
    },
    version: {
      alias: 'v',
      demand: false,
      requiresArg: false,
      nargs: 0,
      describe: 'Display Ethanol version.',
      type: 'boolean',
      group: 'Ethanol options:',
    },
    datadir: {
      demand: false,
      requiresArg: true,
      default: DEFAULT_CONFIG.datadir,
      nargs: 1,
      describe: 'Default blockchain data folder',
      type: 'string',
      group: 'Ethanol options:',
    }
    '': {
      describe: 'To pass options to the underlying node (e.g. Geth) use the --node- prefix, e.g. --node-datadir',
      group: 'Node options:',
    }
  })
  .help('h')
  .alias('h', 'help')
  .parse(process.argv.slice(1));



argv.nodeOptions = [];

for (let optIdx in argv) {
  if (0 === optIdx.indexOf('node-')) {
    argv.nodeOptions.push('--' + optIdx.substr(5));
    argv.nodeOptions.push(argv[optIdx]);
    
    break;
  }
}


// some options are shared
if (argv.datadir) {
    argv.nodeOptions.push('--datadir', argv.datadir);
}



class Settings {
  get blockchainDir() {
    return argv.datadir;
  }
  
  get logLevel () {
    return argv.loglevel;
  }
  
  get nodeOptions () {
    return argv.nodeOptions;
  }

  get cliOptions () {
    return argv;
  }
  
  get appVersion () {
    return packageJson.version;
  }

  get appName() {
    return 'Ethanol';
  }
  
  get appMode() {
    return MODE;
  }
  
  get inProductionMode() {
    return MODE_IS_PRODUCTION;
  }
}

module.exports = new Settings();
