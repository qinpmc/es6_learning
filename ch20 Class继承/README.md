# Class 继承

## super
super这个关键字，既可以当作 __函数__使用，也可以当作 __对象__使用

### super作为函数使用
1. 子类必须在constructor方法中调用super方法，否则新建实例时会报错
2. 在子类的constructor中，只有调用super之后，才可以使用this关键字，
   否则会报错（super 出现在首行）
3. super在子类构造函数中使用时，super内部的this指向 __子类实例对象__

### super作为对象使用
1. 在 __普通方法__ 中，指向 __父类的原型对象__；
2. 在 __静态方法__中，指向 __父类__。
3. 子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。
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
        super.x = 3; // 此处等同于 this.x
        //console.log(super === this); //用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
        console.log(super.x); // undefined 读的是A.prototype.x，所以返回undefined
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
