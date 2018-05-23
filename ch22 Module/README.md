# Module

## Module基本语法

```
//profile1_1.js
export var firstName = "Michael"; //导出方式1
var lastName = "Jondan";
var year = 1958;
export function divide(x,y){    //导出方式1
    return x/y;
}
export{lastName,year};   //导出方式2

//main1.js
import {firstName, lastName, year,divide}  from "./profile1_1.js";
let name = firstName+" "+lastName;
let res1 = divide(year,2);
console.log(name); //Michael Jondan
console.log(res1); //979

// module1.html
<script src="main1.js" type=module ></script>

```



## import 命令 

1. import命令接受一对大括号，里面指定要从其他模块导入的变量名。
   大括号里面的变量名，必须与被导入模块对外接口的名称相同
```
// main.js
import {firstName, lastName, year} from './profile.js';

```
2. 如果想为输入的变量重新取一个名字，import命令要使用as关键字，
   将输入的变量重命名。
```
import{lastName as surname} from "./profile.js"
```
3. import命令输入的变量都是只读的，因为它的本质是输入接口。
   也就是说，不允许在加载模块的脚本里面，改写接口.
   (如果输入的是一个对象，改写对象的属性是允许的，__不推荐__。)

4. import命令具有提升效果，会提升到整个模块的头部，首先执行
```
foo();
import {foo} from "my module";
```


