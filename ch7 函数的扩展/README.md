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
function foo({x, y = 5}) {   //只使用了对象的解构赋值默认值，没有使用函数参数的默认值。
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
//
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

## 5 作用域的问题
** 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。 **

```
/*
		/*
		function f(x,y){
			let x = 2;
			y = x;
			console.log(y);
		}

		f(); //  Uncaught SyntaxError: Identifier 'x' has already been declared
		*/

/*		let x = 1;
		function f(y = x) {  //括号里的x指向外部 x ,x=1
			let x = 2;
			console.log(y);
		}
		f() ;// 1*/

		
		var x = 1;
		function f(x, y = x) {  //默认值变量x指向第一个参数x，而不是全局变量x
			console.log(y);
		}
		f(2) // 2
		
		
		let foo = 'outer';
        
        function bar(func = () => foo) { //foo 指向外层 foo
          let foo = 'inner';
          console.log(func());
        }
        
        bar(); // outer
```

```
//参数的默认值是一个函数，该函数的作用域也遵守这个规则
    let foo = 'outer';

    function bar(func = () => foo) {
      let foo = 'inner';
      console.log(func());
    }

    bar(); // outer

```

```
//复杂的例子对比
    // 情况 1
    var x = 1;
    function foo(x, y = function() { x = 2; }) {
        let x = 3;  //注意此处为let
        y();
        console.log(x);
    }

    foo(); // Uncaught SyntaxError: Identifier 'x' has already been declared

    // 情况 2
    //函数foo的参数形成一个单独作用域。这个作用域里面有变量x，、y，y的默认值是一个匿名函数。
    //这个匿名函数内部的变量x，指向同一个作用域的第一个参数x。
    //函数foo内部又声明了一个内部变量x，该变量与第一个参数x由于不是同一个作用域，
    //所以不是同一个变量，因此执行y后，内部变量x和外部全局变量x的值都没变。
    var x = 1;
    function foo(x, y = function() { x = 2; }) {
      var x = 3;  //注意此处为var
      y();
      console.log(x);
    }

    foo() // 3
    x // 1


    // 情况 3
    //函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，
    //所以最后输出的就是2，而外层的全局变量x依然不受影响
    var x = 1;
    function foo(x, y = function() { x = 2; }) {
      x = 3;  //注意此处没有let或var
      y();
      console.log(x);
    }

    foo() // 2
    x // 1
```
 
## 6 rest 参数

 * rest 参数（形式为...变量名），用于获取函数的多余参数
 * rest 参数是一个真正的数组，数组特有的方法都可以使用
 * rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错

```
    //rest 参数 
    function sum(...items){
      let sum = 0;
      for(let item of items){
        sum+=item;
      }
      return sum;
    }
    sum(1,2,3,4); //10
```

## 7 箭头函数  

* 箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分
* 只有一个参数，可以省略（），如果只有一行return 语句，可以省略{}

```
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};

```

* 箭头函数直接返回一个对象，必须在对象外面加上 __括号__ ，否则会报错

```
//箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```





















   
   
   
   