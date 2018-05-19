# Iterator
Iterator是一种接口，为各种不同的数据结构提供统一的访问机制。
任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
```
function makeIterator(array) {
    var nextIndex = 0;
    return {
        next:function(){
            return nextIndex < array.length?
            {value:array[nextIndex++],done:false} :
            {value:undefined,done:true}
        }
    }
}
let iterator1 = makeIterator([1,2,3]);
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
```

## 具备 Iterator 接口的数据结构
* Array
* Map
* Set
* String
* TypedArray
* 函数的 arguments 对象
* NodeList 对象

默认的 Iterator 接口部署在数据结构的 __Symbol.iterator __ 属性，一个数据结构只要具有Symbol.iterator属性，
就可以认为是“可遍历的”（iterable）。
Symbol.iterator属性本身是一个 __函数__ ，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会 __返回一个遍历器__。




