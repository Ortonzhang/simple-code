import * as echarts from '../../ec-canvas/echarts';

function setOption(chart, step,dateGroup) {
  var option = {
    backgroundColor: "#fff",
    color: ["#37A2DA"],

    tooltip: {
      trigger: 'axis'
    },
    legend: {

      data: ['步数']
    },
    grid: {
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dateGroup
    },
    yAxis: {
      x: 'center',
      type: 'value'
    },
    series: [{
      name: '步数',
      type: 'line',
      smooth: true,
      data: step
    }]
  };

  chart.setOption(option);
  return chart;
}

const app = getApp()
Page({
  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom');
  },
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    motto: 'Hello World',
    ec: {
      lazyLoad: true 
    }
  },

  init: function (group, time) {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, group, time);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;


      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  onLoad: function () {
    app.Util.login().then(_ => {
      this.getrunData()
    })
  },
  getrunData() {
    wx.getWeRunData({
      success: (ret) => {
        app.Util.ajax('http://172.28.19.136:3000/crypto', { iv: ret.iv, data: ret.encryptedData }, 'post').then(_ => {
          let data = _.stepInfoList
          if(data){
            let Dategroup = this.handleData(data)
            let step = data.map(item => item.step)
            this.init(step, Dategroup)
          }
        }, (err) => {
          console.log(err)
        })
      }
    })
  },
  handleData(data){
    var arr = []
    data.forEach(item => {
      arr.push(new Date(new Date().setTime(item.timestamp * 1000)).toLocaleDateString())
    })
    return arr
  }
})
