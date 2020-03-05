# Class

## 类的基本方法
1. ES6 类的所有方法都定义在类的prototype属性上面,且类的内部所有定义的方法，都是不可枚举的（non-enumerable）
2. 类的内部所有定义的方法，都是 __不可枚举的（non-enumerable）__。
  ES5(MyClass.prototype.toString = function..)定义方法是可枚举的。
3. 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
4. 类 __必须使用new调用__，否则会报错
5. __不存在变量提升__.
6. 类声明中的代码自动运行在严格模式
7. 类中的方法使用 new 调用 报错(该方法不含[[constructor]]), 类则必须使用new调用（构造方法中含有[[constructor]]）
8. 在类中修改类名会报错，但在类声明结束后可以修改
9. 类的方法之间不需要逗号分隔

```
       class Point{
            constructor(x,y){
                this.x = x;
                this.y = y;
            }
            toString(){
                console.log(this.x +" : "+this.y);
            }
             say(){
                 console.log("ha");
                 return{
                     name:"qq"
                 }
             }
        }

        let p1= new Point(2,3);
        console.log(p1.hasOwnProperty("x")); //true
        console.log(p1.hasOwnProperty("toString")); //false
		for(var key in p1){
			console.log(key); // x y ， 没有toString，es5中如果在原型上重写toString，则变为可遍历
		}
  
        // 类中的方法使用 new 调用 报错
        //var oo = new p1.say(); //  Uncaught TypeError: p1.say is not a constructor

        function oldClass(x,y){
            this.x = x;
            this.y = y;
             
        }
        oldClass.prototype.say = function(){
            console.log("ha");
                 return{
                     name:"qq"
                 }
        }

        var old = new oldClass(2,3);
        var o2 = new old.say(); // name: "qq"


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


    class Foo{
        constructor(){
            console.log("exected");
            Foo = "bar" //在类中修改类名会报错， //Uncaught TypeError: Assignment to constant variable.
        }
    }
  
    //var f = new Foo();
    Foo = "baz" // 在类声明结束后可以修改
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

## 静态方法
1. 类的方法前，加上static关键字，表示该方法不会被实例继承，而是直接通过类来调用(通过实例调用会报错)
2.  **静态方法中的this指的是类**，而不是实例。
3. 父类的静态方法，可以被子类继承（子类也通过类名调用）。

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
1. 该属性一般用在构造函数之中，返回new命令作用于的那个构造函数（Class 内部调用new.target，返回当前 Class。）。
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
##  extends 的继承目标
* Class 可以通过extends关键字实现继承

```
class A {
}

class B extends A {
}

console.log(B.__proto__ === A); // true
console.log(B.prototype.__proto__ === A.prototype); // true
let b = new B();


class Point{
        constructor(x,y){
            this.x = x;
            this.y = y;
        }
    }
    class ColorPoint extends Point{
        constructor(x,y,color){
            super(x,y);
            this.color = color;
        }
    }
    let p1 = new Point(2,3);
    let cp1 = new ColorPoint(4,5,"red");
    p1.__proto__ === Point.prototype; //true
    p2.__proto__.__proto__ === p1.__proto__ ;// true
    Point.__proto__ === Function.prototype;// true
    Point.prototype.__proto__ ===Object.prototype;// true

```

## super

* 子类必须在constructor方法中调用super方法，否则新建实例时会报错
  （1.可以不显示的写构造，此时不用调super-----实际默认调用了super
    2.构造函数中返回对象
  ）.
* 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例    
(ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。   
ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this)  
 
* 只可在派生类的构造函数中使用super()，在非派生类（不使用extends声明的类）或函数中使用会抛出错误；
*  super虽然代表了父类A的构造函数，但是返回的是子类B的实例（this指向子类实例）

```
    class MyClass{
        constructor(){
            console.log("MyClass");
        }
    }

    class ChildClass extends MyClass{
    /*
        // 第一种：该部分可省略 或加上该部分
    constructor(){
         super();
         }*/

    // 第二种：构造函数中返回对象可省略super
        constructor(){
            return {
                name:"ChildClass"
            }
        }

    }
    let cmc1 = new ChildClass();  //
    console.log(cmc1);  //{name: "ChildClass"}

```
