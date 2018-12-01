# let 和 const

## 1 let 命令 

### 1.1 let所声明的变量，只在let命令所在的代码块内有效(ES6引入了块级作用域)   

```
// let所声明的变量，只在let命令所在的代码块内有效
	{
	  let a = 10;
	  var b = 1;
	}

	a // ReferenceError: a is not defined.
	b // 1
```

```
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10,全局只有一个变量i
```

```
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6,变量i仅在块级作用域内有效
```

**for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。**   

```
for (let i = 0; i < 3; i++) {
  
  let i = 'abc'; //此处的i和for内部的i并未发生冲突
  console.log(i);
}
// abc
// abc
// abc
```

### 1.2 let声明的变量不存在变量提升（var 声明的变量会变量提升）

### 1.3 let声明形成暂时性死区 (TDZ)
```
var tmp = 123;

if (true) {
// TDZ开始
  tmp = 'abc'; // ReferenceError
  let tmp; // TDZ结束
}
``` 
```
//隐蔽的TDZ
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错，Uncaught ReferenceError: y is not defined  
```  

### 1.4 不允许重复声明 
```
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

## 2 const 命令 

### 2.1 const声明一个只读的常量。一旦声明，就不能改变(对于对象而言，是指对象地址不可变，对象属性可变)； 
### 2.2 声明后必须赋值 ；   
### 2.3 const声明的常量同样不提升，且存在暂时性死区  

## 3 let 和 const 与顶层对象关系

**ES6规定：var命令和function命令声明的全局变量，依旧是顶层对象的属性;    
另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性**

```
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

## 循环体中let，const
 for-in 或 for-of 循环中使用const或 let时，每次循环创建新的变量
 
```

let ary5 = [],
        array5 = ["a","b","c"];

for(const key of array5){  //注意：这里使用const，在for-of中可行
    ary5.push(function(){
        console.log(key);
    })
}
ary5[2](); //c


/*		let ary3 = [];
		for(const i3=0;i3<5;i3++){ // i3++ 编译报错 ，const 不能重新赋值
			ary3.push(function(){
				console.log(i3);
			})
		}*/
```





