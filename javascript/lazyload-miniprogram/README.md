#  小程序的图片懒加载

效果图
![](images/gif.gif)


## 定义

懒加载，前端人都知道的一种性能优化方式，简单的来说，只有当图片出现在浏览器的可视区域内时，才设置图片正真的路径，让图片显示出来。这就是图片懒加载。

## 实现原理

监听页面的`scroll`事件,判读元素距离页面的`top`值是否是小于等于页面的可视高度

判断逻辑代码如下

`element.getBoundingClientRect().top <= document.documentElement.clientHeight ? 显示 : 默认`



我们知道小程序页面的脚本逻辑是在JsCore中运行，JsCore是一个没有窗口对象的环境，所以不能在脚本中使用window，也无法在脚本中操作组件。

所以关于图片懒加载就需要在数据上面做文章了。

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524745373942&di=f794c14e1aafba0061c2b6ba4dcaf0a6&imgtype=0&src=http%3A%2F%2Fwww.dachuantuan.com%2Fuploadfile%2F2017%2F1214%2F20171214090657492.jpg)


## 页面

页面上面只需要根据数据的某一个字段来判断是否显示图片就可以了，字段为Boolean类型，当为false的时候显示默认图片就行了。

代码大概长成这样

```
<view wx:for="{{list}}" class='item item-{{index}}'
 wx:key="{{index}}">
	<image class="{{item.show ? 'active': ''}}" src="{{item.show ? item.src : item.def}}"></image>
</view>
```

布局跟简单，`view`组件里面有个图片，并循环`list`，有多少就展示多少

`image`组件的`src`字段通过每一项的`show`来进行绑定，`active`是加了个透明的过渡

## 样式

```
image{
	transition: all .3s ease;
	opacity: 0;
}
.active{
	opacity: 1;
}

```

## 逻辑
本位主要讲解懒加载，所以把数据写死在页面上了

数据结构如下：

![](https://ws3.sinaimg.cn/large/006tNc79ly1fqq6ixnuhcj30qk0eogo2.jpg)


我们使用两种方式来实现懒加载，准备好没有，一起来快乐的撸码吧。

###  WXML节点信息

小程序支持调用[createSelectQuery](https://developers.weixin.qq.com/miniprogram/dev/api/wxml-nodes-info.html)创建一个`SelectorQuery`实例，并使用`select`方法来选择节点，并通过`boundingClientRect`来获取节点信息。

```
wx.createSelectorQuery().select('.item').boundingClientRect((ret)=>{
	console.log(ret)
}).exec()
 
```
显示结果如下

![](https://ws3.sinaimg.cn/large/006tNc79ly1fqq89wk7m7j30qs09qt9p.jpg)
悄悄告诉你，小程序里面有个`onPageScroll`函数，是用来监听页面的滚动的。
还有个`getSystemInfo`函数，可以获取获取系统信息，里面包含屏幕的高度。


接下来，思路就透彻了吧。还是上面的逻辑， 扒拉扒拉直接写代码就行了,这里只写下主要的逻辑，完整代码请戳文末github

```js
showImg(){
	let group = this.data.group
	let height = this.data.height  // 页面的可视高度
	
	wx.createSelectorQuery().selectAll('.item').boundingClientRect((ret) => {
	 ret.forEach((item, index) => {
	   if (item.top <= height) { 判断是否在显示范围内
	     group[index].show = true // 根据下标改变状态
	   }
	 })
	 this.setData({
	   group
	 })
	}).exec()

}
onPageScroll(){ // 滚动事件
	this.showImg()
}
```

至此，我们完成了一个小程序版的图片懒加载，只是思维转变了下，其实并没有改变实现方式。我们来学些新的东西吧。
 
###  节点布局相交状态
 
节点相交状态是啥？它是一个新的API，叫做`IntersectionObserver`, 本文只讲解简单的使用，了解更多请猛戳[没错，就是点我](https://juejin.im/post/5a7973575188257a5911a749)

小程序里面给它的定义是节点布局交叉状态API可用于监听两个或多个组件节点在布局位置上的相交状态。这一组API常常可以用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见。
 
里面设计的概念主要有五个，分别为 

* 参照节点：以某参照节点的布局区域作为参照区域，*参照节点可以有多个*，多个话参照区域取它们的布局区域的*交集*
* 目标节点：监听的目标，只能是*一个*节点
* 相交区域：目标节点与参照节点的相交区域
* 相交比例：目标节点与参照节点的相交比例
* 阈值：可以有多个，默认为[0], 可以理解为交叉比例，例如[0.2, 0.5]


关于它的API有五个，依次如下

 1、`createIntersectionObserver([this], [options])`，见名知意,创建一个IntersectionObserver实例
 
 2、`intersectionObserver.relativeTo(selector, [margins])`, 指定节点作为参照区域，margins参数可以放大缩小参照区域，可以包含top、left、bottom、right四项
 
 3、`intersectionObserver.relativeToViewport([margin])`，指定页面显示区域为参照区域
 
 4、`intersectionObserver.observer(targetSelector, callback)`，参数为指定监听的节点和一个回调函数，目标元素的相交状态发生变化时就会触发此函数，callback函数包含一个result，下面再讲
 
 5、`intersectionObserver.disconnect()` 停止监听，回调函数不会再触发
 
 然后说下callback函数中的result，它包含的字段为


字段名 | 类型| 说明
------- | ------- | -------
intersectionRatio | Number | 相交比例
intersectionRect| Object| 相交区域的边界，包含 left 、 right 、 top 、 bottom 四项
boundingClientRect| Object| 目标节点布局区域的边界，包含 left 、 right 、 top 、 bottom 四项
relativeRect| Object| 参照区域的边界，包含 left 、 right 、 top 、 bottom 四项
time| Number| 相交检测时的时间戳

 
我们主要使用`intersectionRatio`进行判断，当它大于0时说明是相交的也就是可见的。
 
先来波测试题，请说出下面的函数做了什么，并且log函数会执行几次
 
```js
1、
wx.createIntersectionObserver().relativeToViewport().observer('.box', (result) => {
 	console.log('监听box组件触发的函数')   
 })
 
2、
wx.createIntersectionObserver().relativeTo('.box').observer('.item', (result) => {
 	console.log('监听item组件触发的函数') 
})

3、
wx.createIntersectionObserver().relativeToViewport().observer('.box', (result) => {
	if(result.intersectionRatio > 0){
		console.log('.box组件是可见的') 
	}
})
```

duang，揭晓答案。

第一个以当前页面的视窗监听了`.box`组件，log会触发两次，一次是进入页面一次是离开页面

第二个以`.box`节点的布局区域监听了`.item`组件，log会触发两次，一次是进入页面一次是离开页面

第三个以当前页面的视窗监听了`.box`组件，log只会在节点可见的时候触发


好了，题也做了，API你也掌握了，相信你已经可以使用`IntersectionObserver`来实现图片懒加载了吧，主要逻辑如下
```js
let group = this.data.group // 获取图片数组数据
for (let i in this.data.group){   wx.createIntersectionObserver().relativeToViewport().observe('.item-'+ i, (ret) => {
	   if (ret.intersectionRatio > 0){
	     group[i].show = true 
	   }
	   this.setData({
	     group
	   })
	 })
}
```

至此，我们使用两种方式实现了小程序版本的图片懒加载，可以发现，使用`IntersectionObserver`来实现不要太酸爽。