# Async 

## async函数
async函数返回一个 **Promise 对象**：
即使这个函数实际上会返回一个非 promise 的值，函数定义前加上了 async 关键字会指示 JavaScript 引擎自动将返回值包装在一个已决议（resolved）的 promise 内。

``` 

    // 「async/await」是一种以更舒适的方式使用 promises 的特殊语法

    function test1() {
        async function f() {
            return Promise.resolve(1);
        }

        f().then(alert); // 1
    }

    // test1();

    function test2() {
        async function f() {
            return 1; // 包装在一个已决议（resolved）的 promise 内
        }

        f().then(alert); // 1
    }

    test2();

```
## await 
 
正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

```
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```

- 1、await  只在 async 函数中有效,不能在普通函数中使用 await
- 2、函数在执行的时候，「暂停」在了await那一行

    // await 函数在执行的时候，「暂停」在了 (*) await那一行，并且当 promise 完成后，拿到 result 作为结果继续往下执行。

    async function f() {

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 1000)
        });

        let result = await promise; // 等待直到 promise 决议 (*)

        alert(result); // "done!"
    }

    f();

    //

-3 await 可以接收 thenables 

```
    //  await 可以接收 thenables

    class Thenable {
        constructor(num){
            this.num = num;
        }
        then(resolve,reject){
            console.log(resolve);
            setTimeout(() =>{
                  resolve(this.num*2)
            },1000)
        }
    }

    async function f() {
        let result = await new Thenable(1);
        console.log(result);
    }
    f();
    //
```


-4 如果想定义一个 async 的类方法，在方法前面添加 async 就可以了

```
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1
```



## 错误处理


```

    //  async 错误处理

    async function f1() {
        await Promise.reject(new Error("Whoops!"));
    }

    f1().catch(alert);

//    f1().catch(function (e) {
//        alert(e)
//    });

    // 等价 f1
    async function f2() {
        throw new Error("Whoops2!");
    }

    f2().catch(alert);

```

## Async/await 微任务    
promise 回调是异步执行的。每个 .then/catch/finally 回调首先被放入「微任务队列」然后在当前代码执行完成后被执行。       
Async/await 是基于 promise 的，所以它内部使用相同的微任务队列，并且相对宏任务来说具有更高的优先级。  

```
    //  async 微任务
    async function f() {
        alert("内部");
        return 1;
    }

    (async () => {
        setTimeout(() => alert('timeout'), 0);

        await f();

        alert('await');
    })();
/*
    内部
    await
    timeout
    */

```



