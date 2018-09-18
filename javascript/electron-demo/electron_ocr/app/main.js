const { app, BrowserWindow } = require('electron')
const path = require('path')
let win

// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';


const isDeveloment = false

if(isDeveloment){
  require('electron-reload')(__dirname, {
    electron: require('${__dirname}/../../node_modules/electron'),
    ignored: /node_modules|[\/\\]\./
  });
}


function createWindow() {
  win = new BrowserWindow({width: 800, height: 600})
  
  win.loadFile(path.join(__dirname, 'index.html'))

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  win === null && createWindow()
})