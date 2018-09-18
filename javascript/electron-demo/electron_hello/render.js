const remote = require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
var menu = new Menu();
menu.append(new MenuItem({ label: 'MenuItem1', click: function() { console.log('item 1 clicked'); } }));
menu.append(new MenuItem({ type: 'separator' }));
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);

require('electron').ipcRenderer.on('notification', (event, message) => {
  console.log('message') 
  // window.open('http://www.baidu.com')
  let myNotification = new window.Notification('标题', {
    body: '触发全局注册快捷键'
  })
  
  myNotification.onclick = () => {
    console.log('通知被点击')
  }
})

var webFrame = require('electron').webFrame;

webFrame.setZoomFactor(4);