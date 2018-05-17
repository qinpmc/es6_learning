# Promise

## Promise基本概念
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
1. Promise对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
2. Promise一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
3. 有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

4. Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
```
        function asyncFun(){
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    resolve("Async Hello");
                },1200)
            })
        }
        asyncFun().then(function(value){
            console.log(value);  //Async Hello
        }).catch(function (error){
            console.log(error);
        });

        asyncFun().then(function(value){
            console.log(value); //Async Hello
            err.call(); //故意制造错误
        },function(err){
            console.log(err);
        }).then(function(value){
            console.log(value+" success end") ;//
        },function(e){
            console.log("出错了！");//出错了！
            console.log(e); //ReferenceError: err is not defined
        });
```

### 1 Constructor
new Promise构造器之后，会返回一个promise对象
```
var promise = new Promise(function(resolve, reject) {
    // 异步处理
    // 处理结束后、调用resolve 或 reject
});
```

### 2 then
1. then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，
第二个回调函数是Promise对象的状态变为rejected时调用。
其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
2. then方法返回的是一个 __新的Promise实例（注意，不是原来那个Promise实例）__ 。
因此可以采用链式写法，即then方法后面再调用另一个then方法。

### 3 catch
1. .catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

```
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
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.error(error);
});

//resolve(value) 在response的内容中加入了参数。
//resolve方法的参数并没有特别的规则，基本上把要传给回调函数参数放进去就可以了,then 方法可以接收到这个参数值

//传给reject 的参数也没有什么特殊的限制，一般只要是Error对象（或者继承自Error对象）就可以。
//这个参数的值可以被 then 方法的第二个参数或者 catch 方法中使用
```

##  Promise.resolve
   静态方法Promise.resolve(value) 可以认为是 new Promise() 方法的快捷方式。
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


    //立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时
    setTimeout(function () {
        console.log('three');
    }, 0);

    Promise.resolve().then(function () {
        console.log('two');
    });

    console.log('one');
```
