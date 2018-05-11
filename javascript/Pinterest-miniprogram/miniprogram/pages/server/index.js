Page({
  data: {
    list:[]
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '后端处理数据',
    })
    wx.request({
      url: 'http://172.28.85.57:3000/data',
      success:(ret) => {
        
        let arr = ret.data.map(item => ({ ...item, position: 'static', top:'', left:'' }))
        this.setData({
          list: arr
        })
        setTimeout(()=>{
          this.showImg()
        }, 200)
      }
    })
  },
  showImg(){
    
    let cols = 2
    let list = this.data.list
    let heightArr = [];


    for(let i in list){
      var boxHeight = list[i].height
      if (i < cols) {
        heightArr.push(boxHeight + 5)
      } else {
        var minBoxHeight = Math.min.apply(null, heightArr);
        var minBoxIndex = getMinBoxIndex(minBoxHeight, heightArr);
        list[i].position = 'absolute'
        list[i].top = `${minBoxHeight}px`
        list[i].left = minBoxIndex * 182 + 'px'
        list[i].left = minBoxIndex == 0 ? minBoxIndex * 182 + 'px' : minBoxIndex * 182 + 4 + 'px'
        heightArr[minBoxIndex] += (boxHeight + 5)
      }
    }
    this.setData({
      list
    })

    for (let i in list) {
      
      wx.createIntersectionObserver().relativeToViewport({ bottom: 20 }).observe('.pic-' + i, (ret) => {
        if (ret.intersectionRatio > 0) {
          list[i].show = true
        }
        this.setData({
          list
        })
      })
    }


  }
})

function getMinBoxIndex(val, arr) {
  for (var i in arr) {
    if (val == arr[i]) {
      return i;
    }
  }
}