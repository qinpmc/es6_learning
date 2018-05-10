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





