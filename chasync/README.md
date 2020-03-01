# Async 

## async函数
async函数返回一个 Promise 对象：
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










