# Symbol

## 基本概念
ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：
* undefined
* null
* 布尔值（Boolean）
* 字符串（String）
* 数值（Number）
* 对象（Object）

## Symbol定义
* Symbol 是一个原始类型的值，不是对象，不用new 生成
* Symbol函数可以接受一个字符串作为参数，表示对 Symbol 
   实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分；也可以不传参

```
let s1 = Symbol();
console.log(typeof s1); //symbol ,是小写
let s2 = Symbol('bar');
console.log(s2);//Symbol(bar)

//Symbol的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才
//生成一个 Symbol 值

let obj = {name:"jack"};
let s3 = Symbol(obj);
console.log(s3);//Symbol([object Object])

//Symbol函数的参数只是表示对当前 Symbol 
//值的描述，因此相同参数的Symbol函数的返回值是不相等的。

let s4 = Symbol(obj);
console.log(s3===s4); //false
```
## 作为属性名的 Symbol


```
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```
**注意，Symbol 值作为对象属性名时，不能用点运算符**。
```
//注意，Symbol 值作为对象属性名时，不能用点运算符。
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```

## Symbol.for()，Symbol.keyFor()

* Symbol.for() 与Symbol() 都会生成新的Symbol。
  它们的区别是，前者会被登记在全局环境中供搜索，Symbol不会。
  Symbol.for() 不会每次调用就返回一个新的Symbol类型的值，
  而是会先检查给定的key是否已经存在，如果不存在才会新建一个值.
* Symbol.keyFor方法返回一个已登记的Symbol类型值的key。
```
let s1 = Symbol();
console.log(typeof s1); //symbol ,是小写
let s2 = Symbol('bar');
console.log(s2);//Symbol(bar)

//Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值

let obj = {name:"jack"};
let s3 = Symbol(obj);
console.log(s3);//Symbol([object Object])

//Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。

let s4 = Symbol(obj);
console.log(s3===s4); //false
```







