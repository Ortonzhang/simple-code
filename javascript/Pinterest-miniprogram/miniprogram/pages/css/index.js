Page({
  data: {
    list:[]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'css实现',
    })
      wx.request({
        url: 'http://172.28.85.57:3000/data',
        success: (ret) => {
          this.setData({
            list: ret.data
          })
        }
      })
  }
})