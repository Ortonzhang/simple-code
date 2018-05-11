const mockData = () => {
  return Array.from(Array(30).keys()).map(item => {
    if (item < 10) {
      return '00' + item
    } else {
      return '0' + item
    }
  })

}


const createGroup = () => {
  let group = []
  let list = mockData()
  list.forEach(item => {
    group.push({ name: item, position: 'static', top: '', left: '' })
  })
  return group
}



Page({
  data: {
    width: '',
    group: createGroup(),
    height:[]
  },
  
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '前端处理数据',
    })
    wx.showLoading({
      title: '加载中，请稍后',
    })
    wx.getSystemInfo({
      success:(res)=>{
        this.setData({
          width: (res.screenWidth - 10) 
        })
      },
    })
    
  },
  load(e){
    this.setData({
      height: [...this.data.height, e.detail.height]
    })
    this.showImg()
  },
  showImg(){
    let height = this.data.height
    if (height.lenth != this.data.group .legth){
      return
    }
    setTimeout(()=>{
      wx.createSelectorQuery().selectAll('.box').boundingClientRect((ret) => {
        let cols = 2
        var group = this.data.group
        var heightArr = [];
        for (var i = 0; i < ret.length; i++) {
          var boxHeight = height[i]
          if (i < cols) {
            heightArr.push(boxHeight + 25)
          } else {
            var minBoxHeight = Math.min.apply(null, heightArr);
            var minBoxIndex = getMinBoxIndex(minBoxHeight, heightArr);
            group[i].position = 'absolute'
            group[i].top = `${minBoxHeight}px`
            group[i].left = minBoxIndex * this.data.width / 2 + 'px'
            group[i].left = minBoxIndex == 0 ?  minBoxIndex * this.data.width / 2 + 'px' : minBoxIndex * this.data.width / 2 + 5 + 'px'
            heightArr[minBoxIndex] += (boxHeight + 25)
          }
        }

        this.setData({
          group
        })
        wx.hideLoading()

      }).exec()
    }, 200)
    
  }
})

function getMinBoxIndex(val, arr) {
  for (var i in arr) {
    if (val == arr[i]) {
      return i;
    }
  }
}