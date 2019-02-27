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

### export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```
// 报错
export 1;

// 报错
var m = 1;
export m;

// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m}; //导入时导入 m才行

```

- export命令除了输出变量，还可以输出函数或类（class）。
- export输出的变量就是本来的名字，但是可以使用as关键字重命名（此时只能使用重命名的别名）
- export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值.
这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新.

```
profile3_export.js------------

 export let foo = "barrrrr";
 setTimeout(() =>{
     foo = "bazzzz";
 },2000)


main.js----------
import { foo} from "./profile3_export.js";
console.log(foo); // barrrrr

setTimeout(()=>{
    console.log(foo); // bazzzz ,此处会进行更新！
},2500)

```



- export命令可以出现在模块的任何位置，只要**处于模块顶层**就可以。如果处于**块级作用域内，就会报错**，下一节的**import命令也是如此**.

```
function foo() {
  export default 'bar' // SyntaxError, export 处于代码块中不符合语法
}
foo()
```



## import 命令 

1. import命令接受一对大括号，里面指定要从其他模块导入的变量名。
   大括号里面的变量名，必须与被导入模块对外接口的名称相同

```
// main.js
import {firstName, lastName, year} from './profile.js';

```
2. 如果想为输入的变量重新取一个名字，import命令要使用as关键字，
   将输入的变量重命名（此时只能使用新的别名）。

```
import{lastName as surname} from "./profile.js"
// 此时代码里只能使用 surname，不能使用 lastName
```
3. import命令输入的变量都是只读的，因为它的本质是输入接口。
   也就是说，不允许在加载模块的脚本里面，改写接口.
   (如果输入的是一个对象，改写对象的属性是允许的，__不推荐__。)

```
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
//上面代码中，脚本加载了变量a，对其重新赋值就会报错，因为a是一个只读的接口。

// 但是，如果a是一个对象，改写a的属性是允许的。
import {a} from './xxx.js'
a.foo = 'hello'; // 合法操作
```


4. import命令具有提升效果，会提升到整个模块的头部，首先执行

```
foo(); // 不会报错，import提升了变量
import {foo} from "my module";
```

5. import是静态执行，所以不能使用表达式和变量

```
// 报错
import { 'f' + 'oo' } from 'my_module';  // 使用了表达式

// 报错
let module = 'my_module';
import { foo } from module;   // 使用了变量

// 报错
if (x === 1) {
  import { foo } from 'module1';    // import在if结构中
} else {
  import { foo } from 'module2';
}
```

6. 多次重复执行同一句import语句，那么只会执行一次，而不会执行多次


## 整体加载模块

//逐一指定要加载的方法
import { area, circumference } from './circle';

// 整体加载
import * as circle from './circle';


注意，**模块整体加载所在的那个对象，应该是可以静态分析的，所以不允许运行时改变**。

```

// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

-----------------
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

##  export default

export default命令，为模块指定默认输出。

```
---profile4_exportDefault.js
export default function (msg){
    console.log(msg);
}

export function each(arr){
    for(let i of arr){
        console.log(i);
    }
}
export {each as forEach};

--------------main4.js
import _,{ each,forEach} from "./profile4_exportDefault.js";

_("this is default");

each([3,4,5]);
forEach([-9,-3,-4])


```
- 使用export default时，对应的**import语句不需要使用大括号**，因为只可能唯一对应export default命令。
- 一个模块只能有一个默认输出，因此export default命令只能使用一次;
- export default命令其实只是输出一个叫做default的变量，所以它后面**不能跟变量声明语句**;
 

## export 与 import 的复合写法

1. 仅仅转发
export {foo,bar} from "module1"  相当于:
import {foor,bar} from "module1";
export {foo,bar}

2.改名
export {foo as myFoo} from "mymodule"; // 先导入 foo ，再以 myFoo输出

3. 整体输出
注意： export * 不带 { }
export * from "mymodule" ; // export *，表示再输出mymodule模块  所有的  属性和方法

4.默认输出
注意这里 有花括号 { }
export {default} from "mymodule" ;   //注意这里 有花括号 { }

5. 继承
export * from "mymodule" ;// export *，表示 再输出 mymodule模块 所有的 属性和方法
export let newVar = "hhh";

## ES6 模块加载
- 浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入type="module"属性
- 浏览器对于带有type="module"的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的defer属性。

```
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```
1. 对于外部的模块脚本 有几点需要注意。

- 代码是在模块作用域之中运行，而**不是在全局作用域**运行。模块内部的顶层变量，外部不可见。
- 模块脚本**自动采用严格模式**，不管有没有声明use strict。
- 模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
- 模块之中，**顶层的this关键字返回undefined，而不是指向window**。也就是说，在模块顶层使用this关键字，是无意义的。
- 同一个模块如果加载多次，将只执行一次。






