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
