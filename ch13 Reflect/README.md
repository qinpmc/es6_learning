#  Reflect

## Reflect 概念

1. 将Object对象的一些明显属于 __语言内部__ 的方法（比如Object.defineProperty），放到Reflect对象上。
现阶段，某些方法同时在Object和Reflect对象上部署，未来的 __新方法__ 将只部署在Reflect对象上。
也就是说，从Reflect对象上可以拿到语言内部的方法
2. 修改某些Object方法的返回结果，让其变得 __更合理__。
比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，
而Reflect.defineProperty(obj, name, desc)则会返回false。
3. 让Object操作__ 都变成函数行为__。某些Object操作是命令式，比如name in obj和delete obj[name]，
而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为.
4. Reflect对象的方法与Proxy对象的方法一一对应， __只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法__ 。
这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。
也就是说， __不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为__ .

```
let obj = {name:"jack"};
undefined
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});

loggedObj.name;// get {name: "jack"} name
               // "jack"

Reflect.get(obj,"name"); // "jack" 无论Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为 

```

## Reflect 方法

1. Reflect.apply(target, thisArg, args)
2. Reflect.construct(target, args)
3. Reflect.get(target, name, receiver)
4. Reflect.set(target, name, value, receiver)
5. Reflect.defineProperty(target, name, desc)
6. Reflect.deleteProperty(target, name)
7. Reflect.has(target, name)
8. Reflect.ownKeys(target)
9. Reflect.isExtensible(target)
10. Reflect.preventExtensions(target)
11. Reflect.getOwnPropertyDescriptor(target, name)
12. Reflect.getPrototypeOf(target)
13. Reflect.setPrototypeOf(target, prototype)

### get /set
```
    // Reflect.get(target, name, receiver)
    //Reflect.set(target, name, value, receiver)
    let myobj1 = {
        foo:1,
        bar:2,
        get baz(){
            return this.foo +this.bar;
        },
        set baz(value){
            this.foo = value;
        }
    }
    Reflect.get(myobj1,"baz"); //3

    //如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
    var myReceiverObject = {
        foo: 100,
        bar: 200,
    };
    Reflect.get(myobj1,"baz",myReceiverObject); //300

   // 如果name属性设置了赋值函数（setter），则赋值函数的this绑定receiver。
    Reflect.set(myobj1,"baz",77,myReceiverObject);
    console.log(myobj1.foo); //1 myobj1的foo不变
    console.log(myReceiverObject.foo);//77 myReceiverObject的foo改为77，
```

### has /deleteProperty /getPrototypeOf /setPrototypeOf

```
let obj1 = {
    foo:1,
    bar:"bar"
};
Reflect.has(obj1,"bar"); //true
Reflect.deleteProperty(obj1,"bar");
console.log(obj1.bar); //undefined


//Reflect.construct方法等同于new target(...args)

function Person(name){
    this.name = name;
}

//Reflect.getPrototypeOf
let p1 = Reflect.construct(Person,["jack"]);//jack,注意：此处参数带有[]
console.log(p1.name);
console.log(Reflect.getPrototypeOf(p1)===Person.prototype);// true

//setPrototypeOf
Reflect.setPrototypeOf(p1,Object.prototype);
console.log(Reflect.getPrototypeOf(p1)===Person.prototype);//  false
console.log(Reflect.getPrototypeOf(p1)===Object.prototype);//  true
```

### Reflect.apply(func, thisArg, args) 

等同 Function.prototype.apply.call(fn, obj, args)

```
let obj1 = {
    name:"jack"
}
function sayName(msg){
    console.log(this.name+msg);
}
Reflect.apply(sayName,obj1,["!!!"]); //jack!!!
```
### Reflect.getOwnPropertyDescriptor(target, propertyKey) 
Reflect.isExtensible(target) --不能增加新的属性，但是属性的值仍然可以更改，也可以把属性删除，
Reflect.preventExtensions(target) 

等同 Object.getOwnPropertyDescriptor 

### Reflect.ownKeys (target) 

等同Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
```
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```