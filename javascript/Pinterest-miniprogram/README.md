# 小程序瀑布流

## 效果图

来来来，看啊看，外面的世界多好看，
![](https://user-gold-cdn.xitu.io/2018/5/11/1634e2614793febc?w=371&h=580&f=gif&s=4841665)

## 数据

图片数据来源[张鑫旭的网络日志](http://www.zhangxinxu.com/study/201203/waterfall-layout.html)

先说下我们的图片链接格式

所有的链接都是`http://cued.xunlei.com/demos/publ/img/P_${name}.jpg`这样的格式，我们需要改变name的值就行了，当`name`值小于10的时候，格式是`00x`,如`002`、`003`，大于10的时候就是`023`这种。

## 使用

将node目录中的server.js文件的ip改成自己的ip

详情介绍请戳[掘金]()