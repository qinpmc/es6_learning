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
成员依次执行该回调函数，直到找出**第一个**返回值为true的成员，然后返回该 __成员__; 
如果没有符合条件的成员，则返回 __undefined__。
find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

```
[1, 4, -5, 10].find((n) => n < 0)
// -5
上面代码找出数组中第一个小于0的成员。
[1, 5, 10, 15].find(function(value, index, arr) {
return value > 9;
}) // 10
上面代码中，find 方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
```

* findIndex方法的用法与find方法非常类似，返回**第一个**符合条件的数组成员的 __位置__，如果所有成员都不符合条件，则返回 __-1__ 。
* 两个方法都可以接受第二个参数，用来绑定回调函数的this对象 

```
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
[10, 12, 26, 15].findIndex(f,person);  //2
```

## 5 fill
* fill方法使用给定值，填充一个数组

```
let ary1 = [1,2,3].fill(7); //[7,7,7]

//填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
ary2 =[];
ary2.fill({name:"mark"});// [{name: "mark"}, {name: "mark"},{name: "mark"}]
ary2[0].name = "jack";// [{name: "jack"},{name: "jack"},{name: "jack"}]
let ary3=[];
ary3.fill(3); // [] ,仍然为空
```

* fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

## 6 entries()，keys() 和 values()

```
let ary = [13,21,44,7,2,99];
let entries = ary.entries()
console.log(entries);//Array Iterator {}
console.log(entries.next()); // {done:false,value:(2) [0, 13]}
```

## 7 includes

```
console.log([3,5,2,NaN].includes(2)); //true 
console.log([3,5,2,NaN].includes(NaN)); //true,可以检测NaN的存在，indexOf不可以
```

## 8 ArrayBuffer/TypedArray/DataView           

- 参考：https://www.jianshu.com/p/5a841d6d7cc3      

二进制数组（ArrayBuffer对象、TypedArray视图和DataView视图）是JavaScript操作二进制数据的一个接口。           

这个接口的原始设计目的，与WebGL项目有关。所谓WebGL，就是指浏览器与显卡之间的通信接口，为了满足JavaScript与显卡之间大量的、实时的数据交换，              
它们之间的数据通信必须是二进制的，而不能是传统的文本格式。文本格式传递一个32位整数，两端的JavaScript脚本与显卡都要进行格式转化，将非常耗时。       
这时要是存在一种机制，可以像C语言那样，直接操作字节，将4个字节的32位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。     
二进制数组就是在这种背景下诞生的。它很像C语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增强了JavaScript处理二进制数据的能力，       
使得开发者有可能通过JavaScript与操作系统的原生接口进行二进制通信。       

二进制数组由三类对象组成：      

- 1. ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过”视图“进行操作。”视图“部署了数组接口，这意味着，可以用数组的方法操作内存。    

- 2. TypedArray视图：共包括9种类型的视图，比如Uint8Array（无符号8位整数）数组视图, Int16Array（16位整数）数组视图, Float32Array（32位浮点数）数组视图等等。

- 3. DataView视图：可以自定义复合格式的视图，比如第一个字节是Uint8（无符号8位整数）、第二、三个字节是Int16（16位整数）、第四个字节开始是Float32（32位浮点数）等等，      
此外还可以自定义字节序。     
简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。  




### 8.1  ArrayBuffer对象















