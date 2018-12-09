# decorator

1. 安装bable、babel-preset-es2015

npm install babel-cli babel-preset-es2015 --save-dev(本地安装);   
 
2. 安装transform-decorators-legacy     
inpm install transform-decorators-legacy  

3. 修改 .babelrc 文件

.babelrc 文件 增加： 
"plugins": ["transform-decorators-legacy"]   

4. 编译文件   
切换到文件目录下：    
运行：babel decorator1.js -o decorator_babel.js  
 