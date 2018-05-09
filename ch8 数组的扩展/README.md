# 数组的扩展

## 1 扩展运算符
* 扩展运算符（spread）是三个点（...）,将一个数组转为用逗号分隔的参数序列。
```
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

### 1.1 简单应用
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


//实现了 Iterator 接口的对象
//任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组。

let nodeList = document.querySelectorAll('div');
let array = [...nodeList];

//Map 和 Set 结构，Generator 函数


let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]

const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};
//Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
[...go()] // [1, 2, 3]
```

## 2 Array.from 新方法

* Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
* 类似数组的对象（array-like object）:NodeList 集合、arguments
* 部署了 Iterator 接口的数据结构：string、array、Set 、 Map
* Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
```

```






