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
console.log(fg.next());//{value: undefined, done: true}
```

## yield 特点
1. 每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行
2. yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
3. yield表达式如果用在另一个表达式之中，必须放在圆括号里面。

```
        var arr = [1, [[2, 3], 4], [5, 6]];
        var gen1 = function* (arr){
            for(let i = 0;i<arr.length;i++){
                if(typeof  arr[i] !== "number"){
                    yield* gen1(arr[i]);
                }else{
                    yield arr[i];
                }
            }
        }

        //yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
        // 下例中在foreach中使用了 yield
/*        var gen1 = function* (arr) {
            arr.forEach(function (item) {
                if (typeof item !== 'number') {
                    yield* gen1(item);
                } else {
                    yield item;
                }
            });
        };*/

        for(let item of gen1(arr)){
            console.log(item); //// 1, 2, 3, 4, 5, 6
        }


/*        //yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
        function* demo() {
            console.log('Hello' + (yield)); //  
            console.log('Hello' + (yield 123)); //  
        }
        let res1 = demo();
        console.log(res1.next()); //{value: undefined, done: false}
        console.log(res1.next()); // Helloundefined   {value: 123, done: false}
        console.log(res1.next()); // Helloundefined    {value: undefined, done: true}*/
```
## next 方法的参数
1. next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
2. next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的

```
//yield表达式本身没有返回值，或者说总是返回undefined。
// next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
function* f() {
    for(var i = 0; true; i++) {
        var reset = yield i;
        if(reset) { i = -1; }
    }
}

var g = f();

console.log(g.next()) // { value: 0, done: false }
console.log(g.next()) // { value: 1, done: false }
console.log(g.next(true)); //{value: 0, done: false}

//由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的
function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}
var b = foo(5);
console.log(b.next(100)); // { value:6, done:false },此处传参100 被忽略
console.log(b.next(12)); // { value:8, done:false }  var y = 2*12,  yield (y / 3)--- yield (2*12/ 3)
console.log(b.next(13)); // { value:42, done:true }  x--5  y--24  z--13 

```
## Generator.prototype.throw
1. Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获
2. throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。
3. Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获
4. throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
```
    // Generator.prototype.throw()
    // Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获
/*    let g = function* (){
        try{
            yield ; //  ①
        }catch (e){
            console.log("内部捕获",e);// ②
        }
    }
    let i = g();
    i.next(); // ①
    try{
        i.throw("a"); // ②
        i.throw("b");// ③
    }catch (e){
        console.log("外部捕获",e); // ④
    }
/!*    内部捕获 a
    外部捕获 b*!/*/

     //throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。
    //如果没有，这时throw方法抛错只可能抛出在函数外部
/*    let g = function* (){
        try{
            yield ; //
        }catch (e){
            console.log("内部捕获",e);//
        }
    }
    let i = g();
    //i.next(); // 注意 ：注释掉此句，与上一段代码比较！！
    try{
        i.throw("a"); // ①
        i.throw("b");//  未执行
    }catch (e){
        console.log("外部捕获",e); // ②
    }
    /!*
     外部捕获 a*!/*/



    //Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获
    let g = function* (){
        while(true){
            yield;
            console.log("内部捕获：",e);
        }
    }
    let i = g();
    i.next();
    try{
        i.throw("a");
        i.throw("b");
    }catch(e){
        console.log("外部捕获：",e);
    }
     /*外部捕获： a*/
```
```
//throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
function* gen(){
    try{
      yield console.log("a");
    }catch(e){
        console.log("****");
    }
    yield console.log("b");
    yield console.log("c");
}

var g = gen();
console.log(g.next());   // a {value: undefined, done: false}
console.log(g.next());   // b {value: undefined, done: false},该句注释掉正常
console.log(g.throw()); // 报错 generator6.html:17 Uncaught undefined
console.log(g.next());  // c
```
## Generator.prototype.return()
1. 遍历器对象调用return方法后，返回值的value属性就是return方法的参数。
   并且，Generator 函数的遍历就终止了，返回值的done属性为true，以后再调用next方法，done属性总是返回true
2. 如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。

```
//Generator.prototype.return()
//遍历器对象调用return方法后，返回值的value属性就是return方法的参数。
// 并且，Generator 函数的遍历就终止了，返回值的done属性为true，以后再调用next方法，done属性总是返回true。
function* numbers(){
    yield 1;
    try{
        yield 2;
    }finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();

//如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。
/*
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }  注意：此次返回的值7 为return传入的
*/

g.next() // {value: 1, done: false}
g.return(7) // {value: 7, done: true}
g.next(); //{value: undefined, done: true}
```

