# 解构赋值
 
## 1 数组的解构赋值
### 1.1基本使用

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

### 1.3 数组解构注意点

如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。

``` 
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

```


``` 

// 对于 Set 结构，也可以使用数组的解构赋值。

let [x, y, z] = new Set(['a', 'b', 'c']);

x // "a"


function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs(); // fibs()返回Iterator
sixth // 5

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

### 2.4 对象解构赋值时设置默认值


```
	//对象解构默认值

	let{ x=3} = {};
	x //3
	var {x, y = 5} = {x: 1};
	x // 1
	y // 5

	var {x: y = 3} = {};
	y // 3
	//注意：此时并未对x进行解构
```

## 3 字符串、布尔值、数值等的解构赋值

```
	//字符串解构
 	const [a, b, c, d, e] = 'hello';
	a // "h"
	b // "e"
	c // "l"
	d // "l"
	e // "o"

    //字符串也有length属性，此时是对象解构赋值
	let {length : len} = 'hello';
	len // 5

	//数组看做对象，进行解构赋值
	let arr = [1, 2, 3];
	let {0 : first, [arr.length - 1] : last} = arr;
	first // 1
	last // 3

	//数值和布尔值解构赋值
	let {toString: s} = 123;
	s === Number.prototype.toString // true

	let {toString: s} = true;
	s === Boolean.prototype.toString // true
```

## 4 函数参数的解构赋值  

```
	function move({x=-1,y=-2} = {}){
 		return [x,y];
 	}
 	move({x:3,y:8}); //[3,8] ,传入了参数，进行解构
 	move({x:3}) ;//[3,-2]，传入了参数，进行解构，y解构失败，采用默认值-2
 	move({}); //[-1,-2]，传入了参数，但x、y均解构失败，均采用默认值
 	move(); //[-1,-2]，未传入参数，x、y均采用默认值

 	//-----------------
 	//函数move2的参数指定默认值，而不是为变量x和y指定默认值
 	function move2({x,y} = {x:10,y:10}){
 		return[x,y];
 	}
 	move2({x:3,y:8}); //[3,8] ，传入了参数，不采用默认参数
 	move2({x:3});//[3,undefined] ，传入了参数，不采用默认参数,y解构失败位undefined
 	move2({});//[undefined,undefined],传入了参数，不采用默认参数,然后x、y解构失败，均为undefined
    move2();//[10,10] ,未传入参数，使用了默认的值，解构后 x=10，y=10
 

    //-----------------
	//只使用了对象的解构赋值默认值，没有使用函数参数的默认值。
	//只有当函数move3的参数是一个对象时，变量x和y才会通过解构赋值生成。
	//如果函数move3调用时没提供参数，变量x和y就不会生成，从而报错。
	
 	function move3({x=30,y=30}){
 		return[x,y];
 	}
 	move3({x:3,y:8}); //[3,8]
 	move3({x:3});[3,30]
 	move3({});//[30,30]
    move3();//报错 Cannot destructure property `x` of 'undefined' or 'null'.
```



## 5 解构的小应用

```
	//解构赋值应用
	// 交换变量
	let x =1;
	let y =2;
	[x,y] = [y,x];


	// 复制数组
    // ES6 中复制数组
	let [... clonedColors] = colors;
	console.log(clonedColors); //["red","blue","green"]



```

## 6 函数参数解构

详见 Destructuring10.html

``` 

function setCookie(name,value,{secure,path,domain,expires}){
    console.log(secure);
    console.log(path);
    console.log(domain);
    console.log(expires);
}

let defaultParams = {
    secure:true,
    path:"/",
    domain:"example.com",
    expires:6000
}

function setCookie2(name,value,{secure,path,domain,expires} = defaultParams){
    console.log(secure);
    console.log(path);
    console.log(domain);
    console.log(expires);
}


```

如 veux 中的：
 
```
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```






















