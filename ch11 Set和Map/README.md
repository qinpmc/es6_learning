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
* WeakSet 的成员只能是对象，而不能是其他类型的值
* WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就
  是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的
  内存，不考虑该对象还存在于 WeakSet 之中
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




