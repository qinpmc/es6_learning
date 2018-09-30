# 对象的扩展

## 属性的简洁表示
* ES6 允许直接写入变量和函数，作为对象的属性和方法
* ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值
```
let birthday = "2018-09-09"; // obj1 使用了该属性，因此应该在obj1前声明
let obj1 = {
    name:"zhangsan",
    birthday,
    sayHello(){
        console.log(this.name+" ："+this.birthday);
    }
}


 function getPoint() {
   const x = 1;
   const y = 10;
   return {x, y};  //对象属性简洁表示
 }

 getPoint();
 // {x:1, y:10}
```


## 属性名表达式
* ES6 允许字面量定义对象时，用 表达式作为对象的属性名，即把表达式放在方括号内（ES5不允许）。
```
let propkey = "koo";
let obj1 = {
    [propkey] : true,
    ["a"+"bc"] : 123
 }
 obj1 ;//{koo: true, abc: 123}

```
### 注意点

1、属性名表达式与简洁表示法，不能同时使用，会报错

```
const foo = 'bar';
const baz = { [foo] }; // VM1023:2 Uncaught SyntaxError: Unexpected token }


// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};

```

2、属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]

```
const myObject = {
  [{name:"qqq"}]: 'valueA'
};
```

## 方法的名称name

1、对象的方法使用了取值函数（getter）和存值函数（setter），
则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
例子见（obj2.html）


2、bind方法创造的函数，name属性返回bound加上原函数的名字；
   Function构造函数创造的函数，name属性返回anonymous

```
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"
```

3、
如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。

```
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // "
```


## Object.is
* 用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致
```
//Object.is 与 === 区别
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

## Object.assign
* Object.assign(target, source1, source2);
* 将源对象（source）的所有可枚举属性，复制到目标对象（target）。
   1. 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性;
   2. 如果只有一个参数，Object.assign会直接返回该参数。
   3. 首参数不是对象，则会先转成对象， 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
   4. 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
   5. Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性
   （不拷贝继承属性 ），也不拷贝不可枚举的属性（enumerable: false）
   6. Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
   7.  Object.assign可以用来处理数组，但是会把数组视为对象。
```
const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

```
Object.assign(obj,Object.defineProperty({},"invisible",{
    enumerable:true,
    value:"hello"
}));
console.log(obj);//  {invisible: "hello"}
```

* Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制
```
const source = {
  get foo() { return 1 },
  set foo(value){
    console.log(2222);
  }
};
const target = {};
target.foo = 10; 

Object.assign(target,source); //{foo: 1}  ,取值函数进行了求值，然后复制；set 函数没拷贝过来？
 
target.foo; //1 
target.foo = 1000;//1000,并未输出 2222
target; //{foo: 1000}
```

## 属性的可枚举性
目前，有四个操作会忽略enumerable为false的属性。

1. for...in循环：只遍历对象 __自身的和继承__的可枚举的属性。
2. Object.keys()：返回对象 __自身__ 的所有可枚举的属性的键名。
3. JSON.stringify()：只串行化对象 __自身__的可枚举的属性。
4. Object.assign()：忽略enumerable为false的属性，只拷贝对象 __自身__的可枚举的属性。

## 属性的遍历
1. for...in

for...in循环遍历对象 **自身的和继承  的可枚举属性（不含 Symbol 属性）** 。

2. Object.keys(obj)

Object.keys返回一个数组，包括对象 **自身的（不含继承的）所有可枚举 属性（不含 Symbol 属性）** 的键名。

3. Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames返回一个数组，包含对象 **自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）** 的键名。

4. Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols返回一个数组，包含对象 **自身的所有 Symbol** 属性的键名。

5. Reflect.ownKeys(obj)

Reflect.ownKeys返回一个数组，包含对象 **自身的所有键名** ，不管键名是 Symbol 或字符串，也不管是否可枚举。


## __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
* Object.setPrototypeOf() 设置一个对象的原型对象 ：Object.setPrototypeOf(object, prototype)
* Object.getPrototypeOf() 读取一个对象的原型对象

## super
super，指向当前对象的原型对象














