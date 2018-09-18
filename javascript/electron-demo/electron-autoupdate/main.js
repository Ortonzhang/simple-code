const {app, BrowserWindow, ipcMain} = require('electron')

const { autoUpdater } = require('electron-updater')

const feedURL = `http://172.28.82.40:8080/`

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('update', (e, arg) => {
  console.log('update')
  checkForUpdate()
})

const checkForUpdate = () => {
  
  // 配置安装包远端服务器
  autoUpdater.setFeedURL(feedURL)


  autoUpdater.on('error', message => {
    sendUpdateMessage('err', message)
  })

  autoUpdater.on('checking-for-update', message => {
    sendUpdateMessage('checking-for-update', message);
  })

  autoUpdater.on('update-available', function(message) {
    sendUpdateMessage('update-available', message);
  });
  autoUpdater.on('update-not-available', function(message) {
      sendUpdateMessage('update-not-available', message);
  });

  autoUpdater.on('download-progress', function(progressObj) {
    sendUpdateMessage('downloadProgress', progressObj);
  });
  // 更新下载完成事件
  autoUpdater.on('update-downloaded', function(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
      ipcMain.on('updateNow', (e, arg) => {
          autoUpdater.quitAndInstall();
      });
      sendUpdateMessage('isUpdateNow');
  });

  autoUpdater.checkForUpdates();


}

function sendUpdateMessage(message, data) {
  mainWindow.webContents.send('message', { message, data });
}