# Jenkins 
jenkins 是一款流行的开源持续集成工具,广泛用于项目开发,具有自动化构建、测试和部署等功能。


## Mac安装

如果想在Mac上面安装jekens也是可以的，我们需要在本地下载java JSD，然后安装jenkens即可，安装包我已经放在了百度网盘上，可按照下面的步骤下载安装。

+ 安装JDK

[点击下载](https://pan.baidu.com/s/1Ka7OtE5JzXo68mewm1jLWQ)，直接运行就行

+ 安装Jenkins

[点击下载](https://pan.baidu.com/s/1WHFyj93ELxCPH9kwGgjlpQ) next 一路安装


安装完成后，按照下面的`安装Jenkins`模块中的`按照提示，粘贴密码`以下步骤就可以愉快的玩耍Jenkins了。


### QA

+ 安装后，运行中出现`该jenkins实例似乎已离线`字段

当前页面不要动,然后打开一个新的tab，输入网址 http://localhost:8080/pluginManager/advanced  这里面最底下有个【升级站点】，把其中的链接改成http，http://updates.jenkins.io/update-center.json, 然后关闭Jenkins，重启就行了

+ 启动or关闭

```bash
# 开启
sudo launchctl load /Library/LaunchDaemons/org.jenkins-ci.plist

# 关闭
sudo launchctl unload /Library/LaunchDaemons/org.jenkins-ci.plist
```

+ 卸载jenkins

依次执行下面命令即可

```bash
sudo rm /Library/LaunchDaemons/org.jenkins-ci.plist

sudo rm -rf /Applications/Jenkins "/Library/Application Support/Jenkins" /Library/Documentation/Jenkins

sudo rm -rf /var/root/.jenkins ~/.jenkins # 删除配置文件


```


## 安装java JDK

安装jenkins其实就是敲命令，直接安装就行，首先安装依赖的java环境。以下代码，依次执行

1、执行`yum search java|grep jdk` 查找java版本

2、执行`yum install java-1.8.0` 进行安装 可选择其他版本

3、java会被安装在`/usr/lib/jvm/`文件夹下

4、配置环境变量 执行 `vi /etc/profile`

5、输入以下内容, 其中`JAVA_HOME`字段改成自己的java所在路径

```
#set java environment
JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.161-0.b14.e17_4.x86_64
JRE_HOME=$JAVA_HOME/jre
CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME JRE_HOME CLASS_PATH PATH
```

6、执行 `source /etc/profile`更新配置, 执行 `java -version` 出现以下，安装成功。

![](https://ws3.sinaimg.cn/large/006tKfTcly1frepeo2p5gj30bg01qdfx.jpg)


## 安装Jenkins

1、 执行 `sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo` 拉取库的配置到本地对应文件

2、 执行 `sudo rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key` 导入公钥


3、执行 `sudo yum -y install jenkins` 进行安装

4、安装完成后执行`service jenkins start` 启动Jenkins

5、打开8080端口访问Jenkins

**阿里云服务器需要开放8080端口，具体操作如下**

执行`firewall-cmd --state` 查看防火墙状态

![](https://ws1.sinaimg.cn/large/006tKfTcly1freptmk39uj30dg02ut8r.jpg)

**firewall命令一览**

```
systemctl status firewalld.service  // 查看防火墙状态
firewall-cmd --state  // 查看防火墙状态
systemctl stop firewalld.service   // 关闭防火墙
systemctl start firewalld.service   // 开启防火墙
systemctl disable firewalld.service  // 禁止开机自启动
```
安全组找到配置规则

![](https://ws1.sinaimg.cn/large/006tKfTcly1frepsar700j31hb0jotc4.jpg)

然后点击添加安全组，填入以下内容，开放8080端口

![](https://ws1.sinaimg.cn/large/006tKfTcly1frepsqyt23j30iz0lgt9w.jpg)

回到Jenkins页面刷新，如下

![](https://ws3.sinaimg.cn/large/006tKfTcly1frepyscl9xj30sb0kidh4.jpg)

按照提示，粘贴密码，密码路径`/var/lib/jenkins/secrets/initialAdminPassword`

![](https://ws1.sinaimg.cn/large/006tKfTcly1frepzd19ynj30sr0qmjt3.jpg)


选择安装推荐的插件，等待安装完成

![](https://ws4.sinaimg.cn/large/006tKfTcly1freq0t4svyj30ta0pidho.jpg)

创建用户

![](https://ws3.sinaimg.cn/large/006tKfTcly1freq11f5mdj30sn0rbmyj.jpg)

点击完成后，再点击开始使用，进入工作台

![](https://ws1.sinaimg.cn/large/006tKfTcly1freq1gpv4zj30ns0fz3za.jpg)


## 源码管理

### 源码管理

通过上面的几步，我们已经安装好了Jenkins，接下来，我们开始我们的自动化构建之旅。

首先创建一个任务，源码管理选择git，输入git的用户名和密码，完成源码管理的配置。

![](https://ws3.sinaimg.cn/large/006tKfTcly1freq56cakbj30z70ngdj8.jpg)

![](https://ws2.sinaimg.cn/large/006tKfTcly1freq5en56mj31770g0myt.jpg)

![](https://ws1.sinaimg.cn/large/006tKfTcly1freq5kpgjtj31440gjjt4.jpg)

![](https://ws3.sinaimg.cn/large/006tKfTcly1freq5v2c55j313s0ebgnb.jpg)

填写完后，点击添加，如果有报错，请检查输入的用户名和密码，都没有错的话，检查下git项目的`Visibility Level`是否是`private`, 需要更改成 internal或者public。

分支默认选择master。

### git webhooks

1、选择系统管理 => 管理插件下面的可选插件，输入`Generic Webhook Trigger`，选中后直接安装

2、安装完成后，选择 任务 => 配置

![](https://ws1.sinaimg.cn/large/006tKfTcly1freq8muu15j30ku0923z3.jpg)

在构建触发器中勾选`Generic Webhook Trigger`

![](https://ws4.sinaimg.cn/large/006tKfTcly1freq8y2j0kj30q30bp0tv.jpg)

3、在主菜单选择用户 => 选择用户（自己的用户）

![](https://ws3.sinaimg.cn/large/006tKfTcly1freq9bmvm0j30ly09jaa9.jpg)

点击配置按钮， 然后点击API Tonken下的 `Show API Token...`按钮，显示如下

![](https://ws1.sinaimg.cn/large/006tKfTcly1freqa53498j312i0a7jsa.jpg)

4、在github上配置webhooks

![](https://ws4.sinaimg.cn/large/006tKfTcly1freqah15osj30rx0khacg.jpg)

payload URL格式如下

`http://<user ID>:<API Tonken>@<jenkins ip>:<端口>/generic-webhook-trigger/invoke`

端口没改的话就是8080

默认选择`Just the push event.`push的时候就触发钩子

点击`Add webhook`，完成钩子的创建

5、当我们执行`git push`的时候，Jenkins就会把代码拉到自己的服务器上

![](https://ws1.sinaimg.cn/large/006tKfTcly1freqb3kb8hj30se0c50ue.jpg)


## 自动化构建

前面我们配置了webhooks钩子，当我们拿到代码后，要做些什么呢？我们要执行一些命令，测试、安装依赖、压缩资源等等，这就是我们说的自动化构建，接下来，我们以生成`package.json`文件为例来演示下

1、我们用到了node环境，先来配置下，在插件管理里面 搜索`nvm wrapper`并下载

2、选择我们创建的test任务，在构建环境添加配置，这里使用node8.5版本

![](https://ws1.sinaimg.cn/large/006tKfTcly1freqed10jdj315j0cg75l.jpg)

3、构建下面的增加构建步骤按钮，选择执行shell选项,输入以下命令，多个命令用 && 分开

![](https://ws3.sinaimg.cn/large/006tKfTcly1freqeqnz66j312c070wew.jpg)


4、点击应用保存后，点击立即构建

![](https://ws2.sinaimg.cn/large/006tKfTcly1freqezkj15j30oa0edmyd.jpg)


控制台输出

![](https://ws4.sinaimg.cn/large/006tKfTcly1freqf8xyf8j30mn0dc3zn.jpg)


至此，我们完成了一个超级简单的自动化构建

5、成功后，我们把执行命令改成如下所示

![](https://ws2.sinaimg.cn/large/006tKfTcly1freqfhxiixj314w07kwex.jpg)

为啥？为了我们接下来的自动化部署


##自动化部署

通过Jenkins的`Publish Over SSH`的插件，可以使我们完成自动化部署，它的流程如下:

![](https://ws4.sinaimg.cn/large/006tKfTcly1freqgk180fj30780c6gm0.jpg)


1、首先我们下载插件，系统管理 => 插件管理，下载安装`Publish Over SSH`

2、在系统管理里面找到 SSH Servers, 完成配置

![](https://ws3.sinaimg.cn/large/006tKfTcly1freqgpzq5xj31kw0fngo7.jpg)


填写完后，点击下面的 高级选项

勾选`Use password authentication, or use a different key` 填写密码

![](https://ws4.sinaimg.cn/large/006tKfTcly1freqh0gu23j30yj0a1jsj.jpg)


完成后点击下面的灰色按钮`Test Configuration`

![](https://ws2.sinaimg.cn/large/006tKfTcly1freqh73zuij30wz09d752.jpg)


成功后点击保存，完成配置。

3、在任务的配置里面找到构建后操作 
![](https://ws3.sinaimg.cn/large/006tKfTcly1freqho5p3oj30i90gt75b.jpg)

选择`Send build artifacts over SSH`，填入下面配置


![](https://ws4.sinaimg.cn/large/006tKfTcly1freqi8es63j312e0gktb2.jpg)

4、请确保构建执行的命令已改，然后点击应用保存

当我们本地执行`git push`的时候，就会把src下面的文件打包放在服务器上， 如下
![](https://ws4.sinaimg.cn/large/006tKfTcly1freqii7dsfj30gz04kwf5.jpg)



## 发送邮件

1、找到`Extended E-mail Notification`，填写下面的配置， 如果也是qq邮箱，只需要改下面标红的

![](https://ws4.sinaimg.cn/large/006tKfTcly1freqjczur3j313d0hrjtn.jpg)


开启smtp，会让你发送短息，发送完后就有个授权码，密码填这个即可

![](https://ws3.sinaimg.cn/large/006tKfTcly1freqjk1ty9j30g0090js2.jpg)


2、在任务的配置中，添加构建后操作，选择`Editable Email Notification`
![](https://ws2.sinaimg.cn/large/006tKfTcly1freqjpvrgkj314j0ihjtx.jpg)

在Project Recipient List中添加要发送的邮箱，别的不用管。

点击按钮`Advanced Settings...`

![](https://ws3.sinaimg.cn/large/006tKfTcly1freqjwiwupj31kw0cfwga.jpg)

在`Triggers`里，点击Add trigger按钮选择 always，意思是任何情况都发送邮件

![](https://ws1.sinaimg.cn/large/006tKfTcly1freqk2gnj8j30j50act9e.jpg)


3、点击应用保存。最后在系统管理=> 系统设置，找到`Jenkins Location`，添加系统管理员邮件地址，不然邮件不会发送,邮件地址填写`Extended E-mail Notification`填写的邮箱

![](https://ws2.sinaimg.cn/large/006tKfTcly1freqkbchsbj30u604haag.jpg)


4、构建完成后，Jenkins就会给我们发送邮件了。
![](https://ws3.sinaimg.cn/large/006tKfTcly1freqki3yeyj30sb0anab9.jpg)

## 总结

Jenkins还可以做很多事情，我们只是窥探了它的冰山一角，不过也够用了，最后看下我们的工作流程

![](https://ws2.sinaimg.cn/large/006tKfTcly1freqkwki7rj30d50hn0u8.jpg)




