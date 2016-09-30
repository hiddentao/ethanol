const _ = require('lodash'),
  electron = require('electron'),
  app = electron.app,
  path = require('path'),
  packageJson = require('../package.json');


let CONFIG = {
  mode: 'development',
  datadir: path.join(app.getPath('userData'), 'blockchain'),
};
try {
  _.extend(CONFIG, require('../config.json'));
} catch (err) {}


const MODE_IS_PRODUCTION = (CONFIG.mode==='production');
const MODE_IS_DEVELOPMENT = (CONFIG.mode==='development');


const argv = require('yargs')
  .usage('Usage: $0 [Ethanol options] [Node options]')
  .option({
    mode: {
      demand: false,
      default: CONFIG.mode,
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
      default: CONFIG.datadir,
      nargs: 1,
      describe: 'Default blockchain data folder',
      type: 'string',
      group: 'Ethanol options:',
    },
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
  constructor () {
    // the only globals permitted (for use in preload scripts)
    global.appConfig = this.appConfig;
  }
  
  get userDataDir() {
  // Application Support/Ethanol
  return app.getPath('userData');
}

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
  
  get appConfig() {
    return CONFIG;
  }
  
  get inProductionMode() {
    return MODE_IS_PRODUCTION;
  }
}

module.exports = new Settings();
