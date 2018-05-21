# Class

## 类的基本方法
1. ES6 类的所有方法都定义在类的prototype属性上面
2. 类的方法之间不需要逗号分隔
3. 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
  ES5(MyClass.prototype.toString = function..)定义方法时可枚举的。
4. 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
5. 类必须使用new调用，否则会报错
6. 不存在变量提升
```
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        console.log(this.x +" : "+this.y);
    }
}

let p1= new Point(2,3);
console.log(p1.hasOwnProperty("x")); //true
console.log(p1.hasOwnProperty("toString")); //false
```

## class 表达式
1. class 表达式名称只在 Class 的内部代码可用
```
//这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。
    const Myclass = class Me{
        getClassName(){
            return Me.name;
        }
    }
    let mc1 = new Myclass();
    console.log(mc1.getClassName()); //Me  
    console.log(Me); // Me is not defined  Me只在 Class 的内部代码可用
```

##  Class 的取值函数（getter）和存值函数（setter）
1. 存值函数和取值函数是设置在属性的 Descriptor 对象上的,与ES5一致。
```
let obj1 ={
    get prop(){
        return "getter";
    },
    set prop(value){
        console.log("setter: "+value);
    }
}

"prop" in obj1; //true
"get" in obj1; //false
"set" in obj1; //false

class Myclass{
    constructor(ele){
        this.ele = ele;
    }
    get html(){
        return this.ele.innerHTML;
    }
    set html(value){
        this.ele.innerHTML = value;
    }
}
let myClass1 = new Myclass(document.getElementsByTagName("body")[0]);

"html" in myClass1 ;// true
"get" in myClass1  ;// false

let des = Object.getOwnPropertyDescriptor(Myclass.prototype,"html");
"get" in des; //true
```

## 静态方式
1. 类的方法前，加上static关键字，表示该方法不会被实例继承，而是直接通过类来调用
2. 静态方法包含this关键字，这个this指的是类，而不是实例。
3. 父类的静态方法，可以被子类继承。
```
  class Foo {
    static classMethod() {
        return 'hello';
    }

    static stMethod(){
        this.bar();
    }

    static bar(){
        console.log("static bar");
    }
    bar(){
        console.log("instance bar");
    }
}

console.log(Foo.classMethod());//hello

let foo1 = new Foo();
//foo1.classMethod(); //foo1.classMethod is not a function

//静态方法包含this关键字，这个this指的是类，而不是实例。
Foo.stMethod();// static bar
```

## new.target
1. 该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。
如果构造函数不是通过new命令调用的，new.target会返回undefined，
2. 子类继承父类时，new.target会返回子类
```
class MyClass{
    constructor(){
        console.log(new.target === this);  
        console.log(new.target === MyClass);   
    }
}

let mc1 = new MyClass(); // false true

class ChildClass extends MyClass{
/*  constructor(){
        super();
    }*/
}

let cmc1 = new ChildClass();  //false false
```




