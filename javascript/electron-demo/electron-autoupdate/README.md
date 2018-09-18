# electron autoUpdate

使用electron-builder进行打包，使用`electron-updater`完成自动更新


开发准备

+ 使用`钥匙串访问`创建`代码签名`类型的证书，名称为`electron_update`

+ 添加变量 `export CSC_NAME="electron_update"`

+ 修改`package.json`中的`version`字段为`1.0.5`, 修改index.html中的版本号，进行打包

+ 将打包文件放置在服务器上，修改`main.js`中的`feedURL`字段，替换为自己的服务器地址

+ 再次修改`package.json`中的`version`字段为`1.0.3`, 修改index.html中的版本号，进行打包

+ 安装`1.0.3`版本的应用，点击按钮，进行自动更新


