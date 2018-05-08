# 函数的扩展

## 1 函数默认值
```
	// 函数默认值
	function Point(x=0,y=0){
		this.x = x;
		this.y = y;
	}
	const p = new Point();
	console.log(p);
```

## 2 函数参数变量为默认声明，不能用let和const再次声明  
     使用参数默认值时，函数不能有同名参数
```
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}

// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context

```

## 3 与解构赋值默认值值结合使用

```
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
//只使用了对象的解构赋值默认值，没有使用函数参数的默认值。
//只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成。
//如果函数foo调用时没提供参数，变量x和y就不会生成，从而报错


// 改造：提供函数参数的默认值，就可以避免上述情况
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5

```
## 4 参数默认值的位置

* 定义了默认值的参数，应该是函数的尾参数
* 如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
```
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]
```










   
   
   
   