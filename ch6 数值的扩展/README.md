## 数值的扩展

### 二进制和八进制
* ES6  分别用前缀0b（或0B）和0o（或0O）表示。
```
0b111110111 === 503 // true
0o767 === 503 // true
```

### Number新增方法

* Number.ifFinite 是否有限
* Number.isNaN 是否是NaN
* Number.isInteger 是否为整数
* Number.EPSILON  极小的常量，它表示 1 与大于 1 的最小浮点数之间的差。
* Number.isSafeInteger() 一个整数是否安全

### Math 对象的扩展
* Math.trunc() 去除一个数的小数部分，返回整数部分
  - 非数值，Math.trunc内部使用Number方法将其先转为数值。
  - 对于空值和无法截取整数的值，返回NaN
```
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) //0

```

* Math.sign() 判断一个数到底是正数、负数、还是零。
* Math.log10()
* Math.log2()

### 指数运算符 ** 

```
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
```






