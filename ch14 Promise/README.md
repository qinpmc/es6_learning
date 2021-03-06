# Promise

## Promise基本概念
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
1. Promise对象的**状态不受外界影响**。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

2. Promise一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

3. 有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

4. Promise也有一些缺点。
- 首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。   
- 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。   
- 第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。  

``` 
    // promise 实际例子
    function getURL(URL) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', URL, true);
            req.onload = function () {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(new Error(req.statusText));
                }
            };
            req.onerror = function () {
                reject(new Error(req.statusText));
            };
            req.send();
        });
    }
    // 运行示例
    var URL = "http://httpbin.org/get";
    getURL(URL)
        .then(function onFulfilled(value){
            console.log(value); //{"args":{},"headers":{"Accept":"*/*","Accept-Encoding".....
         }).catch(function onRejected(error){
            console.error(error);
        });

    //resolve(value) 在response的内容中加入了参数。
    //resolve方法的参数并没有特别的规则，基本上把要传给回调函数参数放进去就可以了,then 方法可以接收到这个参数值

    //传给reject 的参数也没有什么特殊的限制，一般只要是Error对象（或者继承自Error对象）就可以。
    //这个参数的值可以被 then 方法的第二个参数或者 catch 方法中使用

```

## Constructor
new Promise构造器之后，会返回一个promise对象

```
var promise = new Promise(function(resolve, reject) {
    // 异步处理
    // 处理结束后、调用resolve 或 reject
});
```

## then
1. then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，
第二个回调函数是Promise对象的状态变为rejected时调用。
其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
2. then方法返回的是一个 __新的Promise实例（注意，不是原来那个Promise实例）__ 。
因此可以采用**链式**写法，即then方法后面再调用另一个then方法。


```
    // promise 链式调用
    new Promise(function(resolve, reject) {

        setTimeout(() => resolve(1), 1000); // (*)

    }).then(function(result) { // (**)

        alert(result); // 1
        return result * 2;

    }).then(function(result) { // (***)

        alert(result); // 2
        return result * 2;

    }).then(function(result) {

        alert(result); // 4
        return result * 2;

    });

    // 分别弹出 1 2 4

```




## catch
1. .catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

```
        // catch 示例
        function asyncFun(){
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    resolve("Async Hello");
                },1200)
            })
        }

        asyncFun().then(function(value){
            console.log(value); //Async Hello
            err.call(); //故意制造错误
        },function(err){
            console.log(err); //注意：该句未执行，不会捕获到错误，它只能捕获 asyncFun执行的错误
        }).then(function(value){
            console.log(value+" success end") ;//
        },function(e){
            console.log("出错了！");//出错了！
            console.log(e); //ReferenceError: err is not defined
        });
```

2. Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。
因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了

```
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');  // 此时 Promise 已经 resolved，此句抛出错误无效了
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

3. Promise 对象的错误具有**冒泡**性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
4. 建议总是使用catch方法，而**不使用then方法的第二个参数**。
5. catch方法之中，还能再抛出错误。

6. 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
 即“Promise 会吃掉错误”。

```
//传统的方式：出错后，后续代码不执行
throw new Error("错了！！")
setTimeout(()=>{console.log("timeout")},16); //该句不执行了。。。
```

```
 const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 0) ;
  // Promise 指定在下一轮“事件循环”再抛出错误。
  // 到了那个时候，Promise 的运行已经结束了，所以这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误
 });
 promise.then(function (value) { console.log(value) });
 setTimeout(() => { console.log(123) }, 2000);

/*
ok
 Uncaught Error: test at promise2-3catch.html:11
 123
 */
```

``` 
 // Promise 会吃掉错误
 function test3() {
     //  浏览器运行到 resolve(x + 2);，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行
//  2 秒之后还是会输出123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。
     /* const someAsyncThing = function() {
       return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
       });
      };
     
      someAsyncThing().then(function() {
       console.log('everything is great');
      });
     
      setTimeout(() => { console.log(123) }, 2000);*/

     /*
     上面代码输出结果：
     Uncaught (in promise) ReferenceError: x is not defined
      123
      */
 }

```
 
##  Promise.prototype.finally()
finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作


##  Promise.resolve
   静态方法Promise.resolve(value) 可以认为是 new Promise() 方法的快捷方式。
1. 参数是一个 Promise 实例, Promise.resolve将不做任何修改、原封不动地返回这个实例
2. 参数是一个 **thenable对象**, Promise.resolve方法会**将这个对象转为Promise 对象**，然后就**立即执行thenable对象的then方法**;
3. 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个**新的 Promise 对象，状态为resolved**;
4. 不带有任何参数, Promise.resolve方法允许调用时不带参数，**直接返回一个resolved状态的 Promise 对象**。
5. 需要注意的是，立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时；

```
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```


```
    //Promise.resolve

    // 1. 参数是一个 Promise 实例,原封不动返回该实例
    let p1 = new Promise(function(resolve,reject){
        resolve("Promise.resolve test1");
    })
    let p11= Promise.resolve(p1);
    console.log(p1 === p11); //  true 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例

    //2. 参数是一个thenable对象(thenable对象指的是具有then方法的对象)
    let obj_thenable = {
        then:function(resolve,reject){
            resolve(-1);
        }
    };
    Promise.resolve(obj_thenable).then(function(value){
        console.log(value); //-1
    })




    //如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。

    Promise.resolve(99).then(function(value){
        console.log(value); //99
    })

    //等价上面代码
    new Promise(function(resolve){
        resolve(99);
    }).then(function(value){
        console.log(value); //99
    });

