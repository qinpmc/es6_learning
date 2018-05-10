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
      盖前面的属性




