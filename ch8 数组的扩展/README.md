# 数组的扩展

## 扩展运算符
* 扩展运算符（spread）是三个点（...）,将一个数组转为用逗号分隔的参数序列。
```
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

1. 简单应用
```
Math.max(...[12,13,15]);

let ary1 = [1,2,3];
let ary2 = [5,6];
ary1.push(...ary2); //ary1  [1, 2, 3, 5, 6]

//复制数组
//es5
const a1 = [1,2];
const a2 = a1.concat();
a2[0] = 100;
a1; // [1,2]

//es6
const a3 = [3,2]; 
const a4 = [...a3]; //[3, 2]

//与解构赋值结合
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

//字符串转数组
[...'hello']
// [ "h", "e", "l", "l", "o" ]

```