```
## Promise.reject
Promise.reject(new Error("出错了")) 就是下面代码的语法糖形式。

new Promise(function(resolve,reject){
    reject(new Error("出错了"));
});

```
let mes = "wrong";
Promise.reject(mes).then(null,function(e){
    console.log(e);   //wrong
    console.log(e===mes);//true
})

```
1.Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致

```
//Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
// 这一点与Promise.resolve方法不一致
const thenable = {
    then(resolve, reject) {
        reject('出错了');
    }
};

Promise.reject(thenable)
        .catch(e => {
    console.log(e === thenable); // true
});
```




##  Promise.all
Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例

1. 只有每个Promise 实例的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
2. 只要Promise 实例之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
3. 如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
```
    // `delay`毫秒后执行resolve
    function timerPromisefy(delay) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(delay);
            }, delay);
        });
    }

    let rejPromise = new Promise(function (resolve,reject) {
        setTimeout(function () {
            reject(40);
        }, 40);
    });
    var startDate = Date.now();
    // 所有promise变为resolve后程序退出
    Promise.all([
        timerPromisefy(1),
        timerPromisefy(32),
        timerPromisefy(64),
        timerPromisefy(128),
        //rejPromise
    ]).then(function (values) {
        console.log(Date.now() - startDate + 'ms');
        console.log(values);
    }).catch(function (e) {
        console.log(Date.now() - startDate + 'ms');
        console.log(e);
    });

    /*   输出结果：
    129ms
    [1,32,64,128]*/
```

##  Promise.race

只要Promise 实例之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数

```
    function timerPromisefy(delay){
        return new Promise((resolve,reject) =>{
             setTimeout(() =>resolve(delay),delay);
        })
    }
    let startTime = Date.now();
    Promise.race([
         timerPromisefy(24),
         timerPromisefy(1000),
         timerPromisefy(2000)
    ]).then(
            (value) =>{
                console.log(Date.now() - startTime + 'ms');
                console.log(value);
    });
/*    输出结果：
    25ms
      24*/
```

```
    // Promise.race demo + Promise.resolve

    let p2 = new Promise(function (resolve, reject) {
        resolve(43);
    }) ;

    let p1 = Promise.resolve(42);
    let p11 = Promise.resolve(421);

    let p3 = new Promise(function (resolve, reject) {
        resolve(44);
    });


    function test1() {
        // race 中p11 在 p1 之前，返回p11 的值
        let p4 = Promise.race([p11,p1, p2, p3]);
        p4.then(function (value) {
            console.log(value);					//	421
        });
    }
    test1();

    test2();
    function test2() {
        // race 中p1 在 p11 之前，返回p1 的值
        let p4 = Promise.race([p1,p11,p2, p3]);
        p4.then(function (value) {
            console.log(value);					//	42
        });
    }
```

 

##  Promise注意点

3.Promise 新建后就会立即执行

```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');  // 第1个输出，Promise 新建后就会 **立即执行**
  resolve();
});

promise.then(function() {
  console.log('resolved.'); //第3个输出
});

console.log('Hi!');  // 第2个输出，同步代码

// Promise
// Hi!
// resolved

```

1.  __Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时__    
   .then/catch 的处理器总是异步的
```
    //立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时
    setTimeout(function () {
        console.log('three');
    }, 0);

    Promise.resolve().then(function () {
        console.log('two');
    });

    console.log('one');
        /*
         * 输出顺序：one two three
         * */

```

2.  Promise状态传递

```
const p1 = new Promise(function(resolve,reject){
    setTimeout(function(){
        reject(new Error("fail"))
    },3000)
})
const p2 = new Promise(function(resolve,reject){
    setTimeout(() =>resolve(p1),100); //p1的状态就会传递给p2，p1的状态决定了p2的状态，3000ms后（并非100ms）才执行p2
    //setTimeout(() =>resolve("p2"),100); //此时p2的状态 自行决定，100ms后即执行
})
p2.then(result => console.log(result)).catch(error => console.log(error));
```


3. Promise 状态一经改变，就不会再变

```
    //Promise 状态已经变成resolved，再抛出错误是无效的
    new Promise((resolve,reject) => {
        resolve("OK");
        throw new Error("this wrong will not run");
    }).then(r => console.log(r)).catch(e => console.log(e));
/*    输出结果：//不会输出 :this wrong will not run
      OK*/

```

4. Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应

```
//跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，
    // Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应
    new Promise((resolve,reject) => {
        throw new Error("this wrong will  run"); //抛出错误，不处理
    }).then(r => console.log(r));

    setTimeout(() =>console.log("1秒后执行"),1000); //1秒后执行，上面的错误没处理，但此处会执行
```


