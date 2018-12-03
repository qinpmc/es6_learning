# Class 继承

## super
super这个关键字，既可以当作 __函数__使用，也可以当作 __对象__使用

### super作为函数使用
1. 子类必须在constructor方法中调用super()方法(代表调用父类的构造函数)，否则新建实例时会报错
2. 在子类的constructor中，只有调用super()之后，才可以使用this关键字，
   否则会报错（super 出现在首行）
3. super在子类构造函数中使用时，super内部的this指向 __子类实例对象__

```
class A {
  constructor() {
    console.log(this);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A {}
new B() // B {}
```
 
### super作为对象使用
1. 在 __普通方法__ 中，指向 __父类的原型对象__(定义在父类实例上的方法或属性，是无法通过super调用的)；
2. 在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
3. 在 __静态方法__中，指向 __父类__。
4. 子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。

```
class A{
    constructor(){
        this.x = 1;
    }
}
class B extends A{
    constructor(){
        super();
        this.x = 2;
        super.x = 3; // 此处等同于 this.x； 由于this指向子类实例，所以如果通过super对某个属性 赋值，这时super就是this，赋值  的属性会变成子类实例的属性。
        //console.log(super === this); //用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
        console.log(super.x); // undefined 读的是A.prototype.x，所以返回undefined；  而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。
        console.log(this.x);  // 3
    }
}
```

```
class A{
    static myMethod(msg){
        console.log("static :",msg);
    }
    myMethod(msg){
        console.log("instance :",msg);
    }
}
class B extends A{
    static myMethod(msg){
        super.myMethod(msg); 
    }
    myMethod(msg){
         super.myMethod(msg);
    }

}
let b = new B();
b.myMethod(-1); //instance : -1 ,普通方法中，指向父类的原型对象

B.myMethod(99); //static : 99   静态方法中，指向父类
```

```
//子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例
class A{
    constructor(){
        this.x = 1;
    }
    static print(){
        console.log(this.x);
    }
}
class B extends A{
    constructor(){
        super();
        this.x = 2;
    }
    static m(){
        super.print();
    }

}
let b = new B();
B.m(); //undefind ,注意 不是2 ，也不是1，
B.x = 99;
B.m(); //99
```

## 类的 prototype 属性和__proto__属性 
1. 子类的__proto__属性，表示构造函数的继承，总是指向父类。
2. 子类prototype属性的__proto__属性，表示方法的继承，
   总是指向父类的prototype属性
```
class A {
}

class B extends A {
}

console.log(B.__proto__ === A); // true
console.log(B.prototype.__proto__ === A.prototype); // true
let b = new B();
```
