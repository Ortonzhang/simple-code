const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (ret) {
        wx.request({
          url: 'http://172.28.19.136:3000/use',
          method: 'POST',
          data: {
            code: ret.code,
          },
          success: function (data) {
            console.log(data)
            wx.setStorageSync('skey', data.data.key)
            resolve(data.data.key)
          }
        })
      }
    })
  })
}

const checkSession = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}

const ajax = (url, data, method = 'GET', config = {}) => {
  let skey = wx.getStorageSync('skey')
  if (!skey) {
    return new Promise((resolve, reject) => {
      login()
      reject('err')
    })
  } else {
    return new Promise((resolve, reject) => {
      checkSession().then(_ => {
        if (_) {
          wx.request({
            url,
            method: method.toLocaleUpperCase(),
            data,
            header: Object.assign({}, { skey }, config),
            success: (ret) => {
              resolve(ret.data)
            }
          })
        } else {
          login()
          reject('err')
        }
      })
    })
  }
}


module.exports = {
  formatTime: formatTime,
  login,
  ajax
}
