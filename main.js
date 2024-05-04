//const {Translate} = require('@google-cloud/translate').v2;
//const projectId = 'YOUR_PROJECT_ID';
//const translate = new Translate({projectId});
// Modules to control application life and create native browser window
const { app, BrowserWindow,globalShortcut } = require('electron')
//var Mousetrap = require('Mousetrap');
const path = require('node:path')

var ks = require('node-key-sender');


//var Speech = require('electron-speech')

// var recog = Speech({
//   lang: 'en-US',
//   continuous: true
// })
// recog.on('text', function (text) {
//   console.log(text)
// });
 
// recog.listen();
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true,
      preload: path.join(__dirname, 'preload.js')
    }
  })


  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // const key=input.key.toLowerCase();
    // console.log('before-input-event Pressed key:', 
    // key
    // //,input
    // );
    // if(input.type=='keyUp'){
    //   mainWindow.webContents.send('key-released', key);
    // }
    // else if(input.type=='keyDown'){
    //   mainWindow.webContents.send('key-pressed', key);
    // }
    // if (input.control && input.key.toLowerCase() === 'i') {
    //   console.log('Pressed Control+I')
    //   event.preventDefault()
    // }
  })

  const ret = globalShortcut.register('CommandOrControl+T', () => {

    ks.sendCombination(['control', 'c']);
    mainWindow.webContents.send('ctrl-t-pressed');
  }, true);
  if (!ret) {
    console.log('注册快捷键失败！');
  }


  //Mousetrap.bind('4', () => { console.log('4') })

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  globalShortcut.register('CommandOrControl+T', () => {
    console.log('Electron loves global shortcuts!')
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.