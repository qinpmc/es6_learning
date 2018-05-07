# let 和 const

## let
1. let所声明的变量，只在let命令所在的代码块内有效   

```
// 1 let所声明的变量，只在let命令所在的代码块内有效
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




