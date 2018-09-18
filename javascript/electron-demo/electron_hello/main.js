const {app, BrowserWindow, Menu, MenuItem, shell, Tray} = require('electron')
const electron = require('electron')

let tray


// 创建全局变量并在下面引用，避免被GC
let win

const template = [
  {
    label: '操作',
    submenu: [{
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        label: '重新加载',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                // on reload, start fresh and close any old
                // open secondary windows
                if (focusedWindow.id === 1) {
                    BrowserWindow.getAllWindows().forEach(function (win) {
                        if (win.id > 1) {
                            win.close()
                        }
                    })
                }
                focusedWindow.reload()
            }
        }
    }]
  },
  {
    label: '加载网页',
    submenu: [
      {
        label: '优酷',
        accelerator: 'CmdOrCtrl+P',
        click: () => { console.log('time to print stuff') }
      },
      {
        type: 'separator'
      },
      {
        label: '百度',
      }
    ]
  }
]

if (process.platform === 'darwin') {
    const name = electron.app.getName()
    template.unshift({
      label: name,
      submenu: [{
        label: `关于 ${name}`,
        role: 'about'
      }, {
        type: 'separator'
      }, {
        label: '服务',
        role: 'services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: `隐藏 ${name}`,
        accelerator: 'Command+H',
        role: 'hide'
      }, {
        label: '隐藏其它',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      }, {
        label: '显示全部',
        role: 'unhide'
      }, {
        type: 'separator'
      }, {
        label: '退出',
        accelerator: 'Command+Q',
        click: function () {
          app.quit()
        }
      }]
    })
}

function createWindow () {
   
  shell.beep()


    // 创建浏览器窗口并设置宽高
    win = new BrowserWindow({ width: 800, height: 600 })
    
    // 加载页面
    win.loadFile('index.html')
    
    // 打开开发者工具
    win.webContents.openDevTools()
    
    // 添加window关闭触发事件
    
    win.on('closed', () => {
        win = null  // 取消引用
    })

    // const menu = new Menu()


    // const name = electron.app.getName()
    // menu.append(new MenuItem({
    //     label: name,
    //     submenu: [{
    //       label: `关于 ${name}`,
    //       role: 'about'
    //     }, {
    //       type: 'separator'
    //     }, {
    //       label: '服务',
    //       role: 'services',
    //       submenu: []
    //     }, {
    //       type: 'separator'
    //     }, {
    //       label: `隐藏 ${name}`,
    //       accelerator: 'Command+H',
    //       role: 'hide'
    //     }, {
    //       label: '隐藏其它',
    //       accelerator: 'Command+Alt+H',
    //       role: 'hideothers'
    //     }, {
    //       label: '显示全部',
    //       role: 'unhide'
    //     }, {
    //       type: 'separator'
    //     }, {
    //       label: '退出',
    //       accelerator: 'Command+Q',
    //       click: function () {
    //         app.quit()
    //       }
    //     }]
    //   }))

    // menu.append(new MenuItem({
    //     label: '自定义快捷键',
    //     submenu: [
    //         {
    //             label: '打开百度',
    //             accelerator: 'CmdOrCtrl+P',
    //             click: () => { 
    //                 // shell.openExternal('http://www.baidu.com')
    //                 window.open('http://www.baidu.com')
    //             }
    //         }
    //     ]
    // }))

    // Menu.setApplicationMenu(menu)


    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);



    tray = new Tray(__dirname + '/build/icon.png');//系统托盘图标

    const contextMenu = Menu.buildFromTemplate([
      {label: '显示', type: 'radio', click: () => {win.show()}},
      {label: '隐藏', type: 'radio', click: () => {win.hide()}},
    ])
    tray.on('click', () => {
      win.isVisible() ? win.hide() : win.show()
    })
    // win.on('show', () => {
    //   tray.setHighlightMode('always')
    // })
    // win.on('hide', () => {
    //   tray.setHighlightMode('never')
    // })

    tray.setToolTip('This is my application.') // 鼠标放上时候的提示
    tray.setContextMenu(contextMenu)

    
}

// 初始化后 调用函数
app.on('ready', createWindow)  

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
   // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
   // 否则绝大部分应用及其菜单栏会保持激活。
   if (process.platform !== 'darwin') {
        app.quit()
   }
})
  
app.on('activate', () => {
// 在macOS上，当单击dock图标并且没有其他窗口打开时，
// 通常在应用程序中重新创建一个窗口。
    if (win === null) {
      createWindow()
    }
})