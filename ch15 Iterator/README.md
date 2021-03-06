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

## for of 循环



```
   // for of 遍历数组
    const arr = ["red","yellow","green"];

    arr.forEach(function(ele,index){
        console.log(index +" : "+ele); //0 : red   1 : yellow   2 : green
    })

    arr.prop = "prop";
   for(let i in arr){
       console.log(i); // 0 1 2 prop ;for in 会遍历非数字索引的属性（如prop)
   }
   for(let i of arr){
       console.log(i); //  red , yellow , green
   }
    console.log("*****************")
   // for of 遍历Set Map

    let set1 = new Set().add("Jack").add("Rose");
    for(let s of set1){
        console.log(s);
    }

    let map1 = new Map([["name1","Jack"],["name2","Rose"]]);
    for(let m of map1){
        console.log(m);
    }
    for(let [key,value] of map1){
        console.log(key+" : "+value);// name1 : Jack  name2 : Rose
    }

    console.log("***************** ");
    let str1 = "hello";
    for(let s of str1){
        console.log(s);// h e l l o
    }
```

for in 与 for of 区别:  

- for in 遍历数组，遍历的变量为key，且为遍历数组非数字索引的属性
- for of 遍历数组，遍历的变量为value，不遍历数组非数字索引的属性

- for in 遍历对象， 遍历的变量为key，且会遍历对象继承的属性
- for of 不可遍历对象（默认情况）





yield* 关键字的作用

yield* 的作用是代理 yield 表达式，将需要函数本身产生（yield）的值委托出去。      
yield* 后面跟一个生成器函数、或其他可迭代的对象（如一个数组、字符串、arguments对象）。     
yield* 表达式的返回值，就是其后面可迭代对象迭代完毕时的返回值。                         

```

第 1 步，构造一个生成器函数。

function* numbers () {
     yield 1;
     yield 2;
   
     return 'numbers';
 }
第 2 步，在上述生成器函数外层做一个代理。

function* delegate () {
     var str = yield* numbers();
     console.log(str);
     
     yield 3;

     return 'delegate';
}
第 3 步，构造迭代器。

var iterator = delegate();
第 4 步，输出迭代结果。

 /**
  * 第一次输出结果
  * { value: 1, done: false }
  */
 console.log(iterator.next()) // 第一次输出
 
 /**
  * 第二次输出结果
  * { value: 2, done: false }
  */
 console.log(iterator.next()) // 第二次输出
 
 /**
  * 第三次输出结果
  * numbers
  * { value: 3, done: false }
  */
 console.log(iterator.next()) // 第三次输出
 
 /**
  * 第四次输出结果
  * { value: 'delegate', done: true }
  */
 console.log(iterator.next()) // 第四次输出



```










## 遍历器对象的 return()，throw()

```
    //return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句或continue语句），就会调用return方法。
    function readLineSync(file){
        let fileDoc = new File(["First Line Text","Second Line Text"],file);
        return {
            [Symbol.iterator](){
                return{
                    next(){
                        return {value:fileDoc,done:false};
                    },
                    return(){
                        console.log("stop");
                        return {done:true};
                    }
                }
            }
        }
    }

    let res1 = readLineSync("test1.txt");
    for(let line of res1){
        console.log(line);
        break;
    }
/*    File(31){name: "test1.txt", lastModified: 1526784139070, lastModifiedDate …}
      stop*/
```



