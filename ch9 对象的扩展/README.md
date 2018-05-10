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
```


## 属性名表达式
* ES6 允许字面量定义对象时，用 表达式作为对象的属性名，即把表达式放在方括号内。
```
let propkey = "koo";
let obj1 = {
    [propkey] : true,
    ["a"+"bc"] : 123
 }
 obj1 ;//{koo: true, abc: 123} 
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
* 将源对象（source）的所有可枚举属性，复制到目标对象（target）。
   1. 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆
      盖前面的属性;
   2. 如果只有一个参数，Object.assign会直接返回该参数。
   3. 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
   4. Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性
   （不拷贝继承属性 ），也不拷贝不可枚举的属性（enumerable: false）
   5. Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
   6.  Object.assign可以用来处理数组，但是会把数组视为对象。
```
const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```
```
const v1 = "abc";
const v2 = true;
const v3 = 10;
const obj =  Object.assign({},v1,v2,v3);
console.log(obj); //{0: "a", 1: "b", 2: "c"}

Object.assign(obj,Object.defineProperty({},"invisible",{
    enumerable:true,
    value:"hello"
}));
console.log(obj);
```
```
const source = {
  get foo() { return 1 },
  set foo(value){
    console.log(2222);
  }
};
const target = {};
target.foo = 10; 

Object.assign(target,source);
 
target.foo; //1 
target.foo = 1000;//1000,并未输出 2222
target; //{foo: 1000}
```




