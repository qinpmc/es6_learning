# Generator

## Generator概念
Generator函数可以把它理解成一个状态机，封装了多个内部状态。
执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，
还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

```
function* fisrtGen(){
    yield "hello";
    yield "world";
    return "ending";
}
let fg = fisrtGen();

console.log(fg.next()); //  { value: 'hello', done: false }
console.log(fg.next()); // { value: 'world', done: false }
console.log(fg.next());// { value: 'ending', done: true }
```






