## 正则的扩展

### 构造方法的扩展
* 构造可接受一个正则，和一个字符串修饰符
es5 中，

```
var regex  = new RegExp('xyz', 'i'); //接受2个字符串
var regex  = new RegExp(/xyz/i); //接受1个正则

// 等价于
//var regex = /xyz/i;

//es6  新增：
var regex = new RegExp(/xyz/, 'i'); //接受一个正则，和一个字符串修饰符

var reg2 = new RegExp(/xyz/ig,'i'); // 后面的字符串 ‘i' 属性覆盖前面正则里的 ig
console.log(reg2.flags); //i

```


### 增加y修饰符(“粘连”（sticky）修饰符)

y修饰符的作用与g修饰符类似，也是**全局匹配**，后一次匹配都从上一次匹配成功的下一个位置开始。   
不同之处在于，g修饰符只要剩余位置中**存在匹配就可**，   
而y修饰符确保匹配必须从剩余的**第一个位置**开始
- 注意：**y修饰符只有 对正则的 exec/test 方法有用，会修改其lastIndex属性，对字符串的 mathch方法不会触发粘滞行为**

```
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;
r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null
```


### sticky 属性
* sticky属性，表示是否设置了y修饰符
```
var r = /hello\d/y;
r.sticky // true
```

### flags 属性 

* 返回正则表达式的修饰符
```
/abc/ig.flags ;// 'gi'
```

### u 修饰符
-u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。
- 添加u修饰符，正则从编码单元切换到字符模式

```
/^\uD83D/u.test('\uD83D\uDC2A') // false,因为添加了u修饰符， \uD83D\uDC2A 被看作一个字符
/^\uD83D/.test('\uD83D\uDC2A') // true， \uD83D\uDC2A 被识别为两个字符

/^.$/u.test("𠮷");//true
/^.$/.test("𠮷");//false
```

 ### unicode属性
 - 表示是否设置了u修饰符。







