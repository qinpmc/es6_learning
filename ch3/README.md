# 解构赋值
 
## 1 数组的解构赋值
### 1.1  基本使用

```
    //let a = 1;
	//let b = 2;
	//let c = 3;
	//等同于：
 	let [a, b, c] = [1, 2, 3];


 	let [foo, [[bar], baz]] = [1, [[2], 3]];
	foo // 1
	bar // 2
	baz // 3


	let [x, , y] = [1, 2, 3];
	x // 1
	y // 3

	let [head, ...tail] = [1, 2, 3, 4];
	head // 1
	tail // [2, 3, 4]

	//注意 z 解构为数组
	let [x, y, ...z] = ['a'];
	x // "a"
	y // undefined
	z // []

	let [a, [b], d] = [1, [2, 3], 4];
	a // 1
	b // 2
	d // 4
```
### 1.2 数组解构赋值默认值 
```
   // 解构赋值默认值 
	let [foo = true] = [];
	foo // true

	let [x, y = 'b'] = ['a']; // x='a', y='b'
	let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'


	//ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
	//所以，只有当一个数组成员严格等于undefined，默认值才会生效
	let [x = 1] = [undefined];
	x // 1

	let [x = 1] = [null];
	x // null

	// 默认值是一个表达式，那么这个表达式是惰性求值的
	function f() {
	console.log('aaa');
	}

	let [x = f()] = [1]; //f() 并不会执行

	//默认值可以引用解构赋值的其他变量，但该变量必须已经声明
	let [x = 1, y = x] = [];     // x=1; y=1
	let [x = 1, y = x] = [2];    // x=2; y=2
	let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```
## 2 对象的解构赋值 
### 2.1  基本使用
```
    //数组的元素是按次序排列的，变量的取值由它的位置决定；
	//而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
	let { bar, foo } = { foo: "aaa", bar: "bbb" };
	foo // "aaa"
	bar // "bbb"

	let { baz } = { foo: "aaa", bar: "bbb" };
	baz // undefined

	//foo是匹配的模式，baz才是变量。
	//真正被赋值的是变量baz，而不是模式foo。
	let { foo: baz } = { foo: "aaa", bar: "bbb" };
	baz // "aaa"
	foo // error: foo is not defined
```
### 2.2 嵌套结构的对象解构赋值

```
// 嵌套结构的对象解构赋值
	//这时p是模式，不是变量，因此不会被赋值
	let obj ={
		p:[
			"hello",
			{y:"world"}
		]
	};
	let {p:[x,{y}]} = obj;
	x // "Hello"
	y // "World"
	p //Uncaught ReferenceError:

	let { p, p: [x, { y }] } = obj;
	p // ["Hello", {y: "World"}]
```

** 更复杂的例子 **

```
   //注意：最后一次对line属性的解构赋值之中，只有line是变量，
   //loc和start都是模式，不是变量
	const node = {
	loc: {
	    start: {
	      line: 1,
	      column: 5
	    }
	  }
	};

	let { loc, loc: { start }, loc: { start: { line }} } = node;
	line // 1
	loc  // Object {start: Object}
	start // Object {line: 1, column: 5}
```
### 2.3 将一个已经声明的变量用于解构赋值
```
	//将一个已经声明的变量用于解构赋值，必须非常小心。
	
	let obj = {};
	let arr = [];
	//注意下方的括号，不能省略，否则会将{} 内的内容当做代码块
	({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

	obj // {prop:123}
	arr // [true]

	// 错误的写法，JavaScript 引擎会将{x}理解成一个代码块
	let x;
	{x} = {x: 1};
	// SyntaxError: syntax error

	// 正确的写法
	let x;
	({x} = {x: 1});
```




