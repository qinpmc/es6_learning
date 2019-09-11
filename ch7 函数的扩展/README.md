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

### 1.1 函数参数变量为默认声明，不能用let和const再次声明 ；

```
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}

// 不报错
function foo(x, x, y) {
  // ...
}

```
### 1.2 使用参数默认值时，函数不能有同名参数

``` 
// 报错， 使用参数默认值时，函数不能有同名参数
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context


```

  
### 1.3 与解构赋值默认值值结合使用 

 

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

```


例子：**双重默认值** - 解构参数默认值，函数参数默认值
- 函数foo没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效

 
```
// 改造：提供函数参数的默认值，就可以避免上述情况。注意：这里使用了双重默认值 - 解构参数默认值，函数参数默认值
// 函数foo没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效  
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5

```

 

### 1.4 参数默认值的位置

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

 

### 1.5 默认参数对函数的 length 属性影响

指定了默认值以后，函数的length属性，将返回 __没有指定默认值的参数个数__

```
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

### 1.6 默认参数带来的作用域问题
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
		
```

```
//参数的默认值是一个函数，该函数的作用域也遵守这个规则
    let foo = 'outer';

    function bar(func = () => foo) { //foo 指向外层 foo
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
    //函数foo的参数形成一个单独作用域。这个作用域里面有变量x、y，y的默认值是一个匿名函数。
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
 
### 1.7 默认参数对arguments的影响
使用了默认参数，函数这种无论是否显式定义了严格模式，arguments对象的行为与es5 严格模式保持一致，即形参与 arguments 对象分离
 
 
```
    function mixArgs2(first,second ="b"){

        console.log(arguments.length);
        console.log(first === arguments[0]);
        console.log(second === arguments[1]);
        first = "c";
        second = "d";
        console.log(first === arguments[0]);
        console.log(second === arguments[1]);

    }
    mixArgs2("a2"); // 1 true false  false false

```
 
### 1.8 默认参数表达式会惰性求值

```
function add(first = second,second){

    return first + second;
}

console.log( add(1,1)); // 2  ，本来由于 first 引用了未声明的变量 second导致错误，但这里传递了参数，实际的引用未发生
console.log( add(undefined,1)); // 报错 

```


## 2 rest 参数

 * rest 参数（形式为...变量名），用于获取函数的多余参数
 * rest 参数是一个真正的数组，数组特有的方法都可以使用
 * rest 参数之后不能再有其他参数（即**只能是最后一个参数**），否则会报错
 * 每个函数只能有一个不定参数

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

## 3 name 属性
- 函数的name属性，返回该函数的函数名
- 如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。

```
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"

```
- 如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。

```
onst bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz
```

- Function构造函数返回的函数实例，name属性的值为anonymous。

```
  (new Function).name // "anonymous"
```

- bind返回的函数，name属性值会加上bound前缀。

```
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```

- name属性特殊情况


```
var pp = {
	get firstName(){
		return "hh"
	},
	sayName: function() {
        console.log(this.name);
    }

}


pp.firstName.name;// undefined
console.log(person.sayName.name);   // "sayName"

var descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor.get.name); // "get firstName"


var doSomething = function doSomethingElse() {
    // ...
};
console.log(doSomething.name);      // "doSomethingElse"
```
 
 
Default Parameter Values Affect the arguments Object
 
  
## 4 new.target 元属性

JavaScript 中函数有2种内部方法：[[Call]] and [[Construct]]. 
- 当没有使用new调用，[Call]] 方法被调用；
- 当使用new 调用，[[Construct]] 方法被调用；
 

```
function Person(name) {
    if (new.target === Person) {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

function AnotherPerson(name) {
    Person.call(this, name); // 借用构造函数也不行
}

var person = new Person("Nicholas");
var anotherPerson = new AnotherPerson("Nicholas");  // error!
```
 
 
## 5 箭头函数

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

### 4.1 箭头函数有几个使用注意点
（0） 没有 this/super/arguments/new.target,均由箭头函数外围最近一层非箭头函数决定
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
（2）不可以当作构造函数，也就是说，**不可以使用new命令**，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
（5） arguments、super、new.target在箭头函数之中也是不存在的（它们是指向外层函数的对应变量）
（6） 没有prototype属性
（7） 不支持重复的命名参数

### 4.2 使用范例

vuex中：

```
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

// 相当于


getters: {
   getTodoById: function getTodoById(state) {
       return function (id) {
         return state.todos.find(function (todo) {
           return todo.id === id;
         });
       };
    }
}


```

### 4.3 箭头函数的this

1. 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
2. 箭头函数是根据**外层（函数或者全局）作用域**来决定this





## 5 函数的 length 属性

- 指定了默认值以后，函数的length属性，将**返回没有指定默认值的参数个数**
- rest 参数也不会计入length属性。

```
(function(...args) {}).length // 0
```











   
   
   
   