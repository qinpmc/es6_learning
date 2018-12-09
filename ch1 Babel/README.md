
## ES6 转换
* Window7环境，32位
* 安装babel
npm install babel-cli -g (全局安装babel-cli);    

npm install babel-cli babel-preset-es2015 --save-dev(本地安装);    


如果项目下没有.babelrc文件，自己创建一个.babelrc文件，（windows下先创建一个txt文件，然后将其修改为.babelrc.文件）   
其中.babelrc文件内容为:

```
{
    "presets": [
        "es2015"
    ],
    "plugins": [

    ]
}
```
* 测试ES6编译为ES5
1. 准备测试文件bableTest1.js：

```
	let fun = () => console.log('babel')
```

2. cmd中输入命令：babel bableTest1.js -o babled1.js

3. 转译的文件babled1.js

```
	'use strict';

	var fun = function fun() {
	  return console.log('babel');
	};
```

 