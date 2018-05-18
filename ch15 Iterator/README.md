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