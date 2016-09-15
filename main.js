"use strict";

const electron = require('electron'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow,
  Settings = require('./backend/settings'),
  log = require('./backend/logger').create('main');
  
  
var mainWindow;


function createMainWindow () {
  log.info('Creating main window ...');

  // url
  const url = Settings.inProductionMode
    ? 'file://' + __dirname + '/index.html'
    : 'http://localhost:3456';
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: Settings.appName,
    show: true,
    width: 1100,
    height: 720,
    center: true,
    resizable: true,
    // icon: global.icon,
    // titleBarStyle: 'hidden-inset', //hidden-inset: more space
    // backgroundColor: '#000',
    acceptFirstMouse: true,
    darkTheme: true,
    webPreferences: {
        preload: __dirname + '/backend/windowPreload.js',
        nodeIntegration: false,
        webaudio: true,
        webgl: false,
        webSecurity: false, // necessary to make routing work on file:// protocol
        textAreasAreResizable: true,
    },
  });
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    log.info('Window closed');

    mainWindow = null;
  });

  // load URL
  mainWindow.loadURL(url);

  require('./backend/menu').setup(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  log.info('App ready');
  
  createMainWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  log.debug('All windows closed');
  
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    log.debug('Exit app');
    
    app.quit();
  }
});

app.on('activate', function () {
  log.info('App activated');
  
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!mainWindow) {
    createMainWindow();
  }
});

