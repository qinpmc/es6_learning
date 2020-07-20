# ArrayBuffer/TypedArray/DataView


ArrayBuffer对象、TypedArray视图和DataView视图是 JavaScript 操作二进制数据的一个接口。         
它们都是以数组的语法处理二进制数据，所以统称为二进制数组。 允许开发者以数组下标的形式，直接操作内存，       
大大增强了 JavaScript 处理二进制数据的能力，使得开发者有可能通过 JavaScript 与操作系统的原生接口进行二进制通信.       

二进制数组由三类对象组成:     

- （1）ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过**视图**进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。    

- （2）TypedArray**视图**：共包括 9 种类型的视图，比如Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。   

- （3）DataView**视图**：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。 

- **ArrayBuffer**对象代表**原始的二进制数据**，**TypedArray**视图用来**读写简单类型**的二进制数据，**DataView**视图用来**读写复杂类型**的二进制数据。

## ArrayBuffer
 
- ArrayBuffer.prototype.byteLength 返回所分配的内存区域的字节长度
- ArrayBuffer.prototype.slice()  将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象
- ArrayBuffer.isView()  ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例

```
const buffer = new ArrayBuffer(8);
ArrayBuffer.isView(buffer) // false

const v = new Int32Array(buffer);
ArrayBuffer.isView(v) // true
```

## TypedArray 视图

TypedArray视图一共包括 9 种类型，每一种视图都是一种构造函数。

- Int8Array：8 位有符号整数，长度 1 个字节。
- Uint8Array：8 位无符号整数，长度 1 个字节。
- Uint8ClampedArray：8 位无符号整数，长度 1 个字节，溢出处理不同。
- Int16Array：16 位有符号整数，长度 2 个字节。
- Uint16Array：16 位无符号整数，长度 2 个字节。
- Int32Array：32 位有符号整数，长度 4 个字节。
- Uint32Array：32 位无符号整数，长度 4 个字节。
- Float32Array：32 位浮点数，长度 4 个字节。
- Float64Array：64 位浮点数，长度 8 个字节

普通数组与 TypedArray 数组的差异:

- TypedArray 数组的所有成员，都是同一种类型。
- TypedArray 数组的成员是连续的，不会有空位。
- TypedArray 数组成员的默认值为 0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是 10 个空位；new Uint8Array(10)返- 回一个 TypedArray 数组，里面 10 个成员都是 0。
- TypedArray 数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性
 


### TypedArray 构造函数

1. TypedArray(buffer, byteOffset=0, length?)

2. TypedArray(length)

```
const f64a = new Float64Array(8);
f64a[0] = 10;
f64a[1] = 20;
```
3. TypedArray(typedArray) 
复制了参数数组的值，对应的底层内存是不一样的
```
const x = new Int8Array([1, 1]);
const y = new Int8Array(x);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 1
```


4. TypedArray(arrayLikeObject)  

```
const typedArray = new Uint8Array([1, 2, 3, 4]);
```


### TypedArray 数组方法

普通数组的操作方法和属性，对 TypedArray 数组完全适用。





##  DataView 视图

DataView视图提供更多操作选项，而且支持设定字节序。      
本来，在设计目的上，ArrayBuffer对象的各种TypedArray视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序就可以了；           
而DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。     












