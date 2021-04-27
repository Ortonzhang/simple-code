# flutter工程抓包

flutter工程无法使用类似charles抓包工具进行抓包，是因为http请求通过wifi没有走代理

通过更该http请求的代码可以实现代理，[实现方式请戳](https://juejin.cn/post/6844903794229116935), 但是这样的话针对测试来说太约束了，无法多人进行抓包测试。

## Android抓包

通过`Drony`软件可以设置个VPN代理，VNP代理到Charles，然后就可以抓包了
安装包放在`package`文件夹，直接安装即可

## ios
ios上有类似`Drony`的软件，这里使用`Shadowrocket`进行VPN的设置

安装方式：
  1、通过非大陆`appleId`，直接在`appStore`中进行下载
  2、通过ipa文件进行安装，安装包同样放在了`package`文件夹，电脑采用爱思助手数据线连接手机，通过加载本地文件安装到手机上

