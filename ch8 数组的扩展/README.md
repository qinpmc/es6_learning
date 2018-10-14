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
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

## 3 Array.of 新方法
* Array.of 方法用于将一组值，转换为数组

```
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

// 
Array(3) // [, , ,],开辟长度为3 的数组，而不是将 3 放入数组
Array(3, 11, 8) // [3, 11, 8]
```

## 4 copyWithin()新方法
* 当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后
 返回当前数组。也就是说，使用这个方法，会修改当前数组。

* 它接受三个参数。
target（必需）：从该位置开始替换数据。
start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

```
[1, 2, 3, 4, 5].copyWithin(0)
// [1, 2, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, 3); // 从0 号位开始替换，从3号位开始复制，
// end省略，表示复制到数组最后一位
// [4, 5, 3, 4, 5]


```


## 4 find()和findIndex()

* find 方法:用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组
成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该 __成员__; 
如果没有符合条件的成员，则返回 __undefined__。

```
[1, 4, -5, 10].find((n) => n < 0)
// -5
上面代码找出数组中第一个小于0的成员。
[1, 5, 10, 15].find(function(value, index, arr) {
return value > 9;
}) // 10
上面代码中，find 方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
```

* findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的 __位置__，如果所有成员都不符合条件，则返回 __-1__ 。
* 两个方法都可以接受第二个参数，用来绑定回调函数的this对象 

```
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
[10, 12, 26, 15].find(f,person);  //2
```

## 5 fill
* fill方法使用给定值，填充一个数组

```
let ary1 = [1,2,3].fill(7); //[7,7,7]

//填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
ary2.fill({name:"mark"});// [{name: "mark"}, {name: "mark"},{name: "mark"}]
ary2[0].name = "jack";// [{name: "jack"},{name: "jack"},{name: "jack"}]
```

## 6 entries()，keys() 和 values()

```
let ary = [13,21,44,7,2,99];
let entries = ary.entries()
console.log(entries);//Array Iterator {}
console.log(entries.next()); // {done:false,value:(2) [1, 21]}
```

## 7 includes

```
console.log([3,5,2,NaN].includes(2)); //true 
console.log([3,5,2,NaN].includes(NaN)); //true,可以检测NaN的存在，indexOf不可以
```





























