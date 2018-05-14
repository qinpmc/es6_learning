# Proxy

## 基本概念
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

```
let obj1 = {name:"jack"};
let proxy = new Proxy(obj1,{
    get : function(target,property,receiver){
        console.log(target,property); //{name: "jack"}    "name"
        console.log(target === obj1); //true   注释：target为obj1
        console.log(receiver === proxy);//true 注释：receiver为proxy
        return 3333;
    }

});
console.log(proxy.name); //{name: "jack"}    "name"
                           // true
                           // true
                           //  3333
```
