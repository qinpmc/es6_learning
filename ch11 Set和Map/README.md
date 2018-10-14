# Set和Map

## Set 基本概念
* Set数据结构类似于数组，但是成员的值都是唯一的，没有重复的值。
* Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
```
<body>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <script type="text/javascript">
        let set1 = new Set();
        set1.add(1);
        set1.add(2);
        set1.add(2);
        for(let s of set1){
            console.log(s); //1,2
        }

        let set2 = new Set([1,2,3,2,NaN,NaN]);
        for(let s of set2){
            console.log(s); //1,2,3,NaN
        }

        console.log("----------");

        let set3 = new Set(document.querySelectorAll("div"));
        console.log(set3.size); //4
    </script>
</body>
```

## Set 属性和方法
### 属性
* Set.prototype.constructor：构造函数，默认就是Set函数。
* Set.prototype.size：返回Set实例的成员总数。
 
### 方法
* add(value)：添加某个值，返回 Set 结构本身。
* delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
* has(value)：返回一个布尔值，表示该值是否为Set的成员。
* clear()：清除所有成员，没有返回值

### set 与数组 转换
```
let set1 = new Set();
set1.add(1);
set1.add(2);
set1.add(2);

//Set 与数组 转换

let ary1 = [...set1];
 
console.log(ary1);//[1, 2]
console.log("----------");

// Array.from 将set 转换为 数组
set1 = new Set(Array.from(set1, val => val * 2));
console.log(set1); //Set(2) {2, 4}
```

## WeakSet
* WeakSet 的 __成员只能是对象__，而不能是其他类型的值
* WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就
  是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的
  内存，不考虑该对象还存在于 WeakSet 之中

* WeakSet 没有size属性
* WeakSet 不能遍历(因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了)

- 方法：
-WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
-WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
-WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中


```
        //数组的成员成为 WeakSet 的成员，而不是数组本身
        //let weakSet1 = new WeakSet([1,2]); //Invalid value used in weak set
        //console.log(weakSet1);


        let weakSet2 = new WeakSet([[1,2],[2,3]]); // 
        console.log(weakSet2);//WeakSet {Array(2), Array(2)}


        console.log("----------");
        const foos = new WeakSet()
        class Foo {
            constructor() {
                foos.add(this)
            }
            method () {
                if (!foos.has(this)) {
                    throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
                }else{
                    console.log("hello");
                }
            }
        }

        let foo1 = new Foo();
        foo1.method(); //hello
```
## Map

Map数据结构是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
### Map 的基本概念

- 作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
- Set和Map也都可以用来生成新的 Map

```
// Map 的基本概念
let map1 = new Map();
let obj1 = {name:"jack"};
map1.set(obj1,"aaa");
console.log(map1.get(obj1)); //aaa

console.log(map1.has(obj1)); //true
map1.delete(obj1);

// Map 接收数组
let map2 = new Map([["name","zhangsan"],["title","author"]]);
console.log(map2.get("name")); //zhangsan
console.log(map2.get("title"));  //author
```

### Map 的键的问题


```
// Map 的键的问题

//对同一个键多次赋值，后面的值将覆盖前面的值。

let map1 = new Map();
map1.set(1,"aaa");
map1.set(1,"bbb");
console.log(map1.get(1)); //bbb

//只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

map1.set({},"obj");
console.log(map1.get({})); //undefined


//Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键
//比如0和-0就是一个键，
//布尔值true和字符串true则是两个不同的键。
//undefined和null也是两个不同的键。
//NaN不严格相等于自身，但 Map 将其视为同一个键。

```

### Map 的属性和方法
* size 属性 
* set(key,value)
* get(key)
* has(key)
* delete(key)
* clear()
__遍历方法__
* keys()
* values()
* entries()
* forEach()
```
// Map 的属性和方法
//let map1 = new Map(["aaa",1111]);//Iterator value aaa is not an entry object

function strMapToObj(myMap){
    let obj = {};
    for(let [k,v] of myMap){
        obj[k] = v;
    }
    return obj;
}
const myMap = new Map();
myMap.set('yes', true);
myMap.set('no', false);
strMapToObj(myMap); //{yes: true, no: false}
```

## WeakMap

* WeakMap只接受 __对象作为键名（null除外）__，不接受其他类型的值作为键名。
* WeakMap 的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内
* WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

```
        //WeakMap 弱引用的只是键名，而不是键值
        let wm = new WeakMap();
        let key = {};
        let value = {foo:1};
        wm.set(key,value);
        console.log(wm);
        value = null ;
        console.log(wm.get(key)); // {foo:1}
```

### WeakMap注意点
- 没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。
- 无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。
