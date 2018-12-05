function readonly(target, name, descriptor){
    // descriptor对象原来的值如下
    // {
    //   value: specifiedFunction,
    //   enumerable: false,
    //   configurable: true,
    //   writable: true
    // };
    descriptor.writable = false;
    return descriptor;
}
class Person {
@readonly
    name() {
        console.log("这个方法不可修改")
    }
}
let p1 = new Person();
p1.name = function(){}; // Cannot assign to read only property 'name' of object '#<Person>'